import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { studyPlanCoverGradients } from '@/constants/learning';
import { colors } from '@/constants/colors';
import type { StudyPlan } from '@/types/studyPlan';

type LearningPlanCardProps = {
  plan: StudyPlan;
  selectMode: boolean;
  selected: boolean;
  onPress: () => void;
  onCompletePress: () => void;
  onSelectPress: () => void;
};

export function LearningPlanCard({
  plan,
  selectMode,
  selected,
  onPress,
  onCompletePress,
  onSelectPress,
}: LearningPlanCardProps) {
  const gradient = studyPlanCoverGradients[plan.coverVariant];
  const isDone = plan.status === 'done';

  return (
    <View style={styles.row}>
      {selectMode ? (
        <Pressable
          style={[styles.selectDot, selected && styles.selectDotActive]}
          onPress={onSelectPress}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: selected }}
          accessibilityLabel={`选择${plan.title}`}
        />
      ) : null}

      <Pressable
        style={({ pressed }) => [
          styles.card,
          selectMode && styles.cardSelectMode,
          selected && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
        onPress={selectMode ? onSelectPress : onPress}
        accessibilityRole="button"
        accessibilityLabel={selectMode ? `选择${plan.title}` : `查看${plan.title}资源列表`}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cover, isDone && styles.coverDone]}
        >
          <AppText style={styles.coverText}>{plan.cover}</AppText>
        </LinearGradient>

        <View style={styles.info}>
          <AppText style={styles.title} numberOfLines={1}>
            {plan.title}
          </AppText>
          <AppText style={styles.meta} numberOfLines={2}>
            {plan.meta}
          </AppText>
          <View style={styles.progressRow}>
            <ProgressBar progress={plan.progress} style={styles.progressBar} />
            <AppText style={styles.progressText}>{plan.progress}%</AppText>
          </View>
        </View>

        {!selectMode && !isDone ? (
          <Pressable
            style={({ pressed }) => [styles.completeButton, pressed && styles.completeButtonPressed]}
            onPress={(event) => {
              event.stopPropagation();
              onCompletePress();
            }}
            accessibilityRole="button"
            accessibilityLabel={`标记${plan.title}为完成`}
          >
            <FontAwesome name="check" size={14} color="#0f766e" />
          </Pressable>
        ) : (
          <View style={styles.actionSpacer} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectDot: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: colors.white,
  },
  selectDotActive: {
    borderColor: '#0f766e',
    backgroundColor: '#0f766e',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 114,
    paddingVertical: 18,
    paddingLeft: 18,
    paddingRight: 14,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  cardSelectMode: {
    paddingLeft: 14,
  },
  cardSelected: {
    borderColor: 'rgba(20,184,166,0.45)',
    backgroundColor: '#f0fdfa',
  },
  cardPressed: {
    transform: [{ translateY: -1 }],
  },
  cover: {
    width: 66,
    height: 66,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverDone: {
    opacity: 0.72,
  },
  coverText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  meta: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
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
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
  completeButton: {
    width: 58,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(236,254,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.76)',
  },
  completeButtonPressed: {
    transform: [{ scale: 1.03 }],
  },
  actionSpacer: {
    width: 58,
  },
});
