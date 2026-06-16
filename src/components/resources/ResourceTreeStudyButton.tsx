import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/common/AppText';

type ResourceTreeStudyButtonProps = {
  label: string;
  variant: 'join' | 'cancel';
  compact?: boolean;
  onPress: () => void;
};

export function ResourceTreeStudyButton({
  label,
  variant,
  compact = false,
  onPress,
}: ResourceTreeStudyButtonProps) {
  const isCancel = variant === 'cancel';
  const shortLabel = label === '加入学习' ? '加入' : label === '取消学习' ? '取消' : label;

  return (
    <Pressable
      style={[
        styles.button,
        compact && styles.buttonCompact,
        isCancel ? styles.cancelButton : styles.joinButton,
      ]}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      accessibilityLabel={label}
    >
      <FontAwesome
        name={isCancel ? 'minus' : 'plus'}
        size={11}
        color={isCancel ? '#e11d48' : '#0f766e'}
      />
      <AppText style={[styles.label, isCancel && styles.cancelLabel]}>
        {compact ? shortLabel : label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 72,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  buttonCompact: {
    minWidth: 58,
    height: 34,
    paddingHorizontal: 8,
  },
  joinButton: {
    backgroundColor: 'rgba(236,254,255,0.92)',
    borderColor: 'rgba(153,246,228,0.86)',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(254,205,211,0.96)',
  },
  label: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '900',
  },
  cancelLabel: {
    color: '#e11d48',
  },
});
