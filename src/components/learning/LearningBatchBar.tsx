import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

type LearningBatchBarProps = {
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onComplete: () => void;
  onCancel: () => void;
};

export function LearningBatchBar({
  selectedCount,
  allSelected,
  onSelectAll,
  onComplete,
  onCancel,
}: LearningBatchBarProps) {
  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        <Pressable style={styles.selectAllButton} onPress={onSelectAll}>
          <AppText style={styles.selectAllText}>{allSelected ? '取消全选' : '全选'}</AppText>
        </Pressable>
        <AppText style={styles.countText}>已选 {selectedCount} 项</AppText>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onComplete}>
          <AppText style={styles.actionText}>完成</AppText>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.dangerButton]} onPress={onCancel}>
          <AppText style={[styles.actionText, styles.dangerText]}>取消</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
    paddingVertical: 9,
    paddingLeft: 13,
    paddingRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flex: 1,
    minWidth: 0,
  },
  selectAllButton: {
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(236,254,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.76)',
  },
  selectAllText: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '900',
  },
  countText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    gap: 7,
  },
  actionButton: {
    minHeight: 34,
    paddingHorizontal: 13,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecfeff',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.88)',
  },
  actionText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  dangerButton: {
    backgroundColor: '#fff7f8',
    borderColor: '#fecdd3',
  },
  dangerText: {
    color: '#e11d48',
  },
});
