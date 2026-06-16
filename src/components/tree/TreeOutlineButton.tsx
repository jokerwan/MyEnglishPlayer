import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/common/AppText';

type TreeOutlineButtonProps = {
  label: string;
  onPress: () => void;
  tone?: 'primary' | 'danger';
};

export function TreeOutlineButton({ label, onPress, tone = 'primary' }: TreeOutlineButtonProps) {
  return (
    <Pressable
      style={[styles.button, tone === 'danger' && styles.buttonDanger]}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      accessibilityLabel={label}
    >
      <AppText style={[styles.label, tone === 'danger' && styles.labelDanger]}>{label}</AppText>
    </Pressable>
  );
}

type TreeIconButtonProps = {
  icon: 'play' | 'ellipsis-h' | 'plus' | 'minus';
  onPress: () => void;
  accessibilityLabel: string;
};

export function TreeIconButton({ icon, onPress, accessibilityLabel }: TreeIconButtonProps) {
  return (
    <Pressable
      style={styles.iconButton}
      onPress={(event) => {
        event.stopPropagation();
        onPress();
      }}
      accessibilityLabel={accessibilityLabel}
    >
      <FontAwesome name={icon} size={14} color="#14b8a6" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 52,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: 'rgba(153,246,228,0.9)',
  },
  buttonDanger: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(254,205,211,0.96)',
  },
  label: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  labelDanger: {
    color: '#e11d48',
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.96)',
  },
});
