import { projects, services } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap() {
  const pages = ['', '/about/', '/services/', '/projects/', '/faq/', '/contact/'];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : .8 })),
    ...services.map(({ slug }) => ({ url: `${siteUrl}/service-details/${slug}/`, changeFrequency: 'monthly', priority: .8 })),
    ...projects.map(({ slug }) => ({ url: `${siteUrl}/project-details/${slug}/`, changeFrequency: 'yearly', priority: .6 })),
  ];
}
