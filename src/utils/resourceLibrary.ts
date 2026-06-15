import type {
  FolderStudyStatus,
  ResourceFolderStudyAction,
  ResourceFolderViewModel,
  ResourceLibraryFolder,
  ResourceLibraryItem,
  ResourceTypeFilter,
} from '@/types/resource';

export function getFolderResources(resources: ResourceLibraryItem[], folderName: string) {
  return resources.filter((item) => item.folder === folderName);
}

export function buildFolderViewModel(
  folder: ResourceLibraryFolder,
  resources: ResourceLibraryItem[],
): ResourceFolderViewModel {
  const folderResources = getFolderResources(resources, folder.name);
  const count = folderResources.length;
  const noneCount = folderResources.filter((item) => item.studyStatus === 'none').length;
  const learningCount = folderResources.filter((item) => item.studyStatus === 'learning').length;
  const doneCount = folderResources.filter((item) => item.studyStatus === 'done').length;
  const joinedCount = learningCount + doneCount;

  let studyStatus: FolderStudyStatus = 'none';
  let statusLabel = '未加入';
  let metaText = `${count} 个资源`;
  let progressPercent = 0;

  if (count > 0 && doneCount === count) {
    studyStatus = 'done';
    statusLabel = '已完成';
    metaText = `${count} 个资源 · 已完成`;
    progressPercent = 100;
  } else if (count > 0 && noneCount === 0) {
    studyStatus = 'all-added';
    statusLabel = '已加入';
    metaText = `${count} 个资源 · 已加入学习`;
    progressPercent = Math.round((doneCount / count) * 100);
  } else if (joinedCount > 0) {
    studyStatus = 'partial';
    statusLabel = '部分加入';
    metaText = `${count} 个资源 · 已加入 ${joinedCount}/${count}`;
    progressPercent = Math.round((doneCount / count) * 100);
  }

  return {
    ...folder,
    resourceCount: count,
    doneCount,
    learningCount,
    noneCount,
    studyStatus,
    statusLabel,
    metaText,
    progressPercent,
  };
}

export function buildFolderStudyAction(
  folder: ResourceFolderViewModel,
): ResourceFolderStudyAction {
  const { resourceCount, doneCount, studyStatus } = folder;

  if (resourceCount === 0) {
    return {
      label: '暂无资源',
      disabled: true,
      tone: 'default',
      subtitle: '该文件夹暂无资源，上传后可生成学习合集',
      progressPercent: 0,
      progressText: '0/0',
    };
  }

  if (studyStatus === 'done') {
    return {
      label: '已完成',
      disabled: false,
      tone: 'done',
      subtitle: '同名学习合集已完成',
      progressPercent: 100,
      progressText: `${doneCount}/${resourceCount}`,
    };
  }

  if (studyStatus === 'all-added' || studyStatus === 'partial') {
    return {
      label: '继续学习',
      disabled: false,
      tone: 'learning',
      subtitle: `已生成同名学习合集 · ${doneCount}/${resourceCount} 已完成`,
      progressPercent: Math.round((doneCount / resourceCount) * 100),
      progressText: `${doneCount}/${resourceCount}`,
    };
  }

  return {
    label: '加入学习',
    disabled: false,
    tone: 'default',
    subtitle: '加入学习后，会生成同名学习合集',
    progressPercent: 0,
    progressText: `${doneCount}/${resourceCount}`,
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
