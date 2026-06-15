import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';

type ProgressBarProps = {
  progress: number;
  style?: StyleProp<ViewStyle>;
  trackColor?: string;
  fillColor?: string;
};

export function ProgressBar({
  progress,
  style,
  trackColor = colors.progressTrack,
  fillColor = colors.progressFill,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.track, { backgroundColor: trackColor }, style]}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: layout.chipRadius,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: layout.chipRadius,
  },
});
