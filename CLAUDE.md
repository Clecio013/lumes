# Projeto Seyune - Landing Page

## Visão Geral do Projeto

Landing page de conversão para **Seyune**, nutricionista comportamental especializada em ajudar mulheres jovens a alcançarem resultados sustentáveis através de uma abordagem que integra aspectos físicos, emocionais e comportamentais da alimentação.

**Objetivo Principal:** Gerar agendamentos de consultas individuais via WhatsApp (meta: ~10 novos pacientes/semana)

**Budget:** R$500 inicial (ads Meta → reinvestir ganhos)

**Duração:** Landing page evergreen (sempre disponível), campanhas pausadas quando agenda cheia

---

## Arquitetura do Projeto

### Estrutura de Rotas
```
/                    → Redirect para /consulta (homepage temporária)
/consulta            → Landing page principal de conversão
```

**Decisão:** Arquitetura escalável para futuras landing pages (`/nutricao-esportiva`, `/grupos`, etc.) e eventual site institucional na raiz.

### Tech Stack
- **Framework:** Next.js 16.0.1 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5
- **Styling:** Tailwind CSS 4 (PostCSS)
- **Components:** shadcn/ui (New York style)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** Recoleta Alt, Nexa, Dreaming Outloud Sans

### Estrutura de Pastas
```
/src
├── app/
│   ├── page.tsx                    # Redirect para /consulta
│   ├── consulta/
│   │   └── page.tsx               # Landing page principal
│   ├── layout.tsx                 # Layout global
│   └── globals.css
├── components/
│   ├── ui/                        # shadcn/ui (não modificar diretamente)
│   └── custom/                    # Componentes personalizados
│       ├── header-scroll.tsx      # Header que aparece ao scroll
│       ├── hero.tsx
│       ├── section-dores.tsx
│       └── ...
└── lib/
    └── utils.ts                   # Utilities (cn, etc.)

/public
├── logo-terracota.png             # Logo para header (124.7 KB)
├── logotipo-terracota.png         # Logotipo hero (359 KB)
└── images/
    └── seyune/                    # Fotos do ensaio fotográfico

/docs
├── persona.md                     # Persona detalhada (mulheres 24-38 anos)
├── campanha-seyune.md             # Estratégia e objetivos da campanha
├── copy.md                        # Framework de 10 perguntas (direcionamento)
└── Pré Projeto Seyune Zhou - Nova paleta.pdf  # DNA da marca
```

---

## Identidade da Marca

### DNA da Marca
**Tagline:** "Cuidar do corpo, respeitar a mente"

**Atributos:** Moderna • Tranquila • Estável • Elegante

### Paleta de Cores
```css
#454c31  /* Verde Profundo - Balance, introspection, maturity */
#874329  /* Terracota Vivo - Proximity, empathy, vitality */
#602514  /* Marrom Terroso - Solidity, sophistication */
#efd1af  /* Creme Areia - Lightness, clarity, breathing space */
#f0f0f0  /* Off White - Clean backgrounds */
```

**Filosofia:** Tons terrosos, naturais, evocando raízes e integridade. Elegante e atemporal, longe de tendências e cores saturadas.

### Tipografia
- **Título:** Recoleta Alt (elegante, orgânica, curvas suaves)
- **Corpo:** Nexa (moderna, limpa, legível)
- **Citação:** Dreaming Outloud Sans (pessoal, autêntica)

**Uso:** Flexível entre categorias (não restrito a uso único)

### Logo & Símbolos
- **"sey"**: Abreviação íntima, acolhedora, elegante
- **Símbolo**: Balança com folhas (equilíbrio corpo-mente + conexão natural)
- **Arquivos:**
  - `logo-terracota.png` - Header scroll
  - `logotipo-terracota.png` - Hero section

---

## Público-Alvo (Persona)

### Demografia
- **Idade:** 24-38 anos
- **Gênero:** Mulheres
- **Perfil:** Conectadas, vaidosas, cansadas de tentativas frustradas

### Dores Principais
1. **Ciclo de dietas:** "foco total → recaída → culpa → recomeçar"
2. **Culpa e compulsão** alimentar
3. **Efeito sanfona** constante
4. **Falta de resultados sustentáveis**
5. **Desconexão emocional** com a comida
6. **Pressão por perfeição** (influencers, padrões irreais)

### Comportamentos
- Consomem conteúdo fitness regularmente
- Seguem influencers
- Compram suplementos
- Já tentaram múltiplas dietas/protocolos
- Comparação negativa → baixa autoestima
- Possível isolamento social (evitar julgamento)

