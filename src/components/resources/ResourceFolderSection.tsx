import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ResourceFolderCard } from '@/components/resources/ResourceFolderCard';
import { colors } from '@/constants/colors';
import type { ResourceFolderViewModel } from '@/types/resource';

type ResourceFolderSectionProps = {
  folders: ResourceFolderViewModel[];
  selectedFolderName: string;
  summary: string;
  showNewFolderForm: boolean;
  newFolderName: string;
  onSelectFolder: (folderName: string) => void;
  onToggleNewFolderForm: () => void;
  onNewFolderNameChange: (value: string) => void;
  onAddFolder: () => void;
};

export function ResourceFolderSection({
  folders,
  selectedFolderName,
  summary,
  showNewFolderForm,
  newFolderName,
  onSelectFolder,
  onToggleNewFolderForm,
  onNewFolderNameChange,
  onAddFolder,
}: ResourceFolderSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.title}>文件夹</AppText>
          <AppText style={styles.summary}>{summary}</AppText>
        </View>
        <Pressable style={styles.addButton} onPress={onToggleNewFolderForm}>
          <FontAwesome name="plus" size={12} color={colors.playBtn} />
          <AppText style={styles.addButtonText}>新建文件夹</AppText>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shelf}
      >
        {folders.map((folder) => (
          <ResourceFolderCard
            key={folder.id}
            folder={folder}
            active={folder.name === selectedFolderName}
            onPress={() => onSelectFolder(folder.name)}
          />
        ))}
      </ScrollView>

      {showNewFolderForm ? (
        <View style={styles.newFolderForm}>
          <TextInput
            value={newFolderName}
            onChangeText={onNewFolderNameChange}
            placeholder="文件夹名称"
            placeholderTextColor="#94a3b8"
            maxLength={16}
            style={styles.newFolderInput}
          />
          <Pressable style={styles.confirmButton} onPress={onAddFolder}>
            <AppText style={styles.confirmText}>完成</AppText>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
  },
  summary: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  addButtonText: {
    color: colors.playBtn,
    fontSize: 12,
    fontWeight: '800',
  },
  shelf: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 12,
    marginTop: 12,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  newFolderForm: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
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
});
