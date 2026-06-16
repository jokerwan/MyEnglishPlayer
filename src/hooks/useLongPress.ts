import { useCallback, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';

export function useLongPress(onLongPress: () => void, duration = 420) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef({ x: 0, y: 0 });
  const firedRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onPressIn = useCallback(
    (event: GestureResponderEvent) => {
      firedRef.current = false;
      startRef.current = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };
      clear();
      timerRef.current = setTimeout(() => {
        firedRef.current = true;
        onLongPress();
      }, duration);
    },
    [clear, duration, onLongPress],
  );

  const onPressOut = useCallback(() => {
    clear();
  }, [clear]);

  const onTouchMove = useCallback(
    (event: GestureResponderEvent) => {
      if (!timerRef.current) {
        return;
      }
      const dx = Math.abs(event.nativeEvent.pageX - startRef.current.x);
      const dy = Math.abs(event.nativeEvent.pageY - startRef.current.y);
      if (dx > 10 || dy > 10) {
        clear();
      }
    },
    [clear],
  );

  const shouldBlockPress = useCallback(() => {
    const fired = firedRef.current;
    firedRef.current = false;
    return fired;
  }, []);

  return {
    onPressIn,
    onPressOut,
    onTouchMove,
    shouldBlockPress,
  };
}
