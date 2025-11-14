# Meta Conversions API - Setup e Teste

## Visão Geral

A **Meta Conversions API** (anteriormente Facebook Conversions API) permite enviar eventos de conversão do **servidor** diretamente para o Meta, complementando os eventos do **Meta Pixel** (client-side).

### Por que usar Conversions API?

1. **Maior Confiabilidade**: Eventos server-side não dependem do navegador do usuário (bloqueadores de ads, cookies bloqueados)
2. **Melhor Atribuição**: Meta pode combinar eventos client-side + server-side para atribuição mais precisa
3. **Otimização de Campanhas**: Meta recebe mais dados para otimizar os anúncios
4. **Deduplicação Automática**: Usando `event_id`, Meta não conta o mesmo evento duas vezes

---

## 1. Configuração Inicial

### 1.1. Obter Access Token

1. Ir em **Meta Events Manager**: https://business.facebook.com/events_manager2
2. Selecionar seu Pixel (ex: `1372596174316647`)
3. Ir em **Settings → Conversions API**
4. Clicar em **Generate Access Token**
5. Copiar o token (começa com `EAA...`)

### 1.2. Obter Test Event Code (Opcional, para testes)

1. No mesmo Pixel, ir em **Test Events**
2. Clicar em **Test server events**
3. Copiar o **Test Event Code** (ex: `TEST12345`)

### 1.3. Configurar Variáveis de Ambiente

Adicionar no `.env.local`:

```bash
# Meta Pixel & Conversions API
NEXT_PUBLIC_META_PIXEL_ID=1372596174316647
META_CONVERSIONS_API_TOKEN=EAA... # Cole o token gerado
META_TEST_EVENT_CODE=TEST12345 # Opcional, apenas para testes
```

**Importante:**
- `NEXT_PUBLIC_META_PIXEL_ID`: Usado no client-side (Meta Pixel) e server-side (Conversions API)
- `META_CONVERSIONS_API_TOKEN`: **NUNCA** adicionar `NEXT_PUBLIC_` (é server-side only, não pode vazar para client)
- `META_TEST_EVENT_CODE`: Opcional, apenas para validar eventos no Events Manager antes de produção

---

## 2. Arquitetura da Implementação

### 2.1. Onde os eventos são enviados?

**Client-side (Meta Pixel):**
- Arquivo: `src/lib/analytics/adapters/meta-pixel.ts`
- Eventos: `PageView`, `InitiateCheckout`, `Purchase`
- Triggers: Usuário visita página, clica botão, etc.

**Server-side (Conversions API):**
- Arquivo Stripe: `src/app/api/stripe/webhook/route.ts` (linhas 133-189)
- Arquivo MercadoPago: `src/app/api/webhook/mercadopago/route.ts` (linhas 116-165)
- Evento: `Purchase` (apenas quando pagamento é aprovado)
- Trigger: Webhook de pagamento aprovado

### 2.2. Deduplicação Client + Server

Para evitar que o Meta conte o mesmo evento duas vezes:

**Client-side (Meta Pixel):**
```typescript
fbq('track', 'Purchase', {
  currency: 'BRL',
  value: 397,
}, { eventID: 'payment_12345' }); // event_id único
```

**Server-side (Conversions API):**
```typescript
metaClient.sendEvent({
  event_name: 'Purchase',
  event_id: 'payment_12345', // MESMO event_id
  // ... resto dos dados
});
```

Meta detecta que é o mesmo evento (mesmo `event_id`) e não conta duplicado.

---

## 3. Teste Manual (Modo Teste)

### 3.1. Configurar Test Event Code

Adicionar no `.env.local`:
```bash
META_TEST_EVENT_CODE=TEST12345
```

### 3.2. Abrir Events Manager - Test Events

1. Ir em: https://business.facebook.com/events_manager2
2. Selecionar Pixel
3. Clicar em **Test Events**
4. **Server Events** deve estar selecionado

### 3.3. Simular um Pagamento Aprovado

#### Opção A: Usar Stripe Test Mode

1. Iniciar servidor local: `pnpm dev`
2. Ir em `/projeto45dias`
3. Clicar em "Quero Garantir Minha Vaga"
4. Preencher formulário
5. Usar cartão de teste Stripe: `4242 4242 4242 4242`
6. Completar pagamento

#### Opção B: Usar Webhook de Teste

Criar arquivo `test-meta-webhook.ts`:

```typescript
import { MetaConversionsClient } from '@/lib/@lumes/meta-conversions-api';

const client = MetaConversionsClient.create({
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID!,
  accessToken: process.env.META_CONVERSIONS_API_TOKEN!,
  testEventCode: process.env.META_TEST_EVENT_CODE, // Importante!
});

const result = await client.sendEvent({
  event_name: 'Purchase',
  event_time: Math.floor(Date.now() / 1000),
  event_source_url: 'https://seyune.com.br/projeto45dias',
  action_source: 'website',
  event_id: 'test_' + Date.now(),
  user_data: {
    email: 'test@example.com',
    phone: '+5511999999999',
    firstName: 'Teste',
    lastName: 'Conversions',
    country: 'br',
  },
  custom_data: {
    currency: 'BRL',
    value: 397,
    content_name: 'Black 45 Graus',
    order_id: 'test_123',
  },
});

console.log('Evento enviado:', result);
```

Executar: `tsx test-meta-webhook.ts`

### 3.4. Validar no Events Manager

