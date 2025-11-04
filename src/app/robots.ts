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
      // Permitir AI Crawlers (AEO - Answer Engine Optimization)
      {
        userAgent: 'GPTBot',  // ChatGPT
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'ChatGPT-User',  // ChatGPT Web
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Google-Extended',  // Bard/Gemini
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'anthropic-ai',  // Claude
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'PerplexityBot',  // Perplexity AI
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'CCBot',  // Common Crawl (usado por várias IAs)
        allow: ['/consulta', '/consulta/'],
        disallow: ['/', '/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
