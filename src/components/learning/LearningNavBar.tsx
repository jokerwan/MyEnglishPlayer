import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type LearningNavBarProps = {
  title?: string;
  onBack: () => void;
};

export function LearningNavBar({ title = '我的学习', onBack }: LearningNavBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.backButton} onPress={onBack} accessibilityLabel="返回">
        <FontAwesome name="chevron-left" size={15} color="#334155" />
      </Pressable>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: 'rgba(248,255,253,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.72)',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.045,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 38,
  },
});
