'use client';

import { useState } from 'react';
import CardRenderer from './CardRenderer';
import { WeddingScene } from '@/lib/types';

export default function CreateForm() {
  const [formData, setFormData] = useState({
    bride: '',
    groom: '',
    date: '',
    location: '',
    tone: 'calm' as 'calm' | 'festive' | 'elegant',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scene, setScene] = useState<WeddingScene | null>(null);

  const handleGenerate = async () => {
    setError('');
    setLoading(true);

    try {
      console.log('[DEBUG] Generate clicked');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('[DEBUG] API response:', data);

      if (data.success && data.scene) {
        setScene(data.scene);
      } else {
        setError(data.error || 'Failed to generate invitation');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render card immediately, no routing
  if (scene) {
    return <CardRenderer scene={scene} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Create Wedding Invitation</h2>

        <div style={styles.field}>
          <label style={styles.label}>Bride's Name</label>
          <input
            type="text"
            style={styles.input}
            value={formData.bride}
            onChange={(e) =>
              setFormData({ ...formData, bride: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Groom's Name</label>
          <input
            type="text"
            style={styles.input}
            value={formData.groom}
            onChange={(e) =>
              setFormData({ ...formData, groom: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Wedding Date</label>
          <input
            type="text"
            style={styles.input}
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            style={styles.input}
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tone</label>
          <div style={styles.radioGroup}>
            {(['calm', 'festive', 'elegant'] as const).map((tone) => (
              <label key={tone} style={styles.radioLabel}>
                <input
                  type="radio"
                  checked={formData.tone === tone}
                  onChange={() => setFormData({ ...formData, tone })}
                />
                <span style={styles.radioText}>{tone}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          onClick={handleGenerate}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Generating…' : 'Generate Invitation'}
        </button>

        <p style={styles.privacy}>
          Your data is used only to generate this invitation and is not stored.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    padding: '20px',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px' },
  input: { width: '100%', padding: '10px' },
  radioGroup: { display: 'flex', gap: '12px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '4px' },
  radioText: { textTransform: 'capitalize' },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#7b1fa2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
  },
  error: { color: 'red', marginBottom: '12px' },
  privacy: { fontSize: '12px', textAlign: 'center', marginTop: '12px' },
};
