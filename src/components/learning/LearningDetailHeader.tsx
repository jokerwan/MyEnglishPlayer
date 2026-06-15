import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import type { LearningSortOrder } from '@/utils/learningManager';

type LearningDetailHeaderProps = {
  resourceCount: number;
  sortOrder: LearningSortOrder;
  onContinuePress: () => void;
  onSortPress: () => void;
};

export function LearningDetailHeader({
  resourceCount,
  sortOrder,
  onContinuePress,
  onSortPress,
}: LearningDetailHeaderProps) {
  const sortLabel = sortOrder === 'asc' ? '正序' : '倒序';
  const sortIcon = sortOrder === 'asc' ? 'sort-amount-asc' : 'sort-amount-desc';
  const subtitle = `${resourceCount} 个资源 · 时间${sortOrder === 'asc' ? '正序' : '倒序'}`;

  return (
    <View style={styles.head}>
      <View style={styles.titleWrap}>
        <AppText style={styles.title}>资源列表</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.continueButton} onPress={onContinuePress} accessibilityLabel="继续播放">
          <FontAwesome name="play" size={12} color="#ffffff" />
          <AppText style={styles.continueText}>继续播放</AppText>
        </Pressable>

        <Pressable style={styles.sortButton} onPress={onSortPress} accessibilityLabel={sortLabel}>
          <FontAwesome name={sortIcon} size={12} color="#0f766e" />
          <AppText style={styles.sortText}>{sortLabel}</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '900',
    letterSpacing: -0.35,
  },
  subtitle: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: '#0f766e',
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 2,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  sortButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: 'rgba(236,254,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.76)',
  },
  sortText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
});
