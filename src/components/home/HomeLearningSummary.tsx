import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';

type HomeLearningSummaryProps = {
  planCount: number;
  resourceCount: number;
  weeklyListening: string;
};

type SummaryItemProps = {
  icon: 'folder-open-o' | 'headphones' | 'clock-o';
  value: string;
  label: string;
};

function SummaryItem({ icon, value, label }: SummaryItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.iconWrap}>
        <FontAwesome name={icon} size={14} color={homeTheme.primaryDeep} />
      </View>
      <AppText style={styles.value} numberOfLines={1}>
        {value}
      </AppText>
      <AppText style={styles.label} numberOfLines={2}>
        {label}
      </AppText>
    </View>
  );
}

export function HomeLearningSummary({
  planCount,
  resourceCount,
  weeklyListening,
}: HomeLearningSummaryProps) {
  return (
    <View style={styles.container}>
      <SummaryItem icon="folder-open-o" value={String(planCount)} label="合集正在学" />
      <View style={styles.divider} />
      <SummaryItem icon="headphones" value={String(resourceCount)} label="资源进行中" />
      <View style={styles.divider} />
      <SummaryItem icon="clock-o" value={weeklyListening} label="本周听力" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
    paddingHorizontal: 2,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  value: {
    marginTop: 9,
    color: homeTheme.ink,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  label: {
    marginTop: 4,
    color: homeTheme.muted,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    marginVertical: 8,
    backgroundColor: '#e8eef2',
  },
});
