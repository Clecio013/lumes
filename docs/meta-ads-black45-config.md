# Configuração Meta Ads - Black 45 Graus (E-commerce Direto)

## Visão Geral

**Budget Total:** R$1.000
**Período:** 10 a 28 de novembro (19 dias)
**Objetivo:** Vendas via Stripe (e-commerce direto)
**Evento de Conversão:** `Purchase` (não WhatsApp)

---

## 📋 Pré-Requisitos Obrigatórios

### 1. Variáveis de Ambiente (.env.local + Vercel)

```bash
# Meta Pixel (já configurado)
NEXT_PUBLIC_META_PIXEL_ID=1372596174316647

# Meta Conversions API (NOVO - obter no Meta Events Manager)
META_CONVERSIONS_API_TOKEN=EAAxxxxxxxxxxxxx
META_TEST_EVENT_CODE=TEST12345  # Opcional, para teste

# Base URL (para Conversions API)
NEXT_PUBLIC_BASE_URL=https://seyune.com.br
```

**Como obter Access Token:**
1. Meta Events Manager → Seu Pixel → Settings
2. Conversions API → Generate Access Token
3. Copiar token (começa com `EAA`)

### 2. Verificar Eventos

**Teste completo do fluxo:**
1. Abrir `/projeto45dias` com Meta Pixel Helper instalado
2. Clicar "Quero Garantir Minha Vaga"
3. Verificar evento `InitiateCheckout` dispara
4. Completar checkout Stripe (modo test)
5. Verificar evento `Purchase` no Meta Events Manager (server-side)

---

## 🎯 Estrutura das Campanhas

### Campanha 1: Video Autoridade - R$400 (40%)
- Público frio qualificado
- Criativo: `ads-autoridadedoprojeto.MP4`
- Foco: Expertise + autoridade de Seyune

### Campanha 2: Video Objeções - R$350 (35%)
- Público frio qualificado (MESMO da Campanha 1)
- Criativo: `ads-objecoes.MP4`
- Foco: Responder objeções comuns

### Campanha 3: Retargeting Visitantes - R$250 (25%)
- Público: Quem iniciou checkout mas não comprou
- Criativo: `ads-autoridadedoprojeto.MP4` (repetir melhor vídeo)
- **Ativar após 3-5 dias** (precisa acumular público)

---

## 🔧 Configuração Passo-a-Passo

### CAMPANHA 1: Video Autoridade

#### Nível Campanha
```
Nome: [CONVERSAO] [F] Black 45 - Autoridade
Objetivo: Vendas
Categoria: Venda Online
CBO: Desligado
```

#### Nível Conjunto de Anúncios
```
Nome: SP-RJ-MG-PR-RS-SC-BA-CE-PE-GO | F24-38 | Nutrição
Evento: Purchase
Orçamento: R$400 vitalício
Datas: 10/11 a 28/11
```

**Público:**
- **Locais:** 10 capitais (SP, RJ, BH, Curitiba, POA, Floripa, Salvador, Fortaleza, Recife, Goiânia)
- **Idade:** 25-45 anos
- **Gênero:** Todos (homens e mulheres)
- **Interesses:** Fitness, Nutrição, Emagrecimento, Treino, Saúde
- **Segmentação Detalhada:**
  - Fitness
  - Nutrição
  - Emagrecimento
  - Treino físico
  - Musculação
  - Alimentação saudável
  - Vida saudável
  - Exercício físico

**Posicionamentos:** Advantage+ (automático)

#### Nível Anúncio
```
Nome: VIDEO - Autoridade 45 Dias
Formato: Vídeo único
Mídia: ads-autoridadedoprojeto.MP4
```

**Texto Principal:**
```
Você já tentou de tudo pra mudar seu corpo, mas sempre volta pro mesmo lugar? 😔

Nós sabemos como é frustrante passar por isso.

Passamos anos nesse ciclo até entender que o problema não era falta de força de vontade… era a forma como estávamos encarando a mudança.

Criamos o Método 45 Graus pra você que:
✨ Está cansado(a) de dietas e treinos que não funcionam
✨ Quer construir um corpo forte sem abrir mão da sua liberdade
✨ Precisa de um plano personalizado que respeite sua rotina

💪 NUTRIÇÃO (Seyune) + TREINO (Amauri) = Transformação Real

🎯 BLACK FRIDAY: De R$697 por R$397 (até 28/11)

Clique no botão e garanta sua vaga agora 👇
```

**Título:** `Transforme seu corpo em 45 dias: Nutrição + Treino personalizado`

**Descrição:** `Black Friday: R$397 - Nutricionista + Personal Trainer`

**CTA:** Inscreva-se

