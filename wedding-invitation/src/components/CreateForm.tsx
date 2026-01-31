@@ -17,19 +17,21 @@ export default function CreateForm() {
  const [error, setError] = useState('');
  const [scene, setScene] = useState<WeddingScene | null>(null);

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


      if (data.success && data.scene) {
        setScene(data.scene);
@@ -43,14 +45,14 @@ export default function CreateForm() {
    }
  };

  // ✅ IMPORTANT: render card directly, no routing
  if (scene) {
    return <CardRenderer scene={scene} />;
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Wedding Invitation</h2>

        <div style={styles.field}>
@@ -62,8 +64,6 @@ export default function CreateForm() {
            onChange={(e) =>
              setFormData({ ...formData, bride: e.target.value })
            }
            required
            maxLength={100}
          />
        </div>

@@ -76,8 +76,6 @@ export default function CreateForm() {
            onChange={(e) =>
              setFormData({ ...formData, groom: e.target.value })
            }
            required
            maxLength={100}
          />
        </div>

@@ -86,13 +84,10 @@ export default function CreateForm() {
          <input
            type="text"
            style={styles.input}
            placeholder="e.g., March 15, 2025"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
            maxLength={100}
          />
        </div>

@@ -101,13 +96,10 @@ export default function CreateForm() {
          <input
            type="text"
            style={styles.input}
            placeholder="e.g., Grand Ballroom, Mumbai"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            maxLength={200}
          />
        </div>

@@ -118,32 +110,29 @@ export default function CreateForm() {
              <label key={tone} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="tone"
                  value={tone}
                  checked={formData.tone === tone}
                  onChange={() =>
                    setFormData({ ...formData, tone })
                  }
                  style={styles.radio}
                />
                <span style={styles.radioText}>
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Invitation'}




        </button>

        <p style={styles.privacy}>
          Your data is used only to generate this invitation and is not stored.
        </p>
      </form>
    </div>
  );
}
@@ -161,78 +150,29 @@ const styles: Record<string, React.CSSProperties> = {
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
