import LegalView from './LegalView';

export const metadata = {
  title: 'Legal',
  description: 'Privacy Policy, Terms of Service and EULA for InWebEdit.',
  alternates: { canonical: '/inwebedit/legal' },
};

export default async function LegalPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initial = tab === 'tos' || tab === 'eula' ? tab : 'privacy';
  return <LegalView initialTab={initial} />;
}
