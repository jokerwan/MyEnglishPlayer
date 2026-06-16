import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { stripResourceTitle } from '@/utils/resourceDetail';

type ResourceVideoStageProps = {
  title: string;
  mediaLabel: string;
};

export function ResourceVideoStage({ title, mediaLabel }: ResourceVideoStageProps) {
  return (
    <View style={styles.panel}>
      <LinearGradient
        colors={['#0f766e', '#14b8a6', '#99f6e4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stage}
      >
        <View style={styles.copy}>
          <View style={styles.playBadge}>
            <FontAwesome name="play" size={16} color="#0f766e" />
          </View>
          <AppText style={styles.title}>{stripResourceTitle(title)}</AppText>
          <AppText style={styles.label}>{mediaLabel}</AppText>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.045,
    shadowRadius: 24,
    elevation: 2,
  },
  stage: {
    minHeight: 188,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  copy: {
    alignItems: 'center',
    gap: 10,
  },
  playBadge: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    fontWeight: '800',
  },
});
