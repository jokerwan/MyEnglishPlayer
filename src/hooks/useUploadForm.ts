import { useCallback, useMemo, useState } from 'react';

import {
  MOCK_MEDIA_FILE_NAME,
  MOCK_MEDIA_TITLE,
  MOCK_SUBTITLE_FILE_NAME,
} from '@/constants/upload';
import { mockUploadFolders } from '@/data/mockUploadFolders';
import type { UploadCategory, UploadDifficulty, UploadFolderOption } from '@/types/upload';

export function useUploadForm() {
  const [mediaSelected, setMediaSelected] = useState(false);
  const [subtitleSelected, setSubtitleSelected] = useState(false);
  const [resourceName, setResourceName] = useState('');
  const [difficulty, setDifficulty] = useState<UploadDifficulty>('入门');
  const [category, setCategory] = useState<UploadCategory>('儿童启蒙');
  const [folders, setFolders] = useState<UploadFolderOption[]>(mockUploadFolders);
  const [selectedFolderId, setSelectedFolderId] = useState(mockUploadFolders[0].id);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [mediaErrorVisible, setMediaErrorVisible] = useState(false);
  const [nameErrorVisible, setNameErrorVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [successFolderName, setSuccessFolderName] = useState<string>();

  const selectedFolder = useMemo(
    () => folders.find((folder) => folder.id === selectedFolderId) ?? folders[0],
    [folders, selectedFolderId],
  );

  const canUpload = mediaSelected && resourceName.trim().length > 0;

  const resetSuccessState = useCallback(() => {
    setUploadSuccess(false);
    setSuccessFolderName(undefined);
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
    const folderName = newFolderName.trim() || '新建文件夹';
    const newFolder: UploadFolderOption = {
      id: `folder-${Date.now()}`,
      name: folderName,
      description: '0 个资源',
      resourceCount: 0,
    };

    setFolders((current) => [...current, newFolder]);
    setSelectedFolderId(newFolder.id);
    setNewFolderName('');
    setShowNewFolderForm(false);
    resetSuccessState();

    return folderName;
  }, [newFolderName, resetSuccessState]);

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

    setUploadSuccess(true);
    setSuccessFolderName(selectedFolder.name);
    return { ok: true as const, message: '上传完成', folderName: selectedFolder.name };
  }, [mediaSelected, resourceName, selectedFolder.name]);

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
  };
}
