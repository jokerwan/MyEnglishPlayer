import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ToastProps = {
  message: string | null;
  visible: boolean;
};

export function Toast({ message, visible }: ToastProps) {
  if (!visible || !message) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.toast}>
        <AppText style={styles.text}>{message}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  toast: {
    backgroundColor: colors.toastBg,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    maxWidth: '90%',
  },
  text: {
    color: colors.white,
    fontSize: 14,
  },
});
