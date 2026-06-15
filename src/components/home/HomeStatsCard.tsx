import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import type { HomeMetric } from '@/types/home';

type HomeStatsCardProps = {
  trendLabel: string;
  metrics: HomeMetric[];
};

const toneStyles = {
  blue: {
    card: colors.metricBlueBg,
    icon: colors.primary,
  },
  green: {
    card: colors.metricGreenBg,
    icon: colors.secondary,
  },
  purple: {
    card: colors.metricPurpleBg,
    icon: colors.primary,
  },
} as const;

export function HomeStatsCard({ trendLabel, metrics }: HomeStatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText variant="sectionTitle">本周学习状态</AppText>
          <AppText variant="sectionDesc">更关注有效输入与开口练习</AppText>
        </View>
        <View style={styles.trend}>
          <AppText style={styles.trendText}>{trendLabel}</AppText>
        </View>
      </View>

      <View style={styles.grid}>
        {metrics.map((metric) => {
          const tone = toneStyles[metric.tone];
          return (
            <View key={metric.id} style={[styles.metricCard, { backgroundColor: tone.card }]}>
              <View style={styles.iconWrap}>
                <FontAwesome name={metric.icon} size={15} color={tone.icon} />
              </View>
              <AppText style={styles.metricValue}>{metric.value}</AppText>
              <AppText style={styles.metricLabel}>{metric.label}</AppText>
              <AppText style={styles.metricDelta}>{metric.delta}</AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: -42,
    marginHorizontal: 20,
    padding: 17,
    borderRadius: layout.cardRadius,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.075,
    shadowRadius: 20,
    elevation: 4,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  trend: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: layout.chipRadius,
    backgroundColor: colors.trendBg,
  },
  trendText: {
    color: colors.trendGreen,
    fontSize: 12,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 13,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.78)',
    marginBottom: 8,
  },
  metricValue: {
    color: colors.textMain,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 19,
  },
  metricLabel: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 11,
  },
  metricDelta: {
    marginTop: 6,
    color: colors.trendGreen,
    fontSize: 10,
  },
});
