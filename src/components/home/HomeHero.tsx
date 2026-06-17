import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { mockUser } from '@/data/mockUser';
import { useGreeting } from '@/hooks/useGreeting';

export function HomeHero() {
  const { greeting, motivation } = useGreeting();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f8fffe', '#f7faf9']}
        locations={[0, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.glowTop} pointerEvents="none" />
      <View style={styles.glowRight} pointerEvents="none" />

      <View style={styles.inner}>
        <AppText style={styles.kicker}>LISTEN · SPEAK · REPEAT</AppText>
        <AppText style={styles.greeting}>
          {greeting}，{mockUser.name}
        </AppText>
        <AppText style={styles.subtitle}>{motivation}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  glowTop: {
    position: 'absolute',
    left: -40,
    top: -30,
    width: 180,
    height: 120,
    borderRadius: 999,
    backgroundColor: 'rgba(45,212,191,0.14)',
  },
  glowRight: {
    position: 'absolute',
    right: -20,
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: 'rgba(20,184,166,0.1)',
    transform: [{ rotate: '12deg' }],
  },
  inner: {
    position: 'relative',
    zIndex: 1,
  },
  kicker: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    opacity: 0.7,
  },
  greeting: {
    marginTop: 10,
    color: colors.textMain,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 8,
    maxWidth: 300,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
});
