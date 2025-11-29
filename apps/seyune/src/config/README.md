# Configuração do Site

Este diretório contém as configurações centralizadas do site.

## Como usar

### 1. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

### 2. Preencher as variáveis

Edite o arquivo `.env.local` e preencha com os valores reais:

```env
# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5511987654321
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá, gostaria de agendar uma consulta

# Google Analytics & Tag Manager
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Instagram
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/seyune
```

### 3. Usar no código

Em vez de usar `process.env` diretamente, importe o `siteConfig`:

```typescript
import { siteConfig } from "@/config/site";

// Acessar configurações
const whatsappUrl = siteConfig.whatsapp.url;
const siteName = siteConfig.name;
const ga4Id = siteConfig.analytics.ga4Id;
```

## Estrutura do siteConfig

```typescript
siteConfig = {
  // Informações do site
  name: string,
  description: string,
  url: string,

  // WhatsApp (URL formatada automaticamente)
  whatsapp: {
    number: string,
    message: string,
    url: string, // Gerado automaticamente
  },

  // Analytics & Tracking
  analytics: {
    ga4Id?: string,
    gtmId?: string,
    metaPixelId?: string,
  },

  // Redes Sociais
  social: {
    instagram: string,
  },

  // Links úteis
  links: {
    consultaPage: string,
    homepage: string,
  },
}
```

## Helpers disponíveis

```typescript
import { hasAnalytics } from "@/config/site";

// Verificar se analytics está configurado
if (hasAnalytics.ga4) {
  // Inicializar GA4
}

if (hasAnalytics.gtm) {
  // Inicializar GTM
}

if (hasAnalytics.metaPixel) {
  // Inicializar Meta Pixel
}
```

## Notas importantes

- **Nunca commitar** o arquivo `.env.local` (ele já está no .gitignore)
- Sempre usar `NEXT_PUBLIC_` prefix para variáveis que precisam estar disponíveis no client
- O `.env.example` serve como template e deve ser commitado
- Todas as configurações têm valores padrão (fallback)
