import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: [
          '/admin/',  // Área administrativa (não indexar)
          '/api/',
          '/_next/',
          '/private/',
          '/projeto45dias/obrigado',  // Página de confirmação (não indexar)
        ],
      },
      // Permitir AI Crawlers (AEO - Answer Engine Optimization)
      // Deixar indexar /projeto45dias para ajudar em buscas sobre nutrição/treino personalizado
      {
        userAgent: 'GPTBot',  // ChatGPT
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
      {
        userAgent: 'ChatGPT-User',  // ChatGPT Web
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
      {
        userAgent: 'Google-Extended',  // Bard/Gemini
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
      {
        userAgent: 'anthropic-ai',  // Claude
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
      {
        userAgent: 'PerplexityBot',  // Perplexity AI
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
      {
        userAgent: 'CCBot',  // Common Crawl (usado por várias IAs)
        allow: ['/', '/consulta/', '/projeto45dias/'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/', '/projeto45dias/obrigado'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
