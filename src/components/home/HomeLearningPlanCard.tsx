import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import type { StudyPlan, StudyPlanCoverVariant } from '@/types/studyPlan';

type HomeLearningPlanCardProps = {
  plan: StudyPlan;
  onPress: () => void;
  onPlayPress: () => void;
};

const coverGradients: Record<StudyPlanCoverVariant, [string, string]> = {
  indigo: ['#14b8a6', '#22c55e'],
  green: ['#059669', '#10b981'],
  orange: ['#14b8a6', '#f59e0b'],
};

export function HomeLearningPlanCard({ plan, onPress, onPlayPress }: HomeLearningPlanCardProps) {
  const gradient = coverGradients[plan.coverVariant];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`查看${plan.title}资源列表`}
    >
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cover}>
        <AppText style={styles.coverText}>{plan.cover}</AppText>
      </LinearGradient>

      <View style={styles.info}>
        <AppText style={styles.title}>{plan.title}</AppText>
        <AppText style={styles.meta} numberOfLines={1}>
          {plan.meta}
        </AppText>
        <View style={styles.progressRow}>
          <ProgressBar progress={plan.progress} style={styles.progressBar} />
          <AppText style={styles.progressText}>{plan.progress}%</AppText>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
        onPress={(event) => {
          event.stopPropagation();
          onPlayPress();
        }}
        accessibilityRole="button"
        accessibilityLabel={`一键播放${plan.title}`}
      >
        <FontAwesome name="play" size={14} color={colors.playBtn} style={styles.playIcon} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 24,
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  cardPressed: {
    backgroundColor: colors.white,
    transform: [{ translateY: -2 }],
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
  },
  meta: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 11,
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.playBtnBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  playButtonPressed: {
    transform: [{ scale: 1.04 }],
  },
  playIcon: {
    marginLeft: 2,
  },
});
