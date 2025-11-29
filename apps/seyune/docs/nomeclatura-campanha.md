# Nomenclatura de Campanhas Meta Ads - Seyune

## Visão Geral

Sistema padronizado de nomenclatura para organizar e identificar rapidamente campanhas, conjuntos de anúncios e anúncios no Meta Ads. Facilita análise de performance, tomada de decisões e escalabilidade.

---

## Estrutura de Nomenclatura

### 1. Nível: CAMPANHA

**Formato:**
```
[OBJETIVO] [PÚBLICO] Descrição Curta
```

**Componentes:**

| Tag | Opções | Significado |
|-----|--------|-------------|
| **[OBJETIVO]** | `[CONVERSAO]` | Otimizar para conversões (WhatsApp, compra, cadastro) |
| | `[TRAFEGO]` | Otimizar para cliques na landing page |
| | `[ENGAJAMENTO]` | Otimizar para curtidas, comentários, shares |
| | `[ALCANCE]` | Maximizar pessoas alcançadas |
| | `[RECONHECIMENTO]` | Brand awareness |
| **[PÚBLICO]** | `[F]` | Frio - não conhece a marca |
| | `[M]` | Morno - já interagiu (visitou site, seguiu perfil) |
| | `[Q]` | Quente - já converteu ou está próximo (retargeting) |

**Descrição Curta:** Objetivo de negócio ou produto (ex: "Consulta Individual SP", "Ebook Gratuito", "Grupo Nutricao")

**Exemplos:**
```
[CONVERSAO] [F] Consulta Individual SP
[TRAFEGO] [M] Ebook Nutricao Comportamental
[CONVERSAO] [Q] Retargeting Site 7D
[ENGAJAMENTO] [F] Video Lancamento Grupo
```

---

### 2. Nível: CONJUNTO DE ANÚNCIOS

**Formato:**
```
(Nº) - [POSICIONAMENTO] - Descrição do Público
```

**Componentes:**

| Elemento | Descrição | Exemplo |
|----------|-----------|---------|
| **Nº** | Número sequencial (01, 02, 03...) | `01` |
| **[POSICIONAMENTO]** | `[AUTO]` - Automático (Meta otimiza) | `[AUTO]` |
| | `[FEED]` - Feed Instagram/Facebook | `[FEED]` |
| | `[STORIES]` - Stories Instagram/Facebook | `[STORIES]` |
| | `[REELS]` - Reels Instagram | `[REELS]` |
| **Descrição do Público** | Segmentação específica resumida | `SP F24-38 Nutri 10km VM` |

**Boas Práticas para Descrição do Público:**
- **Localização:** `SP`, `RJ`, `BR`, `10km VM` (raio Vila Mariana)
- **Demografia:** `F24-38` (feminino 24-38 anos), `M30-45` (masculino)
- **Interesses:** `Nutri` (nutrição), `Fitness`, `Yoga`, `Veget` (vegetarianismo)
- **Comportamento:** `Visitantes 7D`, `Seguidores IG`, `Engaj 30D`

**Exemplos:**
```
01 - [AUTO] - SP F24-38 Nutri 10km VM
02 - [STORIES] - SP F24-38 Emagrecimento 15km
03 - [AUTO] - Visitantes 7D Sem Conv
04 - [FEED] - Seguidores IG 90D
05 - [AUTO] - Lookalike Clientes 1%
```

---

### 3. Nível: ANÚNCIO

**Formato:**
```
AD(Nº) - Descrição Identificável do Criativo
```

**Componentes:**

| Elemento | Descrição | Exemplo |
|----------|-----------|---------|
| **AD(Nº)** | Número sequencial do anúncio (AD01, AD02...) | `AD01` |
| **Descrição** | Tema, formato ou elemento principal do criativo | `Video Dores Transformacao` |

**Boas Práticas para Descrição:**
- **Formato:** `Video`, `Carrossel`, `Imagem`, `Colecao`
- **Tema/Gancho:** `Dores`, `Beneficios`, `Transformacao`, `Depoimento`, `FAQ`
- **Elemento Visual:** `Antes Depois`, `Seyune Falando`, `Texto Overlay`
- **Variação:** `v1`, `v2` (se testar pequenas mudanças do mesmo criativo)

**Exemplos:**
```
AD01 - Video Dores Transformacao
AD02 - Carrossel Beneficios 3 Cards
AD03 - Imagem Antes Depois Seyune
AD04 - Video Depoimento Cliente SP
AD05 - Video Dores Transformacao v2
AD06 - Imagem Texto Overlay Culpa
```

---

## Exemplos Completos de Estrutura

### Campanha 1: Conversão Público Frio

