'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { company } from '@/lib/content';

const links = [['About','/about'],['Services','/services'],['Projects','/projects'],['FAQ','/faq'],['Contact','/contact']];
const mobileIcons = {
  '/about': <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0" />,
  '/services': <path d="m14.7 6.3 3-3a4 4 0 0 1-5.2 5.2l-6.6 6.6a2 2 0 0 0 2.8 2.8l6.6-6.6a4 4 0 0 1 5.2-5.2l-3 3" />,
  '/projects': <><path d="M4 7h16v12H4z" /><path d="M9 7V5h6v2" /></>,
  '/faq': <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.2 2.3c-.7.3-1 1-1 1.7M12 17h.01" /></>,
  '/contact': <><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></>,
};
export default function Header() {
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (mobileMenuRef.current?.open && !mobileMenuRef.current.contains(event.target)) {
        mobileMenuRef.current.open = false;
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && mobileMenuRef.current?.open) {
        mobileMenuRef.current.open = false;
        mobileMenuRef.current.querySelector('summary')?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  };

  return <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f7f5ec]/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Link href="/" className="flex items-center gap-3" aria-label="SSES home">
        <img src="/sses-logo.png" alt="Sustainable Solar Energy Solutions" className="h-11 w-auto object-contain" />
      </Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-emerald-950 hover:text-emerald-700">{label}</Link>)}
      </nav>
      <a href={`tel:${company.phoneHref}`} className="hidden rounded-full bg-emerald-950 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 md:inline-flex">Talk to an engineer</a>
      <details ref={mobileMenuRef} className="group relative md:hidden">
        <summary aria-label="Toggle navigation menu" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition hover:bg-slate-100 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 group-open:hidden"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="hidden h-5 w-5 group-open:block"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </summary>
        <div className="fixed inset-x-0 top-[77px] h-[calc(100dvh-77px)]">
          <button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} className="absolute inset-0 h-full w-full bg-slate-950/55 backdrop-blur-sm" />
          <nav className="absolute right-5 top-3 z-10 w-[calc(100%-2.5rem)] max-w-sm rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-2xl" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {links.map(([label, href]) => <Link key={href} href={href} onClick={closeMobileMenu} className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-base font-semibold text-emerald-950 transition hover:bg-slate-100"><span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-white shadow-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">{mobileIcons[href]}</svg></span><span className="flex-1">{label}</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-950/40"><path d="m9 18 6-6-6-6" /></svg></Link>)}
            </div>
            <a href={`tel:${company.phoneHref}`} onClick={closeMobileMenu} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-800"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" /></svg>Talk to an engineer</a>
          </nav>
        </div>
      </details>
    </div>
  </header>;
}
