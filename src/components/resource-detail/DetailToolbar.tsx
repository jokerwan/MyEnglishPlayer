import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';

import { DetailControlButton } from './DetailControlButton';

type DetailToolbarProps = {
  currentTime: string;
  totalTime: string;
  progress: number;
  speedLabel: string;
  isPlaying: boolean;
  onSpeedPress: () => void;
  onShadowPress: () => void;
  onIntensivePress: () => void;
  onPrevPress: () => void;
  onPlayPress: () => void;
  onNextPress: () => void;
};

export function DetailToolbar({
  currentTime,
  totalTime,
  progress,
  speedLabel,
  isPlaying,
  onSpeedPress,
  onShadowPress,
  onIntensivePress,
  onPrevPress,
  onPlayPress,
  onNextPress,
}: DetailToolbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.toolbar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.progressRow}>
        <AppText style={styles.time}>{currentTime}</AppText>
        <ProgressBar progress={progress} style={styles.progressBar} trackColor="#dcefed" />
        <AppText style={styles.time}>{totalTime}</AppText>
      </View>

      <View style={styles.controls}>
        <DetailControlButton label="调速" value={speedLabel} onPress={onSpeedPress} />
        <DetailControlButton label="跟读" icon="microphone" onPress={onShadowPress} />
        <DetailControlButton label="精听" icon="repeat" onPress={onIntensivePress} />
        <DetailControlButton label="上一句" icon="step-backward" onPress={onPrevPress} />
        <DetailControlButton
          label={isPlaying ? '暂停' : '播放'}
          icon={isPlaying ? 'pause' : 'play'}
          primary
          onPress={onPlayPress}
        />
        <DetailControlButton label="下一句" icon="step-forward" onPress={onNextPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    paddingTop: 9,
    paddingHorizontal: 12,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  time: {
    width: 40,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 11,
    fontWeight: '900',
  },
  progressBar: {
    flex: 1,
    height: 6,
  },
  controls: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 10,
  },
});
