# Documentação Completa de Eventos de Tracking

Este documento lista TODOS os eventos configurados no site Seyune para Google Analytics 4, Google Tag Manager e Meta Pixel.

---

## 📊 Resumo Executivo

**Total de Eventos Implementados:** 23+ eventos
**Categorias:** 3 (Conversion, Engagement, Behavior)
**Plataformas:** GA4, GTM, Meta Pixel

---

## 🎯 EVENTOS DE CONVERSÃO (Priority: CRITICAL)

Estes eventos indicam **intenção direta de agendamento** ou ação de alto valor.

### 1. CTA Click - Hero
```javascript
{
  event: 'cta_click',
  category: 'conversion',
  action: 'cta_click',
  label: 'hero_schedule',
  value: 1,
  cta_text: 'Agende sua consulta',
  cta_location: 'hero',
  cta_type: 'schedule'
}
```
**Quando dispara:** Clique no botão principal do Hero
**Localização:** Topo da página (primeira dobra)
**Meta Pixel:** Dispara evento `Lead`

---

### 2. CTA Click - Header (Sticky)
```javascript
{
  event: 'cta_click',
  category: 'conversion',
  action: 'cta_click',
  label: 'header_schedule',
  value: 1,
  cta_text: 'Agende sua consulta',
  cta_location: 'header',
  cta_type: 'schedule'
}
```
**Quando dispara:** Clique no CTA do header sticky (aparece após scroll > 300px)
**Localização:** Header fixo no topo
**Meta Pixel:** Dispara evento `Lead`

---

### 3. CTA Click - Como Funciona
```javascript
{
  event: 'cta_click',
  category: 'engagement',
  action: 'cta_click',
  label: 'how_it_works_transformation',
  value: 1,
  cta_text: 'Comece sua transformação hoje',
  cta_location: 'how_it_works',
  cta_type: 'transformation'
}
```
**Quando dispara:** Clique em "Comece sua transformação hoje"
**Localização:** Final da seção "Como Funciona"
**Meta Pixel:** Dispara evento customizado `WhatsAppClick`

---

### 4. CTA Click - Depoimentos
```javascript
{
  event: 'cta_click',
  category: 'engagement',
  action: 'cta_click',
  label: 'testimonials_whatsapp',
  value: 1,
  cta_text: 'Fale comigo no WhatsApp',
  cta_location: 'testimonials',
  cta_type: 'whatsapp'
}
```
**Quando dispara:** Clique em "Fale comigo no WhatsApp" na seção de depoimentos
**Localização:** Final da seção Depoimentos
**Meta Pixel:** Dispara evento customizado `WhatsAppClick`

---

### 5. CTA Click - Quem é Seyune
```javascript
{
  event: 'cta_click',
  category: 'engagement',
  action: 'cta_click',
  label: 'about_transformation',
  value: 1,
  cta_text: 'Quero essa transformação',
  cta_location: 'about',
  cta_type: 'transformation'
}
```
**Quando dispara:** Clique em "Quero essa transformação"
**Localização:** Seção "Quem é Seyune"
**Meta Pixel:** Dispara evento customizado `WhatsAppClick`

---

### 6. CTA Click - CTA Final
```javascript
{
  event: 'cta_click',
  category: 'conversion',
  action: 'cta_click',
  label: 'cta_final_schedule',
  value: 1,
  cta_text: 'Agende sua consulta agora',
  cta_location: 'cta_final',
  cta_type: 'schedule'
}
```
**Quando dispara:** Clique no botão grande do CTA Final
**Localização:** Seção final de conversão (antes do footer)
**Meta Pixel:** Dispara evento `Lead`

---

## 🤝 EVENTOS DE ENGAJAMENTO (Priority: HIGH)

Estes eventos indicam **interesse e envolvimento** com o conteúdo.

### 7-12. FAQ Interactions
```javascript
{
  event: 'faq_open',
  category: 'engagement',
  action: 'faq_open',
  label: '[question_text]',
  question_text: '[full_question]'
}
```

