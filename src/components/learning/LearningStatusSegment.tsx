import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AppText } from '@/components/common/AppText';
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
    <View style={styles.wrap}>
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
  wrap: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    padding: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.88)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.035,
    shadowRadius: 20,
    elevation: 2,
  },
  button: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  buttonActive: {
    backgroundColor: '#ecfeff',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.75)',
  },
  label: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '900',
  },
  labelActive: {
    color: '#0f766e',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(148,163,184,0.18)',
  },
  badgeActive: {
    backgroundColor: 'rgba(20,184,166,0.10)',
  },
  badgeText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '900',
  },
  badgeTextActive: {
    color: '#0f766e',
  },
});
