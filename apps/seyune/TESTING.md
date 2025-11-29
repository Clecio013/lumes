# 🧪 Guia de Testes - Novo Fluxo de Checkout

## 📋 Pré-requisitos

1. **Google Sheets configurado** com as 10 colunas:
   ```
   Data | Nome | Email | Telefone | Nascimento | Preço Total | Lumes (20%) | Amauri (40%) | Seyune (40%) | Payment ID
   ```

2. **Variáveis de ambiente** configuradas:
   ```bash
   GOOGLE_SHEETS_PRIVATE_KEY=...
   GOOGLE_SHEETS_CLIENT_EMAIL=...
   GOOGLE_SHEETS_SHEET_ID=...
   GOOGLE_SHEETS_SHEET_NAME=Sheet1
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_GROUP_LINK=...
   ```

3. **Servidor rodando**:
   ```bash
   npm run dev
   ```

---

## 🎯 Teste 0: Testar Fluxos de Pagamento

### **Cenário 0: PIX Pendente (Aguardando Pagamento)**

Simula quando usuário gera PIX mas ainda não pagou:

**Como testar:**
1. Acesse `/projeto45dias` e clique em "GARANTIR MINHA VAGA"
2. No Mercado Pago, escolha **PIX**
3. Insira seu email
4. **Antes de pagar**, clique em "Voltar à loja"
5. Você será redirecionado para `/obrigado?status=pending&payment_type=bank_transfer`

**✅ Verificações:**
- [ ] Ícone **amarelo** pulsante (Loader2)
- [ ] Título: "Aguardando confirmação do pagamento"
- [ ] Instruções específicas para PIX (4 passos)
- [ ] Badge: "Verificando pagamento automaticamente... Atualizando a cada 5 segundos"
- [ ] Link para suporte no WhatsApp
- [ ] Página **atualiza automaticamente** quando pagamento for confirmado (polling a cada 5s)

**Teste de Polling:**
- Após gerar o PIX, efetue o pagamento pelo app do banco
- A página deve detectar automaticamente em até 5 segundos
- Deve redirecionar para o formulário de data de nascimento

### **Cenário 0B: Boleto Pendente (1-3 dias úteis)**

Simula quando usuário gera boleto mas ainda não pagou:

**Como testar:**
1. Acesse `/projeto45dias` e clique em "GARANTIR MINHA VAGA"
2. No Mercado Pago, escolha **Boleto Bancário**
3. Insira dados e gere o boleto
4. **Antes de pagar**, clique em "Voltar à loja"
5. Você será redirecionado para `/obrigado?status=pending&payment_type=ticket`

**✅ Verificações:**
- [ ] Ícone **amarelo** pulsante (Loader2)
- [ ] Título: "Aguardando confirmação do pagamento"
- [ ] Mensagem específica: "Seu boleto foi gerado! Após o pagamento (1-3 dias úteis)..."
- [ ] **4 passos específicos para boleto** (gerado, onde pagar, prazo, email)
- [ ] Destaque: "**Pode fechar esta página!** Você receberá um email..."
- [ ] Badge: "Verificando pagamento (esta verificação irá parar em 15 minutos)"
- [ ] Submensagem: "Você receberá um email quando o pagamento for confirmado"
- [ ] Link para suporte: "Não recebeu o boleto ou precisa de ajuda?"

**Comportamento esperado:**
- Polling continua por até 15 minutos
- Após 15 minutos, polling para automaticamente
- Usuário pode fechar a página e aguardar email de confirmação
- Quando boleto for pago (1-3 dias úteis), webhook processa e envia email

### **Cenário 0C: Lotérica/ATM Pendente (horas)**

Simula quando usuário gera código para lotérica mas ainda não pagou:

**Como testar:**
1. Acesse `/projeto45dias` e clique em "GARANTIR MINHA VAGA"
2. No Mercado Pago, escolha **Pagamento em Lotérica** (ou correspondente bancário)
3. Insira dados e gere o código
4. **Antes de pagar**, clique em "Voltar à loja"
5. Você será redirecionado para `/obrigado?status=pending&payment_type=atm`

