# Lumes Digital

Monorepo da Lumes Digital - agência focada em landing pages de alta conversão para profissionais liberais.

---

## Estrutura do Monorepo

```
lumes/
├── apps/                    # Projetos de clientes
│   ├── seyune/              # Nutricionista comportamental
│   └── elizete/             # Estética e dermato
├── packages/                # Libs reutilizáveis (@lumes/*)
│   ├── telegram/            # Notificações Telegram
│   ├── stripe/              # Pagamentos Stripe
│   ├── email/               # Email (Resend)
│   ├── sheets/              # Google Sheets
│   ├── logger/              # Logging estruturado
│   ├── tracking/            # Analytics (GA4 + Meta)
│   └── ...
└── docs/                    # Documentação global
    ├── meta-ads-rules.md
    ├── stripe-setup-guide.md
    └── ...
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Linguagem:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Monorepo:** pnpm workspaces + Turborepo
- **Deploy:** Vercel
- **Pagamentos:** Stripe
- **Email:** Resend
- **Analytics:** GA4 + Meta Pixel + Meta Conversions API

---

## Padrões de Código

### Conventional Commits (OBRIGATÓRIO)

Todos os commits devem seguir o padrão:

```
tipo(escopo): descrição curta

[corpo opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `chore`: Manutenção, dependências
- `refactor`: Refatoração sem mudar comportamento
- `docs`: Apenas documentação
- `test`: Testes
- `style`: Formatação, sem mudança de código

**Exemplos:**
```bash
feat(telegram): add purchase notifications
fix(stripe): handle webhook signature validation
chore: update dependencies
refactor(checkout): simplify payment flow
```

---

### Logging (OBRIGATÓRIO em novas features)

Usar `@lumes/logger` em todas as APIs, webhooks e jobs:

```typescript
import { LoggerClient } from '@lumes/logger';

// Em API routes
const logger = LoggerClient.create();
logger.info({ userId }, 'Processing request');
logger.error({ err: error }, 'Failed to process');

// Em webhooks
const logger = LoggerClient.createForWebhook('stripe');
logger.info({ sessionId }, 'Webhook received');
```

---

### Packages @lumes/*

Ao criar ou modificar packages, seguir estes padrões:

#### Estrutura de Arquivos

```
packages/{nome}/
├── client.ts        # Factory principal
├── config.ts        # Validação com Zod
├── types.ts         # Types públicos
├── errors.ts        # Erros customizados
├── index.ts         # Exports públicos
├── package.json
└── tsconfig.json
```

#### Design Patterns

**Factory Pattern** - Criação de instâncias:
```typescript
const client = TelegramClient.create({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
});
```

**Builder Pattern** - Configuração fluente:
```typescript
const checkout = client.checkout()
  .withAmount(39700)
  .withDescription('Produto X')
  .build();
```

#### Validação

Sempre usar **Zod** para validar configurações:

```typescript
import { z } from 'zod';

export const ConfigSchema = z.object({
  apiKey: z.string().min(1, 'API key é obrigatória'),
  timeout: z.number().positive().default(30000),
});

export type Config = z.infer<typeof ConfigSchema>;
```

#### Erros

Classes de erro com contexto:

```typescript
export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}
```

#### Exports

Apenas API pública no `index.ts`:

```typescript
// ✅ Exportar
export { TelegramClient } from './client';
export type { TelegramConfig } from './config';

// ❌ NÃO exportar internals
```

---

### TypeScript

- `strict: true` sempre
- Nunca usar `any` (usar `unknown` se necessário)
- `interface` para APIs públicas, `type` para unions/intersections
- `readonly` para imutabilidade

---

## Comandos

```bash
# Desenvolvimento
pnpm dev              # Inicia todos os apps em dev
pnpm dev --filter seyune  # Apenas seyune

# Build
pnpm build            # Build de produção

# Qualidade
pnpm lint             # ESLint
pnpm test             # Jest

# Stripe (local)
pnpm --filter seyune stripe:listen  # Webhook listener
```

---

## Documentação

### Global (aplica a todos os projetos)
- `/docs/meta-ads-rules.md` - Regras de campanhas Meta Ads
- `/docs/stripe-setup-guide.md` - Setup do Stripe
- `/docs/tracking-setup.md` - Configuração de tracking

### Por App
Cada app tem sua própria pasta `docs/` com:
- Persona do cliente
- Identidade da marca
- Copy e estratégia
- Configurações específicas

---

## Apps

### Seyune (`apps/seyune/`)
Nutricionista comportamental. Ver `apps/seyune/CLAUDE.md` para detalhes.

### Elizete (`apps/elizete/`)
Estética e dermatologia. Ver `apps/elizete/CLAUDE.md` para detalhes.

---

**Última atualização:** 2025-12-04