**URL:**
```
https://seyune.com.br/projeto45dias?utm_source=meta&utm_medium=paid&utm_campaign=black45-autoridade&utm_content=video-autoridade&utm_term=frio-sp-rj
```

---

### CAMPANHA 2: Video Objeções

**Configuração idêntica à Campanha 1, exceto:**

**Nível Campanha:**
```
Nome: [CONVERSAO] [F] Black 45 - Objeções
```

**Nível Conjunto:**
```
Nome: SP-RJ-MG-PR-RS-SC-BA-CE-PE-GO | 25-45 | Fitness+Nutricao
Orçamento: R$350 vitalício
```

**Nível Anúncio:**
```
Nome: VIDEO - Objeções 45 Dias
Mídia: ads-objecoes.MP4
```

**Texto Principal:**
```
"Mas e se eu não tiver tempo?"
"E se eu não conseguir seguir o plano?"
"E se eu desistir no meio do caminho?"

Ouvimos essas dúvidas todo dia… e a verdade é: elas são reais. 💔

Por isso o Método 45 Graus não é mais uma dieta rígida ou treino impossível.

É um plano construído pra sua VIDA REAL:
🥗 Alimentação personalizada (sem cortar grupos alimentares)
💪 Treino adaptado ao seu nível e rotina
⏰ Flexível pra sua realidade (mesmo as mais corridas)
📊 Focado em resultados sustentáveis, não só números na balança

Você não precisa ser perfeito(a). Você precisa de um método que funcione pra VOCÊ.

👥 DUPLA DE EXPERTS: Nutricionista + Personal Trainer

🎯 BLACK FRIDAY: De R$697 por R$397 (até 28/11)

Clique no botão e comece sua transformação agora 👇
```

**Título:** `Método 45 Graus: Transformação real com Nutrição + Treino`

**URL:**
```
https://seyune.com.br/projeto45dias?utm_source=meta&utm_medium=paid&utm_campaign=black45-objecoes&utm_content=video-objecoes&utm_term=frio-sp-rj
```

---

### CAMPANHA 3: Retargeting (ATIVAR APÓS 3-5 DIAS)

**Passo 0: Criar Público Personalizado**

1. Meta Ads Manager → Públicos → Criar público → Público personalizado
2. Fonte: Tráfego no site
3. Eventos: `InitiateCheckout` (últimos 30 dias)
4. Nome: `Iniciou Checkout - Black 45 - 30D`
5. Criar

**Esperar tamanho mínimo: 1.000 pessoas**

**Passo 1: Criar Campanha**

**Nível Campanha:**
```
Nome: [CONVERSAO] [Q] Black 45 - Retargeting Checkout
Objetivo: Vendas
```

**Nível Conjunto:**
```
Nome: Checkout-30D | F24-38 | Brasil
Evento: Purchase
Orçamento: R$250 vitalício
Datas: 14/11 a 28/11 (ou quando ativar)
```

**Público:**
- **Locais:** Brasil (todo país - público já qualificado)
- **Idade:** 25-45
- **Gênero:** Todos
- **Público Personalizado:** `Iniciou Checkout - Black 45 - 30D`
- **Exclusões:** Criar público de compradores (visitantes de `/projeto45dias/obrigado`)

**Nível Anúncio:**
```
Nome: VIDEO - Retargeting Autoridade
Mídia: ads-autoridadedoprojeto.MP4 (mesmo da Campanha 1)
```

**Texto Principal (retargeting):**
```
Vimos que você começou sua inscrição no Método 45 Graus 👀

Ainda está na dúvida se é pra você?

Entendemos. Já passamos por tantas tentativas frustradas que também ficaríamos receosos.

Mas deixa a gente te contar: o que torna o 45 Graus diferente não é promessa de resultado rápido… é o compromisso com resultado REAL.

✨ Sem dietas malucas ou treinos impossíveis
✨ Sem cortar alimentos que você ama
✨ Sem culpa se tiver um dia difícil

É sobre construir uma relação saudável com alimentação, treino e seu corpo.

💪 Nutricionista + Personal Trainer trabalhando juntos por você

E você tem até 28/11 pra começar pagando R$397 (ao invés de R$697).

Se você já chegou até aqui, é porque algo em você SABE que precisa dessa mudança.

Clica no botão e vem com a gente 💛
```

**Título:** `Você começou sua transformação. Que tal finalizar?`

**URL:**
```
https://seyune.com.br/projeto45dias?utm_source=meta&utm_medium=paid&utm_campaign=black45-retargeting&utm_content=video-retarget&utm_term=quente-checkout
```

---

## 📊 Monitoramento e KPIs

