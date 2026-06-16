import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import type { KeywordChip } from '@/types/resourceDetail';

type ResourceNotesPaneProps = {
  note: string;
  onChangeNote: (value: string) => void;
};

export function ResourceNotesPane({ note, onChangeNote }: ResourceNotesPaneProps) {
  return (
    <View style={styles.wrap}>
      <AppText style={styles.label}>当前资源笔记</AppText>
      <TextInput
        value={note}
        onChangeText={onChangeNote}
        placeholder="记录听不懂的句子、表达或跟读感受"
        placeholderTextColor="#94a3b8"
        multiline
        style={styles.input}
      />
      <AppText style={styles.tip}>笔记会跟随当前资源保存，适合记录复听重点。</AppText>
    </View>
  );
}

type ResourceWordsPaneProps = {
  words: KeywordChip[];
};

export function ResourceWordsPane({ words }: ResourceWordsPaneProps) {
  return (
    <View style={styles.wordsWrap}>
      {words.map((word) => (
        <View key={word.en} style={styles.chip}>
          <AppText style={styles.chipEn}>{word.en}</AppText>
          <AppText style={styles.chipZh}>{word.zh}</AppText>
        </View>
      ))}
    </View>
  );
}

type ResourceStatsPaneProps = {
  listenCount: number;
  shadowCount: number;
  savedPhraseCount: number;
  primaryLabel: string;
  primaryIcon: 'plus' | 'check' | 'refresh';
  onPrimaryPress: () => void;
};

export function ResourceStatsPane({
  listenCount,
  shadowCount,
  savedPhraseCount,
  primaryLabel,
  primaryIcon,
  onPrimaryPress,
}: ResourceStatsPaneProps) {
  return (
    <View style={styles.statsWrap}>
      <View style={styles.grid}>
        <View style={styles.card}>
          <AppText style={styles.cardValue}>{listenCount}</AppText>
          <AppText style={styles.cardLabel}>复听次数</AppText>
        </View>
        <View style={styles.card}>
          <AppText style={styles.cardValue}>{shadowCount}</AppText>
          <AppText style={styles.cardLabel}>跟读句</AppText>
        </View>
        <View style={[styles.card, styles.cardLast]}>
          <AppText style={styles.cardValue}>{savedPhraseCount}</AppText>
          <AppText style={styles.cardLabel}>收藏词句</AppText>
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={onPrimaryPress}>
        <FontAwesome name={primaryIcon} size={14} color="#0f766e" />
        <AppText style={styles.primaryText}>{primaryLabel}</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  label: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    minHeight: 120,
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    color: '#0f172a',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    textAlignVertical: 'top',
  },
  tip: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  wordsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  chipEn: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  chipZh: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
  statsWrap: {
    gap: 16,
  },
  grid: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(226,232,240,0.92)',
  },
  cardLast: {
    borderRightWidth: 0,
  },
  cardValue: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '900',
  },
  cardLabel: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
  },
  primaryButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: '#ecfeff',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.86)',
  },
  primaryText: {
    color: '#0f766e',
    fontSize: 14,
    fontWeight: '900',
  },
});
