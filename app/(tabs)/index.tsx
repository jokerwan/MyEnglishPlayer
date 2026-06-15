import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeHero } from '@/components/home/HomeHero';
import { HomeLearningList } from '@/components/home/HomeLearningList';
import { HomeQuickActions } from '@/components/home/HomeQuickActions';
import { HomeStatsCard } from '@/components/home/HomeStatsCard';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { mockHomeStats } from '@/data/mockHome';
import { mockQuickActions } from '@/data/mockQuickActions';
import { getLearningPlans } from '@/data/mockStudyPlans';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import type { StudyPlan } from '@/types/studyPlan';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { playPlan } = usePlayer();
  const learningPlans = getLearningPlans();

  const handleQuickAction = (actionId: (typeof mockQuickActions)[number]['id']) => {
    if (actionId === 'upload') {
      router.push('/upload');
      return;
    }

    if (actionId === 'resources') {
      router.push('/resources');
      return;
    }

    showToast('打开收藏夹');
  };

  const handleManagePress = () => {
    router.push('/learning');
  };

  const handlePlanPress = (plan: StudyPlan) => {
    router.push(`/learning/${plan.id}`);
  };

  const handlePlanPlayPress = (plan: StudyPlan) => {
    playPlan(plan.title, '来自：我的学习');
    showToast(`正在播放：${plan.title}`);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHero />
        <HomeStatsCard trendLabel={mockHomeStats.trendLabel} metrics={mockHomeStats.metrics} />

        <View style={styles.content}>
          <HomeQuickActions actions={mockQuickActions} onPress={handleQuickAction} />
          <HomeLearningList
            plans={learningPlans}
            onManagePress={handleManagePress}
            onPlanPress={handlePlanPress}
            onPlanPlayPress={handlePlanPlayPress}
          />
          <View style={styles.safeBottom} />
        </View>
      </ScrollView>
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
    paddingHorizontal: layout.screenPadding,
    paddingTop: 18,
  },
  safeBottom: {
    height: layout.homeSafeBottom,
  },
});
