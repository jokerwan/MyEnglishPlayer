import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeContentPanel } from '@/components/home/HomeContentPanel';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeLearningEmpty } from '@/components/home/HomeLearningModule';
import { useHomeLearningDefaults } from '@/components/home/HomeLearningTree';
import { homeTheme } from '@/constants/homeTheme';
import { layout } from '@/constants/layout';
import type { HomeRecommendation } from '@/data/mockHomeRecommendations';
import { mockHomeStats } from '@/data/mockHome';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import { useAppData } from '@/hooks/useAppData';
import { getHomeLearningCounts } from '@/utils/homeLearning';
import { sortPlans } from '@/utils/learningManager';
import type { StudyPlan } from '@/types/studyPlan';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { player } = usePlayer();
  const appData = useAppData();

  const learningPlans = useMemo(
    () =>
      sortPlans(
        appData.studyPlans.filter((plan) => plan.status === 'learning'),
        'desc',
      ),
    [appData.studyPlans],
  );

  const { recentPlanId } = useHomeLearningDefaults(learningPlans, player.resourceId);
  const learningCounts = useMemo(() => getHomeLearningCounts(learningPlans), [learningPlans]);

  const handlePlanPress = useCallback(
    (plan: StudyPlan) => {
      router.push(`/learning?expand=${plan.id}`);
    },
    [router],
  );

  const handleLearningMorePress = useCallback(() => {
    router.push('/learning');
  }, [router]);

  const handleRecommendMorePress = useCallback(() => {
    router.push('/(tabs)/listening');
  }, [router]);

  const handleRecommendPress = useCallback(
    (item: HomeRecommendation) => {
      showToast(`即将打开：${item.title}`);
      router.push('/(tabs)/listening');
    },
    [router, showToast],
  );

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[...homeTheme.bgGradient]}
        locations={[0, 0.2, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
      >
        <HomeHero onNotificationsPress={() => showToast('暂无新通知')} />

        <View style={styles.content}>
          {learningPlans.length > 0 ? (
            <HomeContentPanel
              planCount={learningCounts.planCount}
              resourceCount={learningCounts.resourceCount}
              weeklyListening={mockHomeStats.weeklyListening}
              plans={learningPlans}
              activePlanId={recentPlanId}
              onLearningMorePress={handleLearningMorePress}
              onPlanPress={handlePlanPress}
              onRecommendMorePress={handleRecommendMorePress}
              onRecommendPress={handleRecommendPress}
            />
          ) : (
            <HomeLearningEmpty onBrowseResources={() => router.push('/resources')} />
          )}

          <View style={styles.safeBottom} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: homeTheme.bg,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: -22,
    zIndex: 4,
  },
  safeBottom: {
    height: layout.homeSafeBottom,
  },
});
