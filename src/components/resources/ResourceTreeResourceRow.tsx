import { TreeItemRow } from '@/components/tree/TreeItemRow';
import type { ResourceLibraryItem } from '@/types/resource';
import {
  getResourceStudyActionLabel,
  stripResourceFileExtension,
} from '@/utils/resourceTree';

type ResourceTreeResourceRowProps = {
  resource: ResourceLibraryItem;
  selectMode: boolean;
  selected: boolean;
  onLongPress: () => void;
  onPress: () => void;
  onSelect: () => void;
  onToggleStudy: () => void;
  collectionCount: number;
  highlighted?: boolean;
};

function formatResourceItemMeta(resource: ResourceLibraryItem, collectionCount: number) {
  const typeLabel = resource.type === 'video' ? '视频' : '音频';
  const joinedLabel =
    collectionCount > 1
      ? `已加入 ${collectionCount} 个合集`
      : collectionCount === 1
        ? '已加入学习'
        : '未加入学习';
  return `${typeLabel} · ${resource.duration} · ${joinedLabel}`;
}

export function ResourceTreeResourceRow({
  resource,
  selectMode,
  selected,
  onLongPress,
  onPress,
  onSelect,
  onToggleStudy,
  collectionCount,
  highlighted = false,
}: ResourceTreeResourceRowProps) {
  const title = stripResourceFileExtension(resource.title);
  const studyLabel = getResourceStudyActionLabel(collectionCount);

  return (
    <TreeItemRow
      title={title}
      meta={formatResourceItemMeta(resource, collectionCount)}
      selectMode={selectMode}
      selected={selected}
      highlighted={highlighted}
      onPress={onPress}
      onLongPress={onLongPress}
      onSelect={onSelect}
      onPlayPress={onPress}
      moreActions={[
        {
          label: studyLabel,
          onPress: onToggleStudy,
        },
      ]}
    />
  );
}
