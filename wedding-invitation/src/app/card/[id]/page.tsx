import { notFound } from 'next/navigation';
import CardRenderer from '@/components/CardRenderer';
import { getCard } from '@/lib/storage';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CardPage({ params }: PageProps) {
  const { id } = await params;
  const card = getCard(id);

  if (!card) {
    notFound();
  }

  return <CardRenderer scene={card.scene} />;
}