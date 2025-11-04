import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/consulta', '/consulta/'],
        disallow: [
          '/',  // Redireciona para /consulta, não indexar
          '/api/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
