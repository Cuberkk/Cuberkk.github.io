'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { CardPageConfig } from '@/types/page';

export const cardMarkdownComponents: Components = {
    p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    a: ({ href, children }) => (
        <a href={href}
            {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-accent-dark dark:text-accent font-medium underline-offset-4 hover:underline">
            {children}
        </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">{children}</code>,
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const Heading = embedded ? 'h2' : 'h1';
    return (
        <div>
            <header className={embedded ? 'mb-5' : 'mb-9'}>
                {!embedded && <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-accent-dark dark:text-accent">Research &amp; Development</p>}
                <Heading className={`${embedded ? 'text-2xl' : 'text-4xl'} font-serif font-bold text-primary mb-3`}>{config.title}</Heading>
                {config.description && (
                    <div className="max-w-3xl text-base leading-relaxed text-neutral-600">
                        <ReactMarkdown components={cardMarkdownComponents}>{config.description}</ReactMarkdown>
                    </div>
                )}
            </header>
            <div className="grid gap-6">
                {config.items.map((item, index) => (
                    <article key={`${item.title}-${index}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-neutral-900">
                        <div className={`grid gap-5 p-5 sm:p-6 ${item.image ? 'sm:grid-cols-[180px_minmax(0,1fr)]' : ''}`}>
                            {item.image && (
                                <div className="overflow-hidden rounded-xl border border-neutral-100 bg-white self-start">
                                    <Image src={item.image} alt={`${item.title} overview`} width={600} height={400} className="aspect-[3/2] w-full object-contain" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                                    <span>Project {String(index + 1).padStart(2, '0')}</span>
                                    {item.date && <span>{item.date}</span>}
                                </div>
                                <h3 className="text-xl font-serif font-bold leading-snug text-primary">
                                    {item.link ? <Link href={item.link} className="transition-colors hover:text-accent-dark dark:hover:text-accent">{item.title}</Link> : item.title}
                                </h3>
                                {item.subtitle && <p className="mt-2 text-sm font-medium text-accent-dark dark:text-accent">{item.subtitle}</p>}
                                {item.content && <div className="mt-3 text-sm leading-relaxed text-neutral-600"><ReactMarkdown components={cardMarkdownComponents}>{item.content}</ReactMarkdown></div>}
                                {item.tags && item.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] text-neutral-500 dark:border-white/10">{tag}</span>)}</div>}
                                {item.link && <Link href={item.link} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark dark:text-accent">Explore project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
