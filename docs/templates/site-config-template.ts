// ========================================
// TEMPLATE: Site Configuration (src/config/site.ts)
// ========================================
//
// Este arquivo centraliza TODAS as configurações do site.
// Ao invés de espalhar dados hardcoded pelo código, tudo fica aqui.
//
// BENEFÍCIOS:
// - Fácil de atualizar informações sem mexer em múltiplos arquivos
// - Fonte única da verdade para dados do cliente
// - Type-safe (TypeScript garante que não vai faltar nada)
// - Integração automática com variáveis de ambiente (.env.local)
//
// INSTRUÇÕES:
// 1. Copie este arquivo para /src/config/site.ts
// 2. Preencha com dados do cliente
// 3. Certifique-se de que .env.local está configurado
// 4. Importe onde precisar: import { siteConfig } from "@/config/site"
//
// ========================================

/**
 * Configuração central do site
 *
 * IMPORTANTE: Dados sensíveis (IDs de analytics, números de telefone)
 * devem vir de variáveis de ambiente (.env.local) por segurança.
 */
export const siteConfig = {
  // ========================================
  // 1. INFORMAÇÕES BÁSICAS
  // ========================================

  /**
   * Nome do site/marca
   * Usado em: <title>, meta tags, header, footer
   */
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Nome do Cliente",

  /**
   * Descrição curta do site (máximo 160 caracteres)
   * Usado em: meta description para SEO
   */
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Descrição concisa do serviço oferecido pelo cliente",

  /**
   * URL base do site (preenchido automaticamente pela Vercel em produção)
   * Usado em: canonical URLs, Open Graph tags
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // ========================================
  // 2. INFORMAÇÕES DO PROFISSIONAL/NEGÓCIO
  // ========================================

  /**
   * Dados do profissional/proprietário
   * Personalize para cada cliente
   */
  author: {
    name: "Nome do Profissional",
    role: "Cargo ou Especialidade",
    bio: "Breve descrição (1-2 linhas) sobre o profissional ou negócio.",
  },

  // ========================================
  // 3. WHATSAPP
  // ========================================

  /**
   * Configuração do WhatsApp Business
   * O link é gerado automaticamente a partir do número e mensagem
   */
  whatsapp: {
    /**
     * Número do WhatsApp (formato: DDI+DDD+número)
     * Exemplo: "5511999887766" (sem espaços ou caracteres especiais)
     */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",

    /**
     * Mensagem pré-preenchida que aparece ao clicar no CTA
     * Personalize para o contexto do serviço
     */
    message:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
      "Olá! Vi seu site e gostaria de saber mais.",

    /**
     * URL gerado automaticamente
     * Não precisa editar - é calculado dinamicamente
     */
    get url() {
      const cleanNumber = this.number.replace(/\D/g, "");
      const encodedMessage = encodeURIComponent(this.message);
      return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    },
  },

  // ========================================
  // 4. REDES SOCIAIS
  // ========================================

  /**
   * Links para redes sociais
   * Adicione ou remova conforme necessário
   * Se o cliente não tiver, deixe como string vazia ""
   */
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
  },

  // ========================================
  // 5. CONTATO ADICIONAL
  // ========================================

  /**
   * Outras formas de contato (opcional)
   */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_PHONE || "",
    address: process.env.NEXT_PUBLIC_ADDRESS || "",
  },

  // ========================================
  // 6. ANALYTICS & TRACKING
  // ========================================

  /**
   * IDs de plataformas de analytics
   * Preenchidos via variáveis de ambiente por segurança
   */
  analytics: {
    gtm: process.env.NEXT_PUBLIC_GTM_ID || "",
    ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID || "",
  },

  // ========================================
  // 7. INTEGRAÇÕES
  // ========================================

  /**
   * Ferramentas e integrações externas
   */
  integrations: {
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
    googleMapsEmbed: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "",
  },

  // ========================================
  // 8. CONTEÚDO CUSTOMIZÁVEL
  // ========================================

  /**
   * Frases, slogans, e textos reutilizáveis
   * Edite para cada cliente
   */
  content: {
    /**
     * Tagline principal (aparece no header, hero, etc.)
     * Máximo: 5-8 palavras
     */
    tagline: "Sua frase de impacto aqui",

    /**
     * Textos de CTAs (Call-to-Actions)
     * Personalize para o tipo de serviço
     */
    cta: {
      primary: "Agende sua consulta",        // CTA principal (conversão)
      secondary: "Fale comigo no WhatsApp",  // CTA secundário
      tertiary: "Quero saber mais",          // CTA terciário
    },

    /**
     * Textos do footer
     */
    footer: {
      copyright: `© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_SITE_NAME || "Nome do Cliente"}. Todos os direitos reservados.`,
      tagline: "Transforme sua vida hoje.",  // Opcional: frase inspiracional no footer
    },
  },

  // ========================================
  // 9. CONFIGURAÇÕES DE NAVEGAÇÃO
  // ========================================

  /**
   * Links de navegação (menu)
   * Se sua landing page tiver múltiplas páginas ou âncoras
   */
  navigation: {
    main: [
      { label: "Início", href: "#hero" },
      { label: "Sobre", href: "#sobre" },
      { label: "Serviços", href: "#servicos" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "FAQ", href: "#faq" },
      { label: "Contato", href: "#contato" },
    ],
  },

  // ========================================
  // 10. CONFIGURAÇÕES AVANÇADAS
  // ========================================

  /**
   * Features flags (ativar/desativar funcionalidades)
   */
  features: {
    showHeader: true,           // Mostrar header sticky
    showFooter: true,           // Mostrar footer
    enableTracking: true,       // Habilitar tracking (GA4, Meta Pixel)
    showCookieBanner: false,    // Banner de cookies (LGPD)
    showWhatsAppFab: false,     // Botão flutuante do WhatsApp (canto da tela)
  },

  /**
   * Configurações de SEO
   */
  seo: {
    /**
     * Palavras-chave (keywords) para meta tag
     * Separadas por vírgula
     */
    keywords: "palavra1, palavra2, palavra3, serviço, localização",

    /**
     * Imagem para Open Graph (Facebook, WhatsApp preview)
     * Dimensão recomendada: 1200x630px
     * Caminho relativo a /public
     */
    ogImage: "/images/og-image.jpg",

    /**
     * Idioma principal do site
     */
    locale: "pt-BR",

    /**
     * Tipo de site (para Open Graph)
     */
    type: "website",
  },

  /**
   * Configurações de tema/cores
   * (Opcional: se quiser controlar cores via config em vez de só CSS)
   */
  theme: {
    primaryColor: "#yourcolor",   // Cor primária (hex)
    secondaryColor: "#yourcolor",  // Cor secundária
    accentColor: "#yourcolor",     // Cor de destaque
  },
};