**Lista de Perguntas Rastreadas:**
1. "Quanto custa a consulta?"
2. "Quanto tempo leva para ver resultados?"
3. "É mais uma dieta restritiva?"
4. "Eu já tentei tudo e nada funcionou..."
5. "Como funciona o acompanhamento?"
6. "As consultas são presenciais ou online?"

**Quando dispara:** Quando usuário expande uma pergunta do FAQ
**Localização:** Seção FAQ
**Meta Pixel:** Dispara evento `ViewContent` com `content_category: "FAQ"`

---

### 13. Social Click - Instagram
```javascript
{
  event: 'social_click',
  category: 'engagement',
  action: 'social_click',
  label: 'instagram_footer',
  platform: 'instagram',
  location: 'footer'
}
```
**Quando dispara:** Clique no link do Instagram (@seyune)
**Localização:** Footer
**Meta Pixel:** Não dispara evento adicional

---

## 🎬 EVENTOS DE COMPORTAMENTO (Priority: MEDIUM)

Estes eventos rastreiam **navegação e interação** com a página.

### 14-17. Scroll Depth
```javascript
{
  event: 'scroll_depth',
  category: 'behavior',
  action: 'scroll_depth',
  label: '[25|50|75|100]_percent',
  value: [25|50|75|100],
  scroll_percentage: [25|50|75|100]
}
```
**Quando dispara:** Quando usuário atinge cada marco de scroll (25%, 50%, 75%, 100%)
**Como funciona:** Rastreado automaticamente pelo componente `ScrollTracker`
**Nota:** Cada porcentagem é rastreada apenas UMA vez por sessão

---

### 18. Header Visibility
```javascript
{
  event: 'header_visible',
  category: 'behavior',
  action: 'header_visible',
  label: 'sticky_header_shown'
}
```
**Quando dispara:** Quando o header sticky aparece (scroll > 300px)
**Nota:** Rastreado apenas UMA vez por sessão

---

### 19-27. Section Views
```javascript
{
  event: 'section_view',
  category: 'behavior',
  action: 'section_view',
  label: '[section_name]',
  section_name: '[section_name]'
}
```

**Seções Rastreadas:**
1. `hero` - Hero Section
2. `dores` - Seção de Dores
3. `beneficios` - Seção de Benefícios
4. `como_funciona` - Seção Como Funciona
5. `transformacao` - Seção Transformação Seyune
6. `depoimentos` - Seção Depoimentos
7. `quem_e_seyune` - Seção Quem é Seyune
8. `faq` - Seção FAQ
9. `cta_final` - CTA Final

**Quando dispara:** Quando 50% da seção fica visível no viewport
**Como funciona:** Rastreado automaticamente pelo componente `ScrollTracker` usando Intersection Observer
**Nota:** Cada seção é rastreada apenas UMA vez por sessão
**Meta Pixel:** Dispara evento `ViewContent` com `content_category: "Section"`

---

## 🎨 EVENTOS DO META PIXEL

Além dos eventos padrão, disparamos eventos específicos para o Meta Pixel:

### PageView (Automático)
```javascript
fbq('track', 'PageView');
```
**Quando:** Carregamento da página
**Configuração:** Automática no componente `MetaPixel`

---

### Lead (Conversão)
```javascript
fbq('track', 'Lead', {
  content_name: '[cta_text]',
  content_category: '[location]'
});
```
**Quando:** Cliques em CTAs de "Agende sua consulta"
**Locais:** Hero, Header, CTA Final

---

### ViewContent
```javascript
fbq('track', 'ViewContent', {
  content_name: '[section_name | question]',
  content_category: 'Section' | 'FAQ'
});
```
**Quando:**
- Visualização de seções importantes
- Abertura de perguntas do FAQ

---

### WhatsAppClick (Custom Event)
```javascript
fbq('trackCustom', 'WhatsAppClick', {
  location: '[location]',
  cta_text: '[cta_text]'
});
```
**Quando:** Cliques em CTAs de transformação/WhatsApp
**Locais:** Como Funciona, Depoimentos, Quem é Seyune

