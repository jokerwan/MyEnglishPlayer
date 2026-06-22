import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { mockUser } from '@/data/mockUser';
import { useGreeting } from '@/hooks/useGreeting';

type HomeHeroProps = {
  onNotificationsPress?: () => void;
};

export function HomeHero({ onNotificationsPress }: HomeHeroProps) {
  const { greeting } = useGreeting();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0fdfa', '#f7faf9']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(45,212,191,0.18)', 'rgba(45,212,191,0.04)', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.15, y: 1 }}
        style={styles.radialGlow}
        pointerEvents="none"
      />

      <View style={styles.decorIllustration} pointerEvents="none">
        <View style={styles.decorBookBack} />
        <View style={styles.decorBookFront} />
        <View style={styles.decorPlant} />
        <View style={styles.decorHeadphones}>
          <FontAwesome name="headphones" size={24} color="#0f766e" />
        </View>
      </View>

      <View style={styles.topRow}>
        <View style={styles.inner}>
          <AppText style={styles.greeting}>
            {greeting}，{mockUser.name}
          </AppText>
          <AppText style={styles.subtitle}>坚持每一天，你的英语会听得更懂</AppText>
        </View>

        <Pressable
          style={({ pressed }) => [styles.bellButton, pressed && styles.bellPressed]}
          onPress={onNotificationsPress}
          accessibilityLabel="通知"
        >
          <FontAwesome name="bell-o" size={18} color="#64748b" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  radialGlow: {
    position: 'absolute',
    right: -40,
    top: -30,
    width: 240,
    height: 200,
    borderRadius: 999,
  },
  decorIllustration: {
    position: 'absolute',
    right: 12,
    top: 36,
    width: 96,
    height: 88,
  },
  decorBookBack: {
    position: 'absolute',
    left: 8,
    bottom: 6,
    width: 44,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(20,184,166,0.18)',
    transform: [{ rotate: '-10deg' }],
  },
  decorBookFront: {
    position: 'absolute',
    left: 22,
    bottom: 2,
    width: 48,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.8)',
    transform: [{ rotate: '6deg' }],
  },
  decorPlant: {
    position: 'absolute',
    right: 4,
    bottom: 0,
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#86efac',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  decorHeadphones: {
    position: 'absolute',
    right: 18,
    top: 0,
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(204,251,241,0.95)',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  inner: {
    flex: 1,
    minWidth: 0,
    paddingRight: 88,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  bellPressed: {
    opacity: 0.8,
  },
  greeting: {
    color: homeTheme.ink,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 8,
    maxWidth: 240,
    color: homeTheme.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
});
