import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { mockUser } from '@/data/mockUser';
import { useGreeting } from '@/hooks/useGreeting';

const BUBBLES = [
  { size: 18, left: 20, bottom: 28 },
  { size: 12, left: 56, bottom: 16 },
  { size: 26, right: 58, bottom: 24 },
  { size: 10, right: 24, bottom: 14 },
] as const;

type HomeHeroProps = {
  onNotificationsPress?: () => void;
};

export function HomeHero({ onNotificationsPress }: HomeHeroProps) {
  const { greeting, motivation } = useGreeting();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...homeTheme.heroGradient]}
        locations={[0, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(45,212,191,0.28)', 'rgba(45,212,191,0.08)', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.15, y: 1 }}
        style={styles.radialGlow}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['rgba(34,197,94,0.12)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.radialGlowLeft}
        pointerEvents="none"
      />

      <View style={styles.bubbleLayer} pointerEvents="none">
        {BUBBLES.map((bubble, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              {
                width: bubble.size,
                height: bubble.size,
                ...('left' in bubble ? { left: bubble.left } : { right: bubble.right }),
                bottom: bubble.bottom,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.decorIllustration} pointerEvents="none">
        <View style={styles.decorBookBack} />
        <View style={styles.decorBookFront} />
        <View style={styles.decorPlantStem} />
        <View style={styles.decorPlantLeaf} />
        <View style={styles.decorHeadphones}>
          <FontAwesome name="headphones" size={26} color="#0f766e" />
        </View>
      </View>

      <View style={styles.topRow}>
        <View style={styles.inner}>
          <AppText style={styles.kicker}>LISTEN · SPEAK · REPEAT</AppText>
          <AppText style={styles.greeting}>
            {greeting}，{mockUser.name}
          </AppText>
          <AppText style={styles.subtitle}>{motivation}</AppText>
        </View>

        <Pressable
          style={({ pressed }) => [styles.bellButton, pressed && styles.bellPressed]}
          onPress={onNotificationsPress}
          accessibilityLabel="通知"
        >
          <FontAwesome name="bell-o" size={18} color="#64748b" />
        </Pressable>
      </View>

      <View style={styles.fadeEdge} pointerEvents="none">
        <LinearGradient
          colors={['rgba(214,250,243,0.76)', 'rgba(247,250,249,0.98)', 'rgba(247,250,249,0)']}
          locations={[0, 0.68, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 12,
    paddingBottom: 44,
    paddingHorizontal: 20,
  },
  radialGlow: {
    position: 'absolute',
    right: -40,
    top: -24,
    width: 220,
    height: 190,
    borderRadius: 999,
  },
  radialGlowLeft: {
    position: 'absolute',
    left: -60,
    top: -20,
    width: 160,
    height: 140,
    borderRadius: 999,
  },
  bubbleLayer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    opacity: 0.72,
  },
  decorIllustration: {
    position: 'absolute',
    right: 10,
    top: 48,
    width: 104,
    height: 96,
  },
  decorBookBack: {
    position: 'absolute',
    left: 6,
    bottom: 8,
    width: 46,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(20,184,166,0.2)',
    transform: [{ rotate: '-12deg' }],
  },
  decorBookFront: {
    position: 'absolute',
    left: 20,
    bottom: 4,
    width: 50,
    height: 34,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.85)',
    transform: [{ rotate: '8deg' }],
  },
  decorPlantStem: {
    position: 'absolute',
    right: 10,
    bottom: 6,
    width: 3,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#86efac',
  },
  decorPlantLeaf: {
    position: 'absolute',
    right: 2,
    bottom: 14,
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: '#86efac',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  decorHeadphones: {
    position: 'absolute',
    right: 20,
    top: 2,
    width: 58,
    height: 58,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(204,251,241,0.95)',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  inner: {
    flex: 1,
    minWidth: 0,
    paddingRight: 96,
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
  kicker: {
    color: homeTheme.primaryDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    opacity: 0.72,
  },
  greeting: {
    marginTop: 13,
    color: homeTheme.ink,
    fontSize: 32,
    lineHeight: 35,
    fontWeight: '900',
    letterSpacing: -1.1,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 260,
    color: homeTheme.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  fadeEdge: {
    position: 'absolute',
    left: '-6%',
    right: '-6%',
    bottom: -30,
    height: 92,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
