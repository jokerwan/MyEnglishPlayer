import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type UploadBottomActionProps = {
  canUpload: boolean;
  uploadSuccess: boolean;
  successFolderName?: string;
  onFinishUpload: () => void;
  onViewResources: () => void;
};

export function UploadBottomAction({
  canUpload,
  uploadSuccess,
  successFolderName,
  onFinishUpload,
  onViewResources,
}: UploadBottomActionProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 16) }]}>
      {uploadSuccess ? (
        <View style={styles.successWrap}>
          <View style={styles.successTextRow}>
            <FontAwesome name="check-circle" size={14} color={colors.trendGreen} />
            <AppText style={styles.successText}>已上传到：{successFolderName}</AppText>
          </View>
          <Pressable style={styles.secondaryButton} onPress={onViewResources}>
            <AppText style={styles.secondaryButtonText}>去我的资源查看</AppText>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={[styles.primaryButton, !canUpload && styles.primaryButtonDisabled]}
          onPress={onFinishUpload}
          disabled={!canUpload}
        >
          <AppText style={[styles.primaryButtonText, !canUpload && styles.primaryButtonTextDisabled]}>
            完成上传
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  primaryButton: {
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryButtonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  primaryButtonTextDisabled: {
    color: '#94a3b8',
  },
  successWrap: {
    gap: 9,
  },
  successTextRow: {
    minHeight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  successText: {
    color: colors.trendGreen,
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryButton: {
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  secondaryButtonText: {
    color: colors.playBtn,
    fontSize: 15,
    fontWeight: '900',
  },
});
