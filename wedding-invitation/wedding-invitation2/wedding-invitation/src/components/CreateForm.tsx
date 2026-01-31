'use client';

import { useState } from 'react';
import CardRenderer from './CardRenderer';
import { WeddingScene } from '@/lib/types';

export default function CreateForm() {
  const [scene, setScene] = useState<WeddingScene | null>(null);

  const handleGenerate = () => {
    console.log('[DEBUG] Generate clicked – local mode');

    const demoScene: WeddingScene = {
      mood: 'calm',
      palette: {
        background: '#f5f1e8',
        card: '#ffffff',
        border: '#d4af37',
        accent: '#c9a961',
        textPrimary: '#3e2723',
        textSecondary: '#6d4c41',
      },
      typography: {
        fontFamily: 'Georgia, serif',
        headingSize: 36,
        bodySize: 16,
      },
      content: {
        bride: 'Sita',
        groom: 'Rama',
        date: 'March 15, 2025',
        location: 'Ayodhya',
        blessingLine:
          'May this sacred union be blessed with love, harmony, and divine grace.',
        closingLine:
          'We request the honor of your presence on this auspicious occasion.',
      },
      animation: {
        type: 'fadeUp',
        duration: 1000,
      },
    };

    setScene(demoScene);
  };

  if (scene) {
    return <CardRenderer scene={scene} />;
  }

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Test Invitation Generator</h2>
      <p>This is a frontend-only test. No API. No routing.</p>
      <button onClick={handleGenerate}>Generate Invitation</button>
    </div>
  );
}
