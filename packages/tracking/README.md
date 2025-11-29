# Analytics Library

Sistema modular e testável de tracking de eventos para Google Analytics 4 e Meta Pixel.

## 🎯 Design Philosophy

- **Separation of Concerns**: Configuração separada da lógica
- **Pure Functions**: Adapters são funções puras (fácil de testar)
- **Type-Safe**: TypeScript em todo lugar
- **Platform Agnostic**: Fácil adicionar novos adapters (TikTok, LinkedIn, etc.)
- **Project Agnostic**: Copie e adapte para qualquer projeto

---

## 📁 Estrutura

```
lib/analytics/
├── config/
│   ├── events.ts              ⚠️  PROJETO-ESPECÍFICO (adaptar)
│   └── events.examples.ts     📘  Exemplos de diferentes projetos
├── adapters/
│   ├── meta-pixel.ts          ✅  Portável
│   ├── google-analytics.ts    ✅  Portável
│   ├── logger.ts              ✅  Portável
│   └── index.ts               ✅  Portável
├── components/
│   ├── AnalyticsProvider.tsx  ✅  Portável (wrapper principal)
│   ├── GoogleAnalytics.tsx    ✅  Portável (carrega script GA4)
│   ├── MetaPixel.tsx          ✅  Portável (carrega script Meta)
│   ├── AnalyticsButton.tsx    ✅  Portável (botão com tracking)
│   ├── ScrollTracker.tsx      ✅  Portável (scroll/section tracking)
│   └── index.ts               ✅  Portável
├── core/
│   ├── types.ts               ✅  Portável
│   ├── tracker.ts             ✅  Portável
│   └── index.ts               ✅  Portável
├── index.ts                   ✅  Portável
└── README.md                  📘  Este arquivo
```

**✅ Portável**: Copie direto para outro projeto
**⚠️ Projeto-específico**: Precisa adaptar para cada projeto

---

## 🚀 Como usar em novo projeto

### 1. Copie a pasta `lib/analytics/` completa

### 2. Configure variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

### 3. Instale o AnalyticsProvider

```tsx
// app/layout.tsx
import { AnalyticsProvider } from "@/lib/analytics";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Inicializa GA4, Meta Pixel e Scroll Tracking */}
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
```

### 4. **Adapte `config/events.ts`** para seu projeto

Veja exemplos em `config/events.examples.ts` (e-commerce, SaaS, blog, etc.)

### 5. Use o hook React

```tsx
import { useTracking } from "@/hooks/useTracking";

function MyComponent() {
  const { trackEvent } = useTracking();

  return (
    <button onClick={() => trackEvent({
      name: "add_to_cart",
      product_id: "123"
    })}>
      Adicionar ao carrinho
    </button>
  );
}
```

### 6. (Opcional) Use componentes helper

```tsx
// Botão com tracking automático
import { AnalyticsButton } from "@/lib/analytics";

<AnalyticsButton
  trackingLocation="hero"
  trackingLabel="Comprar agora"
  trackingType="schedule"
  onClick={() => window.location.href = "/checkout"}
>
  Comprar agora
</AnalyticsButton>
```

---

## 🧪 Testes

Sistema vem com testes prontos:

```bash
# Rodar testes
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

**Importante**: Ao adaptar `config/events.ts`, rode os testes para garantir que não quebrou nada.

---

## 🎨 Adaptar para seu projeto

### O que muda entre projetos:

| Tipo de Projeto | Eventos principais |
|---|---|
| **Landing Page** | `whatsapp_click`, `form_submit`, `cta_click` |
| **E-commerce** | `add_to_cart`, `purchase`, `view_product` |
| **SaaS** | `signup`, `upgrade`, `feature_use` |
| **Blog** | `article_read`, `newsletter_signup`, `share` |

### Estrutura do `config/events.ts`:

```typescript
import type { EventName, EventConfig } from "../core/types";

// 1. Defina seus eventos
export type EventName =
  | "evento_1"
  | "evento_2"
  | "evento_3";

// 2. Configure para quais plataformas cada evento vai
export const EVENT_CONFIG: Record<EventName, EventConfig> = {
  evento_1: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true },
      meta: { enabled: true, events: ["Lead"] },
    },
  },
  // ...
};
```

**Veja exemplos completos** em `config/events.examples.ts`

---

## 📊 Plataformas suportadas

### Google Analytics 4
- ✅ Eventos customizados
- ✅ Parâmetros ilimitados
- ✅ Melhor para análise detalhada

### Meta Pixel (Facebook/Instagram Ads)
- ✅ Eventos standard (Lead, Purchase, etc.)
- ✅ Eventos custom (WhatsAppClick, etc.)
- ✅ Melhor para otimização de ads

### Adicionar nova plataforma

1. Crie adapter em `adapters/nova-plataforma.ts`:
```typescript
export function sendToNovaPlataforma(event: TrackedEvent): AdapterResult {
  if (!window.novaPlataforma) {
    return { sent: false, platform: "nova", error: "Não disponível" };
  }

  window.novaPlataforma.track(event.name, event.params);
  return { sent: true, platform: "nova" };
}
```

2. Adicione no `core/tracker.ts`:
```typescript
import { sendToNovaPlataforma } from "../adapters/nova-plataforma";

const adapters = [
  { name: "ga4", send: sendToGA4 },
  { name: "meta", send: sendToMetaPixel },
  { name: "nova", send: sendToNovaPlataforma }, // ← Adicione aqui
];
```

3. Atualize `core/types.ts`:
```typescript
export type PlatformName = "ga4" | "meta" | "nova";
```

---

## 🤖 Instruções para Claude (AI Assistant)

Se você está usando Claude Code em outro projeto com esta biblioteca:

### Contexto rápido:
- Esta é uma biblioteca de analytics **modular e testável**
- Separação: **Config** (projeto-específico) vs. **Core/Adapters** (portável)
- Arquivo **único a adaptar**: `config/events.ts`

### Tarefas comuns:

**"Adicionar evento novo"**:
1. Adicione tipo em `config/events.ts` no `EventName`
2. Configure em `EVENT_CONFIG` (GA4 + Meta)
3. Rode testes: `pnpm test`

**"Debugar evento não disparando"**:
1. Verifique console (logs automáticos em dev)
2. Confirme env vars (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`)
3. Verifique se plataforma está `enabled: true` no config

**"Adaptar para novo projeto"**:
1. Copie pasta `lib/analytics/` completa
2. Leia `config/events.examples.ts` para exemplos
3. Substitua `config/events.ts` com eventos do novo projeto
4. Rode testes para validar

### Debug checklist:
- [ ] Env vars configuradas?
- [ ] Scripts `<GoogleAnalytics />` e `<MetaPixel />` no layout?
- [ ] Evento está em `EVENT_CONFIG`?
- [ ] Plataforma está `enabled: true`?
- [ ] Dev server reiniciado após mudar `.env.local`?

---

## 📝 Changelog

### v1.0.0 (2025-11-04)
- Arquitetura inicial
- Suporte GA4 + Meta Pixel
- Testes unitários e integração
- Documentação para reuso

---

## 📄 License

Este código é portável. Copie para qualquer projeto sem restrições.
