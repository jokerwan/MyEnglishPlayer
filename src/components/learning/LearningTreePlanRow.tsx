import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { studyPlanCoverGradients } from '@/constants/learning';
import { colors } from '@/constants/colors';
import { useLongPress } from '@/hooks/useLongPress';
import type { StudyPlan, StudyPlanResource } from '@/types/studyPlan';
import { getPlanProgress, getPlanStatusMeta } from '@/utils/learningManager';

import { LearningTreeResourceRow } from './LearningTreeResourceRow';

type LearningTreePlanRowProps = {
  plan: StudyPlan;
  expanded: boolean;
  selectMode: boolean;
  selected: boolean;
  partial: boolean;
  resources: StudyPlanResource[];
  isResourceSelected: (resourceId: string) => boolean;
  onToggleExpanded: () => void;
  onLongPress: () => void;
  onSelect: () => void;
  onComplete: () => void;
  onRestart: () => void;
  onRemove: () => void;
  onResourceLongPress: (resourceId: string) => void;
  onResourcePress: (resourceId: string) => void;
  onResourceSelect: (resourceId: string) => void;
  onResourceComplete: (resourceId: string) => void;
  onResourceRestart: (resourceId: string) => void;
  onResourceRemove: (resourceId: string) => void;
};

export function LearningTreePlanRow({
  plan,
  expanded,
  selectMode,
  selected,
  partial,
  resources,
  isResourceSelected,
  onToggleExpanded,
  onLongPress,
  onSelect,
  onComplete,
  onRestart,
  onRemove,
  onResourceLongPress,
  onResourcePress,
  onResourceSelect,
  onResourceComplete,
  onResourceRestart,
  onResourceRemove,
}: LearningTreePlanRowProps) {
  const isDone = plan.status === 'done';
  const progress = getPlanProgress(plan);
  const gradient = studyPlanCoverGradients[plan.coverVariant];
  const longPress = useLongPress(() => {
    onLongPress();
    onSelect();
  });

  const handleCardPress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    if (selectMode) {
      onSelect();
      return;
    }
    onToggleExpanded();
  };

  return (
    <View style={styles.plan}>
      <Pressable
        style={[
          styles.card,
          selected && styles.cardSelected,
          selectMode && styles.cardSelectMode,
        ]}
        onPress={handleCardPress}
        onPressIn={longPress.onPressIn}
        onPressOut={longPress.onPressOut}
        onTouchMove={longPress.onTouchMove}
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? '收起' : '展开'}${plan.title}`}
      >
        {selectMode ? (
          <View style={[styles.check, selected && styles.checkSelected, partial && styles.checkPartial]}>
            {selected ? <View style={styles.checkDot} /> : null}
            {partial ? <View style={styles.checkPartialBar} /> : null}
          </View>
        ) : null}

        <Pressable
          style={styles.expander}
          onPress={(event) => {
            event.stopPropagation();
            onToggleExpanded();
          }}
          accessibilityLabel={expanded ? '收起合集' : '展开合集'}
        >
          <FontAwesome
            name={expanded ? 'chevron-down' : 'chevron-right'}
            size={11}
            color="#64748b"
          />
        </Pressable>

        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cover}>
          <AppText style={styles.coverText}>{plan.cover}</AppText>
        </LinearGradient>

        <View style={styles.info}>
          <AppText style={styles.title} numberOfLines={1}>
            {plan.title}
          </AppText>
          <AppText style={styles.meta} numberOfLines={1}>
            {getPlanStatusMeta(plan)}
          </AppText>
          <View style={styles.progressRow}>
            <ProgressBar progress={progress} style={styles.progressBar} trackColor="#dcefed" />
            <AppText style={styles.progressText}>{progress}%</AppText>
          </View>
        </View>

        {!selectMode ? (
          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, isDone && styles.reviewButton]}
              onPress={(event) => {
                event.stopPropagation();
                if (isDone) {
                  onRestart();
                } else {
                  onComplete();
                }
              }}
              accessibilityLabel={isDone ? '重新学习合集' : '完成合集'}
            >
              <FontAwesome name={isDone ? 'refresh' : 'check'} size={14} color={isDone ? '#64748b' : '#0f766e'} />
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.removeButton]}
              onPress={(event) => {
                event.stopPropagation();
                onRemove();
              }}
              accessibilityLabel="移除合集"
            >
              <FontAwesome name="trash-o" size={14} color="#e11d48" />
            </Pressable>
          </View>
        ) : null}
      </Pressable>

      {expanded ? (
        <View style={styles.children}>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <LearningTreeResourceRow
                key={resource.id}
                resource={resource}
                coverVariant={plan.coverVariant}
                selectMode={selectMode}
                selected={isResourceSelected(resource.id)}
                isLast={index === resources.length - 1}
                onLongPress={() => {
                  onResourceLongPress(resource.id);
                  onResourceSelect(resource.id);
                }}
                onPress={() => onResourcePress(resource.id)}
                onSelect={() => onResourceSelect(resource.id)}
                onComplete={() => onResourceComplete(resource.id)}
                onRestart={() => onResourceRestart(resource.id)}
                onRemove={() => onResourceRemove(resource.id)}
              />
            ))
          ) : (
            <View style={styles.emptyChild}>
              <AppText style={styles.emptyChildText}>这个合集暂时没有资源</AppText>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  plan: {
    borderRadius: 26,
  },
  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    minHeight: 82,
    padding: 12,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.94)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.045,
    shadowRadius: 24,
    elevation: 2,
  },
  cardSelectMode: {
    paddingLeft: 46,
  },
  cardSelected: {
    borderColor: 'rgba(20,184,166,0.42)',
    shadowColor: '#14b8a6',
    shadowOpacity: 0.09,
  },
  check: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -13,
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
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 5,
  },
  checkSelected: {
    borderColor: 'rgba(20,184,166,0.56)',
  },
  checkPartial: {
    borderColor: 'rgba(20,184,166,0.42)',
  },
  checkDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  checkPartialBar: {
    width: 11,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  expander: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 20,
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
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
    letterSpacing: -0.25,
  },
  meta: {
    marginTop: 5,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
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
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(236,254,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.86)',
  },
  reviewButton: {
    backgroundColor: '#f8fafc',
    borderColor: 'rgba(226,232,240,0.98)',
  },
  removeButton: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(254,205,211,0.96)',
  },
  children: {
    position: 'relative',
    marginTop: 6,
    marginBottom: 2,
    marginLeft: 42,
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#dbe7ec',
  },
  emptyChild: {
    marginTop: 8,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(203,213,225,0.8)',
    backgroundColor: 'rgba(255,255,255,0.66)',
  },
  emptyChildText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
});
