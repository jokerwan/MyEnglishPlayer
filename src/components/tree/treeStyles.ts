import { StyleSheet } from 'react-native';

export const treeColors = {
  cardBg: '#ffffff',
  cardBorder: 'rgba(226,232,240,0.96)',
  iconBg: '#ecfdf5',
  iconColor: '#14b8a6',
  title: '#0f172a',
  meta: '#94a3b8',
  rail: '#e2e8f0',
  itemBorder: 'rgba(226,232,240,0.96)',
  itemBg: '#ffffff',
  dot: '#14b8a6',
  action: '#14b8a6',
  selectedBg: 'rgba(236,254,255,0.72)',
  selectedBorder: 'rgba(20,184,166,0.42)',
  highlightBg: 'rgba(254,249,195,0.55)',
  highlightBorder: 'rgba(245,158,11,0.35)',
};

export const treeStyles = StyleSheet.create({
  groupCard: {
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
  groupCardSelected: {
    borderColor: treeColors.selectedBorder,
    backgroundColor: treeColors.selectedBg,
  },
  childrenRail: {
    position: 'relative',
    marginTop: 12,
    marginLeft: 18,
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: treeColors.rail,
    gap: 10,
  },
  emptyChild: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(203,213,225,0.8)',
    backgroundColor: 'rgba(248,250,252,0.8)',
  },
  emptyChildText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
});
