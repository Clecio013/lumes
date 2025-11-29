# Guia de Configuração do Stripe - Projeto 45 Graus

## ✅ Checklist de Configuração

### 1. Produto e Preço (✅ Você já fez)
- [x] Criar produto no Stripe Dashboard
- [x] Criar Price ID do produto

**Onde encontrar:**
- Dashboard → Products → Seu produto → Pricing
- Copie o `price_id` (começa com `price_...`)

---

### 2. Webhook Configuration (❗ OBRIGATÓRIO)

O webhook é **essencial** porque:
- Processa pagamentos de forma assíncrona
- Salva no Google Sheets
- Envia email de confirmação
- Garante que nenhum pagamento seja perdido

#### Passo a passo:

**a) Adicionar endpoint do webhook:**

1. Acesse: [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Clique em **"Add endpoint"**
3. Cole sua URL de produção:
   ```
   https://seyune.vercel.app/api/stripe/webhook
   ```
   (ou o domínio que você configurar)

**b) Selecionar eventos:**

Marque estes 3 eventos:
- ✅ `checkout.session.completed` (OBRIGATÓRIO - processa pagamento)
- ✅ `payment_intent.succeeded` (log de confirmação)
- ✅ `payment_intent.payment_failed` (log de falhas)

**c) Copiar Webhook Secret:**

Após criar, clique no webhook criado e copie o **Signing secret** (começa com `whsec_`).

Você vai precisar adicionar isso nas variáveis de ambiente.

---

### 3. API Keys

**a) Secret Key (server-side):**

1. Acesse: [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys)
2. Copie a **Secret key** (formato: `sk_live_...` para produção ou `sk_test_...` para testes)

⚠️ **NUNCA** exponha essa chave no frontend!

**b) Publishable Key (não usado no seu caso):**

Você não precisa da Publishable Key porque está usando **Hosted Checkout** (usuário é redirecionado para página do Stripe).

---

### 4. Variáveis de Ambiente

Adicione no **Vercel** (ou `.env.local` para desenvolvimento):

#### Stripe
```bash
# Stripe API Keys (copie do Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_xxxxxxxx  # ou sk_test_xxxxxxxx para testes

# Stripe Webhook Secret (copie do webhook criado)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
```

#### Google Sheets (para salvar pagamentos)
```bash
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_SHEET_ID=1ABC...XYZ
GOOGLE_SHEETS_SHEET_NAME=Sheet1
```

#### Resend (para emails)
```bash
RESEND_API_KEY=re_xxxxxxxx  # copie do Resend Dashboard
```

#### WhatsApp (link do grupo)
```bash
NEXT_PUBLIC_WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/SEU_LINK_AQUI
```

**Como adicionar no Vercel:**
1. Vercel Dashboard → Seu projeto → Settings → Environment Variables
2. Adicione cada variável (Name + Value)
3. Selecione: **Production**, **Preview**, **Development**
4. Clique em "Save"

---

### 5. Atualizar o Código (se necessário)

Verifique se o Price ID está correto no código:

**Arquivo:** `/src/app/api/stripe/create-session/route.ts`

```typescript
const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price: 'price_XXXXXXXXXX',  // ← Substitua pelo seu Price ID real
      quantity: 1,
    },
  ],
  // ...
});
```

---

### 6. Testar Webhook Localmente (Desenvolvimento)

**a) Instalar Stripe CLI:**
```bash
brew install stripe/stripe-cli/stripe
```

**b) Login:**
```bash
stripe login
```

**c) Forward webhooks para localhost:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Isso vai te dar um **webhook secret temporário** para desenvolvimento (começa com `whsec_`).

Adicione no `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_seu_secret_temporario_aqui
```

**d) Testar webhook:**

Em outro terminal:
```bash
stripe trigger checkout.session.completed
```

Você deve ver logs no seu `npm run dev` mostrando o webhook sendo processado.

---

### 7. Testar em Produção

**a) Usar modo Test (recomendado primeiro):**

1. Use as chaves de **test mode** (formato `sk_test_...` e `whsec_...`)
2. Configure webhook apontando para produção
3. Use cartão de teste do Stripe:
   - **Número:** 4242 4242 4242 4242
   - **Data:** Qualquer data futura (ex: 12/34)
   - **CVC:** Qualquer 3 dígitos (ex: 123)
   - **CEP:** Qualquer (ex: 12345)

