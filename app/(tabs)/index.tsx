import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeHero } from '@/components/home/HomeHero';
import { HomeLearningExpanded } from '@/components/home/HomeLearningExpanded';
import { HomeLearningSectionHead } from '@/components/home/HomeLearningSectionHead';
import { HomeLearningTree, useHomeLearningDefaults } from '@/components/home/HomeLearningTree';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import { useAppData } from '@/hooks/useAppData';
import { formatHomeResumeSubtitle } from '@/utils/homeLearning';
import { getContinueResource, stripResourceExtension } from '@/utils/learningManager';
import type { StudyPlan } from '@/types/studyPlan';

const FULLSCREEN_SCROLL_THRESHOLD = 180;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { playResource, player } = usePlayer();
  const appData = useAppData();
  const scrollRef = useRef<ScrollView>(null);

  const learningPlans = useMemo(
    () => appData.studyPlans.filter((plan) => plan.status === 'learning'),
    [appData.studyPlans],
  );

  const { recentPlan, recentPlanId, recentResource } = useHomeLearningDefaults(
    learningPlans,
    player.resourceId,
  );

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

  const handleResourceDetailPress = useCallback(
    (resourceId: string) => {
      setExpandedModalVisible(false);
      router.push(`/resource/${resourceId}`);
    },
    [router],
  );

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= FULLSCREEN_SCROLL_THRESHOLD) {
      setExpandedModalVisible(true);
    }
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedModalVisible(false);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <HomeHero />

        <View style={styles.content}>
          <HomeLearningSectionHead subtitle={resumeSubtitle} onManagePress={handleManagePress} />

          <HomeLearningTree
            plans={learningPlans}
            recentPlanId={recentPlanId}
            expandedPlanIds={expandedPlanIds}
            playerResourceId={player.resourceId}
            onToggleExpanded={handleToggleExpanded}
            onContinuePress={playFromPlan}
            onResourcePress={playFromPlan}
            onResourceDetailPress={handleResourceDetailPress}
          />

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
  safeBottom: {
    height: layout.homeSafeBottom,
  },
});
