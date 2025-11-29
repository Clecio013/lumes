# Projeto 45 Graus - Tracking de Implementação

**Início:** 06/11/2025
**Deadline:** 10/11/2025 (4 dias)
**Lançamento:** 10/11/2025

---

## 📊 Splits de Pagamento por Lote

| Lote | Preço Total | Lumes (20%) | Amauri (40%) | Seyune (40%) | Data Início | Data Fim |
|------|-------------|-------------|--------------|--------------|-------------|-----------|
| Lote 1 | R$ 347,00 | R$ 69,40 | R$ 138,80 | R$ 138,80 | 05/11 | 13/11 |
| Lote 2 | R$ 397,00 | R$ 79,40 | R$ 158,80 | R$ 158,80 | 14/11 | 17/11 |
| Lote 3 | R$ 447,00 | R$ 89,40 | R$ 178,80 | R$ 178,80 | 18/11 | 21/11 |
| Lote 4 | R$ 497,00 | R$ 99,40 | R$ 198,80 | R$ 198,80 | 22/11 | 28/11 |

**Vagas por lote:** 25
**Total de vagas:** 100

---

## 🔑 Credenciais Necessárias

### Mercado Pago
- [ ] Access Token (produção)
- [ ] Public Key (produção)
- [ ] Webhook URL configurada no painel MP

### Resend
- [ ] API Key
- [ ] Domínio verificado para envio de emails

### Google Sheets
- [ ] Service Account criada
- [ ] Private Key
- [ ] Client Email
- [ ] Sheet ID da planilha
- [ ] Planilha compartilhada com Service Account (editor)

### Vercel KV
- [ ] KV REST API URL (auto-configurado via Vercel)
- [ ] KV REST API TOKEN (auto-configurado via Vercel)

### Outros
- [ ] Link do Grupo WhatsApp VIP
- [ ] URLs dos PDFs de bônus (hospedados)

---

## 📝 Checklist de Implementação

### DIA 1 - Setup + Libs Foundation (06/11)

#### Configuração Inicial
- [x] Atualizar CLAUDE.md com seção Arquitetura de Libs
- [x] Criar documento de gerenciamento (este arquivo)
- [ ] Instalar dependências (zod, mercadopago, resend, @react-email/components, @vercel/kv, googleapis, jest)
- [ ] Configurar variáveis de ambiente (.env.local)

#### Libs @lumes
- [ ] Criar lib @lumes/mercadopago
  - [ ] config.ts (Zod validation)
  - [ ] types.ts (Payment, Checkout interfaces)
  - [ ] errors.ts (MercadoPagoError)
  - [ ] client.ts (Factory)
  - [ ] checkout/checkout-builder.ts (Builder pattern)
  - [ ] webhook/webhook-handler.ts (Strategy pattern)
  - [ ] index.ts (Public API)

- [ ] Criar lib @lumes/email
  - [ ] config.ts (Zod validation)
  - [ ] types.ts (EmailParams, EmailResult)
  - [ ] providers/base.ts (Interface)
  - [ ] providers/resend.ts (Adapter)
  - [ ] client.ts (Factory)
  - [ ] templates/confirmacao-compra.tsx (React Email)
  - [ ] index.ts (Public API)

- [ ] Criar lib @lumes/sheets
  - [ ] config.ts (Zod validation)
  - [ ] types.ts (Row, Column interfaces)
  - [ ] client.ts (Factory)
  - [ ] row-builder.ts (Builder para linhas)
  - [ ] schema-validator.ts (Validação com Zod)
  - [ ] index.ts (Public API)

- [ ] Criar lib @lumes/storage
  - [ ] config.ts (Zod validation)
  - [ ] types.ts (Storage interfaces)
  - [ ] providers/base.ts (Interface)
  - [ ] providers/vercel-kv.ts (Adapter)
  - [ ] client.ts (Factory)
  - [ ] index.ts (Public API)

#### Compliance & Ajustes
- [ ] Criar emotional-transformation-section.tsx (substituir antes/depois)
- [ ] Deletar transformations-section.tsx (compliance médico)

---

### DIA 2 - Backend Checkout (07/11)

#### APIs
- [ ] Criar `/src/app/api/checkout/create/route.ts`
  - [ ] Validar lote atual
  - [ ] Integrar com @lumes/mercadopago
  - [ ] Criar checkout com metadata (lote, splits)
  - [ ] Retornar URL de checkout

- [ ] Criar `/src/app/projeto45dias/lib/slots-manager.ts`
  - [ ] getAvailableSlots(loteId)
  - [ ] decrementSlot(loteId)
  - [ ] resetSlots(loteId, valor)

#### Frontend
- [ ] Conectar CTAs ao checkout
  - [ ] hero-section.tsx
  - [ ] vsl-section.tsx
  - [ ] benefits-section.tsx
  - [ ] oferta-section.tsx
  - [ ] faq-section.tsx
- [ ] Adicionar loading states
- [ ] Adicionar error handling
- [ ] Tracking analytics nos CTAs

---

### DIA 3 - Webhook + Pós-Compra (08/11)

#### Webhook
- [ ] Criar `/src/app/api/webhook/mercadopago/route.ts`
  - [ ] Validar assinatura do webhook
  - [ ] Processar pagamento aprovado
  - [ ] Salvar no Google Sheets (com splits)
  - [ ] Decrementar vaga no Vercel KV
  - [ ] Enviar email de confirmação
  - [ ] Retornar 200 OK

