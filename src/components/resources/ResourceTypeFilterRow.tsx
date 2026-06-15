import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { RESOURCE_TYPE_FILTERS } from '@/data/mockResources';
import type { ResourceTypeFilter } from '@/types/resource';

type ResourceTypeFilterRowProps = {
  value: ResourceTypeFilter;
  onChange: (value: ResourceTypeFilter) => void;
};

export function ResourceTypeFilterRow({ value, onChange }: ResourceTypeFilterRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {RESOURCE_TYPE_FILTERS.map((filter) => {
        const active = filter.id === value;
        return (
          <Pressable
            key={filter.id}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange(filter.id)}
          >
            <AppText style={[styles.chipText, active && styles.chipTextActive]}>
              {filter.label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingBottom: 3,
  },
  chip: {
    height: 34,
    paddingHorizontal: 13,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 2,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.white,
  },
});
