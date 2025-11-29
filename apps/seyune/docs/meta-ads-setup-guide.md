# Guia Completo: Configurar Campanha Meta Ads - Seyune

## Visão Geral da Estratégia

**Objetivo:** Encher agenda de consultas individuais (meta: ~10 pacientes/semana)
**Budget Total:** R$500
**Duração Estimada:** 10-15 dias
**Plataforma:** Instagram (via Meta Ads)
**Localização:** São Paulo - Região Vila Mariana, Indianópolis, Moema (raio 10-15km)

### Estrutura da Campanha

```
📁 Campanha 1: [CONVERSAO] [F] Consulta Individual SP - Travada (R$250 - 50%)
  └─ 📊 Conjunto 01: 01 - [AUTO] - SP F24-38 Nutri 10km VM
      └─ 📄 Anúncio: AD01 - Video Travada Corpo Mente

📁 Campanha 2: [CONVERSAO] [F] Consulta Individual SP - Motivacao (R$100 - 20%)
  └─ 📊 Conjunto 01: 01 - [AUTO] - SP F24-38 Nutri 10km VM
      └─ 📄 Anúncio: AD01 - Video Motivacao Quimica

📁 Campanha 3: [CONVERSAO] [Q] Retargeting Site 7D (R$150 - 30%)
  └─ 📊 Conjunto 01: 01 - [AUTO] - Visitantes 7D Sem Conv
      └─ 📄 Anúncio: AD01 - Video Retargeting Volta
```

**Estratégia:**
1. **50% (R$250):** Vídeo "Travada" - Foca em dor emocional profunda da persona
2. **20% (R$100):** Vídeo "Motivação" - Teste de abordagem alternativa (científica/provocativa)
3. **30% (R$150):** Retargeting - Visitantes que não converteram (ativar após 3-5 dias)

**REGRA CRÍTICA:** 1 criativo = 1 campanha separada. Meta não performa bem com múltiplos anúncios diferentes no mesmo conjunto. Ver `/docs/meta-ads-rules.md` para detalhes.

---

## Pré-Requisitos (Verificar ANTES de começar)

### ✅ Checklist Obrigatório

- [x] **Meta Business Manager configurado** (business.facebook.com)
- [x] **Página do Facebook criada e vinculada** (mesmo que use só Instagram)
- [x] **Conta do Instagram @seyune vinculada ao Business Manager**
- [x] **Meta Pixel instalado e funcionando em seyune.com.br**
- [x] **Eventos de conversão configurados e testados** (especialmente clique WhatsApp)
- [x] **Método de pagamento adicionado** (cartão de crédito válido)
- [ ] **Domínio verificado** (seyune.com.br)
- [x] **Vídeo criativo pronto** (formato vertical 9:16 ou quadrado 1:1)
- [x] **Landing page /consulta funcionando e otimizada**
- [ ] **Link do WhatsApp configurado** com mensagem pré-preenchida

### Verificar Pixel e Eventos

