import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import type { HomeMetric } from '@/types/home';

type ProfileStatsSectionProps = {
  trendLabel: string;
  metrics: HomeMetric[];
};

export function ProfileStatsSection({ trendLabel, metrics }: ProfileStatsSectionProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.title}>本周学习状态</AppText>
          <AppText style={styles.desc}>数据为示意，后续接入真实统计</AppText>
        </View>
        <View style={styles.trend}>
          <AppText style={styles.trendText}>{trendLabel}</AppText>
        </View>
      </View>

      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metric}>
            <FontAwesome name={metric.icon} size={13} color="#0f766e" />
            <AppText style={styles.metricValue}>{metric.value}</AppText>
            <AppText style={styles.metricLabel}>{metric.label}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lineSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '900',
  },
  desc: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  trend: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#ccfbf1',
  },
  trendText: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#eef2f7',
    gap: 4,
  },
  metricValue: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '900',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
});
