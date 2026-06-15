import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import type { ResourceLibraryItem } from '@/types/resource';

type ResourceListItemProps = {
  item: ResourceLibraryItem;
  index: number;
  onPress: () => void;
  onAddToStudy: () => void;
};

function getTrackContent(item: ResourceLibraryItem, index: number) {
  if (item.studyStatus === 'done') {
    return { type: 'icon' as const, name: 'check' as const };
  }
  if (item.studyStatus === 'learning') {
    return { type: 'icon' as const, name: 'play' as const };
  }
  return { type: 'text' as const, value: String(index) };
}

export function ResourceListItem({ item, index, onPress, onAddToStudy }: ResourceListItemProps) {
  const track = getTrackContent(item, index);
  const meta = `${item.duration} · ${item.level} · ${item.hasSubtitle ? '有字幕' : '无字幕'}`;
  const typeLabel = item.type === 'video' ? '视频' : '音频';

  return (
    <Pressable
      style={[
        styles.item,
        item.studyStatus === 'learning' && styles.itemLearning,
        item.studyStatus === 'done' && styles.itemDone,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.trackIndex,
          (item.studyStatus === 'learning' || item.studyStatus === 'done') && styles.trackIndexActive,
        ]}
      >
        {track.type === 'icon' ? (
          <FontAwesome name={track.name} size={12} color={colors.white} />
        ) : (
          <AppText style={styles.trackIndexText}>{track.value}</AppText>
        )}
      </View>

      <LinearGradient
        colors={item.type === 'video' ? ['#14b8a6', '#22c55e'] : ['#0f766e', '#2dd4bf']}
        style={[styles.cover, item.studyStatus === 'done' && styles.coverDone]}
      >
        <FontAwesome
          name={item.type === 'video' ? 'video-camera' : 'headphones'}
          size={16}
          color={colors.white}
        />
      </LinearGradient>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <AppText style={[styles.title, item.studyStatus === 'done' && styles.titleDone]} numberOfLines={1}>
            {item.title}
          </AppText>
          <View style={styles.typeBadge}>
            <AppText style={styles.typeBadgeText}>{typeLabel}</AppText>
          </View>
        </View>
        <AppText style={styles.meta}>{meta}</AppText>
        <View style={styles.extraRow}>
          <AppText style={styles.duration}>{item.duration}</AppText>
          <View style={styles.tag}>
            <AppText style={styles.tagText}>{item.tag}</AppText>
          </View>
        </View>
      </View>

      {item.studyStatus === 'none' ? (
        <Pressable
          style={styles.studyAction}
          onPress={(event) => {
            event.stopPropagation();
            onAddToStudy();
          }}
        >
          <AppText style={styles.studyActionText}>加入学习</AppText>
        </Pressable>
      ) : (
        <View style={styles.studyActionPlaceholder} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 78,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  itemLearning: {
    backgroundColor: 'rgba(236,254,255,0.74)',
  },
  itemDone: {
    backgroundColor: '#fbfdff',
  },
  trackIndex: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackIndexActive: {
    backgroundColor: colors.primary,
  },
  trackIndexText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '900',
  },
  cover: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverDone: {
    opacity: 0.72,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minWidth: 0,
  },
  title: {
    flex: 1,
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  titleDone: {
    color: colors.textMuted,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: colors.metricBlueBg,
  },
  typeBadgeText: {
    color: colors.playBtn,
    fontSize: 10,
    fontWeight: '900',
  },
  meta: {
    marginTop: 5,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  duration: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
  },
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  tagText: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
  },
  studyAction: {
    minWidth: 58,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  studyActionText: {
    color: colors.playBtn,
    fontSize: 11,
    fontWeight: '900',
  },
  studyActionPlaceholder: {
    width: 58,
  },
});
