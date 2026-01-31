export type WeddingScene = {
  mood: 'calm' | 'festive' | 'elegant';

  palette: {
    background: string;
    card: string;
    border: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
  };

  typography: {
    fontFamily: string;
    headingSize: number;
    bodySize: number;
  };

  content: {
    bride: string;
    groom: string;
    date: string;
    location: string;
    blessingLine: string;
    closingLine: string;
  };

  animation: {
    type: 'fadeUp';
    duration: number;
  };
};

export type CardInput = {
  bride: string;
  groom: string;
  date: string;
  location: string;
  tone: 'calm' | 'festive' | 'elegant';
};

export type StoredCard = {
  id: string;
  scene: WeddingScene;
  createdAt: string;
};