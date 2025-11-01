import { readFile } from 'fs/promises';
import { join } from 'path';
import MarkdownRenderer from './MarkdownRenderer';

export default async function BinmatixPrivacyPage() {
  const filePath = join(process.cwd(), 'app', 'privacies', 'binmatix', 'PRIVACY_POLICY.md');
  const markdownContent = await readFile(filePath, 'utf-8');

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <MarkdownRenderer content={markdownContent} />
      </div>
    </div>
  );
}

