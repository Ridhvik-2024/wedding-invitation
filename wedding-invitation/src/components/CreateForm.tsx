@@ -1,19 +1,21 @@
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
@@ -29,8 +31,8 @@ export default function CreateForm() {

      const data = await response.json();

      if (data.success) {
        router.push(`/card-preview?data=${encodeURIComponent(JSON.stringify(data.scene))}`);
      } else {
        setError(data.error || 'Failed to generate invitation');
      }
@@ -41,6 +43,11 @@ export default function CreateForm() {
    }
  };






  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
@@ -52,7 +59,9 @@ export default function CreateForm() {
            type="text"
            style={styles.input}
            value={formData.bride}
            onChange={(e) => setFormData({ ...formData, bride: e.target.value })}


            required
            maxLength={100}
          />
@@ -64,7 +73,9 @@ export default function CreateForm() {
            type="text"
            style={styles.input}
            value={formData.groom}
            onChange={(e) => setFormData({ ...formData, groom: e.target.value })}


            required
            maxLength={100}
          />
@@ -77,7 +88,9 @@ export default function CreateForm() {
            style={styles.input}
            placeholder="e.g., March 15, 2025"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}


            required
            maxLength={100}
          />
@@ -90,7 +103,9 @@ export default function CreateForm() {
            style={styles.input}
            placeholder="e.g., Grand Ballroom, Mumbai"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}


            required
            maxLength={200}
          />
@@ -106,10 +121,14 @@ export default function CreateForm() {
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
@@ -122,7 +141,7 @@ export default function CreateForm() {
        </button>

        <p style={styles.privacy}>
          Your data will be used only to generate the invitation and will not be stored afterward.
        </p>
      </form>
    </div>
@@ -171,7 +190,6 @@ const styles: Record<string, React.CSSProperties> = {
    border: '2px solid #e1bee7',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  radioGroup: {
@@ -201,7 +219,6 @@ const styles: Record<string, React.CSSProperties> = {
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    backgroundColor: '#ffebee',
@@ -218,5 +235,4 @@ const styles: Record<string, React.CSSProperties> = {
    textAlign: 'center',
    fontStyle: 'italic',
  },

};
