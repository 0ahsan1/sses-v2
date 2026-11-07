import { notFound } from 'next/navigation';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';
import { projects, projectBySlug, company } from '@/lib/content';
import { getProjectFaqs, siteUrl } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const project = projectBySlug(slug); const description = project ? `${project.title} is a documented ${project.category || project.type || 'solar installation'} project by SSES in ${project.location}.` : 'SSES solar installation project.'; return { title: project ? `${project.title} Solar Project` : 'Solar Project', description, alternates: { canonical: `/project-details/${slug}/` }, openGraph: { title: project ? `${project.title} Solar Project` : 'Solar Project', description, url: `/project-details/${slug}/`, type: 'article' } }; }

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const projectFaqs = getProjectFaqs(project);
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Projects', item: `${siteUrl}/projects/` }, { '@type': 'ListItem', position: 2, name: project.title, item: `${siteUrl}/project-details/${slug}/` }] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    <header className="bg-emerald-950 text-white"><div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28"><Link href="/projects" className="text-sm font-bold text-amber-300">← Project archive</Link><p className="mt-14 text-xs font-black uppercase tracking-[.25em] text-emerald-200">{project.category}</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{project.title}</h1><p className="mt-6 text-xl text-emerald-100/70">{project.location}</p></div></header>
    <article className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
      <img src={project.detailImage} alt={`${project.title} solar project installation in ${project.location}`} className="mb-10 aspect-[4/3] w-full rounded-[2rem] object-cover sm:aspect-[16/7]" />
      <div className="grid gap-5 sm:grid-cols-3"><div className="rounded-2xl bg-amber-300 p-5"><p className="text-xs font-black uppercase tracking-widest">Date</p><p className="mt-3 font-bold">{project.date}</p></div><div className="rounded-2xl bg-white p-5"><p className="text-xs font-black uppercase tracking-widest">Location</p><p className="mt-3 font-bold">{project.location}</p></div><div className="rounded-2xl bg-white p-5"><p className="text-xs font-black uppercase tracking-widest">Client</p><p className="mt-3 font-bold">{project.clients}</p></div></div>
      {project.content ? <div className="mt-14 max-w-3xl"><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">Project record</p><p className="mt-5 text-xl leading-9 text-emerald-950/75">{project.content}</p></div> : <p className="mt-14 rounded-2xl border border-emerald-950/10 bg-white p-6 text-emerald-950/70">The archive contains project metadata but no narrative for this installation.</p>}
      <div className="mt-16 rounded-[2rem] bg-emerald-100 p-8"><h2 className="text-2xl font-black">Planning a related project?</h2><a href={`${company.whatsappHref}?text=${encodeURIComponent(`Hi SSES, I want to discuss a project related to ${project.category}.`)}`} className="mt-5 inline-block rounded-full bg-emerald-950 px-6 py-3 font-black text-white">Talk to SSES</a></div>
    </article>
    <FAQSection faqs={projectFaqs} eyebrow="Project questions" title={`About the ${project.title} installation.`}/>
  </>;
}
