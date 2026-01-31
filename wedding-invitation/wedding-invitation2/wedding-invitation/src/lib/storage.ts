import { StoredCard, WeddingScene } from './types';

const cards = new Map<string, StoredCard>();

export function storeCard(id: string, scene: WeddingScene): void {
  console.log('[DEBUG] Storing card:', id);
  cards.set(id, {
    id,
    scene,
    createdAt: new Date().toISOString(),
  });
}

export function getCard(id: string): StoredCard | null {
  return cards.get(id) || null;
}

export function cardExists(id: string): boolean {
  return cards.has(id);
}
