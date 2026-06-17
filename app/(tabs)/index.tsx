import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeHero } from '@/components/home/HomeHero';
import { HomeLearningExpanded } from '@/components/home/HomeLearningExpanded';
import { HomeLearningEmpty, HomeLearningModule } from '@/components/home/HomeLearningModule';
import { useHomeLearningDefaults } from '@/components/home/HomeLearningTree';
import { layout } from '@/constants/layout';
import { mockHomeStats } from '@/data/mockHome';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import { useAppData } from '@/hooks/useAppData';
import { formatHomeResumeSubtitle, getHomeLearningCounts } from '@/utils/homeLearning';
import { getContinueResource, stripResourceExtension } from '@/utils/learningManager';
import type { StudyPlan } from '@/types/studyPlan';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { playResource, player } = usePlayer();
  const appData = useAppData();

  const learningPlans = useMemo(
    () => appData.studyPlans.filter((plan) => plan.status === 'learning'),
    [appData.studyPlans],
  );

  const { recentPlan, recentPlanId, recentResource } = useHomeLearningDefaults(
    learningPlans,
    player.resourceId,
  );

  const learningCounts = useMemo(() => getHomeLearningCounts(learningPlans), [learningPlans]);

  const [expandedPlanIds, setExpandedPlanIds] = useState<Set<string>>(() => new Set());
  const [expandedModalVisible, setExpandedModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const hasInitializedExpand = useRef(false);

  useEffect(() => {
    if (!hasInitializedExpand.current && recentPlanId) {
      setExpandedPlanIds(new Set([recentPlanId]));
      hasInitializedExpand.current = true;
    }
  }, [recentPlanId]);

  const resumeSubtitle = formatHomeResumeSubtitle(recentPlan, recentResource);

  const playFromPlan = useCallback(
    (plan: StudyPlan, resourceId?: string) => {
      const resource =
        (resourceId ? plan.resources.find((item) => item.id === resourceId) : null) ??
        getContinueResource(plan.resources);

      if (!resource) {
        showToast('这个合集还没有可播放的资源');
        return;
      }

      const title = stripResourceExtension(resource.title);
      playResource(resource.id, title, `来自：${plan.title}`);
      showToast(`正在播放：${title}`);
    },
    [playResource, showToast],
  );

  const handleToggleExpanded = useCallback(
    (planId: string) => {
      setExpandedPlanIds((current) => {
        const next = expandedModalVisible ? new Set(current) : new Set<string>();
        if (current.has(planId)) {
          next.delete(planId);
        } else {
          if (!expandedModalVisible) {
            next.clear();
          }
          next.add(planId);
        }
        return next;
      });
    },
    [expandedModalVisible],
  );

  const handleManagePress = useCallback(() => {
    setExpandedModalVisible(false);
    router.push('/learning');
  }, [router]);

  const handleExpandAllPress = useCallback(() => {
    setExpandedModalVisible(true);
  }, []);

  const handleResourceDetailPress = useCallback(
    (resourceId: string) => {
      setExpandedModalVisible(false);
      router.push(`/resource/${resourceId}`);
    },
    [router],
  );

  const handleCloseExpanded = useCallback(() => {
    setExpandedModalVisible(false);
    setSearchQuery('');
  }, []);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#e8f4f1', '#f3f8f7', '#f7faf9']}
        locations={[0, 0.28, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
      >
        <HomeHero />

        <View style={styles.content}>
          {learningPlans.length > 0 ? (
            <HomeLearningModule
              plans={learningPlans}
              planCount={learningCounts.planCount}
              resourceCount={learningCounts.resourceCount}
              weeklyListening={mockHomeStats.weeklyListening}
              subtitle={resumeSubtitle}
              recentPlanId={recentPlanId}
              expandedPlanIds={expandedPlanIds}
              playerResourceId={player.resourceId}
              onExpandAllPress={handleExpandAllPress}
              onManagePress={handleManagePress}
              onToggleExpanded={handleToggleExpanded}
              onContinuePress={playFromPlan}
              onResourcePress={playFromPlan}
              onResourceDetailPress={handleResourceDetailPress}
            />
          ) : (
            <HomeLearningEmpty onBrowseResources={() => router.push('/resources')} />
          )}

          <View style={styles.safeBottom} />
        </View>
      </ScrollView>

      <HomeLearningExpanded
        visible={expandedModalVisible}
        plans={learningPlans}
        recentPlanId={recentPlanId}
        expandedPlanIds={expandedPlanIds}
        playerResourceId={player.resourceId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery('')}
        onClose={handleCloseExpanded}
        onManagePress={handleManagePress}
        onToggleExpanded={handleToggleExpanded}
        onContinuePress={playFromPlan}
        onResourcePress={playFromPlan}
        onResourceDetailPress={handleResourceDetailPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7faf9',
  },
  scrollContent: {
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  safeBottom: {
    height: layout.homeSafeBottom,
  },
});
