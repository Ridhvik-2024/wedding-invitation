import { kv } from '@vercel/kv';
import { StoredCard, WeddingScene } from './types';

export async function storeCard(id: string, scene: WeddingScene) {
  console.log('[DEBUG] Storing card in KV:', id);

  const card: StoredCard = {
    id,
    scene,
    createdAt: new Date().toISOString(),
  };

  await kv.set(`card:${id}`, card);
}

export async function getCard(id: string): Promise<StoredCard | null> {
  return (await kv.get<StoredCard>(`card:${id}`)) || null;
}

export async function cardExists(id: string): Promise<boolean> {
  return Boolean(await kv.exists(`card:${id}`));
}