import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import type { ResourceFolderViewModel } from '@/types/resource';

type ResourceFolderCardProps = {
  folder: ResourceFolderViewModel;
  active: boolean;
  onPress: () => void;
};

export function ResourceFolderCard({ folder, active, onPress }: ResourceFolderCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={folder.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.art, active && styles.artActive]}
      >
        <View style={styles.decorLarge} />
        <View style={styles.decorSmall} />
        <FontAwesome
          name={folder.icon}
          size={34}
          color="rgba(255,255,255,0.96)"
          style={styles.icon}
        />
      </LinearGradient>

      <AppText style={styles.name} numberOfLines={1}>
        {folder.name}
      </AppText>
      <AppText style={styles.meta} numberOfLines={1}>
        {folder.metaText}
      </AppText>
      <ProgressBar
        progress={folder.progressPercent}
        style={styles.progress}
        trackColor="rgba(226,232,240,0.9)"
        fillColor={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 142,
  },
  art: {
    width: 142,
    height: 142,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.86)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 3,
  },
  artActive: {
    borderWidth: 3,
    borderColor: 'rgba(20,184,166,0.24)',
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
  },
  decorLarge: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 999,
    left: 16,
    top: 18,
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  decorSmall: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 999,
    right: 12,
    bottom: 16,
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  icon: {
    position: 'absolute',
    left: 18,
    bottom: 18,
    textShadowColor: 'rgba(15,23,42,0.12)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  name: {
    marginTop: 9,
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  meta: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  progress: {
    marginTop: 8,
    height: 4,
  },
});
