import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import type { LearningSortOrder } from '@/utils/learningManager';

type LearningToolbarProps = {
  sortOrder: LearningSortOrder;
  selectMode: boolean;
  onSortPress: () => void;
  onSelectModePress: () => void;
};

export function LearningToolbar({
  sortOrder,
  selectMode,
  onSortPress,
  onSelectModePress,
}: LearningToolbarProps) {
  const sortLabel = sortOrder === 'desc' ? '时间倒序' : '时间正序';
  const sortIcon = sortOrder === 'desc' ? 'sort-amount-desc' : 'sort-amount-asc';

  return (
    <View style={styles.toolbar}>
      <Pressable style={styles.pillButton} onPress={onSortPress} accessibilityLabel={sortLabel}>
        <FontAwesome name={sortIcon} size={12} color="#334155" />
        <AppText style={styles.pillText}>{sortLabel}</AppText>
      </Pressable>

      <Pressable
        style={[styles.pillButton, selectMode && styles.pillButtonActive]}
        onPress={onSelectModePress}
        accessibilityLabel="选择"
        accessibilityState={{ selected: selectMode }}
      >
        <AppText style={[styles.pillText, selectMode && styles.pillTextActive]}>选择</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  pillButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(203,213,225,0.82)',
  },
  pillButtonActive: {
    backgroundColor: '#0f766e',
    borderColor: '#0f766e',
  },
  pillText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '900',
  },
  pillTextActive: {
    color: '#ffffff',
  },
});
