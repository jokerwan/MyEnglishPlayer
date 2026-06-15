import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResourceEmptyState } from '@/components/resources/ResourceEmptyState';
import { ResourceFolderSection } from '@/components/resources/ResourceFolderSection';
import { ResourceFolderStudyCard } from '@/components/resources/ResourceFolderStudyCard';
import { ResourceListHeader } from '@/components/resources/ResourceListHeader';
import { ResourceListItem } from '@/components/resources/ResourceListItem';
import { ResourceNavBar } from '@/components/resources/ResourceNavBar';
import { ResourceSearchBar } from '@/components/resources/ResourceSearchBar';
import { ResourceTypeFilterRow } from '@/components/resources/ResourceTypeFilterRow';
import { colors } from '@/constants/colors';
import { useToast } from '@/hooks/useAppContext';
import { useResourcesLibrary } from '@/hooks/useResourcesLibrary';

export default function ResourcesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const library = useResourcesLibrary();

  const handleAddFolder = () => {
    const result = library.addFolder();
    showToast(result.message);
  };

  const handleFolderStudy = () => {
    const result = library.startSelectedFolderStudy();
    showToast(result.message);
  };

  const handleBulkStudy = () => {
    handleFolderStudy();
  };

  const handleResourcePress = (resourceId: string) => {
    const resource = library.visibleResources.find((item) => item.id === resourceId);
    if (!resource) {
      return;
    }
    showToast(`查看资源详情：${resource.title.replace(/\.(mp4|mp3)$/i, '')}`);
  };

  const handleAddResourceToStudy = (resourceId: string) => {
    const result = library.addResourceToStudy(resourceId);
    showToast(result.message);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#f8fffd', '#f8fafc', '#f6faf9']}
        locations={[0, 0.46, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ResourceNavBar
        onBack={() => router.back()}
        onUpload={() => router.push('/upload')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ResourceSearchBar value={library.searchQuery} onChangeText={library.setSearchQuery} />

        <ResourceFolderSection
          folders={library.folders}
          selectedFolderName={library.selectedFolderName}
          summary={`${library.selectedFolder.name} · ${library.selectedFolder.resourceCount} 个资源`}
          showNewFolderForm={library.showNewFolderForm}
          newFolderName={library.newFolderName}
          onSelectFolder={library.selectFolder}
          onToggleNewFolderForm={library.toggleNewFolderForm}
          onNewFolderNameChange={library.setNewFolderName}
          onAddFolder={handleAddFolder}
        />

        <ResourceFolderStudyCard
          folderName={library.selectedFolder.name}
          action={library.folderStudyAction}
          onPress={handleFolderStudy}
        />

        <View style={styles.filterWrap}>
          <ResourceTypeFilterRow value={library.typeFilter} onChange={library.setTypeFilter} />
        </View>

        <ResourceListHeader
          visibleCount={library.visibleResources.length}
          showBulkStudyButton={library.showBulkStudyButton}
          bulkStudyLabel={library.bulkStudyLabel}
          onBulkStudyPress={handleBulkStudy}
          onSortPress={() => showToast('按最近上传排序')}
        />

        {library.visibleResources.length > 0 ? (
          <View style={styles.list}>
            {library.visibleResources.map((item, index) => (
              <ResourceListItem
                key={item.id}
                item={item}
                index={index + 1}
                onPress={() => handleResourcePress(item.id)}
                onAddToStudy={() => handleAddResourceToStudy(item.id)}
              />
            ))}
          </View>
        ) : (
          <ResourceEmptyState onUpload={() => router.push('/upload')} />
        )}

        <View style={styles.safeBottom} />
      </ScrollView>
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
  filterWrap: {
    marginTop: 16,
  },
  list: {
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.038,
    shadowRadius: 14,
    elevation: 2,
  },
  safeBottom: {
    height: 24,
  },
});
