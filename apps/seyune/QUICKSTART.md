# 🚀 Quick Start Guide

**Objetivo:** Iniciar um novo projeto de landing page em menos de 30 minutos.

Este é um guia condensado. Para detalhes completos, consulte [`FRAMEWORK.md`](./FRAMEWORK.md).

---

## 📋 Checklist Pré-Projeto

Antes de iniciar o desenvolvimento, certifique-se de que sua equipe entregou:

- [ ] **Briefing Estratégico** (Google Docs ou PDF)
- [ ] **Persona Detalhada** (Google Docs - use o template)
- [ ] **Framework de Copy** (Google Docs - 10 perguntas respondidas)
- [ ] **Identidade Visual** (PDF ou Figma)
- [ ] **Copy da Landing Page** (Google Docs com marcações de seção)
- [ ] **Assets Visuais** (Pasta Drive ou ZIP - logo, fotos, ícones)
- [ ] **Configurações Técnicas** (Dados de WhatsApp, Instagram, domínio)

📎 **Templates:** Veja [`/docs/templates/`](./docs/templates/) para modelos prontos.

---

## ⚡ Setup Rápido (5 minutos)

### 1. Clone o projeto base

```bash
# Clone este repositório como template
git clone <repo-url> novo-projeto
cd novo-projeto

# Instale dependências
pnpm install
```

### 2. Configure variáveis de ambiente

```bash
# Copie o template
cp .env.example .env.local

# Edite com os dados do cliente
nano .env.local
```

**Variáveis obrigatórias:**
```env
NEXT_PUBLIC_SITE_NAME="Nome do Cliente"
NEXT_PUBLIC_WHATSAPP_NUMBER="5511999999999"
NEXT_PUBLIC_WHATSAPP_MESSAGE="Olá! Gostaria de agendar uma consulta."
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/cliente"

# Analytics (preencher após criar contas)
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
NEXT_PUBLIC_GA4_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="123456789012345"
```

### 3. Organize assets visuais

```bash
# Estrutura recomendada
/public/
  ├── brand/
  │   ├── logo-principal.png
  │   └── logotipo.png
  └── images/
      ├── hero/
      ├── about/
      └── transformacao/
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse: http://localhost:3000

---

## 🎨 Customização Básica

### Atualizar configuração do site

Edite `/src/config/site.ts`:

```typescript
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Cliente",
  description: "Descrição da landing page",
  author: {
    name: "Nome do Profissional",
    role: "Cargo/Especialidade",
  },
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "",
    get url() { /* auto-gerado */ },
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
};
```

### Customizar cores

Edite `/src/app/globals.css` (use OKLCH):

```css
@layer base {
  :root {
    --primary: 35.82% 0.097 24.77;      /* Cor principal (CTAs) */
    --secondary: 28.61% 0.0396 30.46;   /* Cor secundária */
    --accent: 90.85% 0.122 111.69;      /* Cor de destaque */

    /* Ajuste conforme identidade visual */
  }
}
```

**Ferramenta:** Use https://oklch.com para converter HEX → OKLCH.

### Atualizar fontes

Se precisar trocar fontes, edite `/src/app/layout.tsx`:

```typescript
import { Inter, Cormorant_Garamond } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});
```

---

## 📝 Desenvolvimento de Conteúdo

### Ordem recomendada de seções:

1. **Hero** - Primeira impressão + CTA principal
2. **Dores** - Problemas que o público enfrenta
3. **Benefícios** - Soluções oferecidas
4. **Como Funciona** - Processo em 3-4 passos
5. **Transformação** - Antes/Depois (se aplicável)
6. **Depoimentos** - Prova social
7. **Sobre** - Quem é o profissional
8. **FAQ** - Objeções mais comuns
9. **CTA Final** - Última chamada para ação

### Arquivo principal:

`/src/app/consulta/page.tsx` (ou criar nova rota para o cliente)

### Padrão de seção:

```typescript
{/* Seção Nome */}
<section
  data-section="nome_secao"  {/* Para tracking automático */}
  className="py-24"
>
  <div className="max-w-7xl mx-auto px-6">
    {/* Conteúdo */}
  </div>
</section>
```

### Usar CTAs com tracking:

```typescript
import { AnalyticsButton } from "@/components/analytics";

<AnalyticsButton
  size="lg"
  trackingLocation="hero"
  trackingLabel="Agende sua consulta"
  trackingType="schedule"
  onClick={() => window.open(siteConfig.whatsapp.url, "_blank")}
>
  Agende sua consulta
