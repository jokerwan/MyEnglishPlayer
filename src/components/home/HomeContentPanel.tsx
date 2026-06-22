import { StyleSheet, View } from 'react-native';

import { homeTheme } from '@/constants/homeTheme';
import type { HomeRecommendation } from '@/data/mockHomeRecommendations';
import type { StudyPlan } from '@/types/studyPlan';

import { HomeLearningSummary } from './HomeLearningSummary';
import { HomeLearningTimeline } from './HomeLearningTimeline';
import { HomeRecommendedResources } from './HomeRecommendedResources';
import { HomeSectionHeader } from './HomeSectionHeader';

type HomeContentPanelProps = {
  planCount: number;
  resourceCount: number;
  weeklyListening: string;
  plans: StudyPlan[];
  activePlanId: string | null;
  onLearningMorePress: () => void;
  onPlanPress: (plan: StudyPlan) => void;
  onRecommendMorePress: () => void;
  onRecommendPress: (item: HomeRecommendation) => void;
};

export function HomeContentPanel({
  planCount,
  resourceCount,
  weeklyListening,
  plans,
  activePlanId,
  onLearningMorePress,
  onPlanPress,
  onRecommendMorePress,
  onRecommendPress,
}: HomeContentPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.section}>
        <HomeSectionHeader title="我的学习" />
        <HomeLearningSummary
          planCount={planCount}
          resourceCount={resourceCount}
          weeklyListening={weeklyListening}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <HomeLearningTimeline
          plans={plans}
          activePlanId={activePlanId}
          maxItems={2}
          onMorePress={onLearningMorePress}
          onPlanPress={onPlanPress}
        />
      </View>

      <View style={styles.divider} />

      <View style={[styles.section, styles.recommendSection]}>
        <HomeRecommendedResources
          onMorePress={onRecommendMorePress}
          onItemPress={onRecommendPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 16,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.cardBorder,
    shadowColor: homeTheme.shadow.color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.045,
    shadowRadius: 24,
    elevation: 3,
    overflow: 'hidden',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  recommendSection: {
    paddingBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: homeTheme.line,
    marginHorizontal: 16,
  },
});