#### Email
- [ ] Template React Email completo
  - [ ] Confirmação de compra
  - [ ] Próximos passos claros
  - [ ] Link para completar dados
  - [ ] Link grupo WhatsApp
  - [ ] Data início (15 dezembro)
  - [ ] Links PDFs bônus

#### Google Sheets
- [ ] Criar planilha com estrutura correta
- [ ] Configurar Service Account
- [ ] Compartilhar planilha
- [ ] Testar escrita via API

---

### DIA 4 - Página Obrigado + Complemento Dados (09/11)

#### Páginas
- [ ] Criar `/src/app/projeto45dias/obrigado/page.tsx`
  - [ ] Hero de confirmação
  - [ ] Modal complemento dados (auto-open)
  - [ ] Seções próximos passos
  - [ ] Timeline do desafio (15 dez)
  - [ ] Botão grupo WhatsApp
  - [ ] Instruções agendamento consultas

- [ ] Criar `/src/app/projeto45dias/obrigado/complement-data-modal.tsx`
  - [ ] Form: Data de Nascimento + Celular
  - [ ] Validação campos obrigatórios
  - [ ] Submit → API /complete-data
  - [ ] Loading state
  - [ ] Não fechar até submit

- [ ] Criar `/src/app/projeto45dias/erro/page.tsx`
  - [ ] Mensagem amigável
  - [ ] Botão "Tentar novamente"
  - [ ] Link suporte WhatsApp

#### APIs
- [ ] Criar `/src/app/api/complete-data/route.ts`
  - [ ] Receber paymentId, nascimento, celular
  - [ ] Buscar linha no Google Sheets por ID MP
  - [ ] Atualizar colunas Nascimento + Celular
  - [ ] Retornar sucesso

---

### DIA 5 - Polish, Testes & Deploy (10/11 - Manhã)

#### Ajustes Finais
- [ ] Atualizar `/src/app/projeto45dias/page.tsx`
  - [ ] Substituir TransformationsSection por EmotionalTransformationSection
- [ ] Verificar copy em todas seções
- [ ] Garantir CTAs trackados
- [ ] Mobile responsivo (testar devices)

#### Testes End-to-End (Sandbox)
- [ ] CTA Hero → Checkout MP
- [ ] Pagamento teste → Webhook dispara
- [ ] Google Sheets → linha adicionada com splits
- [ ] Email Resend → recebido e formatado
- [ ] Vercel KV → vagas decrementaram
- [ ] Página obrigado → modal aparece
- [ ] Modal submit → atualiza Sheets
- [ ] Analytics → eventos trackados (Meta Pixel + GA4)

#### Deploy Produção
- [ ] Variáveis ambiente production (Vercel Dashboard)
- [ ] Mercado Pago: credenciais produção
- [ ] Google Sheets: planilha real (não teste)
- [ ] Smoke test: compra real R$1
- [ ] Verificar logs: webhook, email, sheets
- [ ] Reverter se algo quebrar

#### Documentação
- [ ] Criar manual operacional para Seyune/Amauri
  - [ ] Como acessar Google Sheets
  - [ ] Como adicionar clientes WebDiet/MFit
  - [ ] Como fazer split manual (Pix)
  - [ ] Quando mudar de lote
  - [ ] FAQ problemas comuns

---

## 🎯 Métricas de Sucesso MVP

**MVP considerado sucesso se:**
- [ ] Cliente clica CTA → checkout MP funcionando
- [ ] Cliente paga → webhook processa automaticamente
- [ ] Dados salvos Google Sheets com splits corretos
- [ ] Email confirmação enviado e recebido
- [ ] Cliente preenche dados complementares
- [ ] Vagas decrementam automaticamente
- [ ] Analytics trackando conversões (Meta + GA4)
- [ ] Código seguindo arquitetura de libs exportáveis

---

## ⚠️ Riscos & Planos B

### Risco 1: Webhook não chega
**Plano B:** Polling manual (verificar pagamentos via API MP a cada 5min)

### Risco 2: Google Sheets API falha
**Plano B:** Salvar em arquivo JSON local + importar depois

### Risco 3: Email não entrega
**Plano B:** Página obrigado contém todas informações (independente de email)

### Risco 4: Contador vagas dessincronizado
**Plano B:** Ajuste manual no Vercel KV + reembolsar se passar muito

### Risco 5: Libs muito complexas atrasam
**Plano B:** Implementação simples primeiro → refatorar depois

---

## 📦 Dependências Instaladas

```bash
npm install zod mercadopago resend @react-email/components @vercel/kv googleapis
npm install -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm test

# Vercel KV local
vercel env pull .env.local

# Deploy
git push origin main  # Auto-deploy na Vercel
```

---

## 📊 Status Atual

**Última atualização:** 06/11/2025 - 19:00
**Progresso geral:** 10% (2/20 tarefas)
**Status:** 🟡 Em andamento (Dia 1 - Setup)

**Próximo passo:** Instalar dependências e começar criação das libs @lumes

---

## 📞 Contatos Importantes

- **Seyune:** (WhatsApp)
- **Amauri:** (WhatsApp)
- **Emily (Estrategista):** (WhatsApp)
- **Clécio (Dev):** (WhatsApp)

---

**Observações:**
- Split de pagamento será manual inicialmente (transferências via Pix entre contas MP)
- Desafio começa 15 de dezembro (não é imediato após compra)
- Compliance médico: NÃO usar fotos antes/depois de clientes
- Grupo WhatsApp: único para todos os lotes
