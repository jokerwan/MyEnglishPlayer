import { useCallback, useMemo, useState } from 'react';

import {
  MOCK_MEDIA_FILE_NAME,
  MOCK_MEDIA_TITLE,
  MOCK_SUBTITLE_FILE_NAME,
} from '@/constants/upload';
import { useAppData } from '@/hooks/useAppData';
import type { UploadCategory, UploadDifficulty, UploadFolderOption } from '@/types/upload';

const difficultyToLevel: Record<UploadDifficulty, '初级' | '中级' | '高级'> = {
  入门: '初级',
  适中: '中级',
  挑战: '高级',
};

export function useUploadForm() {
  const appData = useAppData();
  const [mediaSelected, setMediaSelected] = useState(false);
  const [subtitleSelected, setSubtitleSelected] = useState(false);
  const [resourceName, setResourceName] = useState('');
  const [difficulty, setDifficulty] = useState<UploadDifficulty>('入门');
  const [category, setCategory] = useState<UploadCategory>('儿童启蒙');
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [mediaErrorVisible, setMediaErrorVisible] = useState(false);
  const [nameErrorVisible, setNameErrorVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [successFolderName, setSuccessFolderName] = useState<string>();
  const [uploadedResourceId, setUploadedResourceId] = useState<string | null>(null);

  const folders: UploadFolderOption[] = useMemo(
    () =>
      appData.folders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        description: folder.id === 'default' ? '不选择时自动保存到这里' : folder.name,
        isDefault: folder.id === 'default',
      })),
    [appData.folders],
  );

  const [selectedFolderId, setSelectedFolderId] = useState('default');

  const selectedFolder = useMemo(
    () => folders.find((folder) => folder.id === selectedFolderId) ?? folders[0],
    [folders, selectedFolderId],
  );

  const canUpload = mediaSelected && resourceName.trim().length > 0;

  const resetSuccessState = useCallback(() => {
    setUploadSuccess(false);
    setSuccessFolderName(undefined);
    setUploadedResourceId(null);
  }, []);

  const selectMediaFile = useCallback(() => {
    setMediaSelected(true);
    setMediaErrorVisible(false);
    setNameErrorVisible(false);
    setResourceName((current) => current || MOCK_MEDIA_TITLE);
    resetSuccessState();
  }, [resetSuccessState]);

  const selectSubtitleFile = useCallback(() => {
    setSubtitleSelected(true);
    resetSuccessState();
  }, [resetSuccessState]);

  const selectFolder = useCallback(
    (folderId: string) => {
      setSelectedFolderId(folderId);
      resetSuccessState();
    },
    [resetSuccessState],
  );

  const toggleNewFolderForm = useCallback(() => {
    setShowNewFolderForm((current) => !current);
  }, []);

  const addNewFolder = useCallback(() => {
    const result = appData.addFolder(newFolderName);
    if (result.ok && result.folderName) {
      const created = appData.folders.find((folder) => folder.name === result.folderName);
      if (created) {
        setSelectedFolderId(created.id);
      }
    }
    setNewFolderName('');
    setShowNewFolderForm(false);
    resetSuccessState();
    return result.folderName ?? (newFolderName.trim() || '新建文件夹');
  }, [appData, newFolderName, resetSuccessState]);

  const handleResourceNameChange = useCallback(
    (value: string) => {
      setResourceName(value);
      setNameErrorVisible(false);
      resetSuccessState();
    },
    [resetSuccessState],
  );

  const finishUpload = useCallback(() => {
    if (!mediaSelected) {
      setMediaErrorVisible(true);
      return { ok: false as const, message: '请选择音视频文件' };
    }

    if (!resourceName.trim()) {
      setNameErrorVisible(true);
      return { ok: false as const, message: '请输入资源名称' };
    }

    const folder = appData.folders.find((item) => item.id === selectedFolderId) ?? appData.folders[0];
    const resource = appData.uploadResource({
      title: resourceName.trim(),
      folderId: folder.id,
      folderName: folder.name,
      type: /\.mp3|\.wav|\.m4a/i.test(resourceName) ? 'audio' : 'video',
      level: difficultyToLevel[difficulty],
      hasSubtitle: subtitleSelected,
      tag: category,
    });

    setUploadSuccess(true);
    setSuccessFolderName(folder.name);
    setUploadedResourceId(resource.id);
    return { ok: true as const, message: '上传完成', folderName: folder.name, resourceId: resource.id };
  }, [
    appData,
    category,
    difficulty,
    mediaSelected,
    resourceName,
    selectedFolderId,
    subtitleSelected,
  ]);

  const openAddToStudyPicker = useCallback(() => {
    if (!uploadedResourceId) {
      return;
    }
    const resource = appData.resources.find((item) => item.id === uploadedResourceId);
    if (!resource) {
      return;
    }
    appData.openCollectionPicker({
      mode: 'add',
      resourceIds: [uploadedResourceId],
      folderNames: [resource.folder],
    });
  }, [appData, uploadedResourceId]);

  return {
    mediaSelected,
    mediaFileName: mediaSelected ? MOCK_MEDIA_FILE_NAME : undefined,
    subtitleSelected,
    subtitleFileName: subtitleSelected ? MOCK_SUBTITLE_FILE_NAME : undefined,
    resourceName,
    difficulty,
    category,
    folders,
    selectedFolderId,
    selectedFolder,
    showNewFolderForm,
    newFolderName,
    mediaErrorVisible,
    nameErrorVisible,
    uploadSuccess,
    successFolderName,
    uploadedResourceId,
    canUpload,
    setDifficulty,
    setCategory,
    setNewFolderName,
    selectMediaFile,
    selectSubtitleFile,
    selectFolder,
    toggleNewFolderForm,
    addNewFolder,
    handleResourceNameChange,
    finishUpload,
    resetSuccessState,
    openAddToStudyPicker,
    pickerRequest: appData.pickerRequest,
    closeCollectionPicker: appData.closeCollectionPicker,
  };
}
