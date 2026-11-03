'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import PublicationCard from './PublicationCard';

export default function PublicationsList({ config, publications, embedded = false }: { config: PublicationPageConfig; publications: Publication[]; embedded?: boolean }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [type, setType] = useState('all');
  const years = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);
  const types = [...new Set(publications.map(pub => pub.type))];
  const filtered = useMemo(() => publications.filter(pub => (year === 'all' || String(pub.year) === year) && (type === 'all' || pub.type === type) && [pub.title, pub.journal, pub.conference, ...pub.authors.map(author => author.name)].join(' ').toLowerCase().includes(query.toLowerCase())), [publications, query, year, type]);
  return <section>
    <header className="mb-8"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-accent-dark dark:text-accent">Research & Publications</p><h1 className={`${embedded ? 'text-2xl' : 'text-4xl'} mb-3 font-serif font-bold text-primary`}>{config.title}</h1>{config.description && <p className="max-w-3xl text-base leading-relaxed text-neutral-500">{config.description}</p>}</header>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <label className="relative min-w-0 flex-1"><span className="sr-only">Search publications</span><Search className="absolute left-3 top-3 text-neutral-400" size={17} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, author, or venue…" className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm dark:border-white/10 dark:bg-neutral-900" /></label>
      <label><span className="sr-only">Publication year</span><select value={year} onChange={event => setYear(event.target.value)} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm sm:w-auto dark:border-white/10 dark:bg-neutral-900"><option value="all">All years</option>{years.map(y => <option key={y}>{y}</option>)}</select></label>
      <label><span className="sr-only">Publication type</span><select value={type} onChange={event => setType(event.target.value)} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm sm:w-auto dark:border-white/10 dark:bg-neutral-900"><option value="all">All types</option>{types.map(t => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}</select></label>
    </div>
    <p role="status" className="mb-5 text-xs text-neutral-500">{filtered.length} publication{filtered.length === 1 ? '' : 's'}</p>
    <div className="space-y-5">{filtered.map((pub, index) => <PublicationCard key={pub.id} publication={pub} index={index} />)}</div>
    {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-neutral-200 px-5 py-12 text-center text-sm text-neutral-500">No publications match these filters.<button type="button" className="mx-auto mt-3 block font-semibold text-accent-dark" onClick={() => { setQuery(''); setYear('all'); setType('all'); }}>Clear filters</button></div>}
  </section>;
}
