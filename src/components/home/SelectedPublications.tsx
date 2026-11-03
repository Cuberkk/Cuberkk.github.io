'use client';

import Link from 'next/link';
import { Publication } from '@/types/publication';
import PublicationCard from '@/components/publications/PublicationCard';

export default function SelectedPublications({ publications, title = 'Selected Publications' }: { publications: Publication[]; title?: string; enableOnePageMode?: boolean }) {
  return <section id="publications_about"><div className="mb-5 flex items-center justify-between gap-4"><h2 className="font-serif text-2xl font-bold text-primary">{title}</h2><Link href="/publications/" className="shrink-0 text-xs font-semibold text-accent-dark hover:text-primary dark:text-accent">View All →</Link></div><div className="space-y-5">{publications.map((pub, index) => <PublicationCard key={pub.id} publication={pub} index={index} />)}</div></section>;
}
