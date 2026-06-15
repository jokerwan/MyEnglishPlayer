import { useEffect, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AppText } from '@/components/common/AppText';
import { LEARNING_SWIPE_WIDTH } from '@/constants/learning';
import type { StudyPlan } from '@/types/studyPlan';

import { LearningPlanCard } from './LearningPlanCard';

type LearningPlanSwipeRowProps = {
  plan: StudyPlan;
  selectMode: boolean;
  selected: boolean;
  swipeEnabled: boolean;
  onOpenChange: (planId: string | null) => void;
  isOpen: boolean;
  onPress: () => void;
  onCompletePress: () => void;
  onCancelPress: () => void;
  onSelectPress: () => void;
};

export function LearningPlanSwipeRow({
  plan,
  selectMode,
  selected,
  swipeEnabled,
  onOpenChange,
  isOpen,
  onPress,
  onCompletePress,
  onCancelPress,
  onSelectPress,
}: LearningPlanSwipeRowProps) {
  const translateX = useRef(new Animated.Value(isOpen ? -LEARNING_SWIPE_WIDTH : 0)).current;
  const openRef = useRef(isOpen);

  useEffect(() => {
    if (!isOpen && openRef.current) {
      openRef.current = false;
      translateX.setValue(0);
    }
  }, [isOpen, translateX]);

  const animateTo = (open: boolean) => {
    openRef.current = open;
    Animated.spring(translateX, {
      toValue: open ? -LEARNING_SWIPE_WIDTH : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    onOpenChange(open ? plan.id : null);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        swipeEnabled && Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_, gesture) => {
        if (!swipeEnabled) {
          return;
        }

        const base = openRef.current ? -LEARNING_SWIPE_WIDTH : 0;
        const next = Math.min(0, Math.max(-LEARNING_SWIPE_WIDTH, base + gesture.dx));
        translateX.setValue(next);
      },
      onPanResponderRelease: (_, gesture) => {
        if (!swipeEnabled) {
          return;
        }

        const shouldOpen =
          gesture.dx < -36 || (openRef.current && gesture.dx < 12 && gesture.vx <= 0.2);
        const shouldClose = gesture.dx > 36 || gesture.vx > 0.35;
        if (shouldClose) {
          animateTo(false);
          return;
        }
        animateTo(shouldOpen);
      },
      onPanResponderTerminate: () => {
        animateTo(openRef.current);
      },
    }),
  ).current;

  if (!swipeEnabled) {
    return (
      <LearningPlanCard
        plan={plan}
        selectMode={selectMode}
        selected={selected}
        onPress={onPress}
        onCompletePress={onCompletePress}
        onSelectPress={onSelectPress}
      />
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.actions}>
        <Pressable
          style={styles.cancelButton}
          onPress={() => {
            animateTo(false);
            onCancelPress();
          }}
          accessibilityLabel={`取消${plan.title}`}
        >
          <FontAwesome name="trash-o" size={16} color="#ffffff" />
          <AppText style={styles.cancelText}>取消</AppText>
        </Pressable>
      </View>

      <Animated.View
        style={[styles.cardWrap, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <LearningPlanCard
          plan={plan}
          selectMode={selectMode}
          selected={selected}
          onPress={() => {
            if (openRef.current) {
              animateTo(false);
              return;
            }
            onPress();
          }}
          onCompletePress={onCompletePress}
          onSelectPress={onSelectPress}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 28,
  },
  actions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: LEARNING_SWIPE_WIDTH,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#fb7185',
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
  },
  cardWrap: {
    zIndex: 2,
  },
});
