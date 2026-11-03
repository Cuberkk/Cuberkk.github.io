'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, GraduationCap, MapPin, ArrowUpRight, Fingerprint } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import type { CardItem } from '@/types/page';

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  researchInterests?: string[];
  education: CardItem[];
}

function EducationRow({ item }: { item: CardItem }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white p-1.5 dark:border-white/10">
        {item.logo ? <Image src={item.logo} alt="" width={44} height={44} className="h-full w-full object-contain" /> : <GraduationCap size={20} className="text-accent-dark" aria-hidden="true" />}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-relaxed text-primary">{item.title}</p>
        {item.subtitle && <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{item.subtitle}</p>}
        {item.date && <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">{item.date}</p>}
      </div>
    </div>
  );
}

export default function Profile({ author, social, researchInterests, education }: ProfileProps) {
  const currentEducation = education.find(item => item.date?.endsWith('Present'));
  const previousEducation = education.filter(item => item !== currentEducation);
  const current = currentEducation || { title: author.title, subtitle: author.institution };
  const links = [
    { title: 'Email', href: social.email ? `mailto:${social.email}` : '', icon: Mail },
    { title: 'Google Scholar', href: social.google_scholar, icon: GraduationCap },
    { title: 'GitHub', href: social.github, icon: Github },
    { title: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { title: 'ORCID', href: social.orcid, icon: Fingerprint },
  ].filter(link => link.href);

  return (
    <aside className="lg:sticky lg:top-28 text-center">
      <div className="mx-auto mb-6 h-56 w-56 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm sm:h-64 sm:w-64">
        <Image src={author.avatar} alt={author.name} width={256} height={256} className="h-full w-full object-cover" priority />
      </div>
      <h1 className="mb-2 font-serif text-4xl font-bold tracking-tight text-primary">{author.name}</h1>
      <p className="text-base font-medium text-accent-dark dark:text-accent">{author.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-500">{author.institution}</p>
      {social.location && <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-500"><MapPin size={13} aria-hidden="true" />{social.location}</p>}
      <div className="mt-7">
        <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-500">Research Focus</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {researchInterests?.map(interest => <span key={interest} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-[11px] leading-none text-neutral-600 dark:border-white/10 dark:bg-neutral-900"><span className="mr-1.5 text-accent" aria-hidden="true">•</span>{interest}</span>)}
        </div>
      </div>
      <div className="my-5 flex justify-center gap-2">
        {links.map(({ title, href, icon: Icon }) => <a key={title} href={href} aria-label={title} title={title} target={title === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" className="rounded-lg p-2.5 text-neutral-500 transition-colors hover:bg-accent/10 hover:text-accent-dark"><Icon size={18} aria-hidden="true" /></a>)}
      </div>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm dark:border-white/10 dark:bg-neutral-900">
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="p-4">
          <div className="mb-3 flex justify-between"><h2 className="text-[10px] font-bold uppercase tracking-[.18em] text-neutral-500">Currently</h2><span className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span></div>
          <EducationRow item={current} />
        </div>
        {previousEducation.length > 0 && <div className="border-t border-neutral-100 p-4 dark:border-white/10">
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-neutral-500">Previous Education</h2>
          <ul className="space-y-5">
            {previousEducation.map(item => <li key={`${item.title}-${item.date}`}><EducationRow item={item} /></li>)}
          </ul>
        </div>}
      </div>
      <Link href="/cv/" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark hover:text-primary dark:text-accent">Curriculum Vitae <ArrowUpRight size={13} aria-hidden="true" /></Link>
    </aside>
  );
}
