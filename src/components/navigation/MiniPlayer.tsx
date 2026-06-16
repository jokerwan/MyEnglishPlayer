import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRef } from 'react';
import { Pressable, StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import { usePlayer } from '@/hooks/useAppContext';
import { formatDuration } from '@/utils/formatDuration';

type MiniPlayerProps = {
  onOpenDetail?: () => void;
};

const SWIPE_UP_THRESHOLD = 36;
const SWIPE_HORIZONTAL_TOLERANCE = 70;

export function MiniPlayer({ onOpenDetail }: MiniPlayerProps) {
  const { player, togglePlay } = usePlayer();
  const startRef = useRef({ x: 0, y: 0 });
  const ignoreClickRef = useRef(false);
  const progress = player.durationSeconds
    ? (player.currentTimeSeconds / player.durationSeconds) * 100
    : 0;

  const handleOpenDetail = () => {
    onOpenDetail?.();
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    startRef.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    const dy = startRef.current.y - event.nativeEvent.pageY;
    const dx = Math.abs(event.nativeEvent.pageX - startRef.current.x);
    if (dy > SWIPE_UP_THRESHOLD && dx < SWIPE_HORIZONTAL_TOLERANCE) {
      ignoreClickRef.current = true;
      handleOpenDetail();
      setTimeout(() => {
        ignoreClickRef.current = false;
      }, 260);
    }
  };

  const handlePress = () => {
    if (ignoreClickRef.current) {
      return;
    }
    handleOpenDetail();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel="打开当前播放资源详情，上拉也可进入详情"
    >
      <View style={styles.affordance} />
      <AppText style={styles.hint}>点击 / 上拉详情 · 下拉隐藏</AppText>

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
    position: 'relative',
    backgroundColor: colors.playerBg,
    borderTopWidth: 1,
    borderTopColor: colors.lineSoft,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  affordance: {
    width: 38,
    height: 4,
    alignSelf: 'center',
    marginBottom: 9,
    borderRadius: 999,
    backgroundColor: '#dbe7e6',
  },
  hint: {
    position: 'absolute',
    right: 16,
    top: 10,
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    opacity: 0.82,
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
    paddingRight: 92,
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
