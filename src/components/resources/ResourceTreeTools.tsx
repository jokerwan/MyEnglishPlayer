import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ResourceTreeToolsProps = {
  showNewFolderForm: boolean;
  newFolderName: string;
  onToggleNewFolderForm: () => void;
  onNewFolderNameChange: (value: string) => void;
  onAddFolder: () => void;
};

export function ResourceTreeTools({
  showNewFolderForm,
  newFolderName,
  onToggleNewFolderForm,
  onNewFolderNameChange,
  onAddFolder,
}: ResourceTreeToolsProps) {
  return (
    <View style={styles.wrap}>
      <Pressable style={styles.addButton} onPress={onToggleNewFolderForm}>
        <FontAwesome name="plus" size={12} color={colors.playBtn} />
        <AppText style={styles.addButtonText}>新建</AppText>
      </Pressable>

      {showNewFolderForm ? (
        <View style={styles.form}>
          <TextInput
            value={newFolderName}
            onChangeText={onNewFolderNameChange}
            placeholder="文件夹名称"
            placeholderTextColor="#94a3b8"
            maxLength={16}
            style={styles.input}
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
  wrap: {
    marginTop: 14,
    gap: 10,
  },
  addButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  addButtonText: {
    color: colors.playBtn,
    fontSize: 12,
    fontWeight: '900',
  },
  form: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#e5edf4',
  },
  input: {
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