### Soluções Tentadas (que falharam)
- Dietas da moda
- Protocolos restritivos
- Desafios fitness de curto prazo
- Conselhos de influencers não qualificados
- Produtos/suplementos "milagrosos"
- Programas online genéricos

### Obstáculos ao Sucesso
- Falta de personalização
- Abordagens restritivas
- Falta de acompanhamento contínuo
- Pressão por resultados rápidos
- Necessidades emocionais não atendidas
- Informação de fontes não qualificadas

### Resultados Desejados
1. Bem-estar físico e mental
2. Aumento de confiança
3. Relação saudável com comida
4. Energia e vitalidade
5. Liberdade de escolha
6. Estabilidade emocional

---

## Seyune - A Solução

### Credenciais
- Formação acadêmica em Nutrição
- Especialização em Nutrição Comportamental
- Experiência pessoal: ganhou +10kg de massa magra (era 45kg, fraca, insegura)
- Resultados comprovados com múltiplos clientes

### Metodologia
1. **Abordagem comportamental:** Integra aspectos emocionais e físicos
2. **Planos personalizados:** Adaptados à rotina de cada cliente
3. **Sem restrições severas:** Evita ciclo de culpa/punição
4. **Acompanhamento contínuo:** Suporte profissional constante
5. **Realista e flexível:** Mudanças sustentáveis vs. resultados rápidos

### Diferencial
- Viveu a transformação (45kg → +10kg massa magra)
- Entende as dores emocionais da persona
- Foge dos clichés de "cultura de dieta"
- Foco em bem-estar integral, não só estética

---

## Estrutura da Landing Page `/consulta`

### Ordem das Seções (Persona-First)

