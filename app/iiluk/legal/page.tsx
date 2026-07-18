import LegalView from './LegalView';

export const metadata = { title: 'Legal' };

export default async function LegalPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initial = tab === 'tos' || tab === 'eula' ? tab : 'privacy';
  return <LegalView initialTab={initial} />;
}
