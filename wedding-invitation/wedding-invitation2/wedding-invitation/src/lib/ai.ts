import { CardInput, WeddingScene } from './types';
import { validateWeddingScene } from './validation';

export async function generateWeddingScene(input: CardInput): Promise<WeddingScene> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return generateFallbackScene(input);
  }

  try {
    const prompt = buildPrompt(input);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status);
      return generateFallbackScene(input);
    }

    const data = await response.json();
    const textContent = data.content.find((c: any) => c.type === 'text')?.text || '';

    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in AI response');
      return generateFallbackScene(input);
    }

    const scene = JSON.parse(jsonMatch[0]);
    return validateWeddingScene(scene);
  } catch (error) {
    console.error('AI generation error:', error);
    return generateFallbackScene(input);
  }
}

function buildPrompt(input: CardInput): string {
  return `Generate a wedding invitation scene for a Hindu wedding. Output ONLY valid JSON matching this exact schema:

{
  "mood": "calm" | "festive" | "elegant",
  "palette": {
    "background": "#hexcolor",
    "card": "#hexcolor",
    "border": "#hexcolor",
    "accent": "#hexcolor",
    "textPrimary": "#hexcolor",
    "textSecondary": "#hexcolor"
  },
  "typography": {
    "fontFamily": "string (web-safe font)",
    "headingSize": number (24-48),
    "bodySize": number (14-18)
  },
  "content": {
    "bride": "${input.bride}",
    "groom": "${input.groom}",
    "date": "${input.date}",
    "location": "${input.location}",
    "blessingLine": "string (1-2 sentence blessing)",
    "closingLine": "string (1 sentence closing)"
  },
  "animation": {
    "type": "fadeUp",
    "duration": number (800-1500)
  }
}

Tone requested: ${input.tone}

Rules:
- Use traditional Hindu wedding aesthetics
- Choose colors appropriate for ${input.tone} tone
- Blessing should be culturally appropriate
- Closing line should invite attendance warmly
- Output ONLY the JSON, no explanations`;
}

function generateFallbackScene(input: CardInput): WeddingScene {
  const moodMap = {
    calm: {
      background: '#f5f1e8',
      card: '#ffffff',
      border: '#d4af37',
      accent: '#c9a961',
      textPrimary: '#3e2723',
      textSecondary: '#6d4c41',
      font: 'Georgia, serif',
    },
    festive: {
      background: '#fff8e1',
      card: '#fffef7',
      border: '#ff6f00',
      accent: '#ff8f00',
      textPrimary: '#bf360c',
      textSecondary: '#d84315',
      font: 'Palatino, serif',
    },
    elegant: {
      background: '#fafafa',
      card: '#ffffff',
      border: '#9c27b0',
      accent: '#ba68c8',
      textPrimary: '#4a148c',
      textSecondary: '#6a1b9a',
      font: 'Garamond, serif',
    },
  };

  const config = moodMap[input.tone];

  return {
    mood: input.tone,
    palette: {
      background: config.background,
      card: config.card,
      border: config.border,
      accent: config.accent,
      textPrimary: config.textPrimary,
      textSecondary: config.textSecondary,
    },
    typography: {
      fontFamily: config.font,
      headingSize: 36,
      bodySize: 16,
    },
    content: {
      bride: input.bride,
      groom: input.groom,
      date: input.date,
      location: input.location,
      blessingLine: 'May Lord Ganesha bless this sacred union with love, prosperity, and eternal happiness.',
      closingLine: 'We request the honor of your presence to bless this beautiful occasion.',
    },
    animation: {
      type: 'fadeUp',
      duration: 1200,
    },
  };
}