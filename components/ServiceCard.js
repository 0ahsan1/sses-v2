import Link from 'next/link';

export default function ServiceCard({ service, index }) {
  const dark = index % 3 === 0;
  return <article className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border border-emerald-950/10 ${dark ? 'bg-emerald-950 text-white' : index % 3 === 1 ? 'bg-amber-300 text-emerald-950' : 'bg-white text-emerald-950'}`}>
    <img src={service.image} alt={`${service.title} solar installation`} className="h-44 w-full object-cover sm:h-52" loading="lazy" />
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div>
        <span className="text-xs font-black tracking-[.25em] opacity-60">0{index + 1}</span>
        <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">{service.title}</h2>
        <p className="mt-4 max-w-2xl leading-7 opacity-75">{service.excerpt}</p>
      </div>
      <div className="mt-auto pt-8"><Link href={`/service-details/${service.slug}`} className={`inline-flex w-full justify-center rounded-full px-5 py-3 text-center font-black sm:w-fit ${dark ? 'bg-amber-300 text-emerald-950' : 'bg-emerald-950 text-white'}`}>View service</Link></div>
    </div>
  </article>;
}
