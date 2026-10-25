import { MetadataRoute } from 'next';
import { servicesData } from '@/lib/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://auromindai.com';

  const routes = [
    '',
    '/services',
    '/products',
    '/about',
    '/contact',
    '/case-studies',
    '/fintech',
    '/healthcare',
    '/real-estate',
    '/ecommerce',
    '/logistics',
    '/legal',
    '/privacy',
    '/terms',
    '/security',
    '/compliance',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === '' || route === '/services' || route === '/products'
      ? 'weekly'
      : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/products' ? 0.9 : 0.7,
  }));

  const serviceDetailRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...serviceDetailRoutes];
}
