import { notFound } from 'next/navigation';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';
import { services, serviceBySlug, company } from '@/lib/content';
import { serviceSeo, siteUrl } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const service = serviceBySlug(slug); const seo = serviceSeo[slug]; return { title: seo?.title || service?.title || 'Solar Service', description: seo?.description || service?.excerpt, alternates: { canonical: `/service-details/${slug}/` }, openGraph: { title: seo?.title || service?.title, description: seo?.description || service?.excerpt, url: `/service-details/${slug}/`, type: 'website' } }; }

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const paragraphs = service.content.split(/\n+/).filter(Boolean);
  const seo = serviceSeo[slug];
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: seo?.description || service.excerpt, url: `${siteUrl}/service-details/${slug}/`, image: `${siteUrl}${service.detailImage}`, areaServed: { '@type': 'Country', name: 'Pakistan' }, provider: { '@id': `${siteUrl}/#business` } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
    <section className="bg-amber-300"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><Link href="/services" className="text-sm font-bold">← All services</Link><p className="mt-12 text-xs font-black uppercase tracking-[.25em]">Solar engineering service</p><h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{service.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8">{service.excerpt}</p></div></section>
    <article className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_20rem] lg:px-8">
      <div><img src={service.detailImage} alt={`${service.title} system installation`} className="mb-10 aspect-[4/3] w-full rounded-[2rem] object-cover sm:aspect-[16/7]" /><div className="space-y-6">{paragraphs.map((paragraph, index) => <p key={index} className="text-lg leading-8 text-emerald-950/75">{paragraph}</p>)}</div></div>
      <aside><div className="sticky top-28 rounded-[2rem] bg-emerald-950 p-7 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-300">Discuss your site</p><p className="mt-4 leading-7 text-emerald-100/80">System selection depends on load, location, grid availability and operating hours.</p><a href={`${company.whatsappHref}?text=${encodeURIComponent(`Hi SSES, I want to discuss ${service.title}.`)}`} className="mt-6 block rounded-full bg-amber-300 px-5 py-3 text-center font-black text-emerald-950">Message SSES</a></div></aside>
    </article>
    {seo?.faqs && <FAQSection faqs={seo.faqs} eyebrow={`${service.title} questions`} title="Answers before you plan the system."/>}
  </>;
}
