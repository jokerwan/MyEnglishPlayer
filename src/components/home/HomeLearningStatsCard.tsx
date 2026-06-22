import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';

import { HomeLearningSummary } from './HomeLearningSummary';

type HomeLearningStatsCardProps = {
  planCount: number;
  resourceCount: number;
  weeklyListening: string;
};

export function HomeLearningStatsCard({
  planCount,
  resourceCount,
  weeklyListening,
}: HomeLearningStatsCardProps) {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>我的学习</AppText>
      <HomeLearningSummary
        planCount={planCount}
        resourceCount={resourceCount}
        weeklyListening={weeklyListening}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: homeTheme.cardRadius,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.cardBorder,
    shadowColor: homeTheme.shadow.color,
    shadowOffset: homeTheme.shadow.offset,
    shadowOpacity: homeTheme.shadow.opacity,
    shadowRadius: homeTheme.shadow.radius,
    elevation: homeTheme.shadow.elevation,
  },
  title: {
    color: homeTheme.ink,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 14,
  },
});
