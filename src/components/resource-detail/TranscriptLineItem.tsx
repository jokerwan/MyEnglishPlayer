import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import type { TranscriptLine } from '@/types/resourceDetail';

type TranscriptLineItemProps = {
  line: TranscriptLine;
  active: boolean;
  onPress: () => void;
};

export function TranscriptLineItem({ line, active, onPress }: TranscriptLineItemProps) {
  return (
    <Pressable
      style={[styles.line, active && styles.lineActive]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <View style={styles.top}>
        <AppText style={[styles.time, active && styles.timeActive]}>{line.time}</AppText>
      </View>
      <AppText style={[styles.en, active && styles.enActive]}>{line.en}</AppText>
      <AppText style={styles.zh}>{line.zh}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  line: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  lineActive: {
    backgroundColor: 'rgba(240,253,250,0.68)',
    borderColor: 'rgba(153,246,228,0.72)',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '900',
  },
  timeActive: {
    color: '#0f766e',
  },
  en: {
    marginTop: 8,
    color: '#0f172a',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
  },
  enActive: {
    color: '#0f766e',
  },
  zh: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
  },
});
