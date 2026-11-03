'use client';

import Image from 'next/image';
import LabLinkedText from '@/components/LabLinkedText';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { BookOpen, GraduationCap, Handshake, Trophy, Users, BriefcaseBusiness, type LucideIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';
import { cardMarkdownComponents } from '@/components/pages/CardPage';

const categories: { name: string; short: string; icon: LucideIcon; description: string }[] = [
    { name: 'Education', short: 'Education', icon: GraduationCap, description: 'Education and academic training.' },
    { name: 'Research', short: 'Research', icon: BriefcaseBusiness, description: 'Research appointments and collaborations.' },
    { name: 'Academic Service', short: 'Service', icon: Handshake, description: 'Contributions to the research community.' },
    { name: 'Leadership', short: 'Leadership', icon: Users, description: 'Leadership, demonstrations, and outreach.' },
    { name: 'Teaching', short: 'Teaching', icon: BookOpen, description: 'Teaching and mentoring experience.' },
    { name: 'Awards', short: 'Awards', icon: Trophy, description: 'Academic honors and recognition.' },
];

export default function ExperiencePage({ config }: { config: CardPageConfig }) {
    const id = useId();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const present = categories.filter(category => config.items.some(item => (item.section || item.tags?.[0]) === category.name));
    const [selected, setSelected] = useState(present[0]?.name || 'Education');
    const active = present.find(category => category.name === selected) || present[0];
    const items = config.items.filter(item => (item.section || item.tags?.[0]) === active?.name);
    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % present.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + present.length) % present.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = present.length - 1;
        else return;
        event.preventDefault();
        setSelected(present[next].name);
        buttons.current[next]?.focus();
    };

    return (
        <div className="mx-auto max-w-5xl">
            <header className="mb-8">
                <div className="mb-3 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><p className="text-[11px] font-bold uppercase tracking-[.2em] text-accent-dark dark:text-accent">Career &amp; Contributions</p></div>
                <h1 className="mb-3 text-4xl font-serif font-bold text-primary">{config.title}</h1>
                {config.description && <p className="max-w-3xl text-lg leading-relaxed text-neutral-600">{config.description}</p>}
            </header>
            <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 dark:border-white/10 dark:bg-neutral-900">
                <div role="tablist" aria-label="Experience categories" className="grid gap-1" style={{ gridTemplateColumns: `repeat(${present.length}, minmax(0, 1fr))` }}>
                    {present.map((category, index) => {
                        const Icon = category.icon;
                        const isSelected = category.name === active?.name;
                        return <button key={category.name} ref={element => { buttons.current[index] = element; }} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={isSelected} aria-controls={`${id}-panel`} tabIndex={isSelected ? 0 : -1} onKeyDown={event => onKeyDown(event, index)} onClick={() => setSelected(category.name)} className={`flex min-w-0 flex-col items-center gap-2 rounded-xl px-1 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${isSelected ? 'bg-white text-primary shadow-sm dark:bg-neutral-800' : 'text-neutral-500 hover:bg-white/60 dark:hover:bg-neutral-800'}`}>
                            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? 'bg-accent/10 text-accent-dark dark:text-accent' : 'bg-neutral-100 text-neutral-500'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                            <span className="w-full truncate text-[10px] font-semibold sm:text-xs md:text-sm"><span className="md:hidden">{category.short}</span><span className="hidden md:inline">{category.name}</span></span>
                        </button>;
                    })}
                </div>
            </div>
            {active && <section role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${present.indexOf(active)}`} tabIndex={0} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                <div className="mb-4"><h2 className="text-2xl font-serif font-bold text-primary">{active.name === 'Education' ? 'Academic Experience' : active.name}</h2><p className="mt-1 text-sm text-neutral-500">{active.description}</p></div>
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
                    {items.map((item, index) => {
                        const Icon = active.icon;
                        return <article key={`${item.title}-${index}`} className="group relative grid grid-cols-[56px_minmax(0,1fr)] gap-3 border-b border-neutral-100 px-4 py-5 last:border-b-0 hover:bg-accent/[.035] sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5 dark:border-white/10">
                            <span className="absolute inset-y-3 left-0 w-0.5 scale-y-0 bg-accent transition-transform group-hover:scale-y-100" />
                            <span className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 sm:h-16 sm:w-16 dark:border-white/10 ${item.logo ? 'bg-white p-1.5' : 'bg-neutral-50 text-accent-dark dark:text-accent'}`}>
                                {item.logo ? <Image src={item.logo} alt="" width={64} height={64} className="h-full w-full object-contain" /> : <Icon className="h-5 w-5" aria-hidden="true" />}
                            </span>
                            <div className="min-w-0"><h3 className="font-semibold leading-snug text-primary"><LabLinkedText text={item.title} href={item.link} /></h3>{item.subtitle && <p className="mt-1 text-sm font-medium text-accent-dark dark:text-accent"><LabLinkedText text={item.subtitle} /></p>}{item.content && <div className="mt-2 text-sm leading-relaxed text-neutral-600"><ReactMarkdown components={cardMarkdownComponents}>{item.content}</ReactMarkdown></div>}</div>
                            {item.date && <p className="col-start-2 whitespace-nowrap text-xs font-medium text-neutral-500 sm:col-start-auto sm:pt-1">{item.date}</p>}
                        </article>;
                    })}
                </div>
            </section>}
        </div>
    );
}
