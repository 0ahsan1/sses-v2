export default function FAQSection({ faqs, eyebrow = 'Questions answered', title = 'What customers need to know.' }) {
  const items = faqs.filter(({ question, answer }) => question && answer);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    {title && <div className="mb-9"><p className="text-xs font-black uppercase tracking-[.25em] text-emerald-700">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2></div>}
    <div className="space-y-4">{items.map(({ question, answer }) => <details key={question} className="group rounded-2xl border border-emerald-950/10 bg-white p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">{question}<span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl leading-none text-emerald-950"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span></summary><p className="mt-4 leading-7 text-emerald-950/70">{answer}</p></details>)}</div>
  </section>;
}