Acesse: [Meta Events Manager](https://business.facebook.com/events_manager2)

1. Abra o Pixel da Seyune
2. Vá em "Test Events" (Testar Eventos)
3. Abra https://seyune.com.br/consulta em outra aba
4. Navegue pela página e clique no botão WhatsApp
5. Verifique se aparecem eventos:
   - `PageView` (quando carrega a página)
   - `ViewContent` (quando visualiza seções)
   - `Lead` ou `Contact` (quando clica WhatsApp) ← **CRÍTICO**

Se esses eventos **não** aparecerem, **PARE** e configure antes de lançar campanhas.

---

## CAMPANHA 1: Vídeo "Travada" - Público Frio SP (R$250)

### PASSO 1: Criar a Campanha

1. Acesse [Meta Ads Manager](https://business.facebook.com/adsmanager)
2. Clique em **"Criar"** (botão verde)
3. Selecione objetivo: **"Vendas"**, **"Leads"** ou **"Conversões"** (qualquer um funciona - depende da sua região/conta)
4. Clique em **"Continuar"**

**IMPORTANTE:** Todos esses objetivos permitem otimizar para evento customizado no site. O que importa é configurar o evento `WhatsAppClick` no próximo passo.

#### Configuração da Campanha

**Nome da campanha:**
```
[CONVERSAO] [F] Consulta Individual SP - Travada
```

**Configurações:**
- **Objetivo de conversão:** `WhatsAppClick` (evento personalizado configurado)
- **Local da conversão:** Site (NÃO usar formulários instantâneos)
- **Vantagem da campanha:** Ativado (deixar Meta otimizar automaticamente)
- **Budget da campanha:** R$250,00 (budget total)

**Clique em "Avançar"**

---

### PASSO 2: Configurar Conjunto de Anúncios 01

#### Nome do Conjunto

```
01 - [AUTO] - SP F24-38 Nutri 10km VM
```

#### Configuração de Conversão

- **Evento de conversão:** Selecionar evento de clique WhatsApp (ex: `Lead` ou `Contact`)
- **Atribuição:** Deixar padrão (7 dias de clique, 1 dia de visualização)

#### Configuração de Budget e Cronograma

- **Budget:** Deixar em branco (vai usar budget da campanha)
- **Cronograma:**
  - Início: Data de hoje
  - Fim: Deixar contínuo (você vai pausar manualmente quando atingir R$350)
  - **OU** definir fim em 10 dias (R$35/dia)

#### Segmentação de Público

**Locais:**
1. Clique em "Editar" em "Locais"
2. Selecione "Pessoas que vivem neste local"
3. Digite: "Vila Mariana, São Paulo, Brasil"
4. Ajuste o raio: **10 km** (começar conservador)
5. **Adicione locais próximos** (opcional):
   - Indianópolis, São Paulo (raio 5km)
   - Moema, São Paulo (raio 5km)

**Idade:**
- Mínima: **24 anos**
- Máxima: **38 anos**

**Gênero:**
- Selecione **"Mulheres"**

**Segmentação Detalhada (Interesses):**
1. Clique em "Editar" em "Segmentação detalhada"
2. Adicione interesses (escolha 3-5 para começar):

**Sugestões de Interesses:**
- **Nutrição** (pesquise "nutrição" e adicione)
- **Emagrecimento** ou "Perda de peso"
- **Vida saudável** ou "Healthy lifestyle"
- **Fitness e bem-estar**
- **Alimentação saudável**
- **Yoga** (comportamento alinhado com bem-estar)

**IMPORTANTE:** Não adicione muitos interesses! 3-5 é ideal. Muito específico = público pequeno demais.

**Idiomas:**
- Deixe em branco (público já está em SP)

#### Posicionamentos

- Selecione **"Posicionamentos automáticos (recomendado)"**
- Meta vai otimizar entre Feed, Stories, Reels automaticamente

**Se quiser restringir (não recomendado no início):**
- Marque "Posicionamentos manuais"
- Selecione apenas:
  - Instagram: Feed, Stories, Reels
  - Facebook: Feed, Stories (opcional)

#### Otimização e Entrega

- **Otimização para evento de anúncio:** Conversões
- **Estratégia de oferta:** Menor custo (deixar Meta otimizar)
- **Quando você é cobrado:** Impressões (padrão)

**Clique em "Avançar"**

---

### PASSO 3: Criar o Anúncio AD01

#### Nome do Anúncio

```
AD01 - Video Travada Corpo Mente
```

#### Identidade do Anúncio

- **Página do Facebook:** Selecione a página da Seyune
- **Conta do Instagram:** Selecione @seyune

#### Configuração do Anúncio

**Formato:** Vídeo único

**Mídia:**
1. Clique em "Adicionar mídia"
2. Faça upload do vídeo "Travada" (roteiro: "A paciente me contou que ela sente travada...")
3. **Especificações técnicas ideais:**
   - Formato: 9:16 (vertical Stories/Reels) ou 1:1 (quadrado Feed)
   - Duração: 15-60 segundos (ideal: 30-40s)
   - Resolução: Mínimo 1080x1920 (9:16) ou 1080x1080 (1:1)
   - Tamanho: Máximo 4GB
   - Formato de arquivo: MP4 ou MOV
   - **CRÍTICO:** Adicionar LEGENDAS (maioria assiste sem som!)

**Texto principal (Copy):**

```
Você já se sentiu travada?

Quer mudar o corpo, se olhar no espelho e gostar do que vê, mas parece que algo sempre te puxa de volta pro mesmo lugar?

O problema não é falta de força de vontade.

É que enquanto você tenta controlar o corpo sem entender a mente, nada vai sustentar. Você começa com tudo, mas logo vem o cansaço, a ansiedade, a culpa… e a cabeça desiste.

Na nutrição comportamental, a gente faz o contrário:
✨ Entende a mente primeiro
✨ O corpo responde naturalmente
✨ Comida deixa de ser culpa
✨ Rotina deixa de ser um fardo

Pela primeira vez, você tem energia para sustentar o que começou.

Corpo saudável + mente livre = resultados que duram 💛

👇 Manda uma mensagem e vamos conversar
```

**Título (Opcional):**
```
Pare de se sentir travada na sua jornada
```

**Descrição (Opcional):**
```
Transforme sua relação com a comida - Nutrição Comportamental em SP
```

**Call to Action (CTA):**
- Selecione: **"Saiba mais"** (leva para o site)

**URL do site:**
```
https://seyune.com.br/consulta
```

**Parâmetros de URL (UTM Tracking):**
Adicione parâmetros para rastrear origem no Google Analytics:

```
utm_source=meta
utm_medium=paid_social
utm_campaign=conversao_f_travada
utm_content=ad01_video_travada
```

URL completa:
```
https://seyune.com.br/consulta?utm_source=meta&utm_medium=paid_social&utm_campaign=conversao_f_travada&utm_content=ad01_video_travada
```

**Complementos para navegador (RECOMENDADO):**

Meta oferece adicionar um **botão de WhatsApp flutuante** no site quando pessoas vêm do anúncio. Isso aumenta conversões em média **+2,9%** segundo dados do Meta.

1. Role até **"Complementos para navegador"**
2. Selecione a opção **"WhatsApp"** (Adicione um botão do WhatsApp ao seu site)
3. Clique em **"Aplicar"**
4. Configure:
   - **Número do WhatsApp:** +55 11 XXXXX-XXXX (número da Seyune)
   - **Mensagem pré-preenchida:**

```
Olá! Vi o anúncio da Seyune no Instagram e quero saber mais sobre a consulta de nutrição comportamental.
```

**Como funciona:**
- Quando alguém clica no anúncio e vai para o site, aparece um botão flutuante de WhatsApp
- É um atalho adicional aos CTAs da landing page (não substitui)
- Meta continua otimizando para o evento `WhatsAppClick` do site
- +23 pontos no ranking de qualidade do anúncio

---

### PASSO 4: Revisão e Publicação

1. Revise todas as configurações:
   - Nome da campanha: `[CONVERSAO] [F] Consulta Individual SP - Travada`
   - Budget total: R$250
   - Público: SP F24-38, raio 10km, interesses nutrição
   - Vídeo "Travada" carregado com LEGENDAS
   - WhatsApp configurado
   - URL com UTMs corretos

2. Clique em **"Publicar"**

3. **Status inicial:** "Em análise" (Meta vai revisar em até 24h)

---

## CAMPANHA 2: Vídeo "Motivação" - Público Frio SP (R$100)

**IMPORTANTE:** Criar esta campanha **ao mesmo tempo** que a Campanha 1. Ambas testam criativos diferentes no mesmo público.

### PASSO 1: Criar a Campanha

1. Acesse [Meta Ads Manager](https://business.facebook.com/adsmanager)
2. Clique em **"Criar"** (botão verde)
3. Selecione objetivo: **"Vendas"**, **"Leads"** ou **"Conversões"** (mesmo da Campanha 1)
4. Clique em **"Continuar"**

#### Configuração da Campanha

**Nome da campanha:**
```
[CONVERSAO] [F] Consulta Individual SP - Motivacao
```

**Configurações:**
- **Objetivo de conversão:** `WhatsAppClick` (mesmo evento da Campanha 1)
- **Local da conversão:** Site (NÃO usar formulários instantâneos)
- **Vantagem da campanha:** Ativado
- **Budget da campanha:** R$100,00 (budget total)

**Clique em "Avançar"**

---

### PASSO 2: Configurar Conjunto de Anúncios 01

**IMPORTANTE:** Usar **EXATAMENTE** o mesmo público da Campanha 1!

#### Nome do Conjunto

```
01 - [AUTO] - SP F24-38 Nutri 10km VM
```

#### Segmentação (IDÊNTICA à Campanha 1)

- **Locais:** Vila Mariana, SP, raio 10km (mesmo da Campanha 1)
- **Idade:** 24-38 anos
- **Gênero:** Mulheres
- **Interesses:** Nutrição, Emagrecimento, Vida Saudável (mesmos da Campanha 1)
- **Posicionamentos:** Automáticos

---

### PASSO 3: Criar o Anúncio AD01

#### Nome do Anúncio

```
AD01 - Video Motivacao Quimica
```

#### Configuração do Anúncio

**Vídeo:** Upload vídeo "Motivação é Química" (roteiro: "Todo mundo fala que não dá pra vender motivação...")

**Texto principal (Copy):**

```
Motivação se vende?

Sim. E dá pra comer 😄

Mas não é aquela motivação fake de story com glitter.

É ensinar seu corpo a trabalhar A FAVOR da sua mente. Porque motivação também é química – e a gente ajusta isso com alimentação.

Não é sobre:
❌ Cortar tudo
❌ Viver de salada
❌ Sofrer pra ver resultado

É sobre:
✨ Se alimentar pra ter energia de verdade
✨ Disposição que dura o dia todo
✨ Clareza mental pra viver melhor

Então sim, eu "vendo" motivação. Mas do jeito que te faz querer levantar da cama e aproveitar a vida 💛

👇 Vem comigo? Manda uma mensagem
```

**Título (Opcional):**
```
Motivação também é química
```

**CTA:** Saiba mais

**URL com UTMs:**
```
https://seyune.com.br/consulta?utm_source=meta&utm_medium=paid_social&utm_campaign=conversao_f_motivacao&utm_content=ad01_video_motivacao
```

**Complementos para navegador:**
- Ativar botão WhatsApp (mesma configuração da Campanha 1)
- Número: +55 11 XXXXX-XXXX
- Mensagem pré-preenchida: "Olá! Vi o anúncio da Seyune no Instagram e quero saber mais sobre a consulta de nutrição comportamental."

---

### PASSO 4: Publicar Campanha 2

1. Revise configurações
2. Clique em **"Publicar"**
3. **Status:** "Em análise"

**Resultado:** Agora você tem 2 campanhas rodando simultaneamente (Travada R$250 + Motivação R$100), testando qual criativo performa melhor no mesmo público!

---

## CAMPANHA 3: Retargeting Site 7D (R$150)

**AGUARDAR 3-5 DIAS ANTES DE ATIVAR!**

Deixe a Campanha 1 rodar primeiro para gerar tráfego. Depois que tiver pelo menos 100-200 visitantes no site, ative o retargeting.

### PASSO 1: Criar Público Personalizado

1. Acesse [Meta Audiences](https://business.facebook.com/audiences)
2. Clique em **"Criar público" > "Público personalizado"**
3. Selecione **"Site"**
4. Escolha o Pixel da Seyune
5. Configure:
   - **Evento:** Todos os visitantes do site
   - **Período:** Últimos 7 dias
   - **Exclusão:** Pessoas que clicaram no WhatsApp (evento Lead/Contact) nos últimos 7 dias
6. **Nome do público:**
   ```
   Visitantes 7D Sem Conv
   ```
7. Clique em "Criar público"

**IMPORTANTE:** Esse público leva 24-48h para popular. Só crie a campanha quando tiver pelo menos 100 pessoas nele.

---

### PASSO 2: Criar a Campanha de Retargeting

1. Acesse [Meta Ads Manager](https://business.facebook.com/adsmanager)
2. Clique em **"Criar"**
3. Selecione objetivo: **"Vendas"**, **"Leads"** ou **"Conversões"** (mesmo das Campanhas 1 e 2)

#### Configuração da Campanha

**Nome da campanha:**
```
[CONVERSAO] [Q] Retargeting Site 7D
```

**Configurações:**
- **Objetivo de conversão:** Evento de clique WhatsApp (mesmo da Campanha 1)
- **Vantagem da campanha:** Ativado
- **Budget da campanha:** R$150,00

**Clique em "Avançar"**

---

### PASSO 3: Configurar Conjunto de Anúncios 01

#### Nome do Conjunto

```
01 - [AUTO] - Visitantes 7D Sem Conv
```

#### Configuração de Conversão

- **Evento de conversão:** Mesmo da Campanha 1 (clique WhatsApp)

#### Configuração de Budget e Cronograma

- **Budget:** Deixar em branco
- **Cronograma:**
  - Início: Data futura (depois de 3-5 dias da Campanha 1)
  - Fim: Contínuo ou 7 dias (R$20-25/dia)

#### Segmentação de Público

**Públicos Personalizados:**
1. Clique em "Editar" em "Público"
2. Em "Públicos personalizados", adicione:
   - **Incluir:** `Visitantes 7D Sem Conv` (criado no Passo 1)

**Locais:**
- Deixe amplo (todo Brasil) OU restringir a SP (recomendado)

**Idade e Gênero:**
- Idade: 24-38 anos
- Gênero: Mulheres

**Segmentação Detalhada:**
- Deixe em branco (público já é qualificado)

#### Posicionamentos

- **Posicionamentos automáticos**

#### Otimização e Entrega

- **Otimização:** Conversões
- **Estratégia de oferta:** Menor custo

**Clique em "Avançar"**

---

### PASSO 4: Criar o Anúncio AD01 (Retargeting)

#### Nome do Anúncio

```
AD01 - Video Retargeting Volta
```

#### Configuração do Anúncio

**Formato:** Vídeo único

**Mídia:**

**RECOMENDADO:** Criar vídeo NOVO específico para retargeting
- Roteiro focado em: "Você voltou" ou "Por que não marcou?"
- Tom direto, reconhece hesitação
- Resolve objeções (preço, dúvida se funciona, timing)

**ALTERNATIVA (se orçamento limitado):**
- Reutilizar vídeo "Travada" ou "Motivação"
- MAS com copy totalmente diferente (focada em retargeting)

**Texto principal (Copy) - Específica para retargeting:**

```
Você visitou meu site e ainda não marcou sua consulta? 💛

Eu entendo. Dar o primeiro passo pode ser desafiador.

Mas sabe o que é mais desafiador? Continuar no ciclo de dietas que não funcionam, culpa e frustração.

Se você já tentou de tudo e nada deu certo, talvez o problema não seja a dieta — é a abordagem.

Minha metodologia em Nutrição Comportamental não é sobre restrição. É sobre TRANSFORMAR sua relação com a comida.

👇 Vamos conversar? Me manda uma mensagem agora
```

**Call to Action:**
- **"Saiba mais"**

**URL do site:**
```
https://seyune.com.br/consulta?utm_source=meta&utm_medium=paid_social&utm_campaign=conversao_q_retarg_7d&utm_content=ad01_video_retarg
```

**Complementos para navegador:**
- Ativar botão WhatsApp
- Número: +55 11 XXXXX-XXXX (mesmo da Campanha 1)
- Mensagem pré-preenchida pode ser diferente para retargeting:

```
Olá! Voltei a ver o anúncio da Seyune. Quero conversar sobre a consulta de nutrição comportamental.
```

---

### PASSO 5: Publicar Campanha 2

1. Revise tudo
2. **NÃO publique imediatamente!**
3. Salve como rascunho
4. **Aguarde 3-5 dias** da Campanha 1 rodar
5. Quando o público `Visitantes 7D Sem Conv` tiver 100+ pessoas, ative

---

## Monitoramento e Otimização

### Métricas Principais (primeiros 3-5 dias)

Acesse [Meta Ads Manager](https://business.facebook.com/adsmanager) diariamente e observe:

| Métrica | Ideal | Ação se fora do ideal |
|---------|-------|----------------------|
| **CPM** (Custo por 1000 impressões) | R$15-40 | Se >R$60: público muito pequeno ou competitivo |
| **CTR** (Taxa de cliques) | 1-3% | Se <1%: criativo fraco ou copy não ressoa |
| **CPC** (Custo por clique) | R$2-8 | Se >R$10: otimizar copy ou criativo |
| **Conversões (WhatsApp)** | 3-10/dia | Se 0 após 48h: revisar copy, CTA, ou público |
| **Custo por conversão** | R$30-70 | Se >R$100: pausar e ajustar |
| **Frequência** | <2.5 | Se >3: público saturado, ampliar raio ou interesses |

### Como Visualizar Métricas

1. Acesse Ads Manager
2. Clique em "Colunas" (canto superior direito)
3. Selecione "Desempenho e cliques"
4. Adicione colunas personalizadas:
   - CTR (todos)
   - CPC (custo por clique no link)
   - Custo por resultado (conversões)
   - Frequência

### Regras de Otimização

#### Após 48h (2 dias):

**SE:** CPM > R$60 OU CPC > R$10
**AÇÃO:**
- Ampliar raio de localização (10km → 15km)
- Adicionar mais interesses
- Verificar se público tem tamanho mínimo (50k+)

**SE:** CTR < 1%
**AÇÃO:**
- Testar copy diferente (focar mais em dores específicas)
- Trocar thumbnail do vídeo (primeiro frame impacta muito)
- Verificar se vídeo tem legenda (essencial!)

**SE:** 0 conversões após 48h
**AÇÃO:**
- Verificar se Pixel está disparando evento corretamente
- Testar mudar CTA de "Enviar mensagem" para "Saiba mais"
- Revisar landing page (pode ter problema técnico)

#### Após 5-7 dias:

**SE:** Custo por conversão < R$50 E conversões consistentes
**🎉 SUCESSO! Escalar:**
- Aumentar budget diário em 20% a cada 2 dias
- Criar conjunto de anúncios duplicado (escalar horizontal)
- Testar ampliar raio (15km → 20km)

**SE:** Custo por conversão R$50-100 E conversões ocasionais
**⚠️ OK, mas pode melhorar:**
- Deixar rodar mais 3 dias (algoritmo aprende)
- Testar variação de copy focando benefício emocional
- Considerar adicionar criativo estático (imagem) testando contra vídeo

**SE:** Custo por conversão > R$100 OU 0-1 conversões após 7 dias
**🛑 PAUSAR e pivotar:**
- Pausar campanha
- Analisar o que não funcionou:
  - Público errado? (talvez ampliar idade 24-45)
  - Copy não ressoa? (testar abordagem diferente)
  - Criativo fraco? (vídeo não prende atenção)
  - Oferta não clara? (adicionar benefício tangível)

---

## Checklist de Verificação Pré-Lançamento

Use este checklist ANTES de clicar em "Publicar":

### Campanha 1: Público Frio (Travada)

- [ ] Nome: `[CONVERSAO] [F] Consulta Individual SP - Travada`
- [ ] Objetivo: Vendas, Leads ou Conversões (qualquer um funciona)
- [ ] Budget total: R$250
- [ ] Evento de conversão: `WhatsAppClick` configurado

### Conjunto de Anúncios 01

- [ ] Nome: `01 - [AUTO] - SP F24-38 Nutri 10km VM`
- [ ] Localização: SP, raio 10km Vila Mariana
- [ ] Idade: 24-38 anos
- [ ] Gênero: Mulheres
- [ ] Interesses: 3-5 relacionados a nutrição/bem-estar
- [ ] Tamanho do público: Mínimo 50.000 pessoas (verificar indicador)
- [ ] Posicionamentos: Automáticos
- [ ] Otimização: Conversões

### Anúncio AD01

- [ ] Nome: `AD01 - Video Travada Corpo Mente` (Campanha 1) ou `AD01 - Video Motivacao Quimica` (Campanha 2)
- [ ] Vídeo carregado (formato 9:16 ou 1:1)
- [ ] Vídeo tem LEGENDA (crítico!)
- [ ] Copy focada em dores + transformação
- [ ] CTA: "Saiba mais"
- [ ] URL: https://seyune.com.br/consulta com UTMs corretos
- [ ] Complementos para navegador: Botão WhatsApp ativado
- [ ] Número WhatsApp configurado: +55 11 XXXXX-XXXX
- [ ] Mensagem pré-preenchida do botão WhatsApp configurada

### Pixel e Tracking

- [ ] Pixel instalado e ativo em seyune.com.br
- [ ] Evento de conversão (WhatsApp) testado e funcionando
- [ ] Google Analytics configurado para receber UTMs
- [ ] Landing page /consulta carrega rápido (<3s)
- [ ] Botões WhatsApp funcionando corretamente

### Campanha 2: Retargeting (Criar mas NÃO publicar ainda)

- [ ] Público `Visitantes 7D Sem Conv` criado
- [ ] Campanha configurada mas em rascunho
- [ ] Lembrete para ativar em 3-5 dias

---

## Troubleshooting Comum

### Problema: "Público muito pequeno"

**Causa:** Segmentação muito restrita (raio pequeno + muitos interesses)

**Solução:**
1. Aumentar raio de localização (10km → 15km → 20km)
2. Reduzir interesses de 5 para 3
3. Considerar ampliar idade (24-38 → 24-42)

---

### Problema: "Campanha em análise há mais de 24h"

**Causa:** Meta identificou possível violação de políticas

**Solução:**
1. Verificar se copy menciona:
   - Promessas de resultados garantidos ❌
   - "Você está gorda" ou termos depreciativos ❌
   - Antes/depois sem disclaimer ❌
2. Revisar vídeo:
   - Não mostra partes do corpo de forma inadequada
   - Não faz afirmações médicas não comprovadas
3. Se rejeitado, solicitar revisão humana

---

### Problema: "Muito gasto, 0 conversões após 48h"

**Causa:** Pixel não está rastreando conversões corretamente

**Solução:**
1. Ir em Events Manager → Testar eventos
2. Abrir site e clicar WhatsApp
3. Verificar se evento aparece
4. Se não aparecer:
   - Revisar código do Pixel
   - Verificar se evento está configurado
   - Considerar criar evento customizado

---

### Problema: "Muitos cliques, mas ninguém chama no WhatsApp"

**Causa:** Problema na landing page ou jornada do usuário

**Solução:**
1. Verificar se botões WhatsApp estão visíveis e funcionando
2. Testar no mobile (maioria do tráfego)
3. Verificar se mensagem pré-preenchida está muito longa
4. Considerar simplificar mensagem ou remover
5. Verificar velocidade da página (usar PageSpeed Insights)

---

### Problema: "CPM muito alto (>R$60)"

**Causa:** Público muito competitivo ou período de alta demanda

**Solução:**
1. Ampliar público (raio + interesses)
2. Testar horários diferentes (evitar 19h-21h se muito competitivo)
3. Considerar reduzir qualidade do público (mais amplo)
4. Aguardar 3-5 dias (Meta aprende e otimiza)

---

## Próximos Passos Após Lançamento

### Dias 1-3: Aprendizado

- ✅ Não mexer em nada (deixar Meta aprender)
- ✅ Apenas observar métricas 1x por dia
- ✅ Responder rapidamente WhatsApps que chegarem
- ❌ Não pausar/editar campanha

### Dias 4-7: Primeiras Otimizações

- ✅ Analisar métricas (CPM, CTR, conversões)
- ✅ Fazer ajustes leves (ampliar raio, adicionar interesse)
- ✅ Ativar Campanha 2 (retargeting) se tiver 100+ visitantes
- ✅ Documentar: qual copy/criativo performa melhor

### Dias 8-14: Escalar ou Pivotar

**SE está funcionando (custo/conversão <R$70):**
- 🚀 Aumentar budget 20% a cada 2 dias
- 🚀 Criar conjunto de anúncios duplicado (testar público diferente)
- 🚀 Considerar adicionar criativo estático (imagem)

**SE não está funcionando (custo/conversão >R$100 ou 0 conversões):**
- 🛑 Pausar campanhas
- 🔍 Analisar dados: o que não funcionou?
- 🔄 Pivotar estratégia:
  - Testar público mais amplo (ampliar idade, remover interesses)
  - Testar copy totalmente diferente (benefício vs. dor)
  - Testar criativo diferente (imagem vs. vídeo)
  - Considerar trocar objetivo (Conversões → Tráfego por 3 dias para "aquecer" Pixel)

---

## Comunicação com a Emily (Marketing)

Compartilhe com a Emily diariamente:

**Dias 1-3:**
- Screenshot de métricas principais (impressões, cliques, conversões)
- Quantos WhatsApps chegaram
- Custo gasto até agora

**Dias 4-7:**
- Relatório resumido: custo por conversão, total convertido
- Feedback: o que está funcionando/não funcionando
- Sugestões de otimização

**Dias 8-14:**
- Decisão: escalar ou pivotar?
- Se pivotar: qual nova estratégia testar?
- Planejamento: se reinvestir ganhos, quanto e quando?

---

## Recursos e Links Úteis

- **Meta Ads Manager:** https://business.facebook.com/adsmanager
- **Meta Events Manager (Pixel):** https://business.facebook.com/events_manager2
- **Meta Audiences:** https://business.facebook.com/audiences
- **Meta Ad Library (pesquisar concorrentes):** https://www.facebook.com/ads/library
- **Políticas de Anúncios Meta:** https://www.facebook.com/policies/ads
- **Nomenclatura de Campanhas (doc):** `/docs/nomeclatura-campanha.md`
- **Checklist de Eventos Pixel (doc):** `/docs/pixel-events-checklist.md`

---

## Glossário

| Termo | Significado |
|-------|-------------|
| **CPM** | Custo por mil impressões (quanto você paga para 1000 pessoas verem o anúncio) |
| **CTR** | Taxa de cliques (% de pessoas que clicam após ver) |
| **CPC** | Custo por clique (quanto você paga por cada clique) |
| **Conversão** | Ação desejada (neste caso: clicar no WhatsApp) |
| **Pixel** | Código JavaScript que rastreia ações no seu site |
| **Retargeting** | Mostrar anúncios para quem já visitou seu site/Instagram |
| **Público Frio** | Pessoas que nunca ouviram falar da Seyune |
| **Público Quente** | Pessoas que já interagiram (visitaram site, seguiram perfil) |
| **Lookalike** | Público similar aos seus clientes atuais (Meta encontra pessoas parecidas) |
| **Frequência** | Quantas vezes a mesma pessoa viu seu anúncio (ideal: <2.5) |
| **UTM** | Parâmetros de URL para rastrear origem do tráfego no Google Analytics |

---

---

## Observações Importantes

### Sobre o Objetivo "Vendas" / "Leads" / "Conversões"

**IMPORTANTE:** Dependendo da sua região/conta Meta, o objetivo pode aparecer como:
- "Vendas" (Sales) ✅
- "Leads" (Leads) ✅
- "Conversões" (Conversions) ✅

**Todos funcionam da mesma forma** - otimizam para um evento customizado no site.

**Configuração correta:**
- **Objetivo da campanha:** Vendas, Leads ou Conversões (qualquer um - otimiza para evento `WhatsAppClick` no site)
- **CTA do anúncio:** "Saiba mais" (leva para o site)
- **Conversão rastreada:** Clique no botão WhatsApp DA LANDING PAGE (não mensagens diretas do Meta)

**Fluxo de conversão:**
```
Usuário vê anúncio → Clica "Saiba mais" → Vai para seyune.com.br/consulta
    ↓
Lê landing page e se convence
    ↓
Clica botão WhatsApp da landing page (dispara evento WhatsAppClick)
    ↓
CONVERSÃO! 🎉
```

**Complemento de navegador (botão flutuante WhatsApp):**
- É um **atalho adicional** que Meta adiciona automaticamente
- NÃO substitui os CTAs da landing page
- Aumenta conversões em média +2,9%
- Recomendado sempre ativar

**NÃO confundir com:**
- Objetivo "Mensagens" (otimiza para mensagens diretas, sem passar pelo site)
- CTA "Enviar mensagem" sem URL (envia mensagem direto, não vai pro site)

---

**Última atualização:** 2025-11-11
**Versão:** 1.1

**Próximo documento:** `/docs/pixel-events-checklist.md`
