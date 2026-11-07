import Link from 'next/link';
import { company } from '@/lib/content';

const links = [['About','/about'],['Services','/services'],['Projects','/projects'],['FAQ','/faq'],['Contact','/contact']];
export default function Header() {
  return <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f7f5ec]/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Link href="/" className="flex items-center gap-3" aria-label="SSES home">
        <img src="/sses-logo.png" alt="SSES" className="h-11 w-auto" />
      </Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-emerald-950 hover:text-emerald-700">{label}</Link>)}
      </nav>
      <a href={`tel:${company.phoneHref}`} className="hidden rounded-full bg-emerald-950 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 md:inline-flex">Talk to an engineer</a>
      <details className="relative md:hidden"><summary className="cursor-pointer list-none rounded-full border border-emerald-950/20 px-4 py-2 text-sm font-bold">Menu</summary><nav className="absolute right-0 mt-3 grid w-56 gap-1 rounded-2xl border border-emerald-950/10 bg-white p-3 shadow-xl">{links.map(([label, href]) => <Link key={href} href={href} className="rounded-xl px-4 py-3 font-semibold hover:bg-emerald-50">{label}</Link>)}</nav></details>
    </div>
  </header>;
}
