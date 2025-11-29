# Lumes Monorepo

Monorepo para projetos de landing pages e integrações da Lumes.

## Estrutura

```
lumes/
├── apps/
│   └── seyune/                 # Landing page Seyune (seyune.com.br)
├── packages/
│   ├── analytics/              # @lumes/analytics - Parsing e métricas
│   ├── email/                  # @lumes/email - Envio de emails (Resend)
│   ├── logger/                 # @lumes/logger - Logging (Pino)
│   ├── mercadopago/            # @lumes/mercadopago - Pagamentos MP
│   ├── meta-conversions-api/   # @lumes/meta-conversions-api - CAPI
│   ├── sheets/                 # @lumes/sheets - Google Sheets
│   ├── storage/                # @lumes/storage - KV/Redis
│   ├── stripe/                 # @lumes/stripe - Pagamentos Stripe
│   ├── tracking/               # @lumes/tracking - Client/server tracking
│   ├── ui/                     # @lumes/ui - Componentes UI (shadcn)
│   └── validators/             # @lumes/validators - Validações
├── scripts/
│   └── create-app.sh           # Script para criar novo app
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── vercel.json
```

## Setup Inicial

```bash
# Clonar o repositório
git clone <repo-url> lumes
cd lumes

# Instalar dependências
pnpm install
```

## Comandos

```bash
# Dev de um app específico
pnpm dev:seyune

# Build de um app específico
pnpm build:seyune

# Dev de todos os apps
pnpm dev

# Build de todos os apps
pnpm build

# Lint
pnpm lint

# Testes
pnpm test
```

## Criar Novo App

Use o script automatizado:

```bash
pnpm create-app meu-projeto
```

Isso cria um novo app Next.js em `apps/meu-projeto` com:
- Configuração TypeScript
- Tailwind CSS 4
- Jest configurado
- Integração com @lumes/ui e @lumes/validators

Após criar, adicione os scripts ao `package.json` raiz:

```json
{
  "scripts": {
    "dev:meu-projeto": "turbo dev --filter=meu-projeto",
    "build:meu-projeto": "turbo build --filter=meu-projeto"
  }
}
```

## Deploy na Vercel

### Configurar Novo Projeto

1. **Conectar repositório** ao Vercel

2. **Configurar projeto:**
   - Framework Preset: `Next.js`
   - Root Directory: `apps/nome-do-app`
   - Build Command: `cd ../.. && pnpm build --filter=nome-do-app`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

3. **Variáveis de ambiente:**
   - Copiar de `apps/nome-do-app/.env.example`
   - Configurar em Vercel > Project > Settings > Environment Variables

### Múltiplos Apps no Mesmo Repo

Cada app é um projeto separado na Vercel, apontando para o mesmo repositório mas com Root Directory diferente.

## Packages Compartilhados

### UI Components

```typescript
import { Button, Card, Input, cn } from '@lumes/ui';
```

### Pagamentos

```typescript
import { MercadoPagoClient } from '@lumes/mercadopago';
import { StripeClient } from '@lumes/stripe';
```

### Email

```typescript
import { EmailClient } from '@lumes/email';
```

### Tracking

```typescript
import { MetaConversionsClient } from '@lumes/meta-conversions-api';
import { useTracking } from '@lumes/tracking';
```

### Storage

```typescript
import { StorageClient } from '@lumes/storage';
```

### Validação

```typescript
import { cpfSchema, emailSchema } from '@lumes/validators';
```

## Adicionar Dependência a um Package

Para usar um package interno em outro:

```json
// packages/meu-package/package.json
{
  "dependencies": {
    "@lumes/logger": "workspace:*"
  }
}
```

## Tech Stack

- **Monorepo:** pnpm workspaces + Turbo
- **Framework:** Next.js 16
- **React:** 19.2
- **TypeScript:** 5
- **CSS:** Tailwind CSS 4
- **UI:** shadcn/ui (via @lumes/ui)
- **Testes:** Jest + Testing Library
