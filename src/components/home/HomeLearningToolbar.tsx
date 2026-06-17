import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';

type HomeLearningToolbarProps = {
  subtitle: string;
  onExpandAllPress: () => void;
  onManagePress: () => void;
};

export function HomeLearningToolbar({
  subtitle,
  onExpandAllPress,
  onManagePress,
}: HomeLearningToolbarProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </AppText>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          onPress={onExpandAllPress}
        >
          <AppText style={styles.actionText}>展开全部</AppText>
          <FontAwesome name="angle-down" size={12} color={homeTheme.primaryDeep} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          onPress={onManagePress}
        >
          <AppText style={styles.actionText}>管理</AppText>
          <FontAwesome name="angle-right" size={12} color={homeTheme.primaryDeep} />
        </Pressable>
      </View>
    </View>
  );
}

type HomeTreeSectionHeadProps = {
  title?: string;
};

export function HomeTreeSectionHead({ title = '学习树' }: HomeTreeSectionHeadProps) {
  return (
    <View style={styles.treeHead}>
      <AppText style={styles.treeTitle}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  subtitle: {
    flex: 1,
    minWidth: 0,
    color: homeTheme.subtle,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b7f5ea',
  },
  actionText: {
    color: homeTheme.primaryDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  actionPressed: {
    opacity: 0.82,
    backgroundColor: homeTheme.primarySoft,
  },
  treeHead: {
    marginBottom: 12,
  },
  treeTitle: {
    color: homeTheme.ink,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
});
