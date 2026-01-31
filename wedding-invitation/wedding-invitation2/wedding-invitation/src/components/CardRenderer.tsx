'use client';

import { WeddingScene } from '@/lib/types';
import { useEffect, useState } from 'react';

type CardRendererProps = {
  scene: WeddingScene;
};

export default function CardRenderer({ scene }: CardRendererProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: scene.palette.background,
    padding: '20px',
    fontFamily: scene.typography.fontFamily,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: scene.palette.card,
    border: `4px solid ${scene.palette.border}`,
    borderRadius: '16px',
    padding: '60px 40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all ${scene.animation.duration}ms ease-out`,
  };

  const ornamentStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '32px',
    color: scene.palette.accent,
    marginBottom: '20px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: `${scene.typography.headingSize}px`,
    fontWeight: 'bold',
    color: scene.palette.textPrimary,
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '1.3',
  };

  const dividerStyle: React.CSSProperties = {
    width: '80px',
    height: '3px',
    backgroundColor: scene.palette.accent,
    margin: '20px auto',
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: `${scene.typography.bodySize}px`,
    color: scene.palette.textSecondary,
    textAlign: 'center',
    lineHeight: '1.8',
    marginBottom: '16px',
  };

  const blessingStyle: React.CSSProperties = {
    ...bodyStyle,
    fontStyle: 'italic',
    marginTop: '30px',
    marginBottom: '30px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={ornamentStyle}>✦ ॐ ✦</div>

        <h1 style={headingStyle}>
          {scene.content.bride}
          <br />
          &
          <br />
          {scene.content.groom}
        </h1>

        <div style={dividerStyle} />

        <p style={bodyStyle}>
          <strong>Date:</strong> {scene.content.date}
        </p>
        <p style={bodyStyle}>
          <strong>Venue:</strong> {scene.content.location}
        </p>

        <div style={dividerStyle} />

        <p style={blessingStyle}>{scene.content.blessingLine}</p>

        <p style={bodyStyle}>{scene.content.closingLine}</p>

        <div style={{ ...ornamentStyle, marginTop: '30px', marginBottom: '0' }}>
          ✦
        </div>
      </div>
    </div>
  );
}