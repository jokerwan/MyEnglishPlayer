import type { ReactNode } from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { colors } from '@/constants/colors';

type Variant = 'kicker' | 'greeting' | 'subtitle' | 'sectionTitle' | 'sectionDesc' | 'body' | 'caption';

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
  children: ReactNode;
};

const variantStyles: Record<Variant, TextStyle> = {
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.48,
    color: colors.primaryLight,
    opacity: 0.78,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
    letterSpacing: -1.4,
    color: colors.textMain,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 23,
    color: colors.textMain,
  },
  sectionDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 4,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMain,
  },
  caption: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textMuted,
  },
};

export function AppText({ variant = 'body', color, style, children, ...props }: AppTextProps) {
  return (
    <Text style={[variantStyles[variant], color ? { color } : null, style]} {...props}>
      {children}
    </Text>
  );
}

export const textStyles = StyleSheet.create(variantStyles);
