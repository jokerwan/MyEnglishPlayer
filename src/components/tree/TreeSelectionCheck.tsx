import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type TreeSelectionCheckProps = {
  selected: boolean;
  partial?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function TreeSelectionCheck({ selected, partial = false, style }: TreeSelectionCheckProps) {
  return (
    <View
      style={[
        styles.check,
        selected && styles.checkSelected,
        partial && styles.checkPartial,
        style,
      ]}
    >
      {selected ? <View style={styles.checkDot} /> : null}
      {partial ? <View style={styles.checkPartialBar} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  check: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(203,213,225,0.9)',
  },
  checkSelected: {
    borderColor: 'rgba(20,184,166,0.56)',
  },
  checkPartial: {
    borderColor: 'rgba(20,184,166,0.42)',
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  checkPartialBar: {
    width: 10,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});
