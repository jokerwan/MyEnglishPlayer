import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { TreeChildrenRail, TreeGroupCard, TreeGroupHeader } from '@/components/tree/TreeGroupCard';
import { useLongPress } from '@/hooks/useLongPress';
import type { StudyPlan, StudyPlanResource } from '@/types/studyPlan';
import { getPlanProgress } from '@/utils/learningManager';

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
  const meta = `${resources.length} 个资源 · 进度 ${progress}%`;
  const longPress = useLongPress(() => {
    onLongPress();
    onSelect();
  });

  const handleHeaderPress = () => {
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
    <TreeGroupCard selected={selected && selectMode}>
      <TreeGroupHeader
        title={plan.title}
        meta={meta}
        selectMode={selectMode}
        selected={selected}
        partial={partial}
        primaryAction={
          selectMode
            ? undefined
            : {
                label: isDone ? '重学' : '完成',
                onPress: isDone ? onRestart : onComplete,
              }
        }
        showMoreAction={!selectMode}
        onMorePress={onRemove}
        onPress={handleHeaderPress}
        onLongPress={() => {
          onLongPress();
          onSelect();
        }}
      />

      {expanded ? (
        <TreeChildrenRail>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <LearningTreeResourceRow
                key={resource.id}
                resource={resource}
                selectMode={selectMode}
                selected={isResourceSelected(resource.id)}
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
        </TreeChildrenRail>
      ) : null}
    </TreeGroupCard>
  );
}

const styles = StyleSheet.create({
  emptyChild: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(203,213,225,0.8)',
    backgroundColor: 'rgba(248,250,252,0.8)',
  },
  emptyChildText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
});