**✅ Verificações:**
- [ ] Ícone **amarelo** pulsante (Loader2)
- [ ] Título: "Aguardando confirmação do pagamento"
- [ ] Mensagem específica: "Pagamento em lotérica gerado! Após efetuar o pagamento..."
- [ ] **4 passos específicos para lotérica** (código gerado, onde pagar, prazo, email)
- [ ] Destaque: "**Pode fechar esta página!** Você receberá um email..."
- [ ] Badge: "Verificando pagamento (esta verificação irá parar em 15 minutos)"
- [ ] Submensagem: "Você receberá um email quando o pagamento for confirmado"
- [ ] Link para suporte: "Não recebeu o código de pagamento?"

**Comportamento esperado:**
- Polling continua por até 15 minutos
- Após 15 minutos, polling para automaticamente
- Usuário pode fechar a página e aguardar email de confirmação
- Quando pagamento for efetuado na lotérica, webhook processa e envia email

---

## 🎯 Teste 1: Testar Página de Erro (Nova!)

### **Cenário A: Cancelamento - Voltou sem pagar**

Simula quando o usuário clica "Voltar à loja" no Mercado Pago sem tentar pagar:

```
http://localhost:3000/projeto45dias/erro?collection_id=null&collection_status=null&payment_id=null&status=null&external_reference=abc123&payment_type=null
```

**✅ Verificações:**
- [ ] Ícone **amarelo** (AlertCircle) aparece
- [ ] Título: "Você não finalizou seu pagamento"
- [ ] Mensagem: "Notamos que você voltou sem completar a compra..."
- [ ] **NÃO mostra** seção "Possíveis causas"
- [ ] Botão: "FINALIZAR MINHA COMPRA"
- [ ] Badge dourado: "⏰ Suas vagas ainda estão disponíveis!"

### **Cenário B: Erro real de pagamento**

Simula quando pagamento realmente falhou:

```
http://localhost:3000/projeto45dias/erro?payment_id=12345678&status=rejected&collection_status=rejected
```

**✅ Verificações:**
- [ ] Ícone **vermelho** (XCircle) aparece
- [ ] Título: "Ops! Algo deu errado com seu pagamento"
- [ ] Mensagem: "Não se preocupe, isso acontece..."
- [ ] **MOSTRA** seção "Possíveis causas" (cartão incorreto, etc.)
- [ ] Botão: "TENTAR NOVAMENTE"
- [ ] Badge vermelho: "⚠️ Atenção: As vagas são limitadas!"

### **Cenário C: Teste via Mercado Pago real**

1. Inicie o servidor: `npm run dev`
2. Acesse: `http://localhost:3000/projeto45dias`
3. Clique em "GARANTIR MINHA VAGA"
4. Aguarde redirecionamento para Mercado Pago
5. **No Mercado Pago, clique em "Voltar à loja"** (NÃO preencha nada)
6. Você será redirecionado para `/erro` com parâmetros `null`

**✅ Verificações:**
- [ ] Página de erro mostra versão de **cancelamento** (ícone amarelo)
- [ ] Copy é encorajadora, não assustadora
- [ ] Botão leva de volta para `/projeto45dias`

---

## 🎯 Teste 2: Simular Pagamento Completo

### **Passo 1: Criar pagamento fictício**

Acesse no navegador:
```
http://localhost:3000/api/test/simulate-payment
```

**Você verá uma resposta JSON com:**
```json
{
  "success": true,
  "message": "Pagamento simulado com sucesso!",
  "data": {
    "paymentId": 123456789,
    "email": "teste1234567890@example.com",
    "nome": "Maria Silva Teste",
    "linkObrigado": "http://localhost:3000/projeto45dias/obrigado?payment_id=123456789"
  },
  "instructions": {
    "step1": "Dados salvos no Google Sheets ✅",
    "step2": "Acesse: http://localhost:3000/projeto45dias/obrigado?payment_id=123456789",
    "step3": "Preencha a data de nascimento no formulário",
    "step4": "Verifique se a planilha foi atualizada"
  }
}
```

**✅ Verificações:**
- [ ] Resposta JSON com `success: true`
- [ ] `paymentId` foi gerado
- [ ] `linkObrigado` está correto

