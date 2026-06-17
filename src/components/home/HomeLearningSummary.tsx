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
      <View style={styles.chip}>
        <FontAwesome name="folder-open-o" size={12} color="#0f766e" />
        <AppText style={styles.chipText}>{planCount} 个合集正在学</AppText>
      </View>
      <View style={styles.chip}>
        <FontAwesome name="headphones" size={12} color="#0f766e" />
        <AppText style={styles.chipText}>{resourceCount} 个资源进行中</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6edf3',
  },
  chipText: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '800',
  },
});
