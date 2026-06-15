import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ResourceEmptyStateProps = {
  onUpload: () => void;
};

export function ResourceEmptyState({ onUpload }: ResourceEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <FontAwesome name="folder-open-o" size={22} color={colors.playBtn} />
      </View>
      <AppText style={styles.title}>暂无资源</AppText>
      <AppText style={styles.description}>可以换个筛选条件，或上传新的音视频资源。</AppText>
      <Pressable style={styles.button} onPress={onUpload}>
        <AppText style={styles.buttonText}>上传资源</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 34,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
  },
  title: {
    marginTop: 14,
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
  },
  description: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
});
