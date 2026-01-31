'use client';

import { useRouter } from 'next/navigation';

export default function LandingHero() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>AI-Powered Hindu Wedding Invitations</h1>
        <p style={styles.subtitle}>
          Create beautiful, personalized wedding invitations in seconds.
          Share via a private link. No app required.
        </p>
        <div style={styles.features}>
          <div style={styles.feature}>
            <span style={styles.icon}>🤖</span>
            <span>AI-Generated</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.icon}>🔒</span>
            <span>Privacy-First</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.icon}>🌐</span>
            <span>Web-Based</span>
          </div>
        </div>
        <button style={styles.cta} onClick={() => router.push('/create')}>
          Create Your Invitation
        </button>
        <p style={styles.privacy}>
          Your personal data is never stored. Cards are generated once and shared via unique links.
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
    background: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)',
    padding: '20px',
  },
  content: {
    maxWidth: '700px',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#bf360c',
    marginBottom: '20px',
    fontFamily: 'Georgia, serif',
  },
  subtitle: {
    fontSize: '20px',
    color: '#5d4037',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    color: '#6d4c41',
  },
  icon: {
    fontSize: '32px',
  },
  cta: {
    backgroundColor: '#ff6f00',
    color: 'white',
    border: 'none',
    padding: '16px 48px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(191, 54, 12, 0.3)',
  },
  privacy: {
    marginTop: '30px',
    fontSize: '14px',
    color: '#8d6e63',
    fontStyle: 'italic',
  },
};