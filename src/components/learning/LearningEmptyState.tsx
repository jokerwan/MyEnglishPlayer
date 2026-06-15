import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

export function LearningEmptyState() {
  return (
    <View style={styles.empty}>
      <AppText style={styles.text}>当前分类下还没有学习合集</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 22,
    paddingVertical: 30,
    paddingHorizontal: 18,
    borderRadius: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
  },
  text: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
});