```
📁 [CONVERSAO] [F] Consulta Individual SP
  ├─ 📊 01 - [AUTO] - SP F24-38 Nutri 10km VM
  │   └─ 📄 AD01 - Video Dores Transformacao
  └─ 📊 02 - [AUTO] - SP F24-38 Emagrecimento 15km
      └─ 📄 AD02 - Video Dores Transformacao
```

### Campanha 2: Retargeting Quente

```
📁 [CONVERSAO] [Q] Retargeting Site 7D
  ├─ 📊 01 - [AUTO] - Visitantes 7D Sem Conv
  │   └─ 📄 AD01 - Video Dores Transformacao (retarg)
  └─ 📊 02 - [STORIES] - Visitantes 7D Sem Conv
      └─ 📄 AD02 - Carrossel Beneficios 3 Cards
```

### Campanha 3: Engajamento para Construir Público

```
📁 [ENGAJAMENTO] [F] Video Educacional Nutri
  └─ 📊 01 - [AUTO] - SP F24-38 Nutri Fitness 20km
      ├─ 📄 AD01 - Video Compulsao Alimentar
      └─ 📄 AD02 - Video Efeito Sanfona
```

---

## Regras de Ouro

### ✅ FAZER:
1. **Manter consistência:** Sempre seguir o mesmo padrão
2. **Ser descritivo mas conciso:** Máximo 50-60 caracteres
3. **Usar abreviações padronizadas:** SP, F24-38, Nutri, 10km VM
4. **Numerar sequencialmente:** 01, 02, 03... / AD01, AD02, AD03...
5. **Identificar variações:** Use v1, v2 para testes A/B do mesmo criativo
6. **Um anúncio por conjunto:** Meta Ads performa melhor com 1 anúncio/conjunto

### ❌ NÃO FAZER:
1. **Nomes genéricos:** "Campanha 1", "Teste", "Novo Anúncio"
2. **Informações irrelevantes:** Datas, nomes de pessoas, notas pessoais
3. **Muito longo:** Nomes que excedem 60 caracteres
4. **Falta de tags:** Esquecer [OBJETIVO], [PÚBLICO], [POSICIONAMENTO]
5. **Múltiplos anúncios no mesmo conjunto:** Divide o aprendizado do algoritmo

---

## Quando Usar Cada Objetivo

| Objetivo | Quando Usar | Requisitos |
|----------|-------------|------------|
| **[CONVERSAO]** | Você quer ações específicas (WhatsApp, compra, cadastro) | Pixel configurado + eventos de conversão funcionando |
| **[TRAFEGO]** | Você quer enviar pessoas para o site (sem rastrear conversão) | URL de destino |
| **[ENGAJAMENTO]** | Você quer construir público morno (curtidas, comentários) | Conteúdo engajável (vídeo, carrossel) |
| **[ALCANCE]** | Você quer mostrar anúncio para o máximo de pessoas | Budget limitado + objetivo de awareness |
| **[RECONHECIMENTO]** | Você quer aumentar lembrança da marca | Budget > R$50/dia |

---

## Quando Usar Cada Público

| Público | Descrição | Quando Usar |
|---------|-----------|-------------|
| **[F] Frio** | Nunca ouviram falar da Seyune | Lançamento, expansão, alcançar novos mercados |
| **[M] Morno** | Já interagiram (visitaram site, Instagram, etc.) | Nutrir relacionamento, conteúdo educacional |
| **[Q] Quente** | Já converteram ou estão próximos (carrinho abandonado, visitaram várias vezes) | Fechar venda, oferta especial, urgência |

---

## Organização de Múltiplas Campanhas

Quando tiver várias campanhas ativas, organize assim no Meta Ads:

```
🎯 ATIVAS - CONVERSÃO
  ├─ [CONVERSAO] [F] Consulta Individual SP
  └─ [CONVERSAO] [Q] Retargeting Site 7D

🧪 TESTE - ENGAJAMENTO
  └─ [ENGAJAMENTO] [F] Video Educacional Nutri

⏸️ PAUSADAS
  └─ [TRAFEGO] [F] Ebook Gratuito (pausada em 2024-01-15)
```

**Dica:** Use emojis ou prefixos para categorizar no Meta Ads (opcional).

---

## Checklist Pré-Lançamento

Antes de lançar qualquer campanha, verificar:

- [ ] Nome da campanha segue padrão `[OBJETIVO] [PÚBLICO] Descrição`
- [ ] Nome do conjunto segue padrão `Nº - [POSICIONAMENTO] - Público`
- [ ] Nome do anúncio segue padrão `ADNº - Descrição Criativo`
- [ ] Apenas 1 anúncio por conjunto de anúncios
- [ ] Pixel configurado e testado (para campanhas [CONVERSAO])
- [ ] Público bem definido e tamanho adequado (mín. 50k para frio)
- [ ] Budget diário adequado (mín. R$20/dia para conversões)
- [ ] CTA e URL de destino corretos

---

**Última atualização:** 2025-11-10