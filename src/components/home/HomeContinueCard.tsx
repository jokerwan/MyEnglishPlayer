import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { coverCodeFromTitle } from '@/utils/resourceDetail';

type HomeContinueCardProps = {
  planTitle: string;
  resourceTitle: string;
  progress: number;
  meta: string;
  onContinuePress: () => void;
  onDetailPress: () => void;
};

export function HomeContinueCard({
  planTitle,
  resourceTitle,
  progress,
  meta,
  onContinuePress,
  onDetailPress,
}: HomeContinueCardProps) {
  const cover = coverCodeFromTitle(resourceTitle);

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#0f766e', '#14b8a6', '#99f6e4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.accentBar}
      />

      <View style={styles.body}>
        <View style={styles.topRow}>
          <LinearGradient
            colors={['#0f766e', '#14b8a6']}
            style={styles.cover}
          >
            <AppText style={styles.coverText}>{cover}</AppText>
          </LinearGradient>

          <View style={styles.copy}>
            <AppText style={styles.kicker}>继续上次学习</AppText>
            <AppText style={styles.title} numberOfLines={1}>
              {resourceTitle}
            </AppText>
            <AppText style={styles.meta} numberOfLines={1}>
              {planTitle} · {meta}
            </AppText>
          </View>
        </View>

        <View style={styles.progressRow}>
          <ProgressBar progress={progress} style={styles.progressBar} />
          <AppText style={styles.progressText}>{progress}%</AppText>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            onPress={onContinuePress}
          >
            <FontAwesome name="play" size={12} color="#ffffff" style={styles.playIcon} />
            <AppText style={styles.primaryText}>继续学习</AppText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
            onPress={onDetailPress}
          >
            <AppText style={styles.secondaryText}>查看详情</AppText>
            <FontAwesome name="angle-right" size={14} color="#0f766e" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: 18,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6edf3',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  body: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  kicker: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  title: {
    marginTop: 4,
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 21,
  },
  meta: {
    marginTop: 5,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 42,
    borderRadius: 999,
    backgroundColor: '#14b8a6',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 3,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
  },
  playIcon: {
    marginLeft: 2,
  },
});
