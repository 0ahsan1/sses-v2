import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FAQSection from '@/components/FAQSection';
import { team, testimonials } from '@/lib/content';
import { pageFaqs } from '@/lib/seo';

export const metadata = {
  title: 'About Sustainable Energy Solutions | SSES',
  description: 'Meet Sustainable Energy Solutions and explore SSES solar engineering experience across Karachi and documented project locations in Balochistan.',
  alternates: { canonical: '/about/' },
};

const karachiAreas = ['North Nazimabad', 'Scheme 33', 'DHA', 'Gulshan-e-Iqbal'];
const balochistanAreas = ['Shah Noorani', 'Khuzdar', 'Wadh', 'Uthal'];

export default function About() {
  return <>
    <PageHero eyebrow="About Sustainable Energy Solutions" title="Solar engineering experience from Karachi to remote Balochistan." intro="SSES combines site-specific design with practical installation experience across homes, businesses, public infrastructure, agriculture and remote communities." />
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-2 lg:px-8">
      <div className="rounded-[2rem] bg-amber-300 p-8 sm:p-12"><p className="text-xs font-black uppercase tracking-[.25em]">Our approach</p><h2 className="mt-8 text-4xl font-black tracking-tight">Design around demand, constraints and continuity.</h2></div>
      <div className="rounded-[2rem] bg-white p-8 sm:p-12"><p className="text-lg leading-8 text-emerald-950/75">SSES works across grid-connected, stand-alone, hybrid, pumping and water-heating applications. Each engagement begins with the operating need and site context, then moves through system selection, installation and commissioning.</p></div>
    </section>
    <section className="bg-emerald-50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Experience where it matters</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-emerald-950 sm:text-5xl">Proven solar work across city properties and demanding remote sites.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">The SSES portfolio documents residential, institutional, agricultural and water-supply projects. It includes Karachi installations as well as work delivered for Public Health Engineering Khuzdar and Lasbela University of Agriculture, Water and Marine Sciences.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-emerald-950/5">
            <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Karachi service areas</p>
            <h3 className="mt-4 text-2xl font-black text-emerald-950">Solar support for homes and growing businesses.</h3>
            <p className="mt-4 leading-7 text-slate-600">SSES serves residential, commercial and industrial customers in these popular solar markets and across Karachi.</p>
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Karachi solar service areas">{karachiAreas.map((area) => <li key={area} className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-950">{area}</li>)}</ul>
          </article>
          <article className="rounded-[2rem] bg-emerald-950 p-8 text-white">
            <p className="text-xs font-black uppercase tracking-[.25em] text-amber-300">Balochistan project experience</p>
            <h3 className="mt-4 text-2xl font-black">Engineering for agriculture, water supply and remote communities.</h3>
            <p className="mt-4 leading-7 text-emerald-100/80">Published SSES projects document solar pumping, irrigation, water-supply and institutional work across these Balochistan locations.</p>
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Balochistan solar project areas">{balochistanAreas.map((area) => <li key={area} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">{area}</li>)}</ul>
          </article>
        </div>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/projects" className="w-full rounded-full bg-emerald-950 px-6 py-3 text-center font-black text-white sm:w-auto">Explore completed projects</Link><Link href="/contact" className="w-full rounded-full bg-amber-300 px-6 py-3 text-center font-black text-emerald-950 sm:w-auto">Discuss your site</Link></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Leadership</p><div className="mt-8 grid gap-5 md:grid-cols-3">{team.map((m) => <article key={m.id} className="rounded-[2rem] border border-emerald-950/10 bg-white p-7"><h2 className="text-xl font-black">{m.name}</h2><p className="mt-2 text-sm text-emerald-800/70">{m.role}</p>{m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-bold underline">LinkedIn</a>}</article>)}</div></section>
    <FAQSection faqs={pageFaqs.about} eyebrow="About SSES" title="How SSES approaches solar projects." />
    <section className="bg-emerald-950"><div className="mx-auto max-w-7xl px-5 py-20 text-white lg:px-8"><h2 className="text-4xl font-black">What clients recorded.</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{testimonials.map((t) => <figure key={t.id} className="rounded-[2rem] border border-white/10 p-7"><blockquote className="leading-7 text-emerald-50/80">“{t.message}”</blockquote><figcaption className="mt-5 font-bold">{t.name}<span className="block text-sm font-normal opacity-60">{t.designation}</span></figcaption></figure>)}</div></div></section>
  </>;
}
