import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResourceEmptyState } from '@/components/resources/ResourceEmptyState';
import { ResourceNavBar } from '@/components/resources/ResourceNavBar';
import { ResourceSearchBar } from '@/components/resources/ResourceSearchBar';
import { ResourceTreeBatchBar } from '@/components/resources/ResourceTreeBatchBar';
import { ResourceTreeFolderRow } from '@/components/resources/ResourceTreeFolderRow';
import { ResourceTreeTools } from '@/components/resources/ResourceTreeTools';
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

  const handleBulkAdd = () => {
    const result = library.bulkAddToStudy();
    showToast(result.message);
  };

  const handleBulkRemove = () => {
    const result = library.bulkRemoveFromStudy();
    showToast(result.message);
  };

  const hasVisibleEntries = library.visibleTreeEntries.length > 0;

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

        <ResourceTreeTools
          showNewFolderForm={library.showNewFolderForm}
          newFolderName={library.newFolderName}
          onToggleNewFolderForm={library.toggleNewFolderForm}
          onNewFolderNameChange={library.setNewFolderName}
          onAddFolder={handleAddFolder}
        />

        {library.selectMode ? (
          <ResourceTreeBatchBar
            allSelected={library.allVisibleSelected}
            onSelectAll={library.selectAllVisible}
            onAddToStudy={handleBulkAdd}
            onRemoveFromStudy={handleBulkRemove}
          />
        ) : null}

        {hasVisibleEntries ? (
          <View style={styles.list}>
            {library.visibleTreeEntries.map((entry) => {
              const visibleResourceIds = entry.visibleResources.map((resource) => resource.id);
              return (
                <ResourceTreeFolderRow
                  key={entry.folder.id}
                  folder={entry.folder}
                  resources={entry.visibleResources}
                  expanded={library.isFolderExpanded(entry.folder.name)}
                  searchQuery={library.searchQuery}
                  selectMode={library.selectMode}
                  selected={library.isFolderSelected(entry.folder.name, visibleResourceIds)}
                  partial={library.isFolderPartial(entry.folder.name, visibleResourceIds)}
                  isResourceSelected={library.isResourceSelected}
                  onToggleExpanded={() => library.toggleFolderExpanded(entry.folder.name)}
                  onLongPress={library.enterSelectMode}
                  onSelect={() => library.toggleFolderSelect(entry.folder.name, visibleResourceIds)}
                  onToggleStudy={() => {
                    const result = library.toggleFolderStudy(entry.folder.name);
                    showToast(result.message);
                  }}
                  onResourceLongPress={() => library.enterSelectMode()}
                  onResourcePress={(resourceId) => router.push(`/resource/${resourceId}`)}
                  onResourceSelect={(resourceId) =>
                    library.toggleResourceSelect(entry.folder.name, resourceId, visibleResourceIds)
                  }
                  onResourceToggleStudy={(resourceId) => {
                    const result = library.toggleResourceStudy(resourceId);
                    showToast(result.message);
                  }}
                />
              );
            })}
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
  list: {
    gap: 12,
    marginTop: 14,
  },
  safeBottom: {
    height: 120,
  },
});
