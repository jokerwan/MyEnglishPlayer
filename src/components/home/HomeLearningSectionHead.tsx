import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type HomeLearningSectionHeadProps = {
  subtitle: string;
  onExpandAllPress: () => void;
  onManagePress: () => void;
};

export function HomeLearningSectionHead({
  subtitle,
  onExpandAllPress,
  onManagePress,
}: HomeLearningSectionHeadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <AppText variant="sectionTitle">我的学习</AppText>
        <AppText variant="sectionDesc" numberOfLines={2}>
          {subtitle}
        </AppText>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          onPress={onExpandAllPress}
        >
          <FontAwesome name="search" size={12} color="#0f766e" />
          <AppText style={styles.actionText}>展开全部</AppText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          onPress={onManagePress}
        >
          <AppText style={styles.actionText}>管理</AppText>
          <FontAwesome name="angle-right" size={12} color="#0f766e" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    paddingTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e8eef2',
  },
  actionText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
  },
  actionPressed: {
    opacity: 0.82,
    backgroundColor: '#f0fdfa',
  },
});
