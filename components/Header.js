'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { company } from '@/lib/content';

const links = [['About','/about'],['Services','/services'],['Projects','/projects'],['FAQ','/faq'],['Contact','/contact']];
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
        <img src="/sses-logo.png" alt="SSES" className="h-11 w-auto" />
      </Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-emerald-950 hover:text-emerald-700">{label}</Link>)}
      </nav>
      <a href={`tel:${company.phoneHref}`} className="hidden rounded-full bg-emerald-950 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 md:inline-flex">Talk to an engineer</a>
      <details ref={mobileMenuRef} className="group relative md:hidden">
        <summary aria-label="Toggle navigation menu" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition hover:bg-emerald-100 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 group-open:hidden"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="hidden h-5 w-5 group-open:block"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </summary>
        <div className="fixed inset-x-0 top-[77px] h-[calc(100dvh-77px)]">
          <button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} className="absolute inset-0 h-full w-full bg-emerald-950/45 backdrop-blur-sm" />
          <nav className="relative z-10 rounded-b-[2rem] bg-[#f7f5ec] px-5 pb-6 pt-3 shadow-2xl" aria-label="Mobile navigation">
            <div className="grid">
              {links.map(([label, href]) => <Link key={href} href={href} onClick={closeMobileMenu} className="flex min-h-14 items-center justify-between border-b border-emerald-950/10 py-4 text-lg font-black text-emerald-950 transition hover:text-emerald-700">{label}<span aria-hidden="true" className="text-emerald-700">→</span></Link>)}
            </div>
            <a href={`tel:${company.phoneHref}`} onClick={closeMobileMenu} className="mt-6 flex w-full items-center justify-center rounded-full bg-emerald-950 px-6 py-4 text-center font-black text-white transition hover:bg-emerald-800">Talk to an engineer</a>
          </nav>
        </div>
      </details>
    </div>
  </header>;
}
