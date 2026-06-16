import { getAllResourceDetails } from '@/data/mockResourceDetails';
import type { PlayerState } from '@/types/player';

import { stripResourceTitle } from './resourceDetail';

export function resolvePlayerResourceId(title: string) {
  const clean = stripResourceTitle(title).toLowerCase();
  const details = getAllResourceDetails();

  const exact = details.find((item) => stripResourceTitle(item.title).toLowerCase() === clean);
  if (exact) {
    return exact.id;
  }

  const fuzzy = details.find((item) => {
    const itemTitle = stripResourceTitle(item.title).toLowerCase();
    return clean.includes(itemTitle) || itemTitle.includes(clean);
  });
  if (fuzzy) {
    return fuzzy.id;
  }

  if (/单元\s*12|health|健康与生活/i.test(title)) {
    return 'news-1';
  }
  if (/color|颜色/i.test(title)) {
    return 'colors-kids';
  }
  if (/body|身体/i.test(title)) {
    return 'my-body';
  }
  if (/bath|洗澡/i.test(title)) {
    return 'bath-time';
  }
  if (/dino|恐龙/i.test(title)) {
    return 'dinosaur-names';
  }
  if (/daily sentence/i.test(title)) {
    return 'daily-sentence';
  }

  return undefined;
}

export function getPlayerDetailRoute(player: PlayerState) {
  const resourceId = player.resourceId ?? resolvePlayerResourceId(player.title);
  return resourceId ? `/resource/${resourceId}` : undefined;
}
