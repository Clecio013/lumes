import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'

  return [
    {
      url: `${siteUrl}/consulta`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
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