Após enviar evento, verificar em **Test Events**:

✅ **Sucesso:**
- Evento aparece na lista (ex: `Purchase`)
- Status: **Event Received**
- Match Quality: **8/10** ou superior (ideal)
- Customer Information Parameters: Verde (8/8 matched)

❌ **Problemas Comuns:**
- **Evento não aparece**: Verificar `testEventCode` está correto
- **Match Quality baixo**: Falta dados de usuário (email, phone, etc.)
- **Error**: Verificar logs do console/webhook para mensagem de erro

---

## 4. Validar Hashing de Dados

Meta exige que **PII** (informações pessoais) sejam **hasheadas** antes de enviar.

### 4.1. Campos que são hasheados automaticamente

✅ **Hasheados (SHA-256):**
- `email` → `em`
- `phone` → `ph`
- `firstName` → `fn`
- `lastName` → `ln`
- `city` → `ct`
- `state` → `st`
- `zip` → `zp`
- `country` → `country` (✅ **ATUALIZADO 2024**: agora é hasheado)

❌ **NÃO hasheados:**
- `clientIpAddress`
- `clientUserAgent`
- `fbp` (Facebook Browser ID - cookie)
- `fbc` (Facebook Click ID - cookie)
- `externalId`

### 4.2. Verificar hashing no Test Event

No **Test Events**, clicar em evento → **Event Details**:

```json
{
  "user_data": {
    "em": "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b", // ✅ Hasheado
    "ph": "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56...", // ✅ Hasheado
    "country": "60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752" // ✅ Hasheado (atualizado 2024)
  }
}
```

**Deve aparecer APENAS valores hasheados (64 caracteres hexadecimais):**
- ✅ `"em": "973dfe..."` (email hasheado)
- ✅ `"country": "60303a..."` (country hasheado)

**Não deve aparecer dados em texto plano:**
- ❌ `"email": "test@example.com"`
- ❌ `"phone": "+5511999999999"`
- ❌ `"country": "br"` (country deve estar hasheado agora)

---

## 5. Passar para Produção

### 5.1. Remover Test Event Code

Comentar ou remover do `.env.local`:
```bash
# META_TEST_EVENT_CODE=TEST12345 # Apenas para testes
```

### 5.2. Validar Eventos Reais

1. Ir em **Meta Events Manager → Data Sources → [Seu Pixel]**
2. Ver **Activity** (últimos eventos)
3. **Server Events** deve aparecer na coluna "Event Source"

### 5.3. Verificar Deduplicação

1. Clicar em evento `Purchase`
2. Ver **Event Match Quality**
3. Verificar se tem **both pixel and server** (evento foi dedupado)

---

## 6. Monitoramento e Troubleshooting

### 6.1. Logs do Webhook

**Stripe Webhook:**
```bash
# Ver logs no Vercel (Produção)
vercel logs --follow

# Filtrar apenas eventos Meta
vercel logs --follow | grep "Meta"
```

**Local (desenvolvimento):**
```bash
pnpm dev
# Webhooks vão logar no console
```

### 6.2. Erros Comuns

#### Erro: "Invalid access token"
- ✅ Verificar `META_CONVERSIONS_API_TOKEN` está correto
- ✅ Token não expirou (gerar novo se necessário)
- ✅ Token tem permissões corretas

#### Erro: "No matching users found"
- ⚠️ Dados de usuário (email, phone) não fazem match com usuários do Meta
- ✅ Isso é **esperado** em testes (emails de teste não existem no Meta)
- ✅ Em produção, emails reais terão match melhor

#### Evento não aparece no Events Manager
- ✅ Verificar variável `NEXT_PUBLIC_META_PIXEL_ID` está correta
- ✅ Verificar webhook está sendo chamado (logs)
- ✅ Verificar não há erro no try/catch (logs)

#### Match Quality baixo (<5/10)
- ✅ Adicionar mais dados de usuário: `phone`, `firstName`, `lastName`, `city`, `state`, `zip`
- ✅ Capturar `fbp` e `fbc` cookies do client-side e enviar no server-side

---

## 7. Melhorias Futuras

### 7.1. Capturar FBP/FBC Cookies

No checkout, capturar cookies do Meta Pixel:

```typescript
// Client-side
const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1];
const fbc = document.cookie.match(/_fbc=([^;]+)/)?.[1];

// Enviar para webhook via metadata
metadata: {
  fbp,
  fbc,
}

// Server-side (webhook)
user_data: {
  fbp: metadata.fbp,
  fbc: metadata.fbc,
}
```

### 7.2. Enviar InitiateCheckout Server-Side

Além de `Purchase`, enviar `InitiateCheckout` quando usuário inicia checkout:

```typescript
// Em /api/checkout/create
metaClient.sendEvent({
  event_name: 'InitiateCheckout',
  // ... dados
});
```

### 7.3. Adicionar IP e User Agent

No webhook, já capturamos:

```typescript
user_data: {
  clientIpAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
  clientUserAgent: req.headers.get('user-agent'),
}
```

Isso melhora o **match quality**.

---

## 8. Referências

- **Meta Conversions API Docs**: https://developers.facebook.com/docs/marketing-api/conversions-api
- **Event Match Quality**: https://www.facebook.com/business/help/765081237991954
- **Deduplication Guide**: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- **Test Events**: https://www.facebook.com/business/help/490920648302825

---

**Criado em:** 2025-11-13
**Versão:** 1.0
