import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { formatResourceResumeMeta } from '@/utils/homeLearning';
import { stripResourceExtension } from '@/utils/learningManager';
import type { StudyPlanResource } from '@/types/studyPlan';

type HomeResourceRowProps = {
  resource: StudyPlanResource;
  isCurrent?: boolean;
  onPress: () => void;
  onPlayPress: () => void;
  onDetailPress: () => void;
};

export function HomeResourceRow({
  resource,
  isCurrent = false,
  onPress,
  onPlayPress,
  onDetailPress,
}: HomeResourceRowProps) {
  const title = stripResourceExtension(resource.title);

  return (
    <Pressable
      style={[styles.row, isCurrent && styles.rowCurrent]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {isCurrent ? <View style={styles.currentAccent} /> : null}

      <View style={styles.info}>
        <AppText style={[styles.title, isCurrent && styles.titleCurrent]} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={[styles.meta, isCurrent && styles.metaCurrent]} numberOfLines={1}>
          {formatResourceResumeMeta(resource)}
        </AppText>
        {isCurrent ? (
          <View style={styles.resumeTag}>
            <View style={styles.resumeIcon}>
              <FontAwesome name="map-marker" size={8} color={homeTheme.primaryDeep} />
            </View>
            <AppText style={styles.resumeText}>上次听到这里</AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
          onPress={(event) => {
            event.stopPropagation();
            onPlayPress();
          }}
          accessibilityRole="button"
          accessibilityLabel={`播放${title}`}
        >
          <FontAwesome name="play" size={9} color={homeTheme.primaryDeep} style={styles.playIcon} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.detailButton, pressed && styles.detailButtonPressed]}
          onPress={(event) => {
            event.stopPropagation();
            onDetailPress();
          }}
          accessibilityRole="button"
          accessibilityLabel={`查看${title}详情`}
        >
          <FontAwesome name="angle-right" size={20} color={isCurrent ? '#7aa7a0' : '#94a3b8'} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 6,
    borderRadius: 14,
  },
  rowCurrent: {
    marginVertical: 3,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: 'rgba(240,253,250,0.72)',
  },
  currentAccent: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 3,
    borderRadius: 999,
    backgroundColor: '#2dd4bf',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#1e293b',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },
  titleCurrent: {
    color: '#134e4a',
  },
  meta: {
    marginTop: 4,
    color: homeTheme.subtle,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 13,
  },
  metaCurrent: {
    color: '#5f7775',
  },
  resumeTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    paddingVertical: 3,
    paddingLeft: 6,
    paddingRight: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.86)',
  },
  resumeIcon: {
    width: 14,
    height: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: homeTheme.primaryBorder,
  },
  resumeText: {
    color: homeTheme.primaryDeep,
    fontSize: 10,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  playButtonPressed: {
    transform: [{ scale: 0.96 }],
  },
  playIcon: {
    marginLeft: 2,
  },
  detailButton: {
    width: 24,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  detailButtonPressed: {
    transform: [{ translateX: 2 }],
  },
});
