# Guia Completo - Looker Studio Dashboards

Este guia fornece templates prontos para criar dashboards no Looker Studio para analisar os dados do site Seyune.

---

## 📋 Índice

1. [Conectando o GA4 ao Looker Studio](#1-conectando-o-ga4-ao-looker-studio)
2. [Dashboard 1: Visão Geral](#2-dashboard-1-visão-geral)
3. [Dashboard 2: Funil de Conversão](#3-dashboard-2-funil-de-conversão)
4. [Dashboard 3: Análise de Comportamento](#4-dashboard-3-análise-de-comportamento)
5. [Dashboard 4: Origem e Qualidade do Tráfego](#5-dashboard-4-origem-e-qualidade-do-tráfego)
6. [Métricas Calculadas](#6-métricas-calculadas)
7. [Filtros Recomendados](#7-filtros-recomendados)

---

## 1. Conectando o GA4 ao Looker Studio

### Passo a Passo:

1. Acesse https://lookerstudio.google.com/
2. Clique em "Criar" > "Relatório"
3. Selecione "Google Analytics" como fonte de dados
4. Escolha sua propriedade GA4 do Seyune
5. Clique em "Adicionar"

### Dimensões e Métricas Importantes:

**Dimensões:**
- Event name
- Event label
- Event category
- Event action
- Session source/medium
- Device category
- City
- Date

**Métricas:**
- Users
- Sessions
- Event count
- Engagement rate
- Average session duration
- Bounce rate

---

## 2. Dashboard 1: Visão Geral

**Objetivo:** Monitor diário dos KPIs principais

### Layout Sugerido:

```
┌─────────────────────────────────────────────────────────┐
│  🏠 DASHBOARD: VISÃO GERAL - SEYUNE                      │
│  Período: [Seletor de Data]                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 KPIs PRINCIPAIS (Scorecards)                        │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │Visitantes│  Cliques │Taxa Conv.│Tempo Méd.│          │
│  │  1,234   │    89    │   7.2%   │  3m 45s  │          │
│  │  ↑ 15%   │  ↑ 23%   │  ↑ 2%    │  ↓ 10s   │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
│                                                         │
│  📈 TENDÊNCIA (30 DIAS)                                 │
│  [Gráfico de Linha: Visitantes x CTAs por dia]         │
│  - Linha azul: Visitantes                              │
│  - Linha verde: Cliques em CTAs                        │
│                                                         │
│  🎯 PERFORMANCE DE CTAs                                 │
│  [Gráfico de Barras Horizontal]                        │
│  Hero: █████████████████████ 35 (39%)                  │
│  CTA Final: ███████████████ 28 (31%)                   │
│  Header: ████████ 15 (17%)                             │
│  Depoimentos: ████ 7 (8%)                              │
│  Quem é Seyune: ██ 4 (4%)                              │
│                                                         │
│  🌍 ORIGEM DO TRÁFEGO                                   │
│  [Gráfico de Pizza]                                    │
│  Instagram: 65% | Direto: 20% | Google: 10% | Outros:5%│
│                                                         │
│  📱 DISPOSITIVOS                                        │
│  Mobile: 68% | Desktop: 28% | Tablet: 4%               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Como Criar:

#### Scorecard 1 - Visitantes
- **Métrica:** Users
- **Comparação:** Previous period
- **Formato:** Número com arrow indicator

#### Scorecard 2 - Cliques em CTAs
- **Métrica:** Event count
- **Filtro:** Event category = "conversion" AND Event action = "cta_click"
- **Comparação:** Previous period

#### Scorecard 3 - Taxa de Conversão
- **Métrica Calculada:**
```
(COUNT(Event) WHERE Event category = "conversion") / Users * 100
```

#### Scorecard 4 - Tempo Médio
- **Métrica:** Average engagement time
- **Formato:** Duration (MM:SS)

#### Gráfico de Tendência
- **Tipo:** Time series (linha)
- **Dimensão:** Date
- **Métrica 1:** Users
- **Métrica 2:** Event count (filtered: conversion CTAs)
- **Período:** Last 30 days

#### Gráfico de CTAs
- **Tipo:** Bar chart (horizontal)
- **Dimensão:** Event label
- **Métrica:** Event count
- **Filtro:** Event category = "conversion"
- **Ordenar:** Event count (desc)
- **Limitar:** Top 5

#### Gráfico de Origem
- **Tipo:** Pie chart
- **Dimensão:** Session source/medium
- **Métrica:** Users
- **Ordenar:** Users (desc)

---

## 3. Dashboard 2: Funil de Conversão

**Objetivo:** Visualizar a jornada completa do usuário

### Layout Sugerido:

```
┌─────────────────────────────────────────────────────────┐
│  🎯 FUNIL DE CONVERSÃO                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ETAPAS DO FUNIL:                                       │
│                                                         │
│  1│ 1,234 Visitantes (100%)                            │
│   ▼                                                     │
│  2│ 962 Rolaram >25% (78%)         [-22%]              │
│   ▼                                                     │
│  3│ 679 Rolaram >50% (55%)         [-23%]              │
│   ▼                                                     │
│  4│ 420 Viram FAQ (34%)            [-21%]              │
│   ▼                                                     │
│  5│ 185 Abriram FAQ (15%)          [-19%]              │
│   ▼                                                     │
│  6│ 89 Clicaram CTA (7%)           [-8%]               │
│                                                         │
│  📊 INSIGHTS:                                           │
│  • 22% desistem antes de 25% da página                  │
│  • Maior drop entre 50% scroll e visualização do FAQ   │
│  • Quem abre FAQ tem 2.5x mais chance de converter     │
│  • Mobile converte 15% menos que desktop               │
│                                                         │
│  📈 CONVERSÃO POR SEGMENTO:                             │
│  ┌────────────────────────────────┬──────────┐          │
│  │ Segmento                       │Taxa Conv.│          │
│  ├────────────────────────────────┼──────────┤          │
│  │ Abriram FAQ                    │  12.8%   │          │
│  │ Não abriram FAQ                │   4.9%   │          │
│  │ Rolaram 100%                   │   15.2%  │          │
│  │ Rolaram <50%                   │   2.1%   │          │
│  │ Viram 4+ seções                │   18.7%  │          │
│  │ Viram <3 seções                │   3.4%   │          │
│  └────────────────────────────────┴──────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Como Criar:

#### Funil Principal
- **Tipo:** Funnel chart (ou tabela com barra de progresso)
- **Etapas:**
  1. Users (total)
  2. Users com scroll_depth >= 25
  3. Users com scroll_depth >= 50
  4. Users que viram seção FAQ
  5. Users que abriram FAQ (faq_open)
  6. Users que clicaram em CTA de conversão

#### Tabela de Segmentos
- **Tipo:** Table com barra de progresso
- **Dimensão:** Segmento (custom dimension)
- **Métrica:** Taxa de conversão calculada

---

## 4. Dashboard 3: Análise de Comportamento

**Objetivo:** Entender como usuários interagem com o site

### Layout Sugerido:

```
┌─────────────────────────────────────────────────────────┐
│  🎭 COMPORTAMENTO DO USUÁRIO                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📍 MAPA DE CALOR - SCROLL DEPTH                        │
│  [Barra de progresso para cada milestone]              │
│  100%: █████████████████████ 920 (75%)                 │
│   75%: ██████████████████████ 1,012 (82%)              │
│   50%: ████████████████████████ 679 (55%)              │
│   25%: ███████████████████████████ 962 (78%)           │
│                                                         │
│  ❓ FAQ MAIS POPULARES                                  │
│  [Gráfico de Barras]                                   │
│  1. "Quanto custa?": ████████████ 89                   │
│  2. "Tempo resultados": ████████ 67                    │
│  3. "É restritivo?": ██████ 54                         │
│  4. "Tentei tudo": ████ 42                             │
│  5. "Acompanhamento": ███ 38                           │
│  6. "Presencial/online": ██ 28                         │
│                                                         │
│  🎬 SEÇÕES MAIS VISTAS                                  │
│  [Gráfico de Barras Horizontal]                        │
│  Hero: ███████████████████ 1,234 (100%)                │
│  Dores: ████████████████ 1,100 (89%)                   │
│  Benefícios: ██████████████ 980 (79%)                  │
│  Como Funciona: ███████████ 850 (69%)                  │
│  Transformação: ████████ 680 (55%)                     │
│  Depoimentos: ██████ 520 (42%)                         │
│  Quem é Seyune: █████ 450 (36%)                        │
│  FAQ: ████ 420 (34%)                                   │
│  CTA Final: ███ 320 (26%)                              │
│                                                         │
│  📱 MOBILE vs DESKTOP                                   │
│  ┌─────────┬──────┬──────┬─────┬──────────┐            │
│  │Disposit.│Users │Conv. │Tempo│Scroll Méd│            │
│  ├─────────┼──────┼──────┼─────┼──────────┤            │
│  │Desktop  │ 350  │ 8.5% │ 4m  │   68%    │            │
│  │Mobile   │ 840  │ 6.2% │ 3m  │   52%    │            │
│  │Tablet   │  44  │ 4.5% │ 2m  │   45%    │            │
│  └─────────┴──────┴──────┴─────┴──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Como Criar:

#### Scroll Depth Chart
- **Tipo:** Bar chart (horizontal)
- **Dimensão:** Event label
- **Métrica:** Unique events
- **Filtro:** Event action = "scroll_depth"
- **Ordenar:** Custom (100%, 75%, 50%, 25%)

#### FAQ Populares
- **Tipo:** Bar chart
- **Dimensão:** Event label
- **Métrica:** Event count
- **Filtro:** Event action = "faq_open"
- **Ordenar:** Event count (desc)

#### Seções Mais Vistas
- **Tipo:** Bar chart (horizontal) com % bar
- **Dimensão:** Event label
- **Métrica:** Unique events
- **Filtro:** Event action = "section_view"
- **Métrica 2:** % of total (calculada)

---

## 5. Dashboard 4: Origem e Qualidade do Tráfego

**Objetivo:** Avaliar ROI de cada canal

### Layout Sugerido:

```
┌─────────────────────────────────────────────────────────┐
│  🌐 ORIGEM & QUALIDADE DO TRÁFEGO                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 PERFORMANCE POR CANAL                               │
│  ┌─────────┬──────┬─────┬─────┬─────┬────────┐         │
│  │Canal    │Visit.│Conv.│Tempo│Scroll│Qualid. │         │
│  ├─────────┼──────┼─────┼─────┼─────┼────────┤         │
│  │Instagram│  800 │8.5% │ 4m  │ 65% │  82/100│ 🏆      │
│  │Direto   │  247 │6.1% │ 3m  │ 54% │  68/100│         │
│  │Google   │  123 │4.9% │ 2m  │ 42% │  55/100│         │
│  │Outros   │   64 │0%   │ 1m  │ 28% │  35/100│         │
│  └─────────┴──────┴─────┴─────┴─────┴────────┘         │
│                                                         │
│  🏆 MELHOR CANAL: Instagram                             │
│  • Maior volume (65% do tráfego)                        │
│  • Melhor conversão (8.5%)                              │
│  • Visitantes mais engajados (4m avg)                   │
│  • Maior profundidade de scroll (65%)                   │
│                                                         │
│  📈 TENDÊNCIA SEMANAL                                   │
│  [Gráfico de Linha Empilhado]                           │
│  Instagram ▬▬▬ (linha verde)                            │
│  Direto ▬▬▬ (linha azul)                                │
│  Google ▬▬▬ (linha laranja)                             │
│                                                         │
│  🎯 CONVERSÃO POR LANDING PAGE                          │
│  /consulta: 89 conversões (100%)                        │
│  Outros: 0                                              │
│                                                         │
│  🕐 HORÁRIOS DE PICO                                    │
│  [Heatmap: Dia da Semana x Hora]                        │
│  Picos: Seg 20h, Qua 21h, Sex 19h                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Como Criar:

#### Tabela de Performance
- **Tipo:** Table com scorecards
- **Dimensão:** Session source/medium
- **Métricas:**
  - Users
  - Conversion rate (calculada)
  - Avg engagement time
  - Avg scroll depth (calculada)
  - Quality score (calculada)

#### Tendência Semanal
- **Tipo:** Time series (stacked area)
- **Dimensão:** Date
- **Dimensão de Detalhe:** Session source/medium
- **Métrica:** Users
- **Período:** Last 30 days

---

## 6. Métricas Calculadas

Crie estas métricas no Looker Studio:

### Taxa de Conversão
```
Formula: (COUNT(Event) WHERE Event category = "conversion") / Users * 100
Tipo: Percent
Nome: Taxa de Conversão
```

### CTR do Hero
```
Formula: (COUNT(Event) WHERE Event label = "hero_schedule") / Pageviews * 100
Tipo: Percent
Nome: CTR Hero
```

### Engajamento FAQ
```
Formula: (COUNT(DISTINCT User) WHERE Event action = "faq_open") / Users * 100
Tipo: Percent
Nome: % Usuários que Abriram FAQ
```

### Scroll Depth Médio
```
Formula: AVG(Event value WHERE Event action = "scroll_depth")
Tipo: Number
Nome: Scroll Depth Médio
Formato: 0"%"
```

### Índice de Qualidade
```
Formula: (
  ((1 - Bounce rate) * 0.3) +
  ((Avg engagement time / 300) * 0.3) +
  ((Avg scroll depth / 100) * 0.2) +
  ((Conversion rate / 10) * 0.2)
) * 100
Tipo: Number
Nome: Índice de Qualidade
Formato: 0"/100"
```

---

## 7. Filtros Recomendados

Adicione estes filtros em todos os dashboards:

### Filtro de Data
- **Tipo:** Date range control
- **Default:** Last 30 days
- **Posição:** Topo de cada dashboard

### Filtro de Dispositivo
- **Dimensão:** Device category
- **Tipo:** Drop-down list
- **Incluir:** All, Mobile, Desktop, Tablet

### Filtro de Origem
- **Dimensão:** Session source/medium
- **Tipo:** Multi-select
- **Incluir:** All, instagram, direct, google

---

## 🎨 DICAS DE DESIGN

### Cores Sugeridas (Paleta Seyune):
- **Primary (Verde):** #454c31 - Para conversões
- **Accent (Terracota):** #874329 - Para engajamento
- **Neutral:** #602514 - Para comportamento
- **Background:** #efd1af
- **Text:** #602514

### Fontes:
- **Títulos:** Cormorant Garamond Bold
- **Corpo:** Manrope Regular

---

## 📥 EXPORTANDO DADOS

### Para Excel:
1. Clique em "File" > "Download" > "Excel"
2. Escolha o dashboard
3. Selecione o período

### Para PDF:
1. Clique em "File" > "Download" > "PDF"
2. Configurar orientação (Landscape recomendado)

### Agendamento de Relatórios:
1. Clique em "File" > "Schedule delivery"
2. Configure frequência (diária, semanal, mensal)
3. Adicione emails dos destinatários

---

**Última atualização:** Novembro 2025
