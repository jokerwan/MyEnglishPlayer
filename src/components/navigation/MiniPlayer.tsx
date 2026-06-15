import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import { usePlayer } from '@/hooks/useAppContext';
import { formatDuration } from '@/utils/formatDuration';

type MiniPlayerProps = {
  onOpenDetail?: () => void;
};

export function MiniPlayer({ onOpenDetail }: MiniPlayerProps) {
  const { player, togglePlay } = usePlayer();
  const progress = player.durationSeconds
    ? (player.currentTimeSeconds / player.durationSeconds) * 100
    : 0;

  return (
    <Pressable style={styles.container} onPress={onOpenDetail}>
      <View style={styles.main}>
        <View style={styles.cover}>
          <AppText style={styles.coverText}>{player.cover}</AppText>
        </View>
        <View style={styles.meta}>
          <AppText style={styles.title} numberOfLines={1}>
            {player.title}
          </AppText>
          <AppText style={styles.subtitle} numberOfLines={1}>
            {player.subtitle}
          </AppText>
        </View>
        <View style={styles.controls}>
          <Pressable style={styles.controlButton} onPress={(event) => event.stopPropagation()}>
            <FontAwesome name="step-backward" size={14} color={colors.textMuted} />
          </Pressable>
          <Pressable
            style={[styles.playButton, player.isPlaying && styles.playButtonActive]}
            onPress={(event) => {
              event.stopPropagation();
              togglePlay();
            }}
          >
            <FontAwesome name={player.isPlaying ? 'pause' : 'play'} size={14} color={colors.white} />
          </Pressable>
          <Pressable style={styles.controlButton} onPress={(event) => event.stopPropagation()}>
            <FontAwesome name="step-forward" size={14} color={colors.textMuted} />
          </Pressable>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <AppText style={styles.time}>{formatDuration(player.currentTimeSeconds)}</AppText>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <AppText style={styles.time}>{formatDuration(player.durationSeconds)}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.playerBg,
    borderTopWidth: 1,
    borderTopColor: colors.lineSoft,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.metricBlueBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    color: colors.textMuted,
    fontSize: 11,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  playButtonActive: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 4,
  },
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
  },
  time: {
    width: 34,
    color: colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
  },
});
