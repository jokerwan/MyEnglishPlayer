import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { mockHomeRecommendations, type HomeRecommendation } from '@/data/mockHomeRecommendations';

import { HomeSectionHeader } from './HomeSectionHeader';

type HomeRecommendedResourcesProps = {
  onMorePress: () => void;
  onItemPress: (item: HomeRecommendation) => void;
};

export function HomeRecommendedResources({ onMorePress, onItemPress }: HomeRecommendedResourcesProps) {
  return (
    <View style={styles.section}>
      <HomeSectionHeader title="推荐资源" onMorePress={onMorePress} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockHomeRecommendations.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onItemPress(item)}
          >
            <LinearGradient
              colors={item.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cover}
            />
            <View style={styles.cardBody}>
              <AppText style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </AppText>
              <AppText style={styles.cardMeta}>{item.resourceCount} 个资源</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: homeTheme.cardRadius,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.cardBorder,
    shadowColor: homeTheme.shadow.color,
    shadowOffset: homeTheme.shadow.offset,
    shadowOpacity: homeTheme.shadow.opacity,
    shadowRadius: homeTheme.shadow.radius,
    elevation: homeTheme.shadow.elevation,
  },
  scrollContent: {
    gap: 12,
    paddingRight: 4,
  },
  card: {
    width: 132,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: homeTheme.line,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  cover: {
    height: 88,
    width: '100%',
  },
  cardBody: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    color: homeTheme.ink,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
    minHeight: 34,
  },
  cardMeta: {
    marginTop: 4,
    color: homeTheme.subtle,
    fontSize: 11,
    fontWeight: '700',
  },
});
