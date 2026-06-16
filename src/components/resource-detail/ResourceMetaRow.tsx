import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';

type ResourceMetaRowProps = {
  modeTitle: string;
  folder: string;
  duration: string;
  level: string;
  hasSubtitle: boolean;
};

export function ResourceMetaRow({
  modeTitle,
  folder,
  duration,
  level,
  hasSubtitle,
}: ResourceMetaRowProps) {
  return (
    <View style={styles.wrap}>
      <AppText style={styles.modeTitle}>{modeTitle}</AppText>
      <View style={styles.metaRow}>
        <AppText style={styles.metaText}>来自：{folder}</AppText>
        <View style={styles.chip}>
          <FontAwesome name="clock-o" size={11} color="#64748b" />
          <AppText style={styles.chipText}>{duration}</AppText>
        </View>
        <View style={styles.chip}>
          <FontAwesome name="signal" size={11} color="#64748b" />
          <AppText style={styles.chipText}>{level}</AppText>
        </View>
        <View style={styles.chip}>
          <FontAwesome name="file-text-o" size={11} color="#64748b" />
          <AppText style={styles.chipText}>{hasSubtitle ? '有字幕' : '无字幕'}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 16,
  },
  modeTitle: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  metaText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minHeight: 26,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  chipText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
  },
});
