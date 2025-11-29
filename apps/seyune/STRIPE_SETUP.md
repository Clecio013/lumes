# Configuração do Stripe - Projeto 45 Graus

## 1. Criar Conta Stripe (se não tiver)

1. Acesse: https://dashboard.stripe.com/register
2. Preencha dados da Lumes Digital
3. Ative o modo de teste primeiro

---

## 2. Criar Produto e Preço

### Via Dashboard (Recomendado):

1. Acesse: https://dashboard.stripe.com/test/products
2. Clique em **"+ Add product"**
3. Preencha:
   - **Name:** `Projeto 45 Graus - Programa de Transformação`
   - **Description:** `Programa completo de 45 dias com nutricionista e personal trainer`
   - **Pricing:**
     - **One time:** (não recorrente)
     - **Price:** `397.00 BRL` (ou o valor atual do lote)
   - **Tax behavior:** `Exclusive` (sem impostos adicionais)
4. Clique em **"Save product"**
5. **Copie o Price ID** (formato: `price_xxxxxxxxxxxxx`)

### Via Stripe CLI (Alternativo):

```bash
stripe products create \
  --name "Projeto 45 Graus - Programa de Transformação" \
  --description "Programa completo de 45 dias com nutricionista e personal trainer"

stripe prices create \
  --product prod_xxxxxxxxxxxxx \
  --unit-amount 39700 \
  --currency brl
```

---

## 3. Ativar PIX no Brasil (Opcional - quando disponível)

⚠️ **IMPORTANTE:** O Stripe exige algumas transações aprovadas via cartão antes de habilitar PIX. Por enquanto, **apenas cartão de crédito** está habilitado no código.

### Quando PIX estiver disponível na sua conta:

1. Acesse: https://dashboard.stripe.com/settings/payment_methods
2. Na seção **"Payment methods"**, encontre **"PIX"**
3. Clique em **"Turn on"** para PIX
4. Configure:
   - **Country:** Brazil
   - **Statement descriptor:** `Projeto 45 Graus` (aparece no extrato)
5. Salve as configurações

### Atualizar código para habilitar PIX:

Edite `/src/app/api/stripe/create-session/route.ts` linha 61:

```typescript
// ANTES (apenas cartão)
.withPaymentMethods(['card'])

// DEPOIS (cartão + PIX)
.withPaymentMethods(['card', 'pix'])
```

**Nota:** PIX só funciona com contas Stripe habilitadas para Brasil. Se sua conta for de outro país, você precisará criar uma conta Stripe Brasil.

---

## 4. Obter Chaves de API

### Ambiente de Teste:

1. Acesse: https://dashboard.stripe.com/test/apikeys
2. **Copie as chaves:**
   - **Publishable key:** `pk_test_xxxxxxxx` (não usada no Checkout Hosted)
   - **Secret key:** `sk_test_xxxxxxxx` ⚠️ **NUNCA COMMITE NO GIT**

### Ambiente de Produção (quando testar e validar):

1. **Desative o "Test mode"** (toggle no canto superior direito)
2. Acesse: https://dashboard.stripe.com/apikeys
3. **Copie as chaves:**
   - **Publishable key:** `pk_live_xxxxxxxx`
   - **Secret key:** `sk_live_xxxxxxxx` ⚠️ **NUNCA COMMITE NO GIT**

---

## 5. Configurar Webhook (para produção)

### 5.1. Via Dashboard (Produção):

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique em **"+ Add endpoint"**
3. Preencha os campos:
   - **Endpoint URL:** `https://seyune.vercel.app/api/stripe/webhook`
   - **Nome do destino:** `Projeto 45 Graus - Produção`
   - **Descrição:** `Webhook para processar pagamentos aprovados (PIX e Cartão) do Projeto 45 Graus. Salva dados no Google Sheets e envia email de confirmação.`
   - **API Version:** `2025-10-29.clover` (mais recente disponível)
4. **Events to send:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Clique em **"Add endpoint"**
6. **Copie o "Signing secret"** (formato: `whsec_xxxxxxxx`)

### 5.2. Via Stripe CLI (Desenvolvimento Local):

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Escutar webhooks localmente
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

O CLI vai retornar um **webhook signing secret** temporário (formato: `whsec_xxxxxxxx`)

---

## 6. Configurar Variáveis de Ambiente

### Desenvolvimento Local (`.env.local`):

```bash
# Stripe - Test Mode
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE  # Do Stripe CLI
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE

# Outros (já existentes)
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/xxxxx
RESEND_API_KEY=re_YOUR_RESEND_KEY_HERE
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com
GOOGLE_SHEETS_SHEET_ID=1abc...
GOOGLE_SHEETS_SHEET_NAME=Sheet1
```

### Produção (Vercel):

```bash
# Via Vercel Dashboard ou CLI
vercel env add STRIPE_SECRET_KEY
# Cole: sk_live_xxxxxxxx

vercel env add STRIPE_WEBHOOK_SECRET
# Cole: whsec_xxxxxxxx (do webhook configurado no passo 5.1)

vercel env add STRIPE_PRICE_ID
# Cole: price_xxxxxxxx

# Fazer pull para testar localmente com env de produção
vercel env pull .env.production.local
```

