import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { studyPlanCoverGradients } from '@/constants/learning';
import { colors } from '@/constants/colors';
import { useLongPress } from '@/hooks/useLongPress';
import type { StudyPlanCoverVariant, StudyPlanResource } from '@/types/studyPlan';
import { stripResourceExtension } from '@/utils/learningManager';

import { LearningTreeActionButton } from './LearningTreeActionButton';

type LearningTreeResourceRowProps = {
  resource: StudyPlanResource;
  coverVariant: StudyPlanCoverVariant;
  selectMode: boolean;
  selected: boolean;
  isLast: boolean;
  onLongPress: () => void;
  onPress: () => void;
  onSelect: () => void;
  onComplete: () => void;
  onRestart: () => void;
  onRemove: () => void;
};

export function LearningTreeResourceRow({
  resource,
  coverVariant,
  selectMode,
  selected,
  isLast,
  onLongPress,
  onPress,
  onSelect,
  onComplete,
  onRestart,
  onRemove,
}: LearningTreeResourceRowProps) {
  const isDone = resource.done || resource.progress >= 100;
  const progress = isDone ? 100 : resource.progress;
  const gradient = studyPlanCoverGradients[coverVariant];
  const title = stripResourceExtension(resource.title);
  const longPress = useLongPress(onLongPress);

  const handlePress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    if (selectMode) {
      onSelect();
      return;
    }
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.row,
        selected && styles.rowSelected,
        selectMode && styles.rowSelectMode,
        isLast && styles.rowLast,
      ]}
      onPress={handlePress}
      onPressIn={longPress.onPressIn}
      onPressOut={longPress.onPressOut}
      onTouchMove={longPress.onTouchMove}
      accessibilityRole="button"
      accessibilityLabel={selectMode ? `选择资源：${title}` : `资源：${title}`}
    >
      <View style={styles.branch} />

      {selectMode ? (
        <View style={[styles.check, selected && styles.checkSelected]}>
          {selected ? <View style={styles.checkDot} /> : null}
        </View>
      ) : null}

      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cover, isDone && styles.coverDone]}
      >
        <AppText style={styles.coverText}>{resource.cover}</AppText>
      </LinearGradient>

      <View style={styles.info}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.meta} numberOfLines={1}>
          {resource.meta}
        </AppText>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} style={styles.progressBar} trackColor="#dcefed" />
          <AppText style={styles.progressText}>{progress}%</AppText>
        </View>
      </View>

      {!selectMode ? (
        <View style={styles.actions}>
          <LearningTreeActionButton
            label={isDone ? '重新学习' : '完成学习'}
            icon={isDone ? 'refresh' : 'check'}
            variant={isDone ? 'review' : 'primary'}
            onPress={isDone ? onRestart : onComplete}
          />
          <LearningTreeActionButton
            label="移除"
            icon="trash-o"
            variant="danger"
            onPress={onRemove}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 66,
    marginTop: 8,
    paddingVertical: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rowSelectMode: {
    paddingLeft: 8,
  },
  rowSelected: {
    backgroundColor: 'rgba(236,254,255,0.72)',
    borderColor: 'rgba(20,184,166,0.42)',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.09,
    shadowRadius: 30,
    elevation: 2,
  },
  rowLast: {
    marginBottom: 2,
  },
  branch: {
    position: 'absolute',
    left: -16,
    top: 31,
    width: 16,
    height: 1,
    backgroundColor: '#dbe7ec',
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(203,213,225,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  checkSelected: {
    borderColor: 'rgba(20,184,166,0.56)',
  },
  checkDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverDone: {
    opacity: 0.78,
  },
  coverText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  meta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 9,
  },
  progressBar: {
    flex: 1,
    height: 5,
  },
  progressText: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
});
