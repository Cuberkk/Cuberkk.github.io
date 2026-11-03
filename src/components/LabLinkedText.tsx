import Link from 'next/link';
import { Fragment } from 'react';

/** Keep lab links separate from an optional surrounding detail-page link. */
export default function LabLinkedText({ text, href }: { text: string; href?: string }) {
    return text.split(/(ERIE lab)/gi).map((part, index) => (
        <Fragment key={index}>
            {/^ERIE lab$/i.test(part) ? (
                <a href="https://enhanced-telerobotics.github.io/index.html" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">{part}</a>
            ) : href ? (
                <Link href={href} className="transition-colors hover:text-accent-dark dark:hover:text-accent">{part}</Link>
            ) : part}
        </Fragment>
    ));
}
