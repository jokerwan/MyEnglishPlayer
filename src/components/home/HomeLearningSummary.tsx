import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

type HomeLearningSummaryProps = {
  planCount: number;
  resourceCount: number;
};

export function HomeLearningSummary({ planCount, resourceCount }: HomeLearningSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <View style={styles.iconWrap}>
          <FontAwesome name="folder-open-o" size={14} color="#0f766e" />
        </View>
        <View style={styles.copy}>
          <AppText style={styles.value}>{planCount}</AppText>
          <AppText style={styles.label}>合集正在学</AppText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <View style={styles.iconWrap}>
          <FontAwesome name="headphones" size={14} color="#0f766e" />
        </View>
        <View style={styles.copy}>
          <AppText style={styles.value}>{resourceCount}</AppText>
          <AppText style={styles.label}>资源进行中</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: 4,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#ccfbf1',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  value: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
    letterSpacing: -0.6,
  },
  label: {
    marginTop: 2,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    marginHorizontal: 14,
    backgroundColor: '#e8eef2',
  },
});
