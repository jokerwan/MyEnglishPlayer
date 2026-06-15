import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import type { StudyPlanStatus } from '@/types/studyPlan';

type LearningStatusSegmentProps = {
  value: StudyPlanStatus;
  learningCount: number;
  doneCount: number;
  onChange: (value: StudyPlanStatus) => void;
};

export function LearningStatusSegment({
  value,
  learningCount,
  doneCount,
  onChange,
}: LearningStatusSegmentProps) {
  return (
    <View style={styles.segment}>
      <Pressable
        style={[styles.button, value === 'learning' && styles.buttonActive]}
        onPress={() => onChange('learning')}
        accessibilityRole="button"
        accessibilityState={{ selected: value === 'learning' }}
      >
        <AppText style={[styles.label, value === 'learning' && styles.labelActive]}>正在学</AppText>
        <View style={[styles.badge, value === 'learning' && styles.badgeActive]}>
          <AppText style={[styles.badgeText, value === 'learning' && styles.badgeTextActive]}>
            {learningCount}
          </AppText>
        </View>
      </Pressable>

      <Pressable
        style={[styles.button, value === 'done' && styles.buttonActive]}
        onPress={() => onChange('done')}
        accessibilityRole="button"
        accessibilityState={{ selected: value === 'done' }}
      >
        <AppText style={[styles.label, value === 'done' && styles.labelActive]}>已完成</AppText>
        <View style={[styles.badge, value === 'done' && styles.badgeActive]}>
          <AppText style={[styles.badgeText, value === 'done' && styles.badgeTextActive]}>
            {doneCount}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.045,
    shadowRadius: 28,
    elevation: 2,
  },
  button: {
    flex: 1,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 22,
  },
  buttonActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 26,
    elevation: 3,
  },
  label: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.15,
  },
  labelActive: {
    color: colors.white,
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(148,163,184,0.18)',
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  badgeText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '900',
  },
  badgeTextActive: {
    color: colors.white,
  },
});
