'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 text-foreground" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-2xl font-semibold mt-4 mb-2 text-foreground" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 text-foreground leading-relaxed" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="ml-4 text-foreground" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          code: ({ ...props }) => (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-border" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

