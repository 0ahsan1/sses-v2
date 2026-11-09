'use client';

import { useState } from 'react';
import { company } from '@/lib/content';

const inputClasses = 'mt-2 w-full rounded-2xl border border-emerald-950/20 bg-white px-4 py-3 text-emerald-950 outline-none transition placeholder:text-emerald-950/40 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100';
const formEndpoint = `https://formsubmit.co/${company.email}`;
const ajaxEndpoint = `https://formsubmit.co/ajax/${company.email}`;

export default function LeadForm({ compact = false }) {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    setStatus({ type: 'submitting', message: 'Submitting your request…' });

    try {
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The form service returned an invalid response. Please try again or contact SSES by phone or email.');
      }

      if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || 'The form service did not accept the request.');
      }

      form.reset();
      setStatus({ type: 'success', message: 'Your request was accepted. SSES will contact you using the details provided.' });
    } catch (error) {
      const fallbackMessage = 'The form service is not responding, so your request was not confirmed as delivered.';
      const emailBody = [
        `Full name: ${formData.name || ''}`,
        `Email address: ${formData.email || ''}`,
        `Phone number: ${formData.phone || ''}`,
        `Property or site type: ${formData.property_type || ''}`,
        `Average monthly electricity bill (PKR): ${formData.monthly_electricity_bill_pkr || ''}`,
        '',
        'Project details or message:',
        formData.message || '',
      ].join('\n');
      setStatus({
        type: 'error',
        message: error instanceof Error && !(error instanceof TypeError) && error.message ? error.message : fallbackMessage,
        fallbackHref: `mailto:${company.email}?subject=${encodeURIComponent('Solar Consultation Request')}&body=${encodeURIComponent(emailBody)}`,
      });
    }
  };

  return <section aria-labelledby="consultation-form-title" className={compact ? 'rounded-[2.5rem] bg-amber-300 p-7 sm:p-10' : 'rounded-[2.5rem] border border-emerald-950/10 bg-white p-7 shadow-sm sm:p-10'}>
    <div className={compact ? 'grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start' : ''}>
      <div>
        <p className="text-xs font-black uppercase tracking-[.25em] text-emerald-800">Solar consultation</p>
        <h2 id="consultation-form-title" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{compact ? 'Ready to plan your solar installation?' : 'Tell us about your solar project.'}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-emerald-950/70">Share your site and energy needs so SSES can review the right next steps with you.</p>
      </div>
      <form action={formEndpoint} method="POST" onSubmit={handleSubmit} onInvalid={() => setStatus({ type: 'error', message: 'Please complete all required fields with valid information.' })} aria-busy={status.type === 'submitting'} className={compact ? 'grid gap-x-5 gap-y-7 rounded-[2rem] bg-white p-7 sm:grid-cols-2 sm:gap-5 sm:p-8' : 'mt-8 grid gap-5 sm:grid-cols-2'}>
        <input type="hidden" name="_subject" value="New SSES Solar Consultation Request" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />

        <label className="block text-sm font-bold">Full name <span aria-hidden="true">*</span>
          <input className={inputClasses} type="text" name="name" autoComplete="name" required />
        </label>
        <label className="block text-sm font-bold">Email address <span aria-hidden="true">*</span>
          <input className={inputClasses} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block text-sm font-bold">Phone number <span aria-hidden="true">*</span>
          <input className={inputClasses} type="tel" name="phone" autoComplete="tel" required />
        </label>
        <label className="block text-sm font-bold">Property or site type
          <select className={inputClasses} name="property_type" defaultValue="">
            <option value="" disabled>Select a site type</option>
            <option value="Home">Home</option>
            <option value="Business">Business</option>
            <option value="Industrial site">Industrial site</option>
            <option value="Farm or agricultural site">Farm or agricultural site</option>
            <option value="Remote site">Remote site</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="block text-sm font-bold sm:col-span-2">Average monthly electricity bill (PKR)
          <input className={inputClasses} type="number" name="monthly_electricity_bill_pkr" min="0" step="1" inputMode="numeric" placeholder="e.g. 45000" />
        </label>
        <label className="block text-sm font-bold sm:col-span-2">Project details or message
          <textarea className={`${inputClasses} min-h-32 resize-y`} name="message" rows="5" placeholder="Tell us about the site, your power needs or the system you are considering." />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" disabled={status.type === 'submitting'} className="inline-flex w-full items-center justify-center rounded-full bg-emerald-950 px-7 py-4 text-base font-black text-white transition hover:bg-emerald-800 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto">{status.type === 'submitting' ? 'Submitting…' : 'Request a Solar Consultation'}</button>
          {status.type !== 'idle' && <p role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite" className={`mt-4 max-w-2xl text-sm font-bold ${status.type === 'error' ? 'text-red-700' : status.type === 'success' ? 'text-emerald-700' : 'text-emerald-950/70'}`}>{status.message}</p>}
          {status.fallbackHref && <div className="mt-4 flex flex-col gap-3 sm:flex-row"><a href={status.fallbackHref} className="inline-flex w-full items-center justify-center rounded-full border border-emerald-950/20 px-5 py-3 text-center text-sm font-black text-emerald-950 sm:w-auto">Email this request instead</a><a href={company.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-emerald-950/20 px-5 py-3 text-center text-sm font-black text-emerald-950 sm:w-auto">Contact SSES on WhatsApp</a></div>}
          <p className="mt-4 max-w-2xl text-xs leading-5 text-emerald-950/60">Your submission is handled securely by a form delivery service and forwarded to SSES.</p>
        </div>
      </form>
    </div>
  </section>;
}
