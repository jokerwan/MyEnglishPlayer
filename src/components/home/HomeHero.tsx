import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { mockUser } from '@/data/mockUser';
import { useGreeting } from '@/hooks/useGreeting';

const BUBBLES = [
  { size: 18, left: 20, bottom: 28 },
  { size: 12, left: 56, bottom: 16 },
  { size: 26, right: 58, bottom: 24 },
  { size: 10, right: 24, bottom: 14 },
] as const;

export function HomeHero() {
  const { greeting, motivation } = useGreeting();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f4fffd', '#f7faf9']}
        locations={[0, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.decorSquare} />
      <View style={styles.decorCircle} />

      <View style={styles.bubbleLayer} pointerEvents="none">
        {BUBBLES.map((bubble, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              {
                width: bubble.size,
                height: bubble.size,
                ...( 'left' in bubble ? { left: bubble.left } : { right: bubble.right }),
                bottom: bubble.bottom,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.inner}>
        <AppText style={styles.kicker}>LISTEN · SPEAK · REPEAT</AppText>
        <AppText style={styles.greeting}>
          {greeting}，{mockUser.name}
        </AppText>
        <AppText style={styles.subtitle}>{motivation}</AppText>
      </View>

      <View style={styles.fadeEdge} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 36,
    paddingBottom: 54,
    paddingHorizontal: 22,
  },
  decorSquare: {
    position: 'absolute',
    right: 22,
    top: 30,
    width: 84,
    height: 84,
    borderRadius: 30,
    backgroundColor: 'rgba(20,184,166,0.12)',
    transform: [{ rotate: '12deg' }],
  },
  decorCircle: {
    position: 'absolute',
    right: -54,
    bottom: -74,
    width: 188,
    height: 188,
    borderRadius: 999,
    backgroundColor: 'rgba(20,184,166,0.08)',
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
  inner: {
    position: 'relative',
    zIndex: 3,
  },
  kicker: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
    opacity: 0.72,
  },
  greeting: {
    marginTop: 13,
    color: colors.textMain,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 320,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  fadeEdge: {
    position: 'absolute',
    left: '-6%',
    right: '-6%',
    bottom: -30,
    height: 92,
    borderRadius: 999,
    backgroundColor: 'rgba(247,250,249,0.5)',
    zIndex: 1,
  },
});
