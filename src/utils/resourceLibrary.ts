import type {
  FolderStudyStatus,
  ResourceFolderStudyAction,
  ResourceFolderViewModel,
  ResourceLibraryFolder,
  ResourceLibraryItem,
  ResourceTypeFilter,
} from '@/types/resource';
import type { CollectionMembership } from '@/types/library';

import { buildFolderViewModelWithMemberships } from './libraryView';

export function getFolderResources(resources: ResourceLibraryItem[], folderName: string) {
  return resources.filter((item) => item.folder === folderName);
}

export function buildFolderViewModel(
  folder: ResourceLibraryFolder,
  resources: ResourceLibraryItem[],
  memberships: CollectionMembership[] = [],
): ResourceFolderViewModel {
  return buildFolderViewModelWithMemberships(folder, resources, memberships);
}

export function buildFolderStudyAction(
  folder: ResourceFolderViewModel,
): ResourceFolderStudyAction {
  const { resourceCount, studyStatus } = folder;

  if (resourceCount === 0) {
    return {
      label: '暂无资源',
      disabled: true,
      tone: 'default',
      subtitle: '该文件夹暂无资源，上传后可加入学习',
      progressPercent: 0,
      progressText: '0/0',
    };
  }

  if (studyStatus === 'all-added' || studyStatus === 'partial') {
    return {
      label: '继续学习',
      disabled: false,
      tone: 'learning',
      subtitle: `已加入学习 · ${folder.learningCount}/${resourceCount}`,
      progressPercent: folder.progressPercent,
      progressText: `${folder.learningCount}/${resourceCount}`,
    };
  }

  return {
    label: '加入学习',
    disabled: false,
    tone: 'default',
    subtitle: '加入学习后可选择学习合集',
    progressPercent: 0,
    progressText: `0/${resourceCount}`,
  };
}

export function filterResources(
  resources: ResourceLibraryItem[],
  folderName: string,
  typeFilter: ResourceTypeFilter,
  keyword: string,
) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return resources.filter((item) => {
    const matchesFolder = item.folder === folderName;
    const matchesType =
      typeFilter === 'all' ||
      item.type === typeFilter ||
      (typeFilter === 'subtitle' && item.hasSubtitle);
    const matchesKeyword =
      !normalizedKeyword ||
      item.searchTitle.toLowerCase().includes(normalizedKeyword) ||
      item.title.toLowerCase().includes(normalizedKeyword) ||
      item.folder.toLowerCase().includes(normalizedKeyword);

    return matchesFolder && matchesType && matchesKeyword;
  });
}

export function getBulkStudyLabel(noneCount: number, totalCount: number) {
  if (noneCount === totalCount) {
    return '全部加入学习';
  }
  return '补充加入学习';
}
