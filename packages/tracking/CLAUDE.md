# Analytics Library - Quick Start (para Claude Code)

**Contexto**: Sistema modular de tracking de eventos (GA4 + Meta Pixel)

---

## 🎯 Conceito Central

**Separação de responsabilidades**:
- **Config** (`config/events.ts`) → Projeto-específico, adaptar sempre
- **Core + Adapters** → Portável, copiar direto

---

## ⚡ Comandos rápidos

```bash
# Testar
pnpm test

# Adicionar evento
# 1. Edite src/lib/analytics/core/types.ts (adicione no type EventName)
# 2. Edite src/lib/analytics/config/events.ts (configure o evento)
# 3. Rode: pnpm test

# Debug evento não disparando
# 1. Verifique console (logs automáticos)
# 2. Confirme .env.local: NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_META_PIXEL_ID
# 3. Verifique config/events.ts: enabled: true
```

---

## 📂 Arquivos importantes

### ⚠️ Projeto-específico (SEMPRE adaptar):
- `config/events.ts` - Configuração de eventos

### ✅ Portável (copiar direto):
- `core/` - Orquestração e tipos
- `adapters/` - Implementação de plataformas
- `components/` - Componentes React (Provider, Button, Scroll)
- Testes: `*.test.ts`

---

## 🔍 Entender o código rapidamente

### 1. Fluxo de um evento

```
Componente React
  ↓
useTracking().trackEvent({ name: "whatsapp_click", location: "hero" })
  ↓
core/tracker.ts → Valida evento, busca config
  ↓
adapters/meta-pixel.ts + adapters/google-analytics.ts
  ↓
window.fbq() + window.gtag()
  ↓
Meta Pixel + Google Analytics
```

### 2. Arquitetura

```
config/events.ts          → O QUE rastrear
core/tracker.ts           → COMO orquestrar
adapters/meta-pixel.ts    → IMPLEMENTAÇÃO Meta
adapters/google-analytics.ts → IMPLEMENTAÇÃO GA4
adapters/logger.ts        → DEBUG (console)
```

### 3. Onde cada coisa está

| Preciso... | Arquivo |
|---|---|
| Adicionar novo evento | `core/types.ts` + `config/events.ts` |
| Mudar plataforma de evento | `config/events.ts` |
| Adicionar nova plataforma | `adapters/nova-plataforma.ts` + `core/tracker.ts` |
| Ver tipos | `core/types.ts` |
| Debugar | Console (logger automático) |

---

## 🤖 Tarefas comuns

### "Adicionar evento de signup"

1. **Edite `core/types.ts`**:
```typescript
export type EventName =
  | "whatsapp_click"
  | "signup"  // ← Adicione aqui
  | "...";
```

2. **Edite `config/events.ts`**:
```typescript
export const EVENT_CONFIG: Record<EventName, EventConfig> = {
  // ...eventos existentes
  signup: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "sign_up" },
      meta: { enabled: true, events: ["CompleteRegistration"] },
    },
  },
};
```

3. **Use no código**:
```typescript
const { trackEvent } = useTracking();
trackEvent({ name: "signup", user_id: "123" });
```

4. **Teste**: `pnpm test`

---

### "Evento não está disparando"

**Checklist**:
1. ✅ Env vars configuradas? (`.env.local`)
   - `NEXT_PUBLIC_GA4_ID=G-...`
   - `NEXT_PUBLIC_META_PIXEL_ID=...`
2. ✅ Scripts no layout? (`app/layout.tsx`)
   - `<GoogleAnalytics />` e `<MetaPixel />`
3. ✅ Evento configurado? (`config/events.ts`)
   - Existe no `EVENT_CONFIG`?
4. ✅ Plataforma habilitada?
   - `platforms.ga4.enabled: true`?
5. ✅ Dev server reiniciado após mudar `.env.local`?

**Debug**:
- Abra console do navegador
- Procure logs: `[Analytics] nome_do_evento`
- Se aparece `❌ plataforma: Plataforma não disponível` → env var faltando

---

### "Adaptar para novo projeto"

1. **Copie pasta** `lib/analytics/` completa

