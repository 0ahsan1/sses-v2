import data from '@/content/site.json';
export const { company, services, projects, faqs, testimonials, team, posts } = data;
export const serviceBySlug = (slug) => services.find((item) => item.slug === slug);
export const projectBySlug = (slug) => projects.find((item) => item.slug === slug);
