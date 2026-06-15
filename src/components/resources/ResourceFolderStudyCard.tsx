import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import type { ResourceFolderStudyAction } from '@/types/resource';

type ResourceFolderStudyCardProps = {
  folderName: string;
  action: ResourceFolderStudyAction;
  onPress: () => void;
};

export function ResourceFolderStudyCard({
  folderName,
  action,
  onPress,
}: ResourceFolderStudyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.copy}>
          <AppText style={styles.title}>{folderName}</AppText>
          <AppText style={styles.subtitle}>{action.subtitle}</AppText>
        </View>
        <Pressable
          style={[
            styles.button,
            action.tone === 'learning' && styles.buttonLearning,
            action.tone === 'done' && styles.buttonDone,
            action.disabled && styles.buttonDisabled,
          ]}
          onPress={onPress}
          disabled={action.disabled}
        >
          <AppText
            style={[
              styles.buttonText,
              action.tone === 'done' && styles.buttonTextDone,
              action.disabled && styles.buttonTextDisabled,
            ]}
          >
            {action.label}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.progressRow}>
        <ProgressBar
          progress={action.progressPercent}
          style={styles.progress}
          trackColor="#e2e8f0"
          fillColor={colors.primary}
        />
        <AppText style={styles.progressText}>{action.progressText}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    padding: 15,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.055,
    shadowRadius: 16,
    elevation: 2,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  button: {
    minWidth: 112,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f766e',
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 2,
  },
  buttonLearning: {
    backgroundColor: colors.primary,
  },
  buttonDone: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  buttonTextDone: {
    color: colors.textMuted,
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  progress: {
    flex: 1,
    height: 7,
  },
  progressText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
});
