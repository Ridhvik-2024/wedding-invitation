'use client';

import { useState } from 'react';
import CardRenderer from './CardRenderer';
import { WeddingScene } from '@/lib/types';

export default function CreateForm() {
  const [scene, setScene] = useState<WeddingScene | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [bride, setBride] = useState('');
  const [groom, setGroom] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [tone, setTone] = useState<'calm' | 'festive' | 'elegant'>('calm');

  const handleGenerate = async () => {
    console.log('[DEBUG] Generate clicked');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bride,
          groom,
          date,
          location,
          tone,
        }),
      });

      const data = await res.json();
      console.log('[DEBUG] API response:', data);

      if (data.success && data.scene) {
        setScene(data.scene);
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ If scene exists, render card immediately
  if (scene) {
    return <CardRenderer scene={scene} />;
  }

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: '0 auto' }}>
      <h2>Create Wedding Invitation</h2>

      <input placeholder="Bride" value={bride} onChange={(e) => setBride(e.target.value)} />
      <br /><br />
      <input placeholder="Groom" value={groom} onChange={(e) => setGroom(e.target.value)} />
      <br /><br />
      <input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <br /><br />
      <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <br /><br />

      <select value={tone} onChange={(e) => setTone(e.target.value as any)}>
        <option value="calm">Calm</option>
        <option value="festive">Festive</option>
        <option value="elegant">Elegant</option>
      </select>

      <br /><br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate'}
      </button>
    </div>
  );
}
