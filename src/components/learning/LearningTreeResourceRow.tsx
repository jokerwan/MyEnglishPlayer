import { TreeItemRow } from '@/components/tree/TreeItemRow';
import type { StudyPlanResource } from '@/types/studyPlan';
import { stripResourceExtension } from '@/utils/learningManager';

type LearningTreeResourceRowProps = {
  resource: StudyPlanResource;
  selectMode: boolean;
  selected: boolean;
  onLongPress: () => void;
  onPress: () => void;
  onSelect: () => void;
  onComplete: () => void;
  onRestart: () => void;
  onRemove: () => void;
};

function formatLearningItemMeta(resource: StudyPlanResource) {
  const isDone = resource.done || resource.progress >= 100;
  const progress = isDone ? 100 : resource.progress;
  const parts = resource.meta.split('·').map((part) => part.trim());
  const tail = parts[0] ?? '继续学习';
  return `${progress}% · ${isDone ? '已完成' : `上次 ${tail}`}`;
}

export function LearningTreeResourceRow({
  resource,
  selectMode,
  selected,
  onLongPress,
  onPress,
  onSelect,
  onComplete,
  onRestart,
  onRemove,
}: LearningTreeResourceRowProps) {
  const isDone = resource.done || resource.progress >= 100;
  const title = stripResourceExtension(resource.title);

  return (
    <TreeItemRow
      title={title}
      meta={formatLearningItemMeta(resource)}
      selectMode={selectMode}
      selected={selected}
      onPress={onPress}
      onLongPress={onLongPress}
      onSelect={onSelect}
      onPlayPress={onPress}
      moreActions={[
        {
          label: isDone ? '重新学习' : '完成学习',
          onPress: isDone ? onRestart : onComplete,
        },
        {
          label: '移除',
          onPress: onRemove,
          destructive: true,
        },
      ]}
    />
  );
}
