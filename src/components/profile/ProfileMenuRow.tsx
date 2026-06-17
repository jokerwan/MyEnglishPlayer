import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ProfileMenuRowProps = {
  icon: ComponentProps<typeof FontAwesome>['name'];
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export function ProfileMenuRow({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  onPress,
}: ProfileMenuRowProps) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <FontAwesome name={icon} size={16} color={iconColor} />
      </View>
      <View style={styles.copy}>
        <AppText style={styles.title}>{title}</AppText>
        {subtitle ? <AppText style={styles.subtitle}>{subtitle}</AppText> : null}
      </View>
      <FontAwesome name="angle-right" size={16} color="#cbd5e1" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lineSoft,
  },
  rowPressed: {
    opacity: 0.86,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 3,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
});
