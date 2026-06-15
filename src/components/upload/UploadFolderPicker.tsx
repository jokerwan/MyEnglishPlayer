import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import type { UploadFolderOption } from '@/types/upload';

type UploadFolderPickerProps = {
  folders: UploadFolderOption[];
  selectedFolderId: string;
  showNewFolderForm: boolean;
  newFolderName: string;
  summary: string;
  onSelectFolder: (folderId: string) => void;
  onToggleNewFolderForm: () => void;
  onNewFolderNameChange: (value: string) => void;
  onAddNewFolder: () => void;
};

export function UploadFolderPicker({
  folders,
  selectedFolderId,
  showNewFolderForm,
  newFolderName,
  summary,
  onSelectFolder,
  onToggleNewFolderForm,
  onNewFolderNameChange,
  onAddNewFolder,
}: UploadFolderPickerProps) {
  return (
    <View>
      <View style={styles.list}>
        {folders.map((folder) => {
          const active = folder.id === selectedFolderId;
          return (
            <Pressable
              key={folder.id}
              style={[styles.choice, active && styles.choiceActive]}
              onPress={() => onSelectFolder(folder.id)}
            >
              <View style={styles.main}>
                <View style={styles.iconWrap}>
                  <FontAwesome
                    name={folder.isDefault ? 'folder-open-o' : 'folder-o'}
                    size={16}
                    color={colors.playBtn}
                  />
                </View>
                <View style={styles.copy}>
                  <AppText style={[styles.name, active && styles.nameActive]} numberOfLines={1}>
                    {folder.name}
                  </AppText>
                  <AppText style={styles.description} numberOfLines={1}>
                    {folder.description}
                  </AppText>
                </View>
              </View>
              <View style={[styles.check, active && styles.checkActive]}>
                {active ? <FontAwesome name="check" size={12} color={colors.white} /> : null}
              </View>
            </Pressable>
          );
        })}

        <Pressable style={styles.addButton} onPress={onToggleNewFolderForm}>
          <View style={styles.main}>
            <View style={styles.iconWrap}>
              <FontAwesome name="plus" size={16} color={colors.playBtn} />
            </View>
            <View style={styles.copy}>
              <AppText style={[styles.name, styles.addName]}>新建文件夹</AppText>
              <AppText style={styles.description}>创建后可直接上传到该文件夹</AppText>
            </View>
          </View>
          <FontAwesome name="angle-right" size={16} color="#cbd5e1" />
        </Pressable>

        {showNewFolderForm ? (
          <View style={styles.newFolderForm}>
            <TextInput
              value={newFolderName}
              onChangeText={onNewFolderNameChange}
              placeholder="输入文件夹名称"
              placeholderTextColor="#94a3b8"
              style={styles.newFolderInput}
            />
            <Pressable style={styles.confirmButton} onPress={onAddNewFolder}>
              <AppText style={styles.confirmText}>确定</AppText>
            </Pressable>
          </View>
        ) : null}
      </View>

      <AppText style={styles.summary}>{summary}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 9,
  },
  choice: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#e5edf4',
  },
  choiceActive: {
    backgroundColor: colors.metricBlueBg,
    borderColor: 'rgba(20,184,166,0.34)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,184,166,0.10)',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: colors.textSlate,
    fontSize: 13,
    fontWeight: '900',
  },
  nameActive: {
    color: colors.playBtn,
  },
  addName: {
    color: colors.playBtn,
  },
  description: {
    marginTop: 3,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  checkActive: {
    backgroundColor: colors.primary,
  },
  addButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#e5edf4',
  },
  newFolderForm: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#e5edf4',
  },
  newFolderInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e5edf4',
    color: colors.textMain,
    fontSize: 13,
  },
  confirmButton: {
    height: 40,
    paddingHorizontal: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  confirmText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  summary: {
    marginTop: 8,
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
});
