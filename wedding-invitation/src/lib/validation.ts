import { WeddingScene, CardInput } from './types';

export function validateCardInput(input: any): CardInput {
  if (!input.bride || typeof input.bride !== 'string' || input.bride.length > 100) {
    throw new Error('Invalid bride name');
  }
  if (!input.groom || typeof input.groom !== 'string' || input.groom.length > 100) {
    throw new Error('Invalid groom name');
  }
  if (!input.date || typeof input.date !== 'string' || input.date.length > 100) {
    throw new Error('Invalid date');
  }
  if (!input.location || typeof input.location !== 'string' || input.location.length > 200) {
    throw new Error('Invalid location');
  }
  if (!['calm', 'festive', 'elegant'].includes(input.tone)) {
    throw new Error('Invalid tone');
  }

  return {
    bride: input.bride.trim(),
    groom: input.groom.trim(),
    date: input.date.trim(),
    location: input.location.trim(),
    tone: input.tone as 'calm' | 'festive' | 'elegant',
  };
}

export function validateWeddingScene(scene: any): WeddingScene {
  if (!['calm', 'festive', 'elegant'].includes(scene.mood)) {
    throw new Error('Invalid mood');
  }

  if (!scene.palette || typeof scene.palette !== 'object') {
    throw new Error('Invalid palette');
  }

  const requiredPaletteKeys = ['background', 'card', 'border', 'accent', 'textPrimary', 'textSecondary'];
  for (const key of requiredPaletteKeys) {
    if (typeof scene.palette[key] !== 'string') {
      throw new Error(`Invalid palette.${key}`);
    }
  }

  if (!scene.typography || typeof scene.typography !== 'object') {
    throw new Error('Invalid typography');
  }

  if (typeof scene.typography.fontFamily !== 'string' ||
      typeof scene.typography.headingSize !== 'number' ||
      typeof scene.typography.bodySize !== 'number') {
    throw new Error('Invalid typography properties');
  }

  if (!scene.content || typeof scene.content !== 'object') {
    throw new Error('Invalid content');
  }

  const requiredContentKeys = ['bride', 'groom', 'date', 'location', 'blessingLine', 'closingLine'];
  for (const key of requiredContentKeys) {
    if (typeof scene.content[key] !== 'string') {
      throw new Error(`Invalid content.${key}`);
    }
  }

  if (!scene.animation || scene.animation.type !== 'fadeUp' || typeof scene.animation.duration !== 'number') {
    throw new Error('Invalid animation');
  }

  return scene as WeddingScene;
}