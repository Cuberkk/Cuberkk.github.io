'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { Publication } from '@/types/publication';
import FormattedBibTeXText from './FormattedBibTeXText';

export default function PublicationCard({ publication: pub, index }: { publication: Publication; index: number }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(pub.bibtex || '');
      setCopied(true);
      setCopyError('');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError('Select and copy the citation below.');
    }
  }
  return (
    <article className="publication-card rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-accent/50 dark:border-white/10 dark:bg-neutral-900 sm:p-6">
      <div className={pub.preview ? 'grid gap-5 sm:grid-cols-[160px_minmax(0,1fr)]' : ''}>
        {pub.preview && <div className="flex min-h-36 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-white p-2"><Image src={pub.preview.startsWith('/') || pub.preview.startsWith('http') ? pub.preview : `/papers/${pub.preview}`} alt={`Research overview: ${pub.title}`} width={360} height={240} className="max-h-48 w-full object-contain" /></div>}
        <div className="min-w-0">
          <div className="mb-2 flex items-start justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-wider text-accent-dark dark:text-accent">{pub.journal || pub.conference || pub.type} · {pub.year}</p><span className="text-xs tabular-nums text-neutral-400">{String(index + 1).padStart(2, '0')}</span></div>
          <h3 className="mb-2 text-base font-semibold leading-snug text-primary">{pub.projectUrl ? <Link href={pub.projectUrl} className="hover:text-accent-dark"><FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} /></Link> : <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />}</h3>
          <p className="text-sm leading-relaxed text-neutral-500">{pub.authors.map((author, i) => <span key={`${author.name}-${i}`}><span className={author.isHighlighted ? 'font-semibold text-primary underline decoration-accent/60 underline-offset-4' : ''}>{author.name}</span>{author.isCorresponding && <sup>*</sup>}{i < pub.authors.length - 1 ? ', ' : ''}</span>)}</p>
          {pub.description && <p className="mt-3 text-sm leading-relaxed text-neutral-500">{pub.description}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-accent-dark dark:text-accent">
            {(pub.pdfUrl || pub.url) && <a href={pub.pdfUrl || pub.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">Paper <ArrowUpRight size={12} aria-hidden="true" /></a>}
            {pub.code && <a href={pub.code} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Code ↗</a>}
            {pub.projectUrl && <Link href={pub.projectUrl} className="hover:text-primary">Project →</Link>}
          </div>
        </div>
      </div>
      {(pub.abstract || pub.bibtex) && <div className="mt-4 flex flex-wrap items-start gap-x-5 gap-y-3 border-t border-neutral-100 pt-3 dark:border-white/10">
        {pub.abstract && <details className="publication-details"><summary className="cursor-pointer text-xs font-medium text-neutral-500 hover:text-accent-dark">Abstract</summary><p className="mt-3 text-sm leading-relaxed text-neutral-500">{pub.abstract}</p></details>}
        {pub.bibtex && <details className="publication-details"><summary className="cursor-pointer text-xs font-medium text-neutral-500 hover:text-accent-dark">BibTeX</summary><div className="mt-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800"><button type="button" onClick={copyCitation} className="mb-2 flex items-center gap-1.5 text-xs font-medium text-accent-dark dark:text-accent">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Copied' : 'Copy citation'}</button><span role="status" className="text-xs text-neutral-500">{copyError}</span><pre className="overflow-x-auto whitespace-pre-wrap break-words text-[11px] leading-relaxed text-neutral-600">{pub.bibtex}</pre></div></details>}
      </div>}
    </article>
  );
}
