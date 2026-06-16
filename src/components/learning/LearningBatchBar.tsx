import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

type LearningBatchBarProps = {
  allSelected: boolean;
  onSelectAll: () => void;
  onComplete: () => void;
  onRemove: () => void;
};

export function LearningBatchBar({
  allSelected,
  onSelectAll,
  onComplete,
  onRemove,
}: LearningBatchBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.button} onPress={onSelectAll}>
        <FontAwesome
          name={allSelected ? 'minus-circle' : 'check-circle'}
          size={13}
          color="#0f766e"
        />
        <AppText style={styles.buttonText}>{allSelected ? '取消全选' : '全选'}</AppText>
      </Pressable>

      <Pressable style={[styles.button, styles.primaryButton]} onPress={onComplete}>
        <FontAwesome name="check" size={13} color="#ffffff" />
        <AppText style={[styles.buttonText, styles.primaryText]}>完成学习</AppText>
      </Pressable>

      <Pressable style={[styles.button, styles.dangerButton]} onPress={onRemove}>
        <FontAwesome name="trash-o" size={13} color="#e11d48" />
        <AppText style={[styles.buttonText, styles.dangerText]}>移除</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.94)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  button: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.86)',
  },
  buttonText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  primaryButton: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 2,
  },
  primaryText: {
    color: '#ffffff',
  },
  dangerButton: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(254,205,211,0.96)',
  },
  dangerText: {
    color: '#e11d48',
  },
});
