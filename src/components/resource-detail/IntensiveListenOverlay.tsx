import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';

type IntensiveListenOverlayProps = {
  visible: boolean;
  english: string;
  chinese: string;
  onClose: () => void;
};

export function IntensiveListenOverlay({
  visible,
  english,
  chinese,
  onClose,
}: IntensiveListenOverlayProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <LinearGradient
        colors={['#ffffff', '#f7fffd', '#f8fafc']}
        style={styles.overlay}
      >
        <Pressable
          style={[styles.closeButton, { top: insets.top + 12 }]}
          onPress={onClose}
          accessibilityLabel="关闭精听页"
        >
          <FontAwesome name="times" size={16} color="#0f172a" />
        </Pressable>

        <View style={styles.content}>
          <AppText style={styles.en}>{english}</AppText>
          <AppText style={styles.zh}>{chinese}</AppText>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 112,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.86)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.055,
    shadowRadius: 20,
    elevation: 3,
  },
  content: {
    width: '100%',
    maxWidth: 342,
    alignItems: 'center',
  },
  en: {
    color: '#0f172a',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  zh: {
    marginTop: 16,
    color: '#64748b',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
});
