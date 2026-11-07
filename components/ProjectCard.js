import Link from 'next/link';

function formatProjectDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}

export default function ProjectCard({ project, index }) {
  const dark = index % 5 === 0;
  return <article className={`flex h-full flex-col overflow-hidden rounded-[2rem] border border-emerald-950/10 ${dark ? 'bg-emerald-900 text-white' : 'bg-white text-emerald-950'}`}>
    <img src={project.image} alt={`${project.title} solar project in ${project.location}`} className="h-44 w-full object-cover sm:h-52" loading="lazy" />
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[.2em] opacity-60">{project.category}</p><p className="text-sm font-semibold opacity-60">{formatProjectDate(project.date)}</p></div>
      <h2 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">{project.title}</h2>
      <p className="mt-3 text-sm leading-6 opacity-70">{project.location}</p>
      <Link href={`/project-details/${project.slug}`} className={`mt-auto inline-flex w-fit rounded-full px-5 py-3 font-black ${dark ? 'bg-amber-300 text-emerald-950' : 'bg-emerald-950 text-white'}`}>View project</Link>
    </div>
  </article>;
}