### Métricas Essenciais (Dashboard)

**Colunas no Meta Ads Manager:**
- Valor gasto
- Compras (evento Purchase)
- Custo por compra
- ROAS (Return on Ad Spend)
- Valor de conversão
- CTR (taxa de cliques)
- CPC (custo por clique)

### Metas de Performance

**Campanhas 1 e 2 (Público Frio):**
- **Custo por Compra:** R$60-80
- **ROAS Mínimo:** 5.0x (cada R$1 gasto retorna R$5)
- **CTR:** 1,5%-3%

**Campanha 3 (Retargeting):**
- **Custo por Compra:** R$35-50 (mais barato)
- **ROAS Mínimo:** 8.0x
- **CTR:** 3%-6%

### Período de Aprendizado

**Dias 1-3:** NÃO MEXER nas campanhas
- Meta está aprendendo quem converte
- Qualquer mudança reinicia aprendizado

**Após Dia 4:** Otimizações permitidas
- Pausar campanha com pior ROAS
- Realocar budget para melhor performante
- Testar variações de copy

---

## 🚨 Red Flags (Quando Intervir)

### Problema 1: Custo por Compra > R$100
**Causa:** Público não qualificado ou criativo não conecta
**Ação:** Pausar campanha, realocar budget

### Problema 2: ROAS < 3.0x
**Causa:** Gasto alto, vendas baixas
**Ação:** Pausar campanha com pior performance

### Problema 3: Muitos InitiateCheckout, poucos Purchase
**Causa:** Problema no checkout Stripe ou preço alto
**Ação:** Verificar fluxo de checkout, considerar split test de preço

### Problema 4: Orçamento não sendo gasto
**Causa:** Público muito pequeno ou lance baixo
**Ação:** Adicionar mais 5 cidades ou aumentar orçamento diário

---

## ✅ Checklist Pré-Lançamento

- [ ] Variáveis de ambiente configuradas (META_CONVERSIONS_API_TOKEN)
- [ ] Evento InitiateCheckout disparando na landing page
- [ ] Evento Purchase disparando no webhook Stripe
- [ ] Teste completo: landing → checkout → compra → Meta Events Manager
- [ ] Videos ads-autoridadedoprojeto.MP4 e ads-objecoes.MP4 prontos
- [ ] Campanha 1 configurada (Autoridade, R$400)
- [ ] Campanha 2 configurada (Objeções, R$350)
- [ ] Campanha 3 preparada (ativar depois de 3-5 dias)
- [ ] Públicos personalizados criados (Iniciou Checkout, Compradores)
- [ ] Stripe em modo LIVE (não test)
- [ ] Google Sheets recebendo compras

---

## 📈 Projeção de Resultados

**Cenário conservador:**
- Budget: R$1.000
- Custo por Compra: R$70
- **Vendas: 14 vendas**
- Faturamento: R$5.558 (14 × R$397)
- **ROAS: 5.6x**
- Lucro líquido: R$4.558

**Cenário otimista:**
- Custo por Compra: R$60
- **Vendas: 16 vendas**
- Faturamento: R$6.352
- **ROAS: 6.4x**
- Lucro líquido: R$5.352

---

## 🔧 Troubleshooting

### Evento Purchase não aparece no Meta

**Verificar:**
1. META_CONVERSIONS_API_TOKEN configurado?
2. Webhook Stripe está sendo chamado? (ver logs Vercel)
3. Meta Events Manager → Test Events → Ver eventos chegando

**Debug:**
```bash
# Ver logs do webhook
vercel logs --follow

# Procurar por: "Purchase event sent to Meta"
```

### Deduplicação Purchase (evitar duplicatas)

O evento `Purchase` é enviado duas vezes:
1. **Client-side:** Meta Pixel (quando carrega página de obrigado)
2. **Server-side:** Conversions API (webhook Stripe)

**Meta deduplica automaticamente** usando `event_id` (Payment Intent ID).

### Teste de Eventos

**Modo Test (recomendado antes do lançamento):**
1. Adicionar `META_TEST_EVENT_CODE` no .env.local
2. Fazer compra test no Stripe
3. Meta Events Manager → Test Events → Ver evento chegando
4. Verificar `Purchase` com dados corretos

---

## 📞 Suporte

**Meta Ads:**
- Chat: Meta Ads Manager → Menu (?) → Obter Ajuda
- Telefone: 0800-878-9001

**Documentação:**
- `/docs/meta-ads-rules.md` - Regras fundamentais
- `/docs/pixel-events-checklist.md` - Validação de tracking

---

**Criado em:** 13 de novembro de 2025
**Versão:** 2.0 (E-commerce direto via Stripe + Purchase)
