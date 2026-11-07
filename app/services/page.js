import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import FAQSection from '@/components/FAQSection';
import { services } from '@/lib/content';
import { pageFaqs } from '@/lib/seo';

export const metadata = {
  title: 'Solar Installation Services in Karachi',
  description: 'Solar panel installation in Karachi for homes, businesses and industrial sites, including on-grid, hybrid, off-grid, pumping and water-heating systems.',
  alternates: { canonical: '/services/' },
};

const customerTypes = [
  { title: 'Homes', text: 'Residential solar systems planned around daytime use, electricity bills, roof space and backup needs.' },
  { title: 'Businesses', text: 'Commercial solar for shops, offices and other sites that want to reduce daytime grid consumption.' },
  { title: 'Industrial sites', text: 'Solar designs based on operating hours, three-phase loads, available space and continuity requirements.' },
];

const serviceAreas = ['North Nazimabad', 'Scheme 33', 'DHA', 'Gulshan-e-Iqbal'];

const comparisonPoints = [
  { title: 'Start with the design', text: 'A useful proposal should reflect your bills or load profile, operating hours, roof or ground space, shading and backup requirement.' },
  { title: 'Compare the complete scope', text: 'Review exact equipment models, mounting structure, electrical protection, installation, testing and any approval-related work—not price alone.' },
  { title: 'Measure long-term value', text: 'Check expected generation, manufacturer and workmanship warranties, local support, monitoring and maintenance requirements.' },
];

export default function Services() {
  return <>
    <PageHero eyebrow="Solar installation services" title="Solar installation in Karachi for homes, businesses and industry." intro="Compare grid-connected, hybrid, independent, water-pumping and water-heating solutions designed around how your site actually uses energy." />
    <section className="bg-emerald-50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Residential, commercial and industrial</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">Solar system installation in Karachi, designed for the way you use power.</h2>
        <p className="mt-5 max-w-3xl leading-7 text-slate-600">SSES assesses the site, load profile and operating priorities before recommending a system. This keeps the design relevant whether the goal is lower home electricity bills, business daytime savings or dependable power for an industrial facility.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {customerTypes.map((customer) => <article key={customer.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-950/5"><h3 className="text-xl font-black text-emerald-950">{customer.title}</h3><p className="mt-3 leading-7 text-slate-600">{customer.text}</p></article>)}
        </div>
        <div className="mt-10 rounded-3xl bg-emerald-950 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-black">Popular Karachi service areas</h2>
          <p className="mt-3 max-w-3xl leading-7 text-emerald-100/80">We serve homeowners, businesses and industrial customers in these areas and other locations across Karachi.</p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Popular Karachi solar installation areas">{serviceAreas.map((area) => <li key={area} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">{area}</li>)}</ul>
        </div>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 md:grid-cols-2 lg:px-8">
      {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      <article className="flex h-full min-h-[28rem] flex-col justify-between rounded-[2rem] bg-emerald-100 p-8 sm:p-10"><div><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Plan your system</p><h2 className="mt-5 text-3xl font-black tracking-tight">Not sure which solar setup fits your site?</h2><p className="mt-4 max-w-xl leading-7 text-emerald-950/70">Share your property type, energy use and project goals with SSES.</p></div><Link href="/contact" className="mt-8 inline-flex w-full justify-center rounded-full bg-emerald-950 px-6 py-3 text-center font-black text-white sm:w-fit">Request a consultation</Link></article>
    </section>
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Price, quality and value</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-emerald-950 sm:text-5xl">How to compare solar installation companies and quotations.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">The cheapest quotation is not automatically the best-value solar installation. A fair comparison uses the same technical requirement and checks what is included throughout the system’s working life.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{comparisonPoints.map((point) => <article key={point.title} className="rounded-[2rem] border border-slate-200 p-7"><h3 className="text-xl font-black text-emerald-950">{point.title}</h3><p className="mt-4 leading-7 text-slate-600">{point.text}</p></article>)}</div>
      </div>
    </section>
    <FAQSection faqs={pageFaqs.services} eyebrow="Choosing a solar system" title="Questions to answer before installation." />
  </>;
}
