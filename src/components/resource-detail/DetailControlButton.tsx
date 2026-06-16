import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';
import type { ComponentProps } from 'react';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';

type DetailControlButtonProps = {
  label: string;
  icon?: ComponentProps<typeof FontAwesome>['name'];
  value?: string;
  active?: boolean;
  primary?: boolean;
  onPress: () => void;
};

export function DetailControlButton({
  label,
  icon,
  value,
  active,
  primary,
  onPress,
}: DetailControlButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        active && styles.buttonActive,
        primary && styles.buttonPrimary,
      ]}
      onPress={onPress}
      accessibilityLabel={label}
    >
      {value ? (
        <AppText style={[styles.value, primary && styles.valuePrimary]}>{value}</AppText>
      ) : icon ? (
        <FontAwesome
          name={icon}
          size={15}
          color={primary ? colors.white : active ? '#0f766e' : '#475569'}
        />
      ) : null}
      <AppText style={[styles.label, primary && styles.labelPrimary]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 0,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.82)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.035,
    shadowRadius: 14,
    elevation: 1,
  },
  buttonActive: {
    backgroundColor: 'rgba(236,254,255,0.92)',
    borderColor: 'rgba(20,184,166,0.35)',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
  },
  value: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 16,
  },
  valuePrimary: {
    color: colors.white,
  },
  label: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '800',
  },
  labelPrimary: {
    color: colors.white,
  },
});