### **Passo 2: Verificar Google Sheets**

1. Abra sua planilha do Google Sheets
2. Verifique se foi criada uma **nova linha** com:
   - ✅ Data atual
   - ✅ Nome: "Maria Silva Teste"
   - ✅ Email: teste...@example.com
   - ✅ Telefone: (11) 98765-4321
   - ✅ Nascimento: "-" (ainda vazio)
   - ✅ Preço Total: R$ 397.00
   - ✅ Splits calculados (20%, 40%, 40%)
   - ✅ Payment ID: número gerado

**⚠️ Se a linha não apareceu:**
- Verifique as credenciais do Google Sheets nas env vars
- Verifique se a planilha tem as 10 colunas corretas
- Veja os logs no terminal onde o `npm run dev` está rodando

### **Passo 3: Acessar página de obrigado**

Copie o `linkObrigado` da resposta JSON e cole no navegador, ou acesse:
```
http://localhost:3000/projeto45dias/obrigado?payment_id=SEU_PAYMENT_ID
```

**✅ Verificações:**
- [ ] Página carrega sem erro
- [ ] Mostra: "Pagamento Confirmado! 🎉"
- [ ] Exibe nome: "Maria Silva Teste"
- [ ] Exibe email correto
- [ ] Mostra formulário de data de nascimento

**⚠️ Se der erro:**
- Abra o DevTools (F12) → Console para ver erros
- Verifique se o Payment ID está correto na URL
- Veja logs da API no terminal

### **Passo 4: Preencher data de nascimento**

1. No formulário, selecione uma data de nascimento (ex: 15/05/1990)
2. Clique em "Completar Cadastro"

**✅ Verificações:**
- [ ] Botão muda para "Salvando..."
- [ ] Após sucesso, página muda para "CADASTRO COMPLETO! ✅"
- [ ] Mostra próximos passos
- [ ] Mostra botão "ENTRAR NO GRUPO"

### **Passo 5: Verificar atualização na planilha**

Volte ao Google Sheets e verifique:
- [ ] Coluna "Nascimento" foi atualizada de "-" para "15/05/1990"
- [ ] Outros dados permanecem intactos

---

## 🎯 Teste 3: Testar APIs Individualmente

### **Teste 3.1: API /payment-data**

Com um `payment_id` válido da planilha, teste:

```bash
curl "http://localhost:3000/api/payment-data?payment_id=123456789"
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "nome": "Maria Silva Teste",
    "email": "teste...@example.com",
    "telefone": "(11) 98765-4321",
    "preco": 397,
    "hasNascimento": false,
    "paymentId": "123456789"
  }
}
```

**Testes de erro:**

```bash
# Payment ID inexistente
curl "http://localhost:3000/api/payment-data?payment_id=999999999"
# Deve retornar 404

# Sem payment_id
curl "http://localhost:3000/api/payment-data"
# Deve retornar 400
```

### **Teste 3.2: API /complete-registration**

```bash
curl -X POST http://localhost:3000/api/complete-registration \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "123456789",
    "nascimento": "1990-05-15"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Cadastro completo com sucesso!"
}
```

**Testes de erro:**

```bash
# Idade menor que 18 anos
curl -X POST http://localhost:3000/api/complete-registration \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "123456789",
    "nascimento": "2010-01-01"
  }'
# Deve retornar erro 400

# Payment ID inexistente
curl -X POST http://localhost:3000/api/complete-registration \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "999999999",
    "nascimento": "1990-05-15"
  }'
# Deve retornar 404

# Tentar atualizar novamente (já tem nascimento)
curl -X POST http://localhost:3000/api/complete-registration \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "123456789",
    "nascimento": "1995-01-01"
  }'
# Deve retornar erro 400: "Cadastro já foi completado"
```

---

## 🎯 Teste 4: Testar Checkout Real (botão na página)

### **Passo 1: Acessar landing page**

```
http://localhost:3000/projeto45dias
```

### **Passo 2: Clicar em "GARANTIR MINHA VAGA"**

**✅ Verificações:**
- [ ] Botão muda para "PROCESSANDO..."
- [ ] Após alguns segundos, redireciona para checkout do Mercado Pago
- [ ] URL é do Mercado Pago (mercadopago.com)

