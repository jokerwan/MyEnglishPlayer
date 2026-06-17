import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { HomeContinueCard } from '@/components/home/HomeContinueCard';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeLearningExpanded } from '@/components/home/HomeLearningExpanded';
import { HomeLearningSectionHead } from '@/components/home/HomeLearningSectionHead';
import { HomeLearningSummary } from '@/components/home/HomeLearningSummary';
import { HomeLearningTree, useHomeLearningDefaults } from '@/components/home/HomeLearningTree';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import { useAppData } from '@/hooks/useAppData';
import {
  formatHomeResumeSubtitle,
  formatResourceResumeMeta,
  getHomeLearningCounts,
} from '@/utils/homeLearning';
import { getContinueResource, stripResourceExtension } from '@/utils/learningManager';
import type { StudyPlan } from '@/types/studyPlan';

const HOME_PREVIEW_LIMIT = 2;

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
  const previewPlans = useMemo(() => {
    if (learningPlans.length <= HOME_PREVIEW_LIMIT) {
      return learningPlans;
    }

    const recent = recentPlanId
      ? learningPlans.find((plan) => plan.id === recentPlanId) ?? null
      : null;

    if (!recent) {
      return learningPlans.slice(0, HOME_PREVIEW_LIMIT);
    }

    const others = learningPlans
      .filter((plan) => plan.id !== recentPlanId)
      .slice(0, HOME_PREVIEW_LIMIT - 1);

    return [recent, ...others];
  }, [learningPlans, recentPlanId]);
  const hiddenPlanCount = Math.max(learningPlans.length - previewPlans.length, 0);

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

  const handleContinueCardPress = useCallback(() => {
    if (recentPlan) {
      playFromPlan(recentPlan, recentResource?.id);
    }
  }, [playFromPlan, recentPlan, recentResource?.id]);

  const handleContinueDetailPress = useCallback(() => {
    if (recentResource) {
      handleResourceDetailPress(recentResource.id);
    }
  }, [handleResourceDetailPress, recentResource]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HomeHero />

        <View style={styles.content}>
          {learningPlans.length > 0 ? (
            <HomeLearningSummary
              planCount={learningCounts.planCount}
              resourceCount={learningCounts.resourceCount}
            />
          ) : null}

          {recentPlan && recentResource ? (
            <HomeContinueCard
              planTitle={recentPlan.title}
              resourceTitle={stripResourceExtension(recentResource.title)}
              progress={recentResource.done ? 100 : recentResource.progress}
              meta={formatResourceResumeMeta(recentResource)}
              onContinuePress={handleContinueCardPress}
              onDetailPress={handleContinueDetailPress}
            />
          ) : null}

          <HomeLearningSectionHead
            subtitle={resumeSubtitle}
            showExpandAll={learningPlans.length > 0}
            onExpandAllPress={handleExpandAllPress}
            onManagePress={handleManagePress}
          />

          <View style={styles.treePanel}>
            <HomeLearningTree
              plans={previewPlans}
              recentPlanId={recentPlanId}
              expandedPlanIds={expandedPlanIds}
              playerResourceId={player.resourceId}
              onToggleExpanded={handleToggleExpanded}
              onContinuePress={playFromPlan}
              onResourcePress={playFromPlan}
              onResourceDetailPress={handleResourceDetailPress}
            />

            {hiddenPlanCount > 0 ? (
              <Pressable
                style={({ pressed }) => [styles.moreButton, pressed && styles.moreButtonPressed]}
                onPress={handleExpandAllPress}
              >
                <AppText style={styles.moreText}>还有 {hiddenPlanCount} 个合集，展开全部查看</AppText>
              </Pressable>
            ) : null}
          </View>

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
    backgroundColor: colors.bgSoft,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  content: {
    marginTop: -22,
    paddingHorizontal: layout.screenPadding,
    zIndex: 4,
  },
  treePanel: {
    padding: 14,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6edf3',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  moreButton: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  moreButtonPressed: {
    opacity: 0.86,
  },
  moreText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
  },
  safeBottom: {
    height: layout.homeSafeBottom,
  },
});