// ========================================
// TYPE DEFINITIONS (TypeScript)
// ========================================

/**
 * Tipo exportado para uso em outros arquivos
 * Garante que sempre usamos a estrutura correta
 */
export type SiteConfig = typeof siteConfig;

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Valida se as configurações obrigatórias foram preenchidas
 * Útil para rodar no build e prevenir deploys com dados faltando
 */
export function validateSiteConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validações obrigatórias
  if (!siteConfig.name || siteConfig.name === "Nome do Cliente") {
    errors.push("NEXT_PUBLIC_SITE_NAME não está configurado no .env.local");
  }

  if (!siteConfig.whatsapp.number) {
    errors.push("NEXT_PUBLIC_WHATSAPP_NUMBER não está configurado no .env.local");
  }

  if (!siteConfig.whatsapp.message) {
    errors.push("NEXT_PUBLIC_WHATSAPP_MESSAGE não está configurado no .env.local");
  }

  // Validações recomendadas (warnings, não erros)
  if (!siteConfig.description || siteConfig.description.includes("Descrição concisa")) {
    console.warn("⚠️ AVISO: NEXT_PUBLIC_SITE_DESCRIPTION não está personalizado");
  }

  if (!siteConfig.social.instagram) {
    console.warn("⚠️ AVISO: Instagram URL não configurado");
  }

  if (!siteConfig.analytics.gtm || !siteConfig.analytics.ga4) {
    console.warn("⚠️ AVISO: Analytics (GTM/GA4) não configurado");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ========================================
// EXEMPLOS DE USO
// ========================================

/*

# 1. Em componentes React:

import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header>
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.content.tagline}</p>
      <a href={siteConfig.whatsapp.url}>
        {siteConfig.content.cta.primary}
      </a>
    </header>
  );
}

---

# 2. Em meta tags (layout.tsx):

import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [siteConfig.seo.ogImage],
    locale: siteConfig.seo.locale,
    type: siteConfig.seo.type,
  },
};

---

# 3. Em analytics (gtm.tsx):

import { siteConfig } from "@/config/site";

export function GoogleTagManager() {
  if (!siteConfig.analytics.gtm) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${siteConfig.analytics.gtm}');`,
      }}
    />
  );
}

---

# 4. Validação no build:

// Em src/app/layout.tsx ou similar
import { validateSiteConfig } from "@/config/site";

if (process.env.NODE_ENV === "production") {
  const validation = validateSiteConfig();
  if (!validation.valid) {
    console.error("❌ Erros de configuração detectados:");
    validation.errors.forEach((err) => console.error(`  - ${err}`));
    throw new Error("Site config inválido. Corrija antes de fazer deploy.");
  }
}

*/

// ========================================
// NOTAS IMPORTANTES
// ========================================

/*

1. NUNCA hardcode dados do cliente diretamente no código
   ✗ ERRADO: const whatsappLink = "https://wa.me/5511999999999"
   ✓ CERTO:  const whatsappLink = siteConfig.whatsapp.url

2. Sempre use variáveis de ambiente para dados sensíveis
   - IDs de analytics
   - Números de telefone
   - Emails
   - API keys

3. Dados que não mudam entre ambientes podem ficar aqui
   - Textos de CTAs
   - Estrutura de navegação
   - Configurações de features

4. Para adicionar novos campos:
   - Adicione no objeto siteConfig
   - Se vier de .env, adicione no env-template.txt também
   - Atualize a função validateSiteConfig() se for obrigatório
   - Documente com comentários JSDoc

5. TypeScript vai te ajudar:
   - Autocomplete ao usar siteConfig.
   - Erros se tentar acessar campo que não existe
   - Refatoração segura (rename, etc.)

*/
