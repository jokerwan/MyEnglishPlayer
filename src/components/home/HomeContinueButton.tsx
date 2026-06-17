import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

type HomeContinueButtonProps = {
  emphasized?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

export function HomeContinueButton({
  emphasized = false,
  onPress,
  accessibilityLabel = '继续播放',
}: HomeContinueButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        emphasized ? styles.buttonEmphasized : styles.buttonSecondary,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={[styles.dot, emphasized ? styles.dotEmphasized : styles.dotSecondary]}>
        <FontAwesome
          name="play"
          size={9}
          color={emphasized ? '#ffffff' : '#0f766e'}
          style={styles.playIcon}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEmphasized: {
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#99f6e4',
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: '#d7f7f0',
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotEmphasized: {
    backgroundColor: '#14b8a6',
  },
  dotSecondary: {
    backgroundColor: '#ccfbf1',
  },
  playIcon: {
    marginLeft: 2,
  },
});