**⚠️ Se não redirecionar:**
- Abra DevTools → Network
- Veja se `/api/checkout/create` retornou 200
- Veja se `checkoutUrl` está na resposta
- Verifique credenciais do Mercado Pago

### **Passo 3: No Mercado Pago**

Use um **cartão de teste** (apenas em sandbox):

**Cartão aprovado:**
- Número: 5031 4332 1540 6351
- CVV: 123
- Validade: 11/25
- Nome: APRO (importante!)

Preencha:
- Nome: Seu nome
- Email: seu@email.com
- CPF: 123.456.789-10

**✅ O que deve acontecer:**
1. Pagamento aprovado
2. Mercado Pago redireciona para `/projeto45dias/obrigado?payment_id=XXX`
3. Webhook é chamado automaticamente
4. Dados são salvos no Google Sheets

**⚠️ Importante:**
- Webhook só funciona se sua URL for acessível publicamente
- Em desenvolvimento local, use **ngrok** ou **localtunnel**
- Ou teste webhook manualmente com a rota de teste

---

## 🎯 Teste 5: Fluxo Completo (E2E)

### **Cenário: Nova compra do zero**

1. ✅ Usuário acessa `/projeto45dias`
2. ✅ Clica em "GARANTIR MINHA VAGA"
3. ✅ Redireciona para Mercado Pago
4. ✅ Preenche dados e paga
5. ✅ Webhook salva dados no Sheets (Nascimento = "-")
6. ✅ Redireciona para `/obrigado?payment_id=XXX`
7. ✅ Página carrega dados do pagamento
8. ✅ Mostra formulário de data de nascimento
9. ✅ Usuário preenche e submete
10. ✅ Sheets atualizado (Nascimento preenchido)
11. ✅ Mostra próximos passos

---

## 🐛 Troubleshooting

### **Erro: "Planilha sem header"**
- Verifique se a primeira linha do Google Sheets tem os nomes das colunas
- Header deve ser exatamente:
  ```
  Data | Nome | Email | Telefone | Nascimento | Preço Total | Lumes (20%) | Amauri (40%) | Seyune (40%) | Payment ID
  ```

### **Erro: "Coluna não encontrada"**
- Nomes das colunas devem ser exatos (com parênteses, espaços, etc.)
- Não pode ter espaços extras
- Caso sensível? Não, mas mantenha o padrão

### **Erro: "Payment ID não encontrado"**
- Verifique se o webhook foi executado
- Veja logs do terminal
- Confirme que a linha foi criada no Sheets
- Payment ID deve ser string (não número formatado)

### **Página /obrigado carrega mas não mostra dados**
- Abra DevTools → Network
- Veja se `/api/payment-data` retornou 200
- Se 404: Payment ID não existe na planilha
- Se 500: Erro no servidor (veja logs)

---

## ✅ Checklist Final

Antes de ir para produção:

- [ ] Todos os testes passaram
- [ ] Google Sheets estruturado corretamente (10 colunas)
- [ ] Webhook configurado no Mercado Pago
- [ ] URL do webhook é HTTPS e acessível
- [ ] Credenciais de produção configuradas (`APP_USR-...`)
- [ ] `sandbox: false` no webhook handler
- [ ] Email de confirmação sendo enviado
- [ ] Link do WhatsApp group correto
- [ ] Página /obrigado funcionando
- [ ] Formulário de nascimento salvando corretamente
- [ ] Validação de idade (18-100 anos) funcionando

---

## 🚀 Comandos Úteis

```bash
# Rodar em desenvolvimento
npm run dev

# Ver logs em tempo real
# (já aparece no terminal do npm run dev)

# Testar webhook localmente (ngrok)
ngrok http 3000
# Depois configure webhook URL no MP:
# https://SEU-NGROK-ID.ngrok.io/api/webhook/mercadopago

# Simular pagamento
curl http://localhost:3000/api/test/simulate-payment

# Ver planilha
# Abra no navegador: sheets.google.com
```

---

**Dúvidas?** Revise os logs no terminal e no DevTools do navegador.
