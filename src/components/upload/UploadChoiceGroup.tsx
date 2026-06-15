import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type UploadChoiceGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  equalWidth?: boolean;
  isFirst?: boolean;
  onChange: (value: T) => void;
};

export function UploadChoiceGroup<T extends string>({
  label,
  options,
  value,
  equalWidth = false,
  isFirst = false,
  onChange,
}: UploadChoiceGroupProps<T>) {
  return (
    <View style={[styles.field, isFirst && styles.fieldFirst]}>
      <AppText style={styles.label}>{label}</AppText>
      <View style={[styles.row, equalWidth && styles.equalRow]}>
        {options.map((option) => {
          const active = option === value;
          return (
            <Pressable
              key={option}
              style={[
                styles.chip,
                equalWidth && styles.equalChip,
                active && styles.chipActive,
              ]}
              onPress={() => onChange(option)}
            >
              <AppText style={[styles.chipText, active && styles.chipTextActive]}>{option}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginTop: 14,
  },
  fieldFirst: {
    marginTop: 0,
  },
  label: {
    marginBottom: 8,
    color: colors.textSlate,
    fontSize: 13,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equalRow: {
    flexWrap: 'nowrap',
  },
  chip: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#e5edf4',
  },
  equalChip: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.17,
    shadowRadius: 10,
    elevation: 2,
  },
  chipText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.white,
  },
});
