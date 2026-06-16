import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { TreeChildrenRail, TreeGroupCard, TreeGroupHeader } from '@/components/tree/TreeGroupCard';
import { useLongPress } from '@/hooks/useLongPress';
import type { ResourceFolderViewModel, ResourceLibraryItem } from '@/types/resource';
import { getFolderStudyActionLabel } from '@/utils/resourceTree';

import { ResourceTreeResourceRow } from './ResourceTreeResourceRow';

type ResourceTreeFolderRowProps = {
  folder: ResourceFolderViewModel;
  resources: ResourceLibraryItem[];
  expanded: boolean;
  searchQuery: string;
  selectMode: boolean;
  selected: boolean;
  partial: boolean;
  isResourceSelected: (resourceId: string) => boolean;
  onToggleExpanded: () => void;
  onLongPress: () => void;
  onSelect: () => void;
  onToggleStudy: () => void;
  onResourceLongPress: (resourceId: string) => void;
  onResourcePress: (resourceId: string) => void;
  onResourceSelect: (resourceId: string) => void;
  onResourceToggleStudy: (resourceId: string) => void;
  getResourceCollectionCount: (resourceId: string) => number;
  highlightedResourceId?: string | null;
};

export function ResourceTreeFolderRow({
  folder,
  resources,
  expanded,
  searchQuery,
  selectMode,
  selected,
  partial,
  isResourceSelected,
  onToggleExpanded,
  onLongPress,
  onSelect,
  onToggleStudy,
  onResourceLongPress,
  onResourcePress,
  onResourceSelect,
  onResourceToggleStudy,
  getResourceCollectionCount,
  highlightedResourceId,
}: ResourceTreeFolderRowProps) {
  const joinedCount = folder.learningCount;
  const studyLabel = getFolderStudyActionLabel(joinedCount, folder.resourceCount);
  const studyVariant = joinedCount > 0 ? 'cancel' : 'join';
  const meta = searchQuery.trim()
    ? `${resources.length} / ${folder.resourceCount} 个资源`
    : `${folder.resourceCount} 个资源 · 已加入 ${joinedCount} 个`;
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
        title={folder.name}
        meta={meta}
        selectMode={selectMode}
        selected={selected}
        partial={partial}
        primaryAction={
          selectMode || !studyLabel
            ? undefined
            : {
                label: studyLabel === '加入学习' ? '加入' : '取消',
                tone: studyVariant === 'cancel' ? 'danger' : 'primary',
                onPress: onToggleStudy,
              }
        }
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
              <ResourceTreeResourceRow
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
                onToggleStudy={() => onResourceToggleStudy(resource.id)}
                collectionCount={getResourceCollectionCount(resource.id)}
                highlighted={highlightedResourceId === resource.id}
              />
            ))
          ) : (
            <View style={styles.emptyChild}>
              <AppText style={styles.emptyChildText}>这个文件夹暂时没有匹配资源</AppText>
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
