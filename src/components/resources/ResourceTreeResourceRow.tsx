import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { useLongPress } from '@/hooks/useLongPress';
import type { ResourceLibraryItem } from '@/types/resource';
import {
  getResourceMeta,
  getResourceStudyActionLabel,
  stripResourceFileExtension,
} from '@/utils/resourceTree';

import { ResourceTreeStudyButton } from './ResourceTreeStudyButton';

type ResourceTreeResourceRowProps = {
  resource: ResourceLibraryItem;
  folderGradient: [string, string];
  selectMode: boolean;
  selected: boolean;
  isLast: boolean;
  onLongPress: () => void;
  onPress: () => void;
  onSelect: () => void;
  onToggleStudy: () => void;
};

export function ResourceTreeResourceRow({
  resource,
  folderGradient,
  selectMode,
  selected,
  isLast,
  onLongPress,
  onPress,
  onSelect,
  onToggleStudy,
}: ResourceTreeResourceRowProps) {
  const title = stripResourceFileExtension(resource.title);
  const meta = getResourceMeta(resource);
  const studyLabel = getResourceStudyActionLabel(resource.studyStatus);
  const studyVariant = resource.studyStatus === 'none' ? 'join' : 'cancel';
  const longPress = useLongPress(onLongPress);

  const handlePress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    if (selectMode) {
      onSelect();
      return;
    }
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.row,
        selected && styles.rowSelected,
        selectMode && styles.rowSelectMode,
        isLast && styles.rowLast,
      ]}
      onPress={handlePress}
      onPressIn={longPress.onPressIn}
      onPressOut={longPress.onPressOut}
      onTouchMove={longPress.onTouchMove}
      accessibilityRole="button"
      accessibilityLabel={selectMode ? `选择资源：${title}` : `查看资源详情：${title}`}
    >
      <View style={styles.branch} />

      {selectMode ? (
        <View style={[styles.check, selected && styles.checkSelected]}>
          {selected ? <View style={styles.checkDot} /> : null}
        </View>
      ) : null}

      <LinearGradient
        colors={folderGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cover, resource.studyStatus === 'done' && styles.coverDone]}
      >
        <FontAwesome
          name={resource.type === 'video' ? 'video-camera' : 'headphones'}
          size={14}
          color={colors.white}
        />
      </LinearGradient>

      <View style={styles.info}>
        <AppText style={[styles.title, resource.studyStatus === 'done' && styles.titleDone]} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.meta} numberOfLines={1}>
          {meta}
        </AppText>
      </View>

      {!selectMode ? (
        <View style={styles.actions}>
          <ResourceTreeStudyButton
            label={studyLabel}
            variant={studyVariant}
            compact
            onPress={onToggleStudy}
          />
          <Pressable
            style={styles.openButton}
            onPress={(event) => {
              event.stopPropagation();
              onPress();
            }}
            accessibilityLabel={`进入资源详情：${title}`}
          >
            <FontAwesome name="angle-right" size={18} color="#94a3b8" />
          </Pressable>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 66,
    marginTop: 8,
    paddingVertical: 10,
    paddingRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rowSelectMode: {
    paddingLeft: 8,
  },
  rowSelected: {
    backgroundColor: 'rgba(236,254,255,0.72)',
    borderColor: 'rgba(20,184,166,0.42)',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.09,
    shadowRadius: 30,
    elevation: 2,
  },
  rowLast: {
    marginBottom: 2,
  },
  branch: {
    position: 'absolute',
    left: -16,
    top: 31,
    width: 16,
    height: 1,
    backgroundColor: '#dbe7ec',
  },
  check: {
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
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  checkSelected: {
    borderColor: 'rgba(20,184,166,0.56)',
  },
  checkDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverDone: {
    opacity: 0.78,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  titleDone: {
    color: colors.textMuted,
  },
  meta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  openButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
