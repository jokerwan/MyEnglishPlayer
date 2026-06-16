import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { DEFAULT_COLLECTION_ID, DEFAULT_COLLECTION_TITLE } from '@/constants/library';
import { colors } from '@/constants/colors';
import { useAppData } from '@/hooks/useAppData';
import type { CollectionPickerRequest } from '@/types/library';
import {
  getCollectionsForRemovePicker,
  getFolderNamesWithoutCollection,
} from '@/utils/libraryView';

type CollectionPickerSheetProps = {
  request: CollectionPickerRequest | null;
  onClose: () => void;
  onCompleted: (message: string) => void;
};

export function CollectionPickerSheet({ request, onClose, onCompleted }: CollectionPickerSheetProps) {
  const appData = useAppData();
  const [selectedCollectionId, setSelectedCollectionId] = useState(DEFAULT_COLLECTION_ID);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const mode = request?.mode ?? 'add';
  const resourceIds = request?.resourceIds ?? [];
  const folderNames = request?.folderNames ?? [];

  const quickCreateOptions = useMemo(() => {
    if (mode !== 'add') {
      return [];
    }
    return getFolderNamesWithoutCollection(folderNames, appData.collections).map((folderName) => {
      const count = resourceIds.filter((resourceId) => {
        const resource = appData.resources.find((item) => item.id === resourceId);
        return resource?.folder === folderName;
      }).length;
      return { folderName, count: count || resourceIds.length };
    });
  }, [appData.collections, appData.resources, folderNames, mode, resourceIds]);

  const visibleCollections = useMemo(() => {
    if (mode === 'remove') {
      return getCollectionsForRemovePicker(appData.collections, appData.memberships, resourceIds);
    }
    return appData.collections;
  }, [appData.collections, appData.memberships, mode, resourceIds]);

  const resetState = () => {
    setSelectedCollectionId(DEFAULT_COLLECTION_ID);
    setShowNewForm(false);
    setNewCollectionName('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleQuickCreate = (folderName: string) => {
    const idsForFolder = resourceIds.filter((resourceId) => {
      const resource = appData.resources.find((item) => item.id === resourceId);
      return !folderName || resource?.folder === folderName;
    });
    const result = appData.quickCreateFolderCollections(folderName, idsForFolder);
    onCompleted(result.message);
    handleClose();
  };

  const handleConfirm = () => {
    if (mode === 'remove') {
      if (selectedCollectionId === 'remove-all') {
        const result = appData.removeResourcesFromAllCollections(resourceIds);
        onCompleted(result.message);
        handleClose();
        return;
      }
      const result = appData.removeResourcesFromCollection(selectedCollectionId, resourceIds);
      onCompleted(result.message);
      handleClose();
      return;
    }

    if (showNewForm) {
      const title = newCollectionName.trim();
      if (!title) {
        onCompleted('请输入合集名称');
        return;
      }
      const result = appData.createCollectionAndAddResources(title, resourceIds);
      onCompleted(result.message);
      handleClose();
      return;
    }

    const collectionId = selectedCollectionId || DEFAULT_COLLECTION_ID;
    const result = appData.addResourcesToCollection(collectionId, resourceIds);
    onCompleted(result.message);
    handleClose();
  };

  if (!request) {
    return null;
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <AppText style={styles.title}>
            {mode === 'add' ? '选择学习合集' : '从哪个合集移除'}
          </AppText>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {mode === 'add'
              ? quickCreateOptions.map((option) => (
                  <Pressable
                    key={option.folderName}
                    style={styles.quickOption}
                    onPress={() => handleQuickCreate(option.folderName)}
                  >
                    <FontAwesome name="star" size={13} color="#0f766e" />
                    <View style={styles.quickTextWrap}>
                      <AppText style={styles.quickTitle}>
                        新建「{option.folderName}」合集并加入
                      </AppText>
                      <AppText style={styles.quickMeta}>{option.count} 个资源</AppText>
                    </View>
                  </Pressable>
                ))
              : null}

            {mode === 'add' ? (
              <Pressable
                style={[
                  styles.option,
                  selectedCollectionId === DEFAULT_COLLECTION_ID && !showNewForm && styles.optionSelected,
                ]}
                onPress={() => {
                  setShowNewForm(false);
                  setSelectedCollectionId(DEFAULT_COLLECTION_ID);
                }}
              >
                <AppText style={styles.optionTitle}>{DEFAULT_COLLECTION_TITLE}</AppText>
                <AppText style={styles.optionMeta}>不选择其他合集时默认加入这里</AppText>
              </Pressable>
            ) : (
              <Pressable
                style={[
                  styles.option,
                  selectedCollectionId === 'remove-all' && styles.optionSelected,
                ]}
                onPress={() => setSelectedCollectionId('remove-all')}
              >
                <AppText style={styles.optionTitle}>从全部合集移除</AppText>
                <AppText style={styles.optionMeta}>解除该资源与所有学习合集的关联</AppText>
              </Pressable>
            )}

            {visibleCollections.map((collection) => {
              const joinedCount = resourceIds.filter((resourceId) =>
                appData.memberships.some(
                  (item) =>
                    item.collectionId === collection.id && item.resourceId === resourceId,
                ),
              ).length;
              const selected = selectedCollectionId === collection.id;
              return (
                <Pressable
                  key={collection.id}
                  style={[styles.option, selected && !showNewForm && styles.optionSelected]}
                  onPress={() => {
                    setShowNewForm(false);
                    setSelectedCollectionId(collection.id);
                  }}
                >
                  <View style={styles.optionHeader}>
                    <AppText style={styles.optionTitle}>{collection.title}</AppText>
                    {joinedCount > 0 ? (
                      <AppText style={styles.joinedBadge}>
                        {mode === 'add' ? `已加入 ${joinedCount}` : '包含选中资源'}
                      </AppText>
                    ) : null}
                  </View>
                  <AppText style={styles.optionMeta}>
                    {collection.isDefault ? '系统默认合集' : `${collection.source} 来源`}
                  </AppText>
                </Pressable>
              );
            })}

            {mode === 'add' ? (
              showNewForm ? (
                <View style={styles.newForm}>
                  <TextInput
                    value={newCollectionName}
                    onChangeText={setNewCollectionName}
                    placeholder="输入新合集名称"
                    placeholderTextColor="#94a3b8"
                    style={styles.input}
                    maxLength={20}
                  />
                </View>
              ) : (
                <Pressable style={styles.newButton} onPress={() => setShowNewForm(true)}>
                  <FontAwesome name="plus" size={12} color={colors.playBtn} />
                  <AppText style={styles.newButtonText}>新建其他合集</AppText>
                </Pressable>
              )
            ) : null}
          </ScrollView>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <AppText style={styles.cancelText}>取消</AppText>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <AppText style={styles.confirmText}>
                {mode === 'add' ? '确定加入' : '确定移除'}
              </AppText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.42)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '78%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  scroll: {
    maxHeight: 420,
  },
  quickOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: 'rgba(20,184,166,0.28)',
  },
  quickTextWrap: {
    flex: 1,
  },
  quickTitle: {
    color: '#0f766e',
    fontSize: 14,
    fontWeight: '900',
  },
  quickMeta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
  option: {
    padding: 14,
    marginBottom: 8,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.94)',
  },
  optionSelected: {
    backgroundColor: 'rgba(236,254,255,0.82)',
    borderColor: 'rgba(20,184,166,0.42)',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  optionMeta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
  joinedBadge: {
    color: '#0f766e',
    fontSize: 10,
    fontWeight: '900',
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 42,
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  newButtonText: {
    color: colors.playBtn,
    fontSize: 12,
    fontWeight: '900',
  },
  newForm: {
    marginTop: 4,
  },
  input: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5edf4',
    color: colors.textMain,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cancelText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '900',
  },
  confirmButton: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
});