1. **Hero**
   - Logotipo terracota
   - Headline emocional forte
   - Subheadline
   - CTA principal (WhatsApp)
   - Background: creme (#efd1af)

2. **Dores** (Identificação)
   - Descrever dores/desafios atuais
   - Consequências de se manter no mesmo lugar
   - Validação emocional

3. **Benefícios** (Transformação Possível)
   - Físico + Mental + Emocional
   - Cards grid com ícones
   - Hover effects

4. **Como Funciona** (Processo)
   - 3 passos claros:
     1. Consulta inicial (entender necessidades)
     2. Plano personalizado
     3. Acompanhamento contínuo
   - Timeline visual

5. **Transformação Seyune** (Prova Social)
   - Fotos: antes (45kg, fraca) → depois (+10kg massa magra)
   - História pessoal: "Eu já estive onde você está"
   - Credibilidade emocional

6. **Depoimentos Simulados** (Validação)
   - Dores autênticas da persona
   - Não usar aspas/formato tradicional de depoimento
   - "Mulheres como você estão sentindo..."

7. **Quem é Seyune** (Credenciais Técnicas)
   - Foto profissional do ensaio
   - Formação + especialização
   - CTA secundário

8. **FAQ** (Objeções)
   - Accordion (shadcn/ui)
   - 4-6 perguntas principais
   - Design minimalista

9. **CTA Final** (Conversão)
   - Urgente mas não agressivo
   - Botão grande para WhatsApp
   - Última chance de conversão

10. **Footer**
    - Links legais (políticas, LGPD)
    - Redes sociais
    - Copyright

### Componentes Especiais

**Header com Scroll:**
- Aparece ao fazer scroll (Framer Motion)
- Sticky position
- Logo terracota (`logo-terracota.png`)
- CTA button (WhatsApp)
- Background: off-white (#f0f0f0)

---

## Copy Strategy

### Framework (não literal)
**Base:** `/docs/copy.md` - 10 perguntas da persona

**Uso:** Direcionamento estratégico, não copy final. Criar copy livre e natural que responda essas dúvidas de forma fluida.

### 10 Perguntas que a Copy Deve Responder

1. **Como isso é diferente?** → Benefícios section
2. **O que eu ganho?** → Benefícios + Como Funciona
3. **Como sei que é real?** → Transformação Seyune + Credenciais
4. **O que me impede?** → FAQ (objeções)
5. **Quem é o culpado?** → Dores (dietas restritivas tradicionais)
6. **Por que agora?** → Dores (cada ano perdido no ciclo de frustração)
7. **Por que devo confiar?** → Transformação Seyune (história pessoal: 45kg → +10kg)
8. **Como funciona?** → Como Funciona section
9. **Como começo?** → CTAs (WhatsApp)
10. **[Implícita]** Validação social → Depoimentos simulados

### Crença Central da Persona
> "Sinceramente? Eu não aguento mais começar dieta achando que agora vai… e acabar sentindo que tô vivendo pra comer certo."

### Princípios de Tom e Voz
- ✅ Conversacional, não corporativa
- ✅ Empática, sem julgamento
- ✅ Esperançosa mas realista
- ✅ Primeira pessoa quando apropriado
- ✅ Foco na persona (70%) > Seyune (30%)
- ✅ Emocional + racional equilibrados
- ✅ Responder dúvidas naturalmente (não FAQ explícito até final)

---

## Design System

### Princípios de Design
- **Clean & Minimal:** Muito espaço em branco
- **Hierarquia Tipográfica:** Forte contraste entre níveis
- **Respiração Visual:** Backgrounds em creme (#efd1af)
- **Sombras Sutis:** Cards e elevações discretas
- **Mobile-First:** Sempre responsivo

### Customização shadcn/ui
⚠️ **IMPORTANTE:** Não modificar arquivos em `/components/ui`

**Como customizar:**
- Usar `className` prop nos componentes
- Sobrescrever estilos via Tailwind classes
- Criar componentes custom em `/components/custom` se necessário
- Usar CVA (class-variance-authority) para variants complexas

### Animações (Framer Motion)
- Scroll reveal suave (fade + translate)
- Hover states em cards/buttons
- Header: slide down ao scroll
- Micro-interações em CTAs
- Transições suaves (ease-in-out)
- Parallax leve no hero (opcional)

---

## Funnel de Conversão

### Fluxo
```
Meta Ads (vídeo + creative)
    ↓
Landing Page /consulta (com tracking)
    ↓
WhatsApp
    ↓
Consulta Agendada
```

### CTA Strategy
- **Primário:** WhatsApp com mensagem pré-preenchida
- **Secundário:** Repetir CTA em seções estratégicas
- **Final:** CTA urgente antes do footer

### WhatsApp Integration
- Número da Seyune (a definir)
- Mensagem pré-preenchida otimizada
- Formato: `https://wa.me/5511999999999?text=Olá...`

---

## Tracking & Analytics

### Stack de Tracking
1. **Google Tag Manager** (gerenciar todos os pixels/tags)
2. **Meta Pixel** (rastrear conversões dos ads)
3. **Google Analytics 4** (análise de comportamento)

### Eventos a Rastrear
- **CTA Clicks:** Hero, seções intermediárias, footer
- **Scroll Depth:** 25%, 50%, 75%, 100%
- **Tempo em Seções:** Quanto tempo em cada seção
- **FAQ Interactions:** Quais perguntas são expandidas
- **WhatsApp Clicks:** Evento de conversão principal

### KPIs Principais
- Taxa de conversão (visitas → WhatsApp)
- Custo por lead (CPL)
- Taxa de agendamento (WhatsApp → consulta)
- Scroll depth médio
- Tempo médio na página

---

## Arquitetura Futura

### Lista de Espera (preparar, não implementar)
Quando agenda estiver cheia:

**Opções consideradas:**
1. Mensagem temporária indicando sem vagas
2. Sistema de lista de espera (capturar contatos)
3. Continuar normal, filtrar no WhatsApp

**Decisão:** Sistema de lista de espera
- Preparar arquitetura/estrutura de dados
- Deixar placeholders em código
- Não implementar agora (adicionar quando necessário)
- Possível integração com CRM (a definir)

### Escalabilidade
Landing pages futuras possíveis:
- `/nutricao-esportiva` - Foco em atletas
- `/grupos` - Consultas em grupo
- `/emagrecimento` - Foco específico

Site institucional futuro na raiz (`/`):
- Homepage
- `/sobre`
- `/blog`
- `/recursos`

---

## Deploy & Infraestrutura

### Ambiente Atual
- **Hosting:** Vercel
- **URL temporária:** https://seyune.vercel.app
- **Plano:** Adquirir domínio oficial

### Produção
- Build otimizado (`next build`)
- SSL configurado
- DNS apontando para Vercel
- Tracking ativo e testado

---

## Próximas Sessões

### Como Continuar Este Projeto
1. Ler este `CLAUDE.md` completamente
2. Verificar `/docs` para informações detalhadas
3. Checar progresso em todo list (se aplicável)
4. Revisar código existente em `/src/app/consulta`

### Comandos Úteis
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Instalar componente shadcn/ui
npx shadcn@latest add button

# Adicionar fonte Google (se necessário)
# Configurar em app/layout.tsx
```

### Referências Importantes
- **Instagram:** https://www.instagram.com/seyune
- **Docs:** `/docs` (persona, campanha, copy, PDF brand)
- **Logos:** `/public/logo-terracota.png` e `/public/logotipo-terracota.png`
- **Fotos:** Ensaio fotográfico disponível (solicitar ao usuário)

---

## Arquitetura de Libs Reutilizáveis

### Quando Criar Libs Exportáveis

Sempre que implementar **integrações com serviços externos** (pagamento, email, storage, CRM, analytics, etc.) que serão reutilizadas em múltiplos projetos Lumes:

#### 1. Estrutura de Diretórios

Criar em `/src/lib/@lumes/{nome}` (não `/src/lib` direto):

```
/src/lib/@lumes/{nome}/
├── client.ts          # Factory principal (ponto de entrada)
├── config.ts          # Validação de config com Zod
├── types.ts           # Types/interfaces públicas
├── errors.ts          # Custom errors (opcional)
├── adapters/          # Adapters de providers (se aplicável)
│   ├── base.ts        # Interface comum
│   └── {provider}.ts  # Implementação específica
├── {feature}/         # Features específicas organizadas por pasta
│   ├── feature.ts
│   └── types.ts
└── index.ts           # Public API (re-exports explícitos)
```

#### 2. Design Patterns a Aplicar

**Factory Pattern** (criação de instâncias configuradas):
```typescript
const client = ServiceClient.create({
  apiKey: process.env.API_KEY,
  environment: 'production'
});
```

**Builder Pattern** (configuração fluente de objetos complexos):
```typescript
const resource = client.resource()
  .withName('foo')
  .withMetadata({ bar: 'baz' })
  .withOptions({ timeout: 5000 })
  .build();
```

**Adapter Pattern** (abstrair providers externos para trocar facilmente):
```typescript
// Interface comum
export interface EmailProvider {
  send(params: EmailParams): Promise<EmailResult>;
}

// Implementações específicas
class ResendAdapter implements EmailProvider { ... }
class SendGridAdapter implements EmailProvider { ... }

// Factory que escolhe provider
EmailClient.create({ provider: 'resend' | 'sendgrid' });
```

**Strategy Pattern** (comportamentos intercambiáveis):
```typescript
const handler = WebhookHandler.create({
  onSuccess: async (data) => { /* lógica */ },
  onFailure: async (data) => { /* lógica */ },
  onPending: async (data) => { /* lógica */ }
});
```

**Dependency Injection** (inversão de controle para testabilidade):
```typescript
// Business logic recebe dependências injetadas
class CheckoutService {
  constructor(
    private paymentClient: IPaymentClient,
    private emailClient: IEmailClient,
    private storage: IStorage
  ) {}

  async process() {
    // Usa interfaces, não implementações concretas
  }
}
```

#### 3. Princípios SOLID

- **S** (Single Responsibility): Cada módulo uma responsabilidade clara e bem definida
- **O** (Open/Closed): Extensível via adapters/estratégias sem modificar código existente
- **L** (Liskov): Adapters implementam interfaces de forma consistente e substituível
- **I** (Interface Segregation): Interfaces pequenas, focadas e específicas
- **D** (Dependency Inversion): Depender de abstrações (interfaces), não implementações concretas

#### 4. Boas Práticas Obrigatórias

**Validação de Config:**
- Usar **Zod** (sempre) para validar configurações
- Falhar rápido (fail-fast) com mensagens de erro claras
```typescript
import { z } from 'zod';

export const ConfigSchema = z.object({
  apiKey: z.string().min(1, 'API key é obrigatória'),
  timeout: z.number().positive().default(30000),
});

export type Config = z.infer<typeof ConfigSchema>;
```

**TypeScript Strict:**
- Sempre `strict: true` no tsconfig
- Nunca usar `any` (usar `unknown` quando tipo é realmente desconhecido)
- Prefer `interface` para APIs públicas, `type` para unions/intersections
- Usar `readonly` para imutabilidade

**Imutabilidade:**
```typescript
// Config é readonly após criação
getConfig(): Readonly<Config> {
  return Object.freeze({ ...this.config });
}

// Arrays e objetos imutáveis
private readonly items: ReadonlyArray<Item> = [];
```

**Error Handling Consistente:**
```typescript
// Custom errors com contexto
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

// Uso
throw new ServiceError(
  'Falha ao processar pagamento',
  'PAYMENT_FAILED',
  error
);
```

**JSDoc em Funções Públicas:**
```typescript
/**
 * Cria um novo checkout de pagamento
 *
 * @param amount - Valor em centavos (ex: 34700 = R$ 347,00)
 * @param description - Descrição do produto/serviço
 * @returns Promise com URL de checkout e ID da preferência
 * @throws {ServiceError} Se configuração inválida ou API falhar
 *
 * @example
 * ```typescript
 * const checkout = await client.createCheckout(34700, 'Produto X');
 * console.log(checkout.url); // https://checkout.provider.com/abc123
 * ```
 */
async createCheckout(amount: number, description: string): Promise<Checkout> {
  // implementação
}
```

**Export apenas API necessária:**
```typescript
// index.ts - Public API
export { ServiceClient } from './client';
export type { Config } from './config';
export type { Resource, ResourceOptions } from './types';
// NÃO exportar: internals, helpers privados, implementações de adapters
```

#### 5. Testing (Após Validação Manual)

**Estratégia:**
1. Implementar funcionalidade
2. Validar manualmente (testes manuais reais)
3. Após confirmar que funciona: adicionar testes automatizados
4. Usar **Jest** (não Vitest) com mocks de APIs externas

**Estrutura de testes:**
```typescript
// {feature}.test.ts
import { describe, it, expect, jest } from '@jest/globals';
import { ServiceClient } from '../client';

describe('ServiceClient', () => {
  it('deve criar instância com config válida', () => {
    const client = ServiceClient.create({ apiKey: 'test' });
    expect(client).toBeDefined();
  });

  it('deve falhar com config inválida', () => {
    expect(() => ServiceClient.create({ apiKey: '' }))
      .toThrow('API key é obrigatória');
  });

  // Mais testes: happy path + error cases
});
```

**Cobertura mínima:**
- Happy path (caso de sucesso)
- Error cases (falhas esperadas)
- Validação de config
- Edge cases críticos

#### 6. Exemplo Completo: @lumes/mercadopago

```
/src/lib/@lumes/mercadopago/
├── client.ts              # MercadoPagoClient (Factory)
├── config.ts              # MercadoPagoConfigSchema (Zod)
├── types.ts               # Payment, Checkout, etc.
├── errors.ts              # MercadoPagoError
├── checkout/
│   ├── checkout-builder.ts  # Builder pattern
│   └── types.ts
├── webhook/
│   ├── webhook-handler.ts   # Strategy pattern
│   └── signature-validator.ts
└── index.ts               # Exports públicos
```

**Uso:**
```typescript
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';

const mpClient = MercadoPagoClient.create({
  accessToken: process.env.MP_TOKEN!,
  sandbox: true
});

const checkout = await mpClient.checkout()
  .withAmount(34700)
  .withDescription('Projeto 45 Graus')
  .withMetadata({ lote: 1 })
  .build();

await mpClient.webhook().handle(body, {
  onApproved: async (payment) => { /* lógica */ }
});
```

#### 7. Migração Futura para GitHub Packages

Quando libs estiverem estáveis e testadas:

1. **Criar repositório GitHub privado:** `@lumes/{nome}`
2. **Adicionar arquivos:**
   - `package.json` (name, version, exports, dependencies)
   - `README.md` (documentação completa com exemplos)
   - `LICENSE` (MIT ou proprietária)
   - `tsconfig.json` (configurações de build)
   - `.npmignore` (excluir testes, docs internas)

3. **Publicar no npm/GitHub Packages:**
   ```bash
   npm publish --access private
   ```

4. **Instalar no projeto:**
   ```bash
   npm install @lumes/mercadopago @lumes/email @lumes/sheets
   ```

5. **Atualizar imports:**
   ```diff
   - import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
   + import { MercadoPagoClient } from '@lumes/mercadopago';
   ```

**Estrutura já permite extração sem refatoração**: Basta copiar `/src/lib/@lumes/{nome}` para novo repo, adicionar `package.json` e publicar.

---

## Notas Importantes

- ⚠️ Copy é criada de forma **livre e natural**, `/docs/copy.md` é apenas **direcionamento estratégico**
- ⚠️ **Não modificar** componentes em `/components/ui` (shadcn/ui)
- ⚠️ Landing page é **evergreen** (sempre disponível, campanhas pausadas quando agenda cheia)
- ⚠️ Budget limitado (R$500), otimizar conversão é crítico
- ⚠️ Persona-first approach (falar da cliente antes de falar da Seyune)
- ⚠️ Mobile-first sempre (maioria do tráfego virá de Meta Ads mobile)
- ⚠️ **Libs reutilizáveis**: Sempre criar integrações externas em `/src/lib/@lumes/` com arquitetura exportável

---

**Última atualização:** 2025-11-06
**Versão:** 1.1
