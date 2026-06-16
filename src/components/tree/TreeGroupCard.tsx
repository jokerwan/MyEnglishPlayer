import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

import { AppText } from '@/components/common/AppText';
import { useLongPress } from '@/hooks/useLongPress';

import { TreeIconButton, TreeOutlineButton } from './TreeOutlineButton';
import { TreeSelectionCheck } from './TreeSelectionCheck';
import { treeColors } from './treeStyles';

type TreeGroupHeaderProps = {
  title: string;
  meta: string;
  icon?: 'folder-open-o' | 'folder-o';
  selectMode: boolean;
  selected: boolean;
  partial?: boolean;
  primaryAction?: { label: string; tone?: 'primary' | 'danger'; onPress: () => void };
  showMoreAction?: boolean;
  onMorePress?: () => void;
  onPress: () => void;
  onLongPress?: () => void;
};

export function TreeGroupHeader({
  title,
  meta,
  icon = 'folder-open-o',
  selectMode,
  selected,
  partial = false,
  primaryAction,
  showMoreAction = false,
  onMorePress,
  onPress,
  onLongPress,
}: TreeGroupHeaderProps) {
  const longPress = useLongPress(() => {
    onLongPress?.();
  });

  const handlePress = () => {
    if (longPress.shouldBlockPress()) {
      return;
    }
    onPress();
  };

  return (
    <Pressable
      style={[styles.header, selectMode && styles.headerSelectMode]}
      onPress={handlePress}
      onPressIn={longPress.onPressIn}
      onPressOut={longPress.onPressOut}
      onTouchMove={longPress.onTouchMove}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {selectMode ? (
        <TreeSelectionCheck selected={selected} partial={partial} style={styles.headerCheck} />
      ) : null}

      <View style={styles.iconWrap}>
        <FontAwesome name={icon} size={16} color={treeColors.iconColor} />
      </View>

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
          {primaryAction ? (
            <TreeOutlineButton
              label={primaryAction.label}
              tone={primaryAction.tone}
              onPress={primaryAction.onPress}
            />
          ) : null}
          {showMoreAction && onMorePress ? (
            <TreeIconButton icon="ellipsis-h" onPress={onMorePress} accessibilityLabel="更多操作" />
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

type TreeGroupCardProps = {
  selected?: boolean;
  children: ReactNode;
};

export function TreeGroupCard({ selected = false, children }: TreeGroupCardProps) {
  return <View style={[styles.card, selected && styles.cardSelected]}>{children}</View>;
}

type TreeChildrenRailProps = {
  children: ReactNode;
};

export function TreeChildrenRail({ children }: TreeChildrenRailProps) {
  return <View style={styles.rail}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    backgroundColor: treeColors.cardBg,
    borderWidth: 1,
    borderColor: treeColors.cardBorder,
    padding: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  cardSelected: {
    borderColor: treeColors.selectedBorder,
    backgroundColor: treeColors.selectedBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerSelectMode: {
    paddingLeft: 4,
  },
  headerCheck: {
    marginRight: -4,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: treeColors.iconBg,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: treeColors.title,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  meta: {
    marginTop: 4,
    color: treeColors.meta,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  rail: {
    position: 'relative',
    marginTop: 12,
    marginLeft: 18,
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: treeColors.rail,
    gap: 10,
  },
});
