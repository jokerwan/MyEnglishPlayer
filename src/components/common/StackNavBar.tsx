import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type StackNavBarProps = {
  title: string;
  onBack: () => void;
};

export function StackNavBar({ title, onBack }: StackNavBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.backButton} onPress={onBack} accessibilityLabel="返回">
        <FontAwesome name="chevron-left" size={15} color="#0f172a" style={styles.backIcon} />
      </Pressable>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 7,
    backgroundColor: 'rgba(248,250,252,0.94)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.82)',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.045,
    shadowRadius: 10,
    elevation: 2,
  },
  backIcon: {
    marginLeft: -1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.textMain,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  spacer: {
    width: 38,
    height: 38,
  },
});
