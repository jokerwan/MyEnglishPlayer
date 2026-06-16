import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type LearningSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function LearningSearchBar({ value, onChangeText, onClear }: LearningSearchBarProps) {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={14} color="#94a3b8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="搜索合集 / 资源名称，长按可批量操作"
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />
      {value ? (
        <Pressable onPress={onClear} accessibilityLabel="清空搜索" hitSlop={8}>
          <FontAwesome name="times-circle" size={16} color="#cbd5e1" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.045,
    shadowRadius: 14,
    elevation: 2,
  },
  input: {
    flex: 1,
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '600',
    padding: 0,
  },
});
