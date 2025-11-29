# Regras de Campanhas Meta Ads - Seyune

## Visão Geral

Este documento contém as regras e melhores práticas validadas para criar campanhas Meta Ads que performam bem. Baseado em experiência real com o algoritmo da Meta e testes da Seyune.

**IMPORTANTE:** Estas regras SEMPRE devem ser seguidas ao criar novas estratégias de campanhas.

---

## Regra #1: 1 Criativo = 1 Campanha Separada (CRÍTICA)

### ❌ NÃO FAZER:

```
📁 CAMPANHA: Público Frio SP
  └─ 📊 CONJUNTO: SP F24-38
      ├─ 📄 AD01 - Video Travada
      ├─ 📄 AD02 - Video Motivacao
      └─ 📄 AD03 - Imagem Antes Depois
```

**Por quê NÃO funciona:**
- Meta divide o aprendizado entre múltiplos anúncios
- Algoritmo não consegue otimizar eficientemente
- Budget fragmentado demais
- Performance medíocre em todos os anúncios

---

### ✅ FAZER:

```
📁 CAMPANHA 1: Público Frio SP - Travada
  └─ 📊 CONJUNTO: SP F24-38
      └─ 📄 AD01 - Video Travada

📁 CAMPANHA 2: Público Frio SP - Motivacao
  └─ 📊 CONJUNTO: SP F24-38 (MESMO PÚBLICO)
      └─ 📄 AD01 - Video Motivacao

📁 CAMPANHA 3: Público Frio SP - Imagem
  └─ 📊 CONJUNTO: SP F24-38 (MESMO PÚBLICO)
      └─ 📄 AD01 - Imagem Antes Depois
```

**Por quê funciona:**
- ✅ Meta aprende RÁPIDO qual criativo performa melhor
- ✅ Budget concentrado no vencedor automaticamente
- ✅ Cada campanha otimiza independentemente
- ✅ Fácil comparar performance (CPL, CTR, etc)
- ✅ Fácil pausar perdedor sem afetar vencedor

---

### Exceção: Múltiplos Anúncios no MESMO Conjunto

**APENAS quando:**
- Anúncio é EXATAMENTE igual (mesmo vídeo, mesma copy)
- Variação é APENAS técnica (formato 9:16 vs 1:1, por exemplo)
- Objetivo: Meta escolhe formato ideal por posicionamento

**Exemplo válido:**
```
📁 CAMPANHA: Público Frio SP - Travada
  └─ 📊 CONJUNTO: SP F24-38
      ├─ 📄 AD01 - Video Travada 9:16 (vertical)
      └─ 📄 AD02 - Video Travada 1:1 (quadrado)
```

**Regra:** Se copy ou conteúdo visual são diferentes → campanhas separadas!

---

## Regra #2: Budget por Campanha (não por Conjunto)

### ✅ CONFIGURAÇÃO CORRETA:

**Nível de Campanha:**
- Definir budget TOTAL da campanha
- Ex: R$250, R$100, R$150

**Nível de Conjunto:**
- Deixar budget em BRANCO
- Meta distribui automaticamente

**Por quê:**
- Meta otimiza distribuição automaticamente
- Mais flexível para algoritmo aprender
- Evita microgerenciamento manual

---

### Budget Distribution Strategy

**Teste de Criativos (Budget Total R$500):**

**Opção A: Criativo Favorito + Teste**
```
Campanha 1 (criativo favorito): R$300 (60%)
Campanha 2 (teste alternativo): R$100 (20%)
Campanha 3 (retargeting):      R$100 (20%)
```

**Opção B: Teste Equilibrado**
```
Campanha 1: R$200 (40%)
Campanha 2: R$200 (40%)
Campanha 3: R$100 (20% retargeting)
```

**Opção C: Favorito Forte + Teste Menor** (usado na Seyune)
```
Campanha 1 (Travada):    R$250 (50%)
Campanha 2 (Motivação):  R$100 (20%)
Campanha 3 (Retargeting): R$150 (30%)
```

**Regra Geral:**
- Criativo com maior potencial: 40-60% budget
- Teste alternativo: 20-40% budget
- Retargeting: sempre 20-30% do total

---

## Regra #3: Público Idêntico para Testar Criativos

Quando testar múltiplos criativos no MESMO público:

### ✅ FAZER:

