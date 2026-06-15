import { useMemo } from 'react';

import { greetings, motivations } from '@/constants/home';

function getGreetingIndex(hour: number) {
  if (hour < 9) return 0;
  if (hour < 12) return 1;
  if (hour < 14) return 2;
  if (hour < 18) return 3;
  return 4;
}

export function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    const greetingIndex = getGreetingIndex(hour);
    const motivationIndex = Math.floor(Math.random() * motivations.length);

    return {
      greeting: greetings[greetingIndex],
      motivation: motivations[motivationIndex],
    };
  }, []);
}
