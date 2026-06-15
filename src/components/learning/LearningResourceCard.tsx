import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { studyPlanCoverGradients } from '@/constants/learning';
import { colors } from '@/constants/colors';
import type { StudyPlanCoverVariant, StudyPlanResource } from '@/types/studyPlan';
import { stripResourceExtension } from '@/utils/learningManager';

type LearningResourceCardProps = {
  resource: StudyPlanResource;
  index: number;
  coverVariant: StudyPlanCoverVariant;
  onPress: () => void;
  onPlayPress: () => void;
};

export function LearningResourceCard({
  resource,
  index,
  coverVariant,
  onPress,
  onPlayPress,
}: LearningResourceCardProps) {
  const gradient = studyPlanCoverGradients[coverVariant];
  const title = stripResourceExtension(resource.title);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`查看${title}`}
    >
      <AppText style={styles.index}>{index}</AppText>

      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cover}>
        <AppText style={styles.coverText}>{resource.cover}</AppText>
      </LinearGradient>

      <View style={styles.info}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.meta} numberOfLines={2}>
          {resource.meta}
        </AppText>
        <View style={styles.progressRow}>
          <ProgressBar progress={resource.progress} style={styles.progressBar} />
          <AppText style={styles.progressText}>{resource.progress}%</AppText>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
        onPress={(event) => {
          event.stopPropagation();
          onPlayPress();
        }}
        accessibilityRole="button"
        accessibilityLabel={`播放${title}`}
      >
        <FontAwesome name="play" size={13} color={colors.playBtn} style={styles.playIcon} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 88,
    padding: 14,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ translateY: -1 }],
    backgroundColor: colors.white,
  },
  index: {
    width: 22,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '900',
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },
  meta: {
    marginTop: 5,
    color: '#64748b',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 9,
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
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
  },
  playButtonPressed: {
    transform: [{ scale: 1.04 }],
  },
  playIcon: {
    marginLeft: 2,
  },
});
