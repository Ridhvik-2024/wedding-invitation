import { notFound } from 'next/navigation';
import CardRenderer from '@/components/CardRenderer';
import { getCard } from '@/lib/storage';

type PageProps = {
  params: { id: string };
};

export default function CardPage({ params }: PageProps) {
  const { id } = params;
  const card = getCard(id);

  if (!card) {
    notFound();
  }

  return <CardRenderer scene={card.scene} />;
}
