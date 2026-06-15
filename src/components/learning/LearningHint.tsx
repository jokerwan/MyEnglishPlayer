import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

export function LearningHint() {
  return (
    <View style={styles.wrap}>
      <AppText style={styles.text}>
        <AppText style={styles.strong}>资源可直接打开详情</AppText>
        ，合集仍支持左滑、选择和批量管理。
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 11,
    paddingHorizontal: 2,
  },
  text: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  strong: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
  },
});