**Manter EXATAMENTE igual:**
- Localização (mesma cidade, mesmo raio)
- Idade (mesma faixa)
- Gênero (mesmo)
- Interesses (MESMOS interesses, mesma ordem)
- Posicionamentos (ambos automáticos)
- Otimização (mesmo evento de conversão)

**Mudar APENAS:**
- Nome da campanha (incluir identificador do criativo)
- Budget (pode variar)
- Criativo (vídeo/imagem)
- Copy (texto do anúncio)
- UTMs (para rastrear separadamente)

---

### ❌ NÃO FAZER:

```
Campanha 1: SP raio 10km, idade 24-38, Nutrição + Emagrecimento
Campanha 2: SP raio 15km, idade 24-42, Nutrição + Fitness + Yoga
```

**Por quê:** Você não sabe se diferença de performance é pelo criativo OU pelo público!

---

## Regra #4: Nomenclatura Consistente

### Estrutura Obrigatória:

**Campanha:**
```
[OBJETIVO] [PÚBLICO] Descrição - Identificador Criativo
```

**Exemplos:**
```
[CONVERSAO] [F] Consulta Individual SP - Travada
[CONVERSAO] [F] Consulta Individual SP - Motivacao
[CONVERSAO] [Q] Retargeting Site 7D
```

**Conjunto:**
```
Nº - [POSICIONAMENTO] - Descrição Público
```

**Exemplos:**
```
01 - [AUTO] - SP F24-38 Nutri 10km VM
01 - [AUTO] - Visitantes 7D Sem Conv
```

**Anúncio:**
```
ADNº - Descrição Identificável Criativo
```

**Exemplos:**
```
AD01 - Video Travada Corpo Mente
AD01 - Video Motivacao Quimica
AD01 - Video Retargeting Volta
```

**Ver:** `/docs/nomeclatura-campanha.md` para detalhes completos

---

## Regra #5: Não Usar Formulários Instantâneos (Seyune Específico)

### ❌ NÃO usar "Site + Formulários Instantâneos"

**Por quê (contexto Seyune):**
- Objetivo: WhatsApp direto (não coletar leads para ligar depois)
- Landing page já otimizada (mostra credibilidade)
- Consulta individual = decisão importante (precisa aquecer lead)
- Formulários geram leads baratos MAS menos qualificados
- Processo manual: baixar CSV → adicionar WhatsApp → enviar mensagem

### ✅ SEMPRE usar "Site" apenas

**Exceções (quando Formulários fariam sentido):**
- Produto de baixo valor (ebook, aula gratuita)
- Lista de espera (coletar emails para lançamento)
- Budget <R$200 (economia extrema)
- Time de vendas grande (pode ligar para 100 leads/dia)

**Regra Seyune:** Apenas "Site". Qualidade > Quantidade.

---

## Regra #6: Objetivo "Vendas" (não Tráfego ou Engajamento)

### ✅ SEMPRE: Vendas/Conversões

**Quando:**
- Você tem Pixel instalado e funcionando
- Evento de conversão configurado (ex: `WhatsAppClick`)
- Objetivo de negócio = ação específica (não só awareness)

**Por quê:**
- Meta otimiza para quem CONVERTE (não quem só clica)
- Algoritmo aprende com cada conversão
- ROI mensurável (custo por conversão)

---

### ❌ NÃO usar outros objetivos (Seyune)

| Objetivo | Por que NÃO usar |
|----------|------------------|
| **Tráfego** | Você TEM Pixel, desperdiça otimização |
| **Engajamento** | Gera curtidas, não consultas |
| **Alcance** | Budget pequeno demais, melhor focar conversão |
| **Mensagens** | WhatsApp via site é melhor (landing page antes) |

**Exceção:** Testar Engajamento se Conversões não funcionarem após 7 dias + R$200 gastos (rare)

---

## Regra #7: Período de Aprendizado (NÃO Mexer!)

### Dias 1-3: Aprendizado

**✅ FAZER:**
- Deixar campanhas rodando SEM mexer
- Apenas observar métricas 1x/dia
- Responder WhatsApps rápido

**❌ NÃO FAZER:**
- Pausar campanha
- Mudar público
- Mudar budget
- Editar copy
- Trocar criativo

**Por quê:** Meta precisa de ~50 conversões ou 3-5 dias para aprender. Mexer reinicia o aprendizado!

---

### Dias 4-7: Primeiras Otimizações

**✅ Pode fazer:**
- Ampliar raio de localização (10km → 15km)
- Adicionar 1-2 interesses
- Aumentar budget 20% (não mais!)
- Pausar campanha com CPL >R$100

