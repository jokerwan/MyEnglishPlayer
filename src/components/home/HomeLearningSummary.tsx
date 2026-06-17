import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

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
        <FontAwesome name={icon} size={13} color="#0f766e" />
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
    paddingVertical: 2,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
    paddingHorizontal: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#ccfbf1',
  },
  value: {
    marginTop: 8,
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  label: {
    marginTop: 3,
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 13,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    marginVertical: 6,
    backgroundColor: '#e8eef2',
  },
});