</AnalyticsButton>
```

**Tipos de CTA:**
- `schedule` - CTAs de agendamento (dispara Meta Pixel `Lead`)
- `whatsapp` - CTAs de WhatsApp (dispara Meta Pixel `WhatsAppClick`)
- `transformation` - CTAs de transformação

---

## 📊 Configurar Analytics (15 minutos)

### 1. Criar contas

**Google Tag Manager:**
1. Acesse: https://tagmanager.google.com
2. Criar conta → Container Web
3. Copie o ID: `GTM-XXXXXXX`

**Google Analytics 4:**
1. Acesse: https://analytics.google.com
2. Criar propriedade GA4
3. Copie o ID: `G-XXXXXXXXXX`

**Meta Pixel:**
1. Acesse: https://business.facebook.com/events_manager
2. Criar pixel
3. Copie o ID: `123456789012345`

### 2. Adicionar IDs no `.env.local`

```env
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
NEXT_PUBLIC_GA4_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="123456789012345"
```

### 3. Configurar GTM

Siga: [`/docs/TRACKING_SETUP.md`](./docs/TRACKING_SETUP.md) - Seção "Google Tag Manager"

**Resumo:**
- Criar tag GA4 Configuration
- Criar tag GA4 Event (Nome do evento: `page_view`)
- Publicar versão

### 4. Testar tracking

```bash
# Abra DevTools (F12) → Console
dataLayer

# Você deve ver eventos sendo disparados:
# - cta_click
# - scroll_depth
# - section_view
# - faq_open
```

**Extensões úteis:**
- Tag Assistant (Chrome) - Para testar GTM/GA4
- Meta Pixel Helper (Chrome) - Para testar Meta Pixel

---

## ✅ Checklist de Finalização

Antes de entregar ao cliente:

### Código
- [ ] Todos os CTAs com tracking configurado
- [ ] Todas as seções com `data-section` atributo
- [ ] Imagens otimizadas (WebP, tamanhos adequados)
- [ ] Sem erros de lint (`pnpm lint`)
- [ ] Sem erros de TypeScript (`pnpm build`)
- [ ] Fontes carregando corretamente
- [ ] Cores conforme identidade visual

### Responsividade
- [ ] Testado em mobile (375px)
- [ ] Testado em tablet (768px)
- [ ] Testado em desktop (1440px)
- [ ] Header sticky funcionando
- [ ] Botões acessíveis (min 44x44px)

### Analytics
- [ ] GTM instalado e publicado
- [ ] GA4 recebendo eventos
- [ ] Meta Pixel disparando Lead/ViewContent
- [ ] Todos os 6 CTAs rastreados
- [ ] FAQ tracking funcionando
- [ ] Scroll depth tracking ativo

### Conteúdo
- [ ] Copy revisada (sem typos)
- [ ] Links do WhatsApp testados
- [ ] Links do Instagram testados
- [ ] Imagens com alt text apropriado
- [ ] Meta tags (title, description) configuradas

### Performance
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Lighthouse Score > 90 (Accessibility)
- [ ] Lighthouse Score > 90 (SEO)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard
# https://vercel.com/[seu-projeto]/settings/environment-variables
```

### Configurar domínio personalizado

1. Acesse Vercel Dashboard → Settings → Domains
2. Adicione domínio do cliente
3. Configure DNS conforme instruções

---

## 📚 Documentação Completa

Para mais detalhes, consulte:

- [`FRAMEWORK.md`](./FRAMEWORK.md) - Documentação completa do processo
- [`/docs/TRACKING_EVENTS.md`](./docs/TRACKING_EVENTS.md) - Todos os 23+ eventos configurados
- [`/docs/TRACKING_SETUP.md`](./docs/TRACKING_SETUP.md) - Setup passo a passo de analytics
- [`/docs/LOOKER_STUDIO_GUIDE.md`](./docs/LOOKER_STUDIO_GUIDE.md) - Dashboards prontos
- [`/docs/templates/`](./docs/templates/) - Templates para briefing e copy

---

## ⏱️ Timeline Estimada

| Fase | Duração | Atividades |
|------|---------|------------|
| **Setup** | 30min | Clone, install, env vars, assets |
| **Config** | 1h | Site config, cores, fontes |
| **Hero** | 2h | Copy, imagem, CTA |
| **Seções** | 6h | 8 seções restantes |
| **Mobile** | 2h | Responsividade e ajustes |
| **Analytics** | 1h | GTM, GA4, Meta Pixel |
| **Testes** | 1h | QA completo, performance |
| **Deploy** | 30min | Vercel + domínio |
| **TOTAL** | **~14h** | ~2 dias de trabalho |

---

## 🆘 Troubleshooting Rápido

**Fontes com watermark "DEMO":**
→ Trocar por Google Fonts (Cormorant Garamond, Playfair Display, etc.)

**Eventos não aparecem no GA4:**
→ Aguardar 24-48h OU usar DebugView (tempo real)

**Meta Pixel não dispara Lead:**
→ Verificar se pixel está ativo no Events Manager
→ Usar Meta Pixel Helper para debug

**Build error no Vercel:**
→ Rodar `pnpm build` localmente primeiro
→ Verificar TypeScript errors
→ Checar env vars no dashboard

**WhatsApp link não abre:**
→ Verificar formato: `5511999999999` (sem espaços, parênteses ou +)
→ Testar em mobile nativo (não funciona em desktop sem WhatsApp Web)

---

**Última atualização:** Novembro 2025
**Versão:** 1.0
**Próxima revisão:** Após 5 projetos completados