**❌ Ainda NÃO fazer:**
- Trocar criativo completamente
- Mudar público radicalmente
- Duplicar conjunto dentro da campanha

---

### Dias 8-14: Escalar ou Pivotar

**Se performance boa (CPL <R$70):**
- 🚀 Aumentar budget 20% a cada 2 dias
- 🚀 Criar campanha duplicada (testar público diferente)
- 🚀 Adicionar criativo estático (imagem)

**Se performance ruim (CPL >R$100 ou 0 conversões):**
- 🛑 Pausar campanhas
- 🔍 Analisar: público? copy? criativo?
- 🔄 Pivotar estratégia completa

---

## Regra #8: Retargeting SEMPRE em Campanha Separada

### ✅ Estrutura Correta:

```
CAMPANHA 1-2: Público Frio (testar criativos)
   └─ Rodar 3-5 dias, gerar 100+ visitantes

CAMPANHA 3: Retargeting (ativar depois)
   └─ Público: Visitantes SEM conversão
   └─ Criativo: Específico para retargeting (novo vídeo)
   └─ Copy: Reconhece que voltou + urgência
```

**Por quê campanhas separadas:**
- Públicos MUITO diferentes (frio vs quente)
- Copy TOTALMENTE diferente (introdução vs fechamento)
- Budget separado (controle independente)
- Métricas diferentes (CPL retargeting sempre menor)

---

### Criativo de Retargeting

**RECOMENDADO:** Criar vídeo NOVO
- Roteiro: "Você voltou" ou "Por que não marcou?"
- Tom direto, reconhece hesitação
- Resolve objeções (preço, dúvida, timing)

**ALTERNATIVA:** Reutilizar vídeo com copy diferente
- Menos ideal (público já viu)
- Usar se orçamento muito limitado

**Regra:** Retargeting PRECISA de mensagem diferente do público frio!

---

## Regra #9: Monitorar Métricas Certas

### Métricas Principais (ordem de importância):

1. **Custo por Conversão (CPL)** ← MAIS IMPORTANTE
   - Ideal: R$30-70
   - Aceitável: R$70-100
   - Ruim: >R$100

2. **Conversões (total)**
   - Ideal: 3-10/dia (budget R$250-350)
   - Ruim: 0 após 48h

3. **CTR (Taxa de cliques)**
   - Ideal: 1-3%
   - Ruim: <1%

4. **CPC (Custo por clique)**
   - Ideal: R$2-8
   - Ruim: >R$10

5. **CPM (Custo por 1000 impressões)**
   - Ideal: R$15-40
   - Ruim: >R$60

6. **Frequência**
   - Ideal: <2.5
   - Ruim: >3 (público saturado)

---

### Métricas Secundárias (ignorar no início):

- Alcance (vanity metric)
- Impressões (vanity metric)
- Curtidas, comentários, compartilhamentos (não gera consultas)
- Visualizações de vídeo (importa apenas CTR)

**Foco:** Custo por conversão + total de conversões. Resto é secundário.

---

## Regra #10: UTMs SEMPRE Diferentes por Campanha

### Estrutura de UTMs:

```
utm_source=meta          (sempre igual)
utm_medium=paid_social   (sempre igual)
utm_campaign={identificador_campanha}  (ÚNICO por campanha)
utm_content={identificador_anuncio}    (ÚNICO por anúncio)
```

### Exemplos:

**Campanha 1:**
```
utm_campaign=conversao_f_travada
utm_content=ad01_video_travada
```

**Campanha 2:**
```
utm_campaign=conversao_f_motivacao
utm_content=ad01_video_motivacao
```

**Campanha 3:**
```
utm_campaign=conversao_q_retarg_7d
utm_content=ad01_video_retarg
```

**Por quê:** Rastrear origem no Google Analytics, saber qual campanha trouxe qual lead.

---

## Checklist de Validação (usar ANTES de publicar)

Antes de publicar QUALQUER campanha, verificar:

### Estrutura
- [ ] 1 criativo por campanha (não múltiplos anúncios no conjunto)
- [ ] Nome segue nomenclatura padrão
- [ ] Budget definido no nível de CAMPANHA (não conjunto)

### Objetivo e Conversão
- [ ] Objetivo: Vendas/Conversões ✅
- [ ] Evento: `WhatsAppClick` (ou evento correto) ✅
- [ ] Local: Site (NÃO formulários instantâneos) ✅

