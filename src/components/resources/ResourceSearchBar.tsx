import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors } from '@/constants/colors';

type ResourceSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function ResourceSearchBar({ value, onChangeText }: ResourceSearchBarProps) {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={14} color="#94a3b8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="搜索资源或文件夹"
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
