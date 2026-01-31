'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bride: '',
    groom: '',
    date: '',
    location: '',
    tone: 'calm' as 'calm' | 'festive' | 'elegant',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/card-preview?data=${encodeURIComponent(JSON.stringify(data.scene))}`);
      } else {
        setError(data.error || 'Failed to generate invitation');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Wedding Invitation</h2>

        <div style={styles.field}>
          <label style={styles.label}>Bride's Name</label>
          <input
            type="text"
            style={styles.input}
            value={formData.bride}
            onChange={(e) => setFormData({ ...formData, bride: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Groom's Name</label>
          <input
            type="text"
            style={styles.input}
            value={formData.groom}
            onChange={(e) => setFormData({ ...formData, groom: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Wedding Date</label>
          <input
            type="text"
            style={styles.input}
            placeholder="e.g., March 15, 2025"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            style={styles.input}
            placeholder="e.g., Grand Ballroom, Mumbai"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            maxLength={200}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tone</label>
          <div style={styles.radioGroup}>
            {(['calm', 'festive', 'elegant'] as const).map((tone) => (
              <label key={tone} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="tone"
                  value={tone}
                  checked={formData.tone === tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                  style={styles.radio}
                />
                <span style={styles.radioText}>{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Invitation'}
        </button>

        <p style={styles.privacy}>
          Your data will be used only to generate the invitation and will not be stored afterward.
        </p>
      </form>
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
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#880e4f',
    marginBottom: '30px',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
  },
  field: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a148c',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #e1bee7',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radio: {
    marginRight: '6px',
    cursor: 'pointer',
  },
  radioText: {
    fontSize: '16px',
    color: '#6a1b9a',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#7b1fa2',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  privacy: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#9e9e9e',
    textAlign: 'center',
    fontStyle: 'italic',
  },

};