---

## 📦 ESTRUTURA DO EVENTO PADRÃO

Todos os eventos seguem esta estrutura base:

```typescript
interface TrackEventParams {
  category: 'conversion' | 'engagement' | 'behavior';
  action: string;
  label?: string;
  value?: number;
  [key: string]: unknown; // Parâmetros adicionais customizados
}
```

### Parâmetros Comuns:
- `category`: Tipo do evento (conversion, engagement, behavior)
- `action`: Ação específica (cta_click, faq_open, scroll_depth, etc)
- `label`: Identificador único do evento
- `value`: Valor numérico (geralmente 1 para conversões)
- **Customizados:** Cada evento pode ter parâmetros adicionais específicos

---

## 🔍 COMO USAR NO LOOKER STUDIO

### Queries Úteis

#### 1. Total de Conversões por CTA
```sql
Dimensão: Event Label
Métrica: Event Count
Filtro: Event Category = "conversion" AND Event Action = "cta_click"
Ordenar por: Event Count (desc)
```

#### 2. Taxa de Engajamento FAQ
```sql
Dimensão: Event Label
Métrica: Unique Events
Filtro: Event Action = "faq_open"
Métrica Calculada: (Unique Events / Users) * 100
```

#### 3. Profundidade de Scroll
```sql
Dimensão: Event Label
Métrica: Event Count
Filtro: Event Action = "scroll_depth"
Visualização: Funil
```

#### 4. Jornada do Usuário
```sql
Dimensão Primária: User Pseudo ID
Dimensão Secundária: Event Name, Event Label
Ordenar por: Event Timestamp
Filtro: Segmento de usuários que converteram
```

---

## 🧪 TESTANDO OS EVENTOS

### No Console do Navegador:

1. Abra DevTools (F12)
2. Vá na aba "Console"
3. Digite: `dataLayer`
4. Você verá todos os eventos sendo disparados em tempo real

### Exemplo de Saída:
```javascript
[
  {
    event: "cta_click",
    category: "conversion",
    label: "hero_schedule",
    value: 1,
    cta_text: "Agende sua consulta",
    // ...
  },
  {
    event: "scroll_depth",
    category: "behavior",
    label: "25_percent",
    value: 25,
    // ...
  }
]
```

### Usando Google Tag Assistant:
1. Instale a extensão "Tag Assistant Legacy"
2. Abra o site
3. Clique no ícone da extensão
4. Veja todos os eventos sendo disparados

### Usando Meta Pixel Helper:
1. Instale "Meta Pixel Helper"
2. Abra o site
3. Clique no ícone
4. Veja eventos PageView, Lead, ViewContent sendo disparados

---

## 📈 MÉTRICAS CALCULADAS RECOMENDADAS

Para criar no Looker Studio:

```javascript
// Taxa de Conversão Geral
(Total de cta_click com category="conversion" / Users) * 100

// CTR do Hero
(hero_schedule clicks / PageViews) * 100

// Engajamento FAQ
(Users que abriram FAQ / Total Users) * 100

// Scroll Depth Médio
AVG(scroll_percentage WHERE action="scroll_depth")

// Taxa de Chegada ao CTA Final
(Users que viram cta_final section / Total Users) * 100

// Índice de Qualidade do Tráfego
(
  (1 - Bounce Rate) * 0.3 +
  (Avg Session Duration / 300) * 0.3 +
  (Avg Scroll Depth / 100) * 0.2 +
  (Conversion Rate / 10) * 0.2
) * 100
```

---

## 🚀 PRÓXIMOS PASSOS

1. Deixe os eventos coletando dados por **7-14 dias**
2. Crie dashboards no Looker Studio baseados em `LOOKER_STUDIO_GUIDE.md`
3. Analise padrões de comportamento
4. Otimize CTAs com baixa performance
5. Teste variações (A/B testing) quando tiver dados suficientes

---

**Última atualização:** Novembro 2025
**Versão:** 1.0
