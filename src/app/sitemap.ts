import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'

  return [
    {
      url: siteUrl, // Raiz (homepage)
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/consulta`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // Prioridade máxima para landing page de conversão
    },
    // Adicione futuras landing pages aqui:
    // {
    //   url: `${siteUrl}/nutricao-esportiva`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteUrl}/grupos`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ]
}