### Público
- [ ] Localização definida (ex: SP raio 10km)
- [ ] Idade e gênero corretos (ex: F 24-38)
- [ ] 3-5 interesses relevantes (não muitos!)
- [ ] Tamanho do público: mín. 50k pessoas
- [ ] Posicionamentos: Automáticos ✅

### Criativo
- [ ] Vídeo com LEGENDAS (crítico!)
- [ ] Copy alinhada com vídeo
- [ ] CTA: "Enviar mensagem" ✅
- [ ] URL com UTMs únicos ✅
- [ ] WhatsApp configurado ✅

### Se Teste de Criativos
- [ ] Público IDÊNTICO em todas campanhas de teste
- [ ] Apenas criativo e copy diferentes
- [ ] Budget distribuído (favorito 50-60%, teste 20-40%)

### Se Retargeting
- [ ] Público personalizado criado (`Visitantes 7D Sem Conv`)
- [ ] Aguardar 3-5 dias de tráfego (100+ visitantes)
- [ ] Criativo DIFERENTE do público frio
- [ ] Copy específica de retargeting

---

## Troubleshooting Comum

### Problema: "Meta está pedindo para usar Formulários Instantâneos"

**Solução:** Ignorar sugestão. Manter apenas "Site".
- Meta sempre sugere isso (quer aumentar conversões deles)
- Para Seyune: Formulários = leads frios, não serve

---

### Problema: "Quero testar 3 vídeos diferentes"

**Solução:** Criar 3 campanhas separadas.
```
Campanha 1: Vídeo A (R$200)
Campanha 2: Vídeo B (R$150)
Campanha 3: Vídeo C (R$150)
```

**NÃO fazer:** 1 campanha com 3 anúncios no mesmo conjunto.

---

### Problema: "Campanha 1 está performando MUITO melhor"

**Solução:**
1. Pausar campanhas perdedoras
2. Aumentar budget da vencedora 20% a cada 2 dias
3. Criar campanha duplicada (testar público diferente com mesmo criativo)

---

### Problema: "CPL muito alto (>R$100)"

**Causas possíveis:**
- Público muito pequeno ou competitivo
- Criativo não ressoa
- Copy não alinhada com dor
- Período de aprendizado ainda (aguardar 3-5 dias)

**Soluções:**
- Dias 1-3: Aguardar (não mexer)
- Dias 4-5: Ampliar público (raio + interesses)
- Dias 6-7: Se continuar ruim, pausar e pivotar

---

### Problema: "0 conversões após 48h"

**Causas:**
- Pixel não está rastreando evento corretamente
- Landing page com problema (botões não funcionam)
- Público errado (muito restrito)
- Criativo muito fraco (CTR <0.5%)

**Verificar:**
1. Meta Events Manager → evento `WhatsAppClick` está disparando?
2. Testar clique no botão WhatsApp manualmente
3. Verificar tamanho do público (mín. 50k)
4. Verificar CTR (se <1%, trocar criativo)

---

## Resumo das Regras (Quick Reference)

| # | Regra | Status |
|---|-------|--------|
| 1 | 1 criativo = 1 campanha separada | 🔴 CRÍTICA |
| 2 | Budget no nível de CAMPANHA | ✅ Obrigatória |
| 3 | Público idêntico para testar criativos | ✅ Obrigatória |
| 4 | Nomenclatura consistente | ✅ Obrigatória |
| 5 | NÃO usar Formulários Instantâneos | ✅ Seyune específica |
| 6 | Objetivo: Vendas (não Tráfego/Engajamento) | ✅ Obrigatória |
| 7 | NÃO mexer dias 1-3 (aprendizado) | 🔴 CRÍTICA |
| 8 | Retargeting em campanha separada | ✅ Obrigatória |
| 9 | Monitorar CPL (métrica principal) | ✅ Obrigatória |
| 10 | UTMs únicos por campanha | ✅ Obrigatória |

---

## Referências

- **Nomenclatura:** `/docs/nomeclatura-campanha.md`
- **Setup Completo:** `/docs/meta-ads-setup-guide.md`
- **Pixel Events:** `/docs/pixel-events-checklist.md`
- **Projeto Geral:** `/CLAUDE.md`

---

**Última atualização:** 2025-11-11
**Versão:** 1.0
**Aplicável a:** Todas as campanhas Meta Ads da Seyune
