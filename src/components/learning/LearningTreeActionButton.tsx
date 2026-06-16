import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';

type LearningTreeActionButtonProps = {
  label: string;
  icon: 'check' | 'refresh' | 'trash-o';
  variant?: 'primary' | 'review' | 'danger';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const iconColors = {
  primary: '#0f766e',
  review: '#64748b',
  danger: '#e11d48',
} as const;

export function LearningTreeActionButton({
  label,
  icon,
  variant = 'primary',
  onPress,
  style,
}: LearningTreeActionButtonProps) {
  const iconColor = variant === 'primary' ? iconColors.primary : iconColors[variant];

  return (
    <Pressable
      style={[
        styles.button,
        variant === 'review' && styles.reviewButton,
        variant === 'danger' && styles.dangerButton,
        style,
      ]}
      onPress={onPress}
      accessibilityLabel={label}
    >
      <FontAwesome name={icon} size={12} color={iconColor} />
      <AppText
        style={[
          styles.label,
          variant === 'review' && styles.reviewLabel,
          variant === 'danger' && styles.dangerLabel,
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 38,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(236,254,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.86)',
  },
  reviewButton: {
    backgroundColor: '#f8fafc',
    borderColor: 'rgba(226,232,240,0.98)',
  },
  dangerButton: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(254,205,211,0.96)',
  },
  label: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '900',
  },
  reviewLabel: {
    color: '#64748b',
  },
  dangerLabel: {
    color: '#e11d48',
  },
});
