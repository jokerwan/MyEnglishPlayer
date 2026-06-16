import { StyleSheet, View } from 'react-native';

import type { TranscriptLine } from '@/types/resourceDetail';

import { TranscriptLineItem } from './TranscriptLineItem';

type TranscriptListProps = {
  lines: TranscriptLine[];
  activeIndex: number;
  onSelectLine: (index: number) => void;
};

export function TranscriptList({ lines, activeIndex, onSelectLine }: TranscriptListProps) {
  return (
    <View style={styles.list}>
      {lines.map((line, index) => (
        <TranscriptLineItem
          key={`${line.time}-${index}`}
          line={line}
          active={index === activeIndex}
          onPress={() => onSelectLine(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 12,
    gap: 4,
  },
});
