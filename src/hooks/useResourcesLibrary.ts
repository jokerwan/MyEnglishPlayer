import { useCallback, useMemo, useState } from 'react';

import {
  DEFAULT_RESOURCE_FOLDER_NAME,
  mockResourceFolders,
  mockResourceItems,
} from '@/data/mockResources';
import type {
  ResourceLibraryFolder,
  ResourceLibraryItem,
  ResourceTypeFilter,
} from '@/types/resource';
import {
  buildFolderStudyAction,
  buildFolderViewModel,
  filterResources,
  getBulkStudyLabel,
  getFolderResources,
} from '@/utils/resourceLibrary';

export function useResourcesLibrary() {
  const [resources, setResources] = useState<ResourceLibraryItem[]>(mockResourceItems);
  const [folders, setFolders] = useState<ResourceLibraryFolder[]>(mockResourceFolders);
  const [selectedFolderName, setSelectedFolderName] = useState(DEFAULT_RESOURCE_FOLDER_NAME);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ResourceTypeFilter>('all');
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const folderViewModels = useMemo(
    () => folders.map((folder) => buildFolderViewModel(folder, resources)),
    [folders, resources],
  );

  const selectedFolder = useMemo(
    () =>
      folderViewModels.find((folder) => folder.name === selectedFolderName) ??
      folderViewModels[0],
    [folderViewModels, selectedFolderName],
  );

  const visibleResources = useMemo(
    () => filterResources(resources, selectedFolderName, typeFilter, searchQuery),
    [resources, selectedFolderName, typeFilter, searchQuery],
  );

  const folderStudyAction = useMemo(
    () => buildFolderStudyAction(selectedFolder),
    [selectedFolder],
  );

  const bulkStudyLabel = useMemo(
    () => getBulkStudyLabel(selectedFolder.noneCount, selectedFolder.resourceCount),
    [selectedFolder.noneCount, selectedFolder.resourceCount],
  );

  const showBulkStudyButton =
    selectedFolder.resourceCount > 0 && selectedFolder.noneCount > 0;

  const selectFolder = useCallback((folderName: string) => {
    setSelectedFolderName(folderName);
  }, []);

  const toggleNewFolderForm = useCallback(() => {
    setShowNewFolderForm((current) => !current);
  }, []);

  const addFolder = useCallback(() => {
    const folderName = newFolderName.trim() || '新建文件夹';
    const exists = folders.some((folder) => folder.name === folderName);
    if (exists) {
      return { ok: false as const, message: '文件夹已存在' };
    }

    const newFolder: ResourceLibraryFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      icon: 'folder-o',
      gradient: ['#14b8a6', '#99f6e4'],
      isUserCreated: true,
    };

    setFolders((current) => [...current, newFolder]);
    setSelectedFolderName(folderName);
    setNewFolderName('');
    setShowNewFolderForm(false);

    return { ok: true as const, message: `已新建文件夹：${folderName}`, folderName };
  }, [folders, newFolderName]);

  const addFolderResourcesToStudy = useCallback((folderName: string) => {
    const folderResources = getFolderResources(resources, folderName);
    const noneItems = folderResources.filter((item) => item.studyStatus === 'none');

    if (!folderResources.length) {
      return { ok: false as const, message: '该文件夹暂无资源' };
    }

    if (!noneItems.length) {
      return { ok: false as const, message: '该文件夹已加入学习合集' };
    }

    setResources((current) =>
      current.map((item) =>
        item.folder === folderName && item.studyStatus === 'none'
          ? { ...item, studyStatus: 'learning' }
          : item,
      ),
    );

    return { ok: true as const, message: `已生成同名学习合集：${folderName}` };
  }, [resources]);

  const addResourceToStudy = useCallback((resourceId: string) => {
    const resource = resources.find((item) => item.id === resourceId);
    if (!resource) {
      return { ok: false as const, message: '资源不存在' };
    }

    if (resource.studyStatus === 'done') {
      return { ok: false as const, message: '该资源已完成学习' };
    }

    if (resource.studyStatus === 'learning') {
      return {
        ok: true as const,
        message: `打开学习合集：${resource.folder}`,
        playTitle: resource.title.replace(/\.(mp4|mp3)$/i, ''),
      };
    }

    setResources((current) =>
      current.map((item) =>
        item.id === resourceId ? { ...item, studyStatus: 'learning' } : item,
      ),
    );

    return {
      ok: true as const,
      message: `已加入「${resource.folder}」学习合集：${resource.title}`,
    };
  }, [resources]);

  const startSelectedFolderStudy = useCallback(() => {
    return addFolderResourcesToStudy(selectedFolderName);
  }, [addFolderResourcesToStudy, selectedFolderName]);

  return {
    folders: folderViewModels,
    selectedFolder,
    selectedFolderName,
    searchQuery,
    typeFilter,
    visibleResources,
    folderStudyAction,
    bulkStudyLabel,
    showBulkStudyButton,
    showNewFolderForm,
    newFolderName,
    setSearchQuery,
    setTypeFilter,
    setNewFolderName,
    selectFolder,
    toggleNewFolderForm,
    addFolder,
    startSelectedFolderStudy,
    addResourceToStudy,
  };
}
