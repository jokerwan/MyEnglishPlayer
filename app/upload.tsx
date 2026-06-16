import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StackNavBar } from '@/components/common/StackNavBar';
import { AppText } from '@/components/common/AppText';
import { CollectionPickerSheet } from '@/components/study/CollectionPickerSheet';
import { UploadBottomAction } from '@/components/upload/UploadBottomAction';
import { UploadChoiceGroup } from '@/components/upload/UploadChoiceGroup';
import { UploadFileCard } from '@/components/upload/UploadFileCard';
import { UploadFolderPicker } from '@/components/upload/UploadFolderPicker';
import { UploadPanel } from '@/components/upload/UploadPanel';
import { UploadSubtitleCard } from '@/components/upload/UploadSubtitleCard';
import { UPLOAD_CATEGORIES, UPLOAD_DIFFICULTIES } from '@/constants/upload';
import { colors } from '@/constants/colors';
import { useToast } from '@/hooks/useAppContext';
import { useUploadForm } from '@/hooks/useUploadForm';

export default function UploadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const form = useUploadForm();

  const handleSelectMedia = () => {
    form.selectMediaFile();
    showToast('已选择音视频文件');
  };

  const handleSelectSubtitle = () => {
    form.selectSubtitleFile();
    showToast('已选择字幕文件');
  };

  const handleAddNewFolder = () => {
    const folderName = form.addNewFolder();
    showToast(`已新建文件夹：${folderName}`);
  };

  const handleFinishUpload = () => {
    const result = form.finishUpload();
    showToast(result.message);
  };

  const handleViewResources = () => {
    router.push('/resources');
  };

  const handleAddToStudy = () => {
    form.openAddToStudyPicker();
  };

  const handleSkipStudy = () => {
    form.resetSuccessState();
    showToast('已保存到资源库，可稍后加入学习');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StackNavBar title="上传资源" onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <UploadPanel title="音视频文件" badge="必填">
          <UploadFileCard
            selected={form.mediaSelected}
            hasError={form.mediaErrorVisible}
            title={form.mediaSelected ? `已选择：${form.mediaFileName}` : '选择音频 / 视频文件'}
            subtitle={
              form.mediaSelected ? '点击可重新选择音视频文件' : '支持 MP3、WAV、MP4、MOV 等格式'
            }
            onPress={handleSelectMedia}
          />
          {form.mediaErrorVisible ? (
            <AppText style={styles.errorText}>请选择音频 / 视频文件</AppText>
          ) : null}
        </UploadPanel>

        <UploadPanel title="资源名称" badge="必填">
          <TextInput
            value={form.resourceName}
            onChangeText={form.handleResourceNameChange}
            placeholder="请输入资源名称"
            placeholderTextColor="#94a3b8"
            maxLength={40}
            style={[styles.input, form.nameErrorVisible && styles.inputError]}
          />
          {form.nameErrorVisible ? (
            <AppText style={styles.errorText}>请输入资源名称</AppText>
          ) : null}
        </UploadPanel>

        <UploadPanel title="字幕文件" badge="可选" badgeType="optional">
          <UploadSubtitleCard
            selected={form.subtitleSelected}
            title={
              form.subtitleSelected ? `已选择：${form.subtitleFileName}` : '上传对应字幕文件'
            }
            subtitle={
              form.subtitleSelected ? '点击可重新选择字幕文件' : '支持 SRT、VTT、LRC、TXT'
            }
            onPress={handleSelectSubtitle}
          />
        </UploadPanel>

        <UploadPanel title="资源信息">
          <UploadChoiceGroup
            label="难度"
            options={UPLOAD_DIFFICULTIES}
            value={form.difficulty}
            equalWidth
            isFirst
            onChange={(value) => {
              form.setDifficulty(value);
              form.resetSuccessState();
            }}
          />
          <UploadChoiceGroup
            label="类别"
            options={UPLOAD_CATEGORIES}
            value={form.category}
            onChange={(value) => {
              form.setCategory(value);
              form.resetSuccessState();
            }}
          />
        </UploadPanel>

        <UploadPanel title="保存到" badge={form.selectedFolder.name} badgeType="folder">
          <UploadFolderPicker
            folders={form.folders}
            selectedFolderId={form.selectedFolderId}
            showNewFolderForm={form.showNewFolderForm}
            newFolderName={form.newFolderName}
            summary={`将保存到：我的资源 / ${form.selectedFolder.name}`}
            onSelectFolder={form.selectFolder}
            onToggleNewFolderForm={form.toggleNewFolderForm}
            onNewFolderNameChange={form.setNewFolderName}
            onAddNewFolder={handleAddNewFolder}
          />
        </UploadPanel>

        <View style={styles.safeBottom} />
      </ScrollView>

      <UploadBottomAction
        canUpload={form.canUpload}
        uploadSuccess={form.uploadSuccess}
        successFolderName={form.successFolderName}
        onFinishUpload={handleFinishUpload}
        onAddToStudy={handleAddToStudy}
        onSkipStudy={handleSkipStudy}
        onViewResources={handleViewResources}
      />

      <CollectionPickerSheet
        request={form.pickerRequest}
        onClose={form.closeCollectionPicker}
        onCompleted={(message) => {
          showToast(message);
          form.resetSuccessState();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  input: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e5edf4',
    color: colors.textMain,
    fontSize: 14,
  },
  inputError: {
    borderColor: 'rgba(239,68,68,0.55)',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  errorText: {
    marginTop: 7,
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '800',
  },
  safeBottom: {
    height: 124,
  },
});