2. **Configure env vars** (`.env.local`):
```bash
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

3. **Instale AnalyticsProvider** (`app/layout.tsx`):
```tsx
import { AnalyticsProvider } from "@/lib/analytics";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
```

4. **Veja exemplos** em `config/events.examples.ts`:
   - E-commerce? Copie `ECOMMERCE_CONFIG`
   - SaaS? Copie `SAAS_CONFIG`
   - Blog? Copie `BLOG_CONFIG`

5. **Adapte** `config/events.ts` com eventos do novo projeto

6. **Teste**: `pnpm test`

---

### "Adicionar TikTok Pixel / LinkedIn Insight"

1. **Crie adapter** `adapters/tiktok-pixel.ts`:
```typescript
import type { TrackedEvent, AdapterResult } from "../core/types";

export function isTikTokPixelAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.ttq === "function";
}

export function sendToTikTokPixel(event: TrackedEvent): AdapterResult {
  if (!isTikTokPixelAvailable()) {
    return { sent: false, platform: "tiktok", error: "TikTok Pixel não disponível" };
  }

  // Mapeie eventos para TikTok
  const tiktokEvent = event.name === "whatsapp_click" ? "ClickButton" : event.name;

  window.ttq!("track", tiktokEvent, event.params);
  return { sent: true, platform: "tiktok" };
}
```

2. **Atualize tipos** `core/types.ts`:
```typescript
export type PlatformName = "ga4" | "meta" | "tiktok";

export interface PlatformConfig {
  ga4?: GA4Config;
  meta?: MetaConfig;
  tiktok?: TikTokConfig;  // ← Adicione
}
```

3. **Registre adapter** `core/tracker.ts`:
```typescript
import { sendToTikTokPixel } from "../adapters/tiktok-pixel";

const adapters: AnalyticsAdapter[] = [
  { name: "ga4", send: sendToGA4 },
  { name: "meta", send: sendToMetaPixel },
  { name: "tiktok", send: sendToTikTokPixel },  // ← Adicione
];
```

4. **Configure eventos** `config/events.ts`:
```typescript
whatsapp_click: {
  category: "conversion",
  platforms: {
    ga4: { enabled: true },
    meta: { enabled: true, events: ["Lead"] },
    tiktok: { enabled: true, events: ["ClickButton"] },  // ← Adicione
  },
},
```

5. **Teste**: `pnpm test` (crie testes em `adapters/tiktok-pixel.test.ts`)

---

## 📊 Decisões de design

### Por que separar config de adapters?
- **Config muda** entre projetos (eventos diferentes)
- **Adapters não mudam** (Meta Pixel funciona igual em qualquer projeto)
- **Facilita testes**: Adapters são funções puras

### Por que pure functions nos adapters?
- **Fácil de testar**: Mock `window.fbq` e pronto
- **Sem side effects**: Não modifica estado global
- **Composable**: Fácil adicionar novos adapters

### Por que logger separado?
- **Desacoplar**: Logger não é adapter de verdade
- **Só dev**: Não carrega em produção
- **Debug fácil**: Ver todos eventos no console

### Por que Record<EventName, EventConfig>?
- **Type-safe**: TypeScript força configurar TODOS eventos
- **Autocomplete**: IDE sugere eventos disponíveis
- **Catch errors**: Erro de compilação se evento não configurado

---

## 🐛 Troubleshooting

### `Property 'fbq' does not exist on type 'Window'`
**Solução**: Types já declarados em `adapters/meta-pixel.ts` e `adapters/google-analytics.ts`

### `Cannot find module '@/lib/analytics'`
**Solução**: Verifique `tsconfig.json` tem path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Eventos duplicados no Meta Pixel Helper
**Causa**: Múltiplos componentes chamando mesmo evento
**Solução**: Adicione debounce ou verifique se evento já foi disparado

### `ReferenceError: window is not defined`
**Causa**: Tentando acessar window em Server Component
**Solução**: Marque componente com `"use client"` ou use `typeof window !== "undefined"`

---

## 📚 Recursos

- **README principal**: `README.md` (visão geral)
- **Exemplos**: `config/events.examples.ts` (4 tipos de projeto)
- **Este arquivo**: Quick reference para Claude
- **Testes**: Ver `*.test.ts` para entender comportamento

---

## ✅ Checklist de qualidade

Ao adaptar para novo projeto, confirme:

- [ ] Todos eventos têm tipo em `core/types.ts`
- [ ] Todos eventos estão configurados em `config/events.ts`
- [ ] Eventos de conversão vão para Meta (se usar Meta Ads)
- [ ] Testes passam: `pnpm test`
- [ ] Eventos aparecem no console em dev
- [ ] Env vars configuradas (local + produção)
- [ ] Scripts carregam em produção

---

**Última atualização**: 2025-11-04
**Projeto de referência**: Seyune Landing Page
