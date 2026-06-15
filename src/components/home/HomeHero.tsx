import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { mockUser } from '@/data/mockUser';
import { useGreeting } from '@/hooks/useGreeting';

const BUBBLES = [
  { size: 34, left: 18, top: 30, opacity: 0.42 },
  { size: 18, left: 112, top: 22, opacity: 0.42 },
  { size: 48, right: 82, top: 42, opacity: 0.42 },
  { size: 25, right: 24, top: 118, opacity: 0.42 },
  { size: 62, left: 48, bottom: 18, opacity: 0.28 },
  { size: 28, right: 126, bottom: 46, opacity: 0.35 },
] as const;

export function HomeHero() {
  const { greeting, motivation } = useGreeting();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f3fffd', '#ecfeff']}
        locations={[0, 0.52, 1]}
        style={StyleSheet.absoluteFill}
      />
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
                opacity: bubble.opacity,
                ...( 'left' in bubble ? { left: bubble.left } : { right: bubble.right }),
                ...( 'top' in bubble ? { top: bubble.top } : { bottom: bubble.bottom }),
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.inner}>
        <View style={styles.topRow}>
          <View style={styles.copy}>
            <AppText variant="kicker">LISTEN · SPEAK · REPEAT</AppText>
            <AppText variant="greeting" style={styles.greeting}>
              {greeting}，{mockUser.name}
            </AppText>
            <AppText variant="subtitle" style={styles.subtitle}>
              {motivation}
            </AppText>
          </View>

          <View style={styles.streakBadge} accessibilityLabel={`连续学习 ${mockUser.streakDays} 天`}>
            <LinearGradient
              colors={['#2dd4bf', '#10b981', '#13b76e']}
              locations={[0, 0.48, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.streakCard}
            >
              <AppText style={styles.streakDays}>{mockUser.streakDays}</AppText>
              <AppText style={styles.streakLabel}>连续学习</AppText>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 38,
    paddingBottom: 64,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.78)',
  },
  decorCircle: {
    position: 'absolute',
    right: -42,
    bottom: -58,
    width: 150,
    height: 150,
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
    borderColor: 'rgba(255,255,255,0.58)',
  },
  inner: {
    position: 'relative',
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
  },
  copy: {
    flex: 1,
  },
  greeting: {
    marginTop: 7,
  },
  subtitle: {
    marginTop: 8,
    maxWidth: 300,
  },
  streakBadge: {
    width: 78,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCard: {
    width: 72,
    height: 82,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 6,
  },
  streakDays: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 30,
    marginTop: -4,
  },
  streakLabel: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 10,
    opacity: 0.96,
  },
});
