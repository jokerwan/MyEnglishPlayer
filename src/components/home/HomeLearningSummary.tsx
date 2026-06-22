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
  icon: 'clone' | 'folder-open-o' | 'clock-o';
  value: string;
  label: string;
};

function SummaryItem({ icon, value, label }: SummaryItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.iconWrap}>
        <FontAwesome name={icon} size={15} color={homeTheme.primaryDeep} />
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
      <SummaryItem icon="clone" value={String(planCount)} label="合集正在学" />
      <View style={styles.divider} />
      <SummaryItem icon="folder-open-o" value={String(resourceCount)} label="资源进行中" />
      <View style={styles.divider} />
      <SummaryItem icon="clock-o" value={weeklyListening} label="本周听力" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
    paddingHorizontal: 2,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  value: {
    marginTop: 8,
    color: homeTheme.ink,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  label: {
    marginTop: 3,
    color: homeTheme.muted,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    marginVertical: 6,
    backgroundColor: '#e8eef2',
  },
});
