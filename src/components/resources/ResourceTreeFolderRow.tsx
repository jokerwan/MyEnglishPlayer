import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { useLongPress } from '@/hooks/useLongPress';
import type { ResourceFolderViewModel, ResourceLibraryItem } from '@/types/resource';
import { getFolderStudyActionLabel } from '@/utils/resourceTree';

import { ResourceTreeResourceRow } from './ResourceTreeResourceRow';
import { ResourceTreeStudyButton } from './ResourceTreeStudyButton';

type ResourceTreeFolderRowProps = {
  folder: ResourceFolderViewModel;
  resources: ResourceLibraryItem[];
  expanded: boolean;
  searchQuery: string;
  selectMode: boolean;
  selected: boolean;
  partial: boolean;
  isResourceSelected: (resourceId: string) => boolean;
  onToggleExpanded: () => void;
  onLongPress: () => void;
  onSelect: () => void;
  onToggleStudy: () => void;
  onResourceLongPress: (resourceId: string) => void;
  onResourcePress: (resourceId: string) => void;
  onResourceSelect: (resourceId: string) => void;
  onResourceToggleStudy: (resourceId: string) => void;
};

export function ResourceTreeFolderRow({
  folder,
  resources,
  expanded,
  searchQuery,
  selectMode,
  selected,
  partial,
  isResourceSelected,
  onToggleExpanded,
  onLongPress,
  onSelect,
  onToggleStudy,
  onResourceLongPress,
  onResourcePress,
  onResourceSelect,
  onResourceToggleStudy,
}: ResourceTreeFolderRowProps) {
  const joinedCount = folder.resourceCount - folder.noneCount;
  const studyLabel = getFolderStudyActionLabel(joinedCount, folder.resourceCount);
  const studyVariant = joinedCount > 0 ? 'cancel' : 'join';
  const meta = searchQuery.trim()
    ? `${resources.length} / ${folder.resourceCount} 个资源`
    : folder.metaText;
  const longPress = useLongPress(() => {
    onLongPress();
    onSelect();
  });

  const handleCardPress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    if (selectMode) {
      onSelect();
      return;
    }
    onToggleExpanded();
  };

  return (
    <View style={styles.folder}>
      <Pressable
        style={[
          styles.card,
          selected && styles.cardSelected,
          selectMode && styles.cardSelectMode,
        ]}
        onPress={handleCardPress}
        onPressIn={longPress.onPressIn}
        onPressOut={longPress.onPressOut}
        onTouchMove={longPress.onTouchMove}
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? '收起' : '展开'}${folder.name}`}
      >
        {selectMode ? (
          <View style={[styles.check, selected && styles.checkSelected, partial && styles.checkPartial]}>
            {selected ? <View style={styles.checkDot} /> : null}
            {partial ? <View style={styles.checkPartialBar} /> : null}
          </View>
        ) : null}

        <Pressable
          style={styles.expander}
          onPress={(event) => {
            event.stopPropagation();
            onToggleExpanded();
          }}
          accessibilityLabel={expanded ? '收起文件夹' : '展开文件夹'}
        >
          <FontAwesome
            name={expanded ? 'chevron-down' : 'chevron-right'}
            size={11}
            color="#64748b"
          />
        </Pressable>

        <LinearGradient
          colors={folder.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cover}
        >
          <FontAwesome name={folder.icon} size={18} color={colors.white} />
        </LinearGradient>

        <View style={styles.info}>
          <AppText style={styles.title} numberOfLines={1}>
            {folder.name}
          </AppText>
          <AppText style={styles.meta} numberOfLines={1}>
            {meta}
          </AppText>
        </View>

        {!selectMode && studyLabel ? (
          <ResourceTreeStudyButton
            label={studyLabel}
            variant={studyVariant}
            onPress={onToggleStudy}
          />
        ) : null}
      </Pressable>

      {expanded ? (
        <View style={styles.children}>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourceTreeResourceRow
                key={resource.id}
                resource={resource}
                folderGradient={folder.gradient}
                selectMode={selectMode}
                selected={isResourceSelected(resource.id)}
                isLast={index === resources.length - 1}
                onLongPress={() => {
                  onResourceLongPress(resource.id);
                  onResourceSelect(resource.id);
                }}
                onPress={() => onResourcePress(resource.id)}
                onSelect={() => onResourceSelect(resource.id)}
                onToggleStudy={() => onResourceToggleStudy(resource.id)}
              />
            ))
          ) : (
            <View style={styles.emptyChild}>
              <AppText style={styles.emptyChildText}>这个文件夹暂时没有匹配资源</AppText>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  folder: {
    borderRadius: 26,
  },
  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    minHeight: 82,
    padding: 12,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.94)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.045,
    shadowRadius: 24,
    elevation: 2,
  },
  cardSelectMode: {
    paddingLeft: 46,
  },
  cardSelected: {
    borderColor: 'rgba(20,184,166,0.42)',
    shadowColor: '#14b8a6',
    shadowOpacity: 0.09,
  },
  check: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -13,
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(203,213,225,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    zIndex: 5,
  },
  checkSelected: {
    borderColor: 'rgba(20,184,166,0.56)',
  },
  checkPartial: {
    borderColor: 'rgba(20,184,166,0.42)',
  },
  checkDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  checkPartialBar: {
    width: 11,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  expander: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
    letterSpacing: -0.25,
  },
  meta: {
    marginTop: 5,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
  children: {
    position: 'relative',
    marginTop: 6,
    marginBottom: 2,
    marginLeft: 42,
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#dbe7ec',
  },
  emptyChild: {
    marginTop: 8,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(203,213,225,0.8)',
    backgroundColor: 'rgba(255,255,255,0.66)',
  },
  emptyChildText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
});