4. Faça um pagamento de teste
5. Verifique:
   - ✅ Webhook recebido (logs na Vercel)
   - ✅ Google Sheets atualizado
   - ✅ Email enviado
   - ✅ Página de obrigado carregada

**b) Ativar modo Live (produção real):**

1. Complete o **onboarding** do Stripe:
   - Informações da empresa
   - Dados bancários (para receber pagamentos)
   - Documentos necessários

2. Ative o **Live mode** no Dashboard

3. Substitua todas as chaves por versões de produção (começam com `sk_live_` e `whsec_`)

4. Configure webhook para produção com eventos live

---

### 8. Monitoramento

#### a) Logs do Webhook (Stripe Dashboard)

- Acesse: Developers → Webhooks → Seu endpoint
- Veja tentativas, sucessos e falhas
- Stripe retenta automaticamente em caso de erro (até 3 dias)

#### b) Logs na Vercel

Com o logger implementado, você pode:
- Filtrar por `level:50` (erros)
- Buscar por email: `to:"user@example.com"`
- Buscar por payment ID: `paymentId:"pi_123"`

#### c) Testar Webhook no Stripe Dashboard

1. Dashboard → Developers → Webhooks → Seu endpoint
2. Clique em **"Send test webhook"**
3. Selecione evento: `checkout.session.completed`
4. Clique em **"Send test webhook"**
5. Verifique logs na Vercel

Você verá algo como:
```json
{"level":30,"msg":"Webhook received","webhook":"stripe"}
{"level":30,"msg":"Checkout session completed","sessionId":"cs_test_..."}
```

---

## 🚨 Problemas Comuns

### Webhook não está sendo chamado

**Causas:**
- URL incorreta no Stripe
- Vercel deployment não está no ar
- Eventos não selecionados corretamente

**Debug:**
```bash
# Ver logs do Stripe
stripe logs tail

# Ver logs da Vercel
vercel logs --follow
```

### Erro: "No signature matching"

**Causa:** Webhook secret incorreto

**Solução:**
- Verifique se `STRIPE_WEBHOOK_SECRET` está correto
- Certifique-se de usar o secret do webhook correto (test vs live)

### Email não está sendo enviado

**Causa:** API key do Resend inválida ou formato de email errado

**Debug:** Os logs do Pino vão mostrar:
```json
{
  "level": 50,
  "msg": "Failed to send confirmation email",
  "err": { "message": "..." }
}
```

### Pagamento não salva no Google Sheets

**Causa:** Credenciais do Google Sheets incorretas

**Debug:** Verifique logs de erro no webhook

---

## 📋 Checklist Final Antes de Lançar

- [ ] Produto criado com Price ID correto
- [ ] Webhook configurado apontando para produção
- [ ] Eventos selecionados (checkout.session.completed, payment_intent.*)
- [ ] Webhook secret copiado
- [ ] Todas variáveis de ambiente no Vercel
- [ ] Código atualizado com Price ID correto
- [ ] Testado em test mode com cartão de teste
- [ ] Email de confirmação chegando
- [ ] Google Sheets sendo preenchido
- [ ] Página de obrigado funcionando
- [ ] Onboarding do Stripe completo (para live mode)
- [ ] Migrado para live mode (chaves, webhook)
- [ ] Testado com pagamento real pequeno

---

## 🔗 Links Úteis

- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Webhooks Dashboard](https://dashboard.stripe.com/webhooks)
- [API Keys](https://dashboard.stripe.com/apikeys)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Webhook Testing](https://dashboard.stripe.com/test/webhooks)

---

## 💡 Dicas Importantes

1. **Sempre teste em test mode primeiro** antes de ativar live mode
2. **Webhook é crítico** - sem ele, pagamentos não serão processados
3. **Stripe retenta webhooks** automaticamente por 3 dias se falhar
4. **Logs estruturados** do Pino facilitam muito o debug em produção
5. **Idempotência** já está implementada (evita duplicatas via Payment ID)

---

**Última atualização:** 2025-11-13
