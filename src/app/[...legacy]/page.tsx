import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import records from '@/../content/legacy-details.json';

export const dynamicParams = false;
export function generateStaticParams() {
  return records.map(record => ({ legacy: record.permalink.split('/').filter(Boolean) }));
}
function getRecord(segments: string[]) {
  return records.find(record => record.permalink === `/${segments.join('/')}`);
}
export async function generateMetadata({ params }: { params: Promise<{ legacy: string[] }> }): Promise<Metadata> {
  const record = getRecord((await params).legacy);
  return { title: record?.title.replace(/<[^>]+>/g, ''), description: record?.excerpt || undefined };
}
export default async function ResearchDetail({ params }: { params: Promise<{ legacy: string[] }> }) {
  const record = getRecord((await params).legacy);
  if (!record) notFound();
  const back = record.kind === 'publication' ? '/publications/' : record.collection === 'selected_projects' ? '/projects/' : '/experience/';
  return <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href={back} className="mb-8 inline-block text-xs font-semibold text-accent-dark dark:text-accent">← {record.kind === 'publication' ? 'Publications' : record.collection === 'selected_projects' ? 'Projects' : 'Experience'}</Link>
    <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-accent-dark dark:text-accent">{record.collection.replace('_', ' ')}</p>
    <h1 className="mb-4 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl" dangerouslySetInnerHTML={{ __html: record.title }} />
    <p className="mb-8 text-sm text-neutral-500" dangerouslySetInnerHTML={{ __html: record.venue || '' }} />
    {'advisor' in record && record.advisor && <p className="mb-6 text-sm text-neutral-500"><strong>Advisor:</strong> {record.advisor}</p>}
    {record.collection === 'selected_projects' && record.excerpt && <p className="mb-8 leading-relaxed text-neutral-600">{record.excerpt}</p>}
    <div className="research-body space-y-5 leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: record.body }} />
    {'citation' in record && record.citation && <section className="mt-10 border-t border-neutral-200 pt-6"><h2 className="mb-3 font-serif text-xl font-bold text-primary">Citation</h2><p className="text-sm leading-relaxed text-neutral-500" dangerouslySetInnerHTML={{ __html: record.citation }} /></section>}
    <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-accent-dark dark:text-accent">
      {'paperurl' in record && record.paperurl && <a href={record.paperurl}>Download paper ↗</a>}
      {'bibtexurl' in record && record.bibtexurl && <a href={record.bibtexurl}>Download BibTeX ↗</a>}
    </div>
  </article>;
}
