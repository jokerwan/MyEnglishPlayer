import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { useLongPress } from '@/hooks/useLongPress';

import { TreeIconButton } from './TreeOutlineButton';
import { TreeSelectionCheck } from './TreeSelectionCheck';
import { treeColors } from './treeStyles';

export type TreeItemAction = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type TreeItemRowProps = {
  title: string;
  meta: string;
  selectMode: boolean;
  selected: boolean;
  highlighted?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onSelect?: () => void;
  onPlayPress?: () => void;
  moreActions?: TreeItemAction[];
};

export function TreeItemRow({
  title,
  meta,
  selectMode,
  selected,
  highlighted = false,
  onPress,
  onLongPress,
  onSelect,
  onPlayPress,
  moreActions = [],
}: TreeItemRowProps) {
  const longPress = useLongPress(() => {
    onLongPress?.();
  });

  const handlePress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    if (selectMode) {
      onSelect?.();
      return;
    }
    onPress();
  };

  const handleMorePress = () => {
    if (!moreActions.length) {
      return;
    }
    if (moreActions.length === 1) {
      moreActions[0].onPress();
      return;
    }
    Alert.alert('更多操作', undefined, [
      ...moreActions.map((action) => ({
        text: action.label,
        style: action.destructive ? ('destructive' as const) : ('default' as const),
        onPress: action.onPress,
      })),
      { text: '取消', style: 'cancel' },
    ]);
  };

  return (
    <Pressable
      style={[
        styles.row,
        selected && styles.rowSelected,
        highlighted && styles.rowHighlighted,
        selectMode && styles.rowSelectMode,
      ]}
      onPress={handlePress}
      onPressIn={longPress.onPressIn}
      onPressOut={longPress.onPressOut}
      onTouchMove={longPress.onTouchMove}
      accessibilityRole="button"
      accessibilityLabel={selectMode ? `选择资源：${title}` : title}
    >
      {selectMode ? (
        <TreeSelectionCheck selected={selected} />
      ) : (
        <View style={styles.dot} />
      )}

      <View style={styles.info}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.meta} numberOfLines={1}>
          {meta}
        </AppText>
      </View>

      {!selectMode ? (
        <View style={styles.actions}>
          {onPlayPress ? (
            <TreeIconButton icon="play" onPress={onPlayPress} accessibilityLabel={`播放或打开：${title}`} />
          ) : null}
          {moreActions.length > 0 ? (
            <TreeIconButton
              icon="ellipsis-h"
              onPress={handleMorePress}
              accessibilityLabel={`更多操作：${title}`}
            />
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 62,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 16,
    backgroundColor: treeColors.itemBg,
    borderWidth: 1,
    borderColor: treeColors.itemBorder,
  },
  rowSelectMode: {
    paddingLeft: 10,
  },
  rowSelected: {
    borderColor: treeColors.selectedBorder,
    backgroundColor: treeColors.selectedBg,
  },
  rowHighlighted: {
    borderColor: treeColors.highlightBorder,
    backgroundColor: treeColors.highlightBg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: treeColors.dot,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: treeColors.title,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  meta: {
    marginTop: 4,
    color: treeColors.meta,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
});