---

## 7. Testar Localmente

### 7.1. Iniciar servidor de desenvolvimento:

```bash
pnpm dev
```

### 7.2. Iniciar Stripe CLI webhook listener (em outro terminal):

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

**Copie o webhook secret** que aparecer e adicione no `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 7.3. Acessar página e testar:

1. Acesse: http://localhost:3000/projeto45dias
2. Clique em **"GARANTIR MINHA VAGA AGORA"**
3. Você será redirecionado para o checkout do Stripe

### 7.4. Testar Pagamento com Cartão de Teste:

- **Número:** `4242 4242 4242 4242`
- **Data:** Qualquer data futura (ex: `12/34`)
- **CVC:** Qualquer 3 dígitos (ex: `123`)
- **Nome:** Qualquer nome
- **Email:** Qualquer email válido

### 7.5. Testar PIX:

1. Selecione **PIX** como método de pagamento
2. O Stripe vai gerar um QR Code de teste
3. No ambiente de teste, você pode **simular o pagamento** via Dashboard:
   - Acesse: https://dashboard.stripe.com/test/payments
   - Encontre o Payment Intent
   - Clique em **"Complete payment"**

### 7.6. Verificar Webhook:

- No terminal do Stripe CLI, você verá os eventos sendo disparados
- Verifique os logs do servidor Next.js
- Confirme que:
  - ✅ Linha foi adicionada no Google Sheets
  - ✅ Email de confirmação foi enviado

---

## 8. Deploy para Produção

### 8.1. Configurar variáveis de ambiente na Vercel:

```bash
# Via CLI
vercel env add STRIPE_SECRET_KEY production
# Cole: sk_live_xxxxxxxx

vercel env add STRIPE_WEBHOOK_SECRET production
# Cole: whsec_xxxxxxxx (webhook configurado no passo 5.1)

vercel env add STRIPE_PRICE_ID production
# Cole: price_xxxxxxxx (preço em produção)
```

### 8.2. Criar Produto e Preço em Produção:

1. **Desative Test Mode** no Stripe Dashboard
2. Repita o passo 2 (criar produto/preço) em modo de produção
3. Use o **novo Price ID** de produção

### 8.3. Deploy:

```bash
git add .
git commit -m "feat: integração com Stripe (PIX + Cartão)"
git push origin main

# Deploy automático na Vercel
```

### 8.4. Testar Webhook em Produção:

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique no webhook criado
3. Role até **"Send test webhook"**
4. Selecione `checkout.session.completed`
5. Clique em **"Send test webhook"**
6. Verifique os logs na Vercel e no Google Sheets

---

## 9. Custos do Stripe

### Brasil:

- **Cartão de Crédito:** 3.4% + R$ 0.60 por transação
- **PIX (quando habilitado):** 1.4% + R$ 0.25 por transação
- **Sem mensalidade** (apenas taxas por transação)

### Exemplo (R$ 397):

- **Cartão:** R$ 397 → Taxa: R$ 14.10 → Você recebe: **R$ 382.90**
- **PIX (futuramente):** R$ 397 → Taxa: R$ 5.81 → Você recebe: **R$ 391.19**

⚠️ **Por enquanto:** Apenas cartão de crédito está habilitado. PIX será ativado após algumas transações aprovadas.

---

## 10. Monitoramento e Logs

### Dashboard:

- **Pagamentos:** https://dashboard.stripe.com/payments
- **Checkouts:** https://dashboard.stripe.com/checkout/sessions
- **Webhooks:** https://dashboard.stripe.com/webhooks (ver eventos e logs)
- **Clientes:** https://dashboard.stripe.com/customers

### Vercel Logs:

```bash
vercel logs --follow
```

### Google Sheets:

- Verificar se linhas estão sendo adicionadas corretamente
- Conferir valores de split (20% Lumes, 40% Seyune, 40% Amauri)

---

## 11. Repasse Manual de Pagamentos (Temporário)

Como split automático não está implementado ainda, fazer repasse manual:

### Via Dashboard:

1. Acesse: https://dashboard.stripe.com/balance/overview
2. Clique em **"Payout"** quando houver saldo
3. Transfere para conta bancária da Lumes Digital
4. Faça Pix manual para Seyune (40%) e Amauri (40%)

### Automatizar no Futuro (Stripe Connect):

- Criar contas Express/Standard para Seyune e Amauri
- Configurar split automático via `transfer_data` ou `application_fee_amount`

---

## 12. Próximos Passos (Opcional)

- [ ] Personalizar Checkout (logo, cores da marca)
- [ ] Adicionar cupons de desconto
- [ ] Implementar Stripe Connect para split automático
- [ ] Configurar alertas de falha de pagamento
- [ ] Adicionar dashboard de vendas
- [ ] Configurar disputas e chargebacks

---

## Suporte

- **Documentação Stripe:** https://stripe.com/docs
- **Dashboard:** https://dashboard.stripe.com
- **Support:** https://support.stripe.com

---

**Última atualização:** 2025-11-09
