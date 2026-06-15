import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ResourceListHeaderProps = {
  visibleCount: number;
  showBulkStudyButton: boolean;
  bulkStudyLabel: string;
  onBulkStudyPress: () => void;
  onSortPress: () => void;
};

export function ResourceListHeader({
  visibleCount,
  showBulkStudyButton,
  bulkStudyLabel,
  onBulkStudyPress,
  onSortPress,
}: ResourceListHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <AppText style={styles.title}>资源</AppText>
        <AppText style={styles.meta}>{visibleCount} 个资源 · 当前文件夹</AppText>
      </View>

      <View style={styles.actions}>
        {showBulkStudyButton ? (
          <Pressable style={styles.bulkButton} onPress={onBulkStudyPress}>
            <AppText style={styles.bulkButtonText}>{bulkStudyLabel}</AppText>
          </Pressable>
        ) : null}
        <Pressable style={styles.sortButton} onPress={onSortPress}>
          <AppText style={styles.sortButtonText}>最近 </AppText>
          <FontAwesome name="angle-down" size={12} color={colors.textMuted} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 18,
    marginBottom: 10,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
  },
  meta: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulkButton: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  bulkButtonText: {
    color: colors.playBtn,
    fontSize: 11,
    fontWeight: '900',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  sortButtonText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
});
