import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { validateCardInput } from '@/lib/validation';
import { generateWeddingScene } from '@/lib/ai';
import { storeCard, cardExists } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = validateCardInput(body);

    const scene = await generateWeddingScene(input);

    let cardId: string;
    do {
      cardId = nanoid(16);
    } while (cardExists(cardId));

    storeCard(cardId, scene);

    return NextResponse.json({
      success: true,
      cardId,
      url: `/card/${cardId}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate invitation',
      },
      { status: 400 }
    );
  }
}