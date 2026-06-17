import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type HomeLearningSectionHeadProps = {
  subtitle: string;
  onManagePress: () => void;
};

export function HomeLearningSectionHead({ subtitle, onManagePress }: HomeLearningSectionHeadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <AppText style={styles.title}>我的学习</AppText>
        <AppText style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </AppText>
      </View>
      <Pressable style={styles.manageButton} onPress={onManagePress}>
        <AppText style={styles.manageText}>管理 </AppText>
        <FontAwesome name="angle-right" size={14} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.textMain,
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 5,
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageText: {
    color: '#0f766e',
    fontSize: 13,
    fontWeight: '900',
  },
});
