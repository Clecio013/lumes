# Framework Completo: Landing Pages de Conversão

**Versão:** 1.0
**Baseado em:** Projeto Seyune (Nutrição Comportamental)
**Aplicável a:** Qualquer landing page de conversão (consultoria, serviços, produtos digitais)

---

## 📋 Visão Geral

Este framework documenta o processo completo para criar landing pages de alta conversão, desde a coleta de materiais até o deploy em produção.

**Timeline estimada:** 8-10 dias úteis
**Stack principal:** Next.js 16 + Tailwind CSS 4 + shadcn/ui + Framer Motion

---

## 🎯 PRÉ-PROJETO: Materiais Necessários

### Checklist de Entrega

```markdown
□ 1. Briefing Estratégico (campanha-[nome].md)
□ 2. Persona Detalhada (persona.md)
□ 3. Framework de Copy - 10 Perguntas (copy.md)
□ 4. Identidade Visual (brand-guidelines.pdf)
□ 5. Copy da Landing Page (landing-copy.md)
□ 6. Assets Visuais (logos + fotos)
□ 7. Configurações (WhatsApp, Instagram, domínio)
```

---

### 1. Briefing Estratégico

**Arquivo:** `docs/campanha-[nome].md`
**Template:** `docs/templates/campanha-template.md`
**Quem preenche:** Cliente/Gestor de projeto

**Conteúdo obrigatório:**

```markdown
## Objetivo
[Ex: Gerar 20 agendamentos de consulta/semana]

## Oferta Principal
[Ex: Consulta individual de nutrição comportamental]

## Público-Alvo
- Idade: [faixa etária]
- Gênero: [predominante]
- Características: [principais]

## Canais de Tráfego
- [ ] Meta Ads (Instagram/Facebook)
- [ ] Google Ads
- [ ] Tráfego orgânico (Instagram)
- [ ] Indicações

## Funil
1. [Canal] → 2. Landing Page → 3. WhatsApp → 4. Agendamento

## Investimento
- Budget mensal: R$ [valor]
- Estratégia: [testar/escalar/otimizar]

## Links/Contas
- Instagram: @[usuario]
- WhatsApp: [número]
- Domínio: [se disponível]
```

---

### 2. Persona Detalhada

**Arquivo:** `docs/persona.md`
**Template:** `docs/templates/persona-template.md`
**Quem preenche:** Cliente (idealmente com dados de mercado)

**Estrutura obrigatória:**

```markdown
## Perfil Demográfico
- Idade: [ex: 25-40 anos]
- Gênero: [ex: Feminino, 85%]
- Localização: [ex: Grandes centros urbanos - SP, RJ, BH]
- Escolaridade: [ex: Superior completo]
- Renda: [ex: R$3.000-R$10.000/mês]

## Características Comportamentais
- [Lista de 4-6 características psicográficas]
- Ex: Preocupada com saúde mas não com estética extrema
- Ex: Consome conteúdo sobre bem-estar no Instagram

## Interesses e Hobbies
- [3-5 interesses relevantes]
- Ex: Yoga, meditação, culinária saudável

## Fontes de Informação
- [Onde consome conteúdo]
- Ex: Instagram (perfis de nutrição), podcasts, blogs

## Dores Principais (4-6 itens)
1. **[Nome da dor]:** [Descrição detalhada]
2. **[Nome da dor]:** [Descrição detalhada]
[...]

## Sinais/Comportamentos Observáveis
- [Como a dor se manifesta no dia a dia]
- Ex: "Come escondido", "Pula refeições", "Culpa após comer"

## Solução Oferecida
[Como seu produto/serviço resolve as dores]

## Vida Transformada (Benefícios)
**Tangíveis:**
- [Resultados mensuráveis]

**Intangíveis:**
- [Ganhos emocionais/psicológicos]

## Soluções Tentadas Antes
- [O que já tentaram e falhou]
- Ex: Dietas restritivas, apps de contagem de calorias

## Por Que Falharam Antes
- [Obstáculos que impediram sucesso]
- Ex: Insustentabilidade, falta de apoio emocional

## Credenciais/Autoridade
[O que torna VOCÊ a pessoa certa para ajudá-los]
```

---

### 3. Framework de Copy - 10 Perguntas

**Arquivo:** `docs/copy.md`
**Template:** `docs/templates/copy-template.md`
**Quem preenche:** Cliente/Copywriter

**⚠️ IMPORTANTE:** Este NÃO é o copy final, é o DIRECIONAMENTO estratégico.

**As 10 Perguntas:**

```markdown
**CRENÇA ÚNICA DA PERSONA:**
"[Frase autêntica que resume a frustração central]"
Ex: "Eu tentei de tudo, mas meu corpo simplesmente não responde"

---

**1. Como isso é diferente do que já vi?**
[Resposta focada na nova oportunidade/abordagem única]

**2. O que eu ganho com isso?**
[Benefícios concretos e específicos]

**3. Como sei que isso é real?**
[Prova social, resultados, credibilidade]

**4. O que me impede de conseguir?**
[Barreiras percebidas pela persona]

**5. Quem/qual é o culpado?**
[Externalizar culpa - ex: indústria das dietas]

**6. Por que agora?**
[Urgência emocional, não artificial]

**7. Por que deveria confiar em você?**
[História pessoal + credenciais]

**8. Como funciona?**
[Processo simplificado em 3-4 passos]

**9. Como posso começar?**
[CTA claro e próximo passo]

**10. O que acontece se eu não fizer nada?**
[Consequência de manter o status quo]
```

---

### 4. Identidade Visual

**Arquivo:** `docs/[Nome]-Brand-Guidelines.pdf`
**Quem fornece:** Designer/Cliente
**Ferramenta:** Figma, Canva Pro, Illustrator

**Conteúdo obrigatório:**

#### 4.1. DNA da Marca
- **Tagline:** [frase de posicionamento]
- **Atributos:** 3-5 características (ex: Moderna, Acolhedora, Sofisticada)
- **Filosofia:** Conceito visual em 2-3 frases

#### 4.2. Paleta de Cores (MÍNIMO 5 cores)

```
COR PRIMÁRIA
Nome: [ex: Verde Profundo]
HEX: #454c31
Uso: CTAs principais, elementos de destaque

COR SECUNDÁRIA
Nome: [ex: Terracota]
HEX: #874329
Uso: CTAs secundários, hover states

COR TERCIÁRIA
Nome: [ex: Marrom Terroso]
HEX: #602514
Uso: Textos, elementos de suporte

COR NEUTRA 1 (Background)
Nome: [ex: Creme Areia]
HEX: #efd1af
Uso: Fundos principais

COR NEUTRA 2 (Card)
Nome: [ex: Off White]
HEX: #f0f0f0
Uso: Cards, seções alternadas
```

#### 4.3. Tipografia (MÍNIMO 3 fontes)

**Para cada fonte:**
- Nome da fonte
- Alternativa Google Fonts (se fonte paga)
- Pesos disponíveis (300, 400, 600, 700)
- Uso: Títulos / Corpo / Citações

**Exemplo:**
```
TÍTULOS: Cormorant Garamond
- Pesos: 300, 400, 600, 700
- Google Fonts: ✅ Grátis
- Uso: H1, H2, H3

CORPO: Manrope
- Pesos: 400, 600
- Google Fonts: ✅ Grátis
- Uso: Parágrafos, botões

CITAÇÕES: Caveat
- Pesos: 400, 600
- Google Fonts: ✅ Grátis
- Uso: Depoimentos, frases de destaque
```

#### 4.4. Logos (FORMATOS NECESSÁRIOS)

```
/brand/
├── logo-[cor].png          # Logo horizontal (header)
│   ├── Tamanho: ~120KB (otimizado web)
│   └── Dimensões: mín. 500px largura
│
└── logotipo-[cor].png      # Logo completo (hero)
    ├── Tamanho: ~200-350KB
    └── Dimensões: mín. 1000px largura
```

**Versões necessárias:**
- Colorida (primária)
- Monocromática (branco para footer escuro)
- PNG transparente

---

### 5. Copy da Landing Page

**Arquivo:** `docs/landing-copy.md`
**Template:** `docs/templates/landing-copy-template.md`
**Quem escreve:** Copywriter/Cliente

**⚠️ Este É o copy FINAL que vai no site!**

**Estrutura OBRIGATÓRIA (9 seções):**

```markdown
## 1. HERO SECTION

### Headline (H1)
[Frase de impacto emocional]
Ex: "Você está cansada de viver para comer certo?"

### Subheadline (2-3 parágrafos)
[Amplificação da dor + promessa]

### CTA Principal
Texto do botão: [Ex: "Agende sua consulta"]

---

## 2. SEÇÃO DORES

### Título
[Título empático]

### Introdução (1 parágrafo)
[Contexto das dores]

### Dores (Grid de 3-5 cards)

**[Nome da Dor 1]**
[Descrição detalhada, 2-4 frases]

**[Nome da Dor 2]**
[...]

### Consequência (1-2 parágrafos)
[O que acontece se continuar assim]

---

## 3. SEÇÃO BENEFÍCIOS

### Título
[Título aspiracional]

### Introdução (1-2 parágrafos)
[Como a solução transforma]

### Benefícios (Grid de 5-7 cards)

**💚 [Nome do Benefício 1]**
[Descrição, 2-3 frases]

[Sugerir ícones para cada benefício]

---

## 4. SEÇÃO COMO FUNCIONA

### Título
[Título claro e simples]

### Introdução (1 parágrafo)
[Contexto do processo]

### Passos (3-4 etapas)

**1. [Nome do Passo]**
[Descrição detalhada]

**2. [...]**

### CTA Secundário
Texto: [Ex: "Comece sua transformação hoje"]

---

## 5. SEÇÃO TRANSFORMAÇÃO DO PROFISSIONAL

### Título
[Frase em primeira pessoa]
Ex: "Eu criei para mim o que nunca encontrei"

### História Pessoal (4-6 parágrafos)
- Parágrafo 1: Situação inicial (antes)
- Parágrafo 2-3: Jornada/processo
- Parágrafo 4: Resultado conquistado
- Parágrafo 5: Ganhos intangíveis
- Parágrafo 6: Missão atual

### Imagens
- Foto "antes": [descrição]
- Foto "depois": [descrição]

---

## 6. SEÇÃO DEPOIMENTOS

### Título
[Título inclusivo]

### Introdução (1 frase)
[Contexto]

### Depoimentos (4-6 cards de dores autênticas)

**"[Título da dor vivida]"**
[Descrição da frustração, 2-3 frases]
— [Nome fictício ou "Cliente" apenas]

### CTA
Texto: [Ex: "Fale comigo no WhatsApp"]

---

## 7. SEÇÃO QUEM É [NOME]

### Título
[Quem é [Nome Profissional]]

### Copy Principal (2-3 parágrafos)
- Formação acadêmica
- Especialização
- Experiência

### Credenciais (Lista com ✓)
✓ [Credencial 1]
✓ [Credencial 2]
✓ [Credencial 3]
✓ [Credencial 4]

### Parágrafo Final
[Missão/propósito]

### Foto
[Foto profissional - descrição]

### CTA
Texto: [Ex: "Quero essa transformação"]

---

## 8. SEÇÃO FAQ

### Título
[Título simples - "Perguntas Frequentes"]

### Perguntas e Respostas (5-7)

**[Pergunta 1]**
[Resposta, 2-4 frases]

**TEMAS OBRIGATÓRIOS:**
1. Preço/investimento (sem revelar valor exato)
2. Tempo para resultados
3. Diferencial da solução
4. Objeção principal da persona
5. Como funciona o processo
6. Localização/formato (online/presencial)

---

## 9. CTA FINAL

### Título
[Título de urgência emocional, não agressiva]

### Copy (2-3 parágrafos)
- Contraste: continuar igual vs transformar
- Lista de benefícios finais (5-7 itens com ✓)
- Escolha/decisão

### CTA Button (Grande)
Texto: [Ex: "Agende sua consulta agora"]

### Subtexto
[Ex: "Vagas limitadas. Agenda sujeita a disponibilidade"]

---

## NOTAS DE TOM E VOZ

**Tom geral:**
[3-5 características - ex: Empático, Direto, Acolhedor]

**Evitar:**
[Ex: Jargões médicos, promessas irreais, culpabilização]

**Priorizar:**
[Ex: Linguagem acessível, exemplos concretos, emoção autêntica]
```

---

### 6. Assets Visuais

**Quem fornece:** Fotógrafo/Cliente

#### 6.1. Especificações Técnicas

**LOGOS**
```
Formatos: PNG (transparente)
Resolução mínima: 300 DPI
Tamanhos:
- Logo header: 500-800px largura, ~120KB
- Logo hero: 1000-1500px largura, ~200-350KB
Fundo: Transparente
```

**FOTOS**
```
Formato: JPG (alta qualidade)
Resolução mínima: 1920x1080px (Full HD)
Tamanho máximo: 2-3MB (antes de otimização)
Orientação:
- Hero mobile: Vertical/Retrato (3:4)
- Transformação (antes/depois): Vertical/Retrato (3:4)
- Perfil profissional: Vertical ou Quadrada
```

#### 6.2. Lista de Fotos Necessárias

```markdown
□ 1-2 fotos para Hero
   └─ Vertical (mobile) 3:4
   └─ Opcional: Horizontal (desktop) 16:9

□ Foto "Antes" (transformação profissional)
   └─ Corpo inteiro ou 3/4, casual

□ Foto "Depois" (transformação profissional)
   └─ Mesma pose/contexto do "antes"

□ Foto profissional (Quem é)
   └─ Retrato profissional, fundo neutro ou contextual
```

#### 6.3. Organização de Entrega

```
/assets-cliente/
├── logos/
│   ├── logo-horizontal-colorido.png
│   ├── logo-horizontal-branco.png
│   └── logotipo-completo-colorido.png
└── fotos/
    ├── hero-mobile.jpg
    ├── transformacao-antes.jpg
    ├── transformacao-depois.jpg
    └── perfil-profissional.jpg
```

---

### 7. Configurações Técnicas

**Quem fornece:** Cliente

```markdown
## WhatsApp
Número: [55][DDD][Número] - ex: 5511987654321
Mensagem pré-preenchida:
"[Texto que aparecerá automaticamente quando clicar no botão]"

Exemplo:
"Olá! Vi o site e me identifiquei muito com a proposta da nutrição comportamental. Gostaria de agendar uma consulta!"

## Redes Sociais
Instagram: https://instagram.com/[usuario]
Facebook: [se aplicável]
LinkedIn: [se aplicável]

## Domínio
Domínio: [se já tem] - ex: seyune.com.br
Registrar onde: [Registro.br, GoDaddy, etc]

## Email Profissional
Email: [se tem] - ex: contato@seyune.com.br
Provedor: [Gmail, Google Workspace, etc]
```

---

## 🚀 DURANTE O PROJETO: Processo de Desenvolvimento

### Timeline Padrão (10 dias)

```
DIA 1:  Setup técnico (Next.js, Tailwind, shadcn)
DIA 2:  Configuração visual (cores, fontes, assets)
DIA 3-4: Componentes parte 1 (Hero → Benefícios)
DIA 5-6: Componentes parte 2 (Como Funciona → Footer)
DIA 7:  Tracking e Analytics
DIA 8:  Documentação
DIA 9:  Testes e otimizações
DIA 10: Deploy em produção
```

### Stack Tecnológico

```json
{
  "framework": "Next.js 16 (App Router)",
  "react": "19",
  "typescript": "5",
  "styling": "Tailwind CSS 4",
  "components": "shadcn/ui (New York style)",
  "icons": "Lucide React",
  "animations": "Framer Motion",
  "analytics": ["Google Tag Manager", "Google Analytics 4", "Meta Pixel"],
  "hosting": "Vercel (recomendado)"
}
```

### Estrutura de Pastas

```
seyune/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout global + analytics
│   │   ├── page.tsx                # Redirect para landing
│   │   ├── globals.css             # Cores e estilos globais
│   │   └── consulta/
│   │       └── page.tsx            # Landing page principal
│   ├── components/
│   │   ├── ui/                     # shadcn (NÃO MODIFICAR!)
│   │   ├── custom/                 # Componentes customizados
│   │   └── analytics/              # Tracking components
│   ├── hooks/
│   │   └── useTracking.ts          # Hook de analytics
│   ├── lib/
│   │   └── utils.ts                # Utilitários
│   └── config/
│       └── site.ts                 # Configuração centralizada
├── public/
│   ├── brand/                      # Logos
│   └── images/                     # Fotos
│       ├── hero/
│       ├── transformacao/
│       └── about/
├── docs/                           # Documentação
│   ├── README.md
│   ├── campanha-[nome].md
│   ├── persona.md
│   ├── copy.md
│   ├── landing-copy.md
│   ├── TRACKING_*.md
│   └── templates/
├── .env.example                    # Template de variáveis
├── .env.local                      # Variáveis locais (NÃO commitar)
├── CLAUDE.md                       # Documentação técnica
├── FRAMEWORK.md                    # Este arquivo
└── package.json
```

### Padrões de Código

#### Componentes React

```typescript
'use client'; // Sempre que usar hooks

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function SectionName() {
  return (
    <section
      id="section-id"
      data-section="section_name"  // Para tracking
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Conteúdo */}
        </motion.div>
      </div>
    </section>
  );
}
```

#### Configuração Centralizada

```typescript
// src/config/site.ts
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '',
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
    message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || '',
    get url() {
      const clean = this.number.replace(/\D/g, '');
      return `https://wa.me/${clean}?text=${encodeURIComponent(this.message)}`;
    },
  },
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  },
};
```

---

## 📦 PÓS-PROJETO: Entregáveis

### Checklist de Entrega

```markdown
□ Código-fonte completo no repositório
□ Site em produção (Vercel)
□ Domínio configurado (se aplicável)
□ Tracking configurado e testado
□ Documentação completa (/docs)
□ README.md com instruções
□ .env.example com template de variáveis
□ Credenciais de acesso (Vercel, Analytics)
```

### Documentação Entregue

```
/docs/
├── README.md                  # Índice e guia rápido
├── campanha-[nome].md         # Briefing original
├── persona.md                 # Público-alvo
├── copy.md                    # Framework de perguntas
├── landing-copy.md            # Copy completa
├── [Brand-Guidelines].pdf     # Identidade visual
├── TRACKING_SETUP.md          # Como configurar analytics
├── TRACKING_EVENTS.md         # Lista de 23+ eventos
└── LOOKER_STUDIO_GUIDE.md     # Dashboards prontos
```

### Acesso e Credenciais

**Fornecer ao cliente:**
- Acesso ao repositório GitHub
- Acesso ao projeto Vercel
- IDs de tracking (GTM, GA4, Meta Pixel)
- Acesso ao Google Analytics
- Acesso ao Google Tag Manager
- Login da Meta Business Suite

---

## 📊 Métricas de Sucesso

### Durante Desenvolvimento

```markdown
□ Lighthouse Score > 90 (Performance, SEO, Accessibility)
□ Mobile 100% responsivo
□ Todos os 23+ eventos de tracking funcionando
□ Tempo de carregamento < 3s
□ 0 erros no console do navegador
□ WhatsApp links funcionando
□ Animações suaves (sem jank)
```

### Pós-Lançamento (Acompanhar)

**Primeiras 2 semanas:**
- Taxa de conversão (cliques CTA / visitantes)
- Taxa de rejeição
- Tempo médio na página
- Scroll depth médio

**Mês 1-2:**
- Origem do tráfego (Instagram, Google, Direto)
- Dispositivo mais usado (Mobile/Desktop)
- FAQ mais aberto
- CTA com melhor performance

**Mês 3+:**
- Custo por lead (se rodando ads)
- ROAS (Return on Ad Spend)
- Tendências de crescimento
- Otimizações baseadas em dados

---

## 🎓 Boas Práticas

### Design
- ✅ Mobile-first SEMPRE
- ✅ Hierarquia tipográfica clara
- ✅ Espaçamento generoso (whitespace)
- ✅ CTAs visíveis e destacados
- ✅ Animações sutis, não exageradas

### Performance
- ✅ Imagens otimizadas (< 200KB cada)
- ✅ Lazy loading para imagens
- ✅ Fonts com display: swap
- ✅ Scripts de tracking com strategy: afterInteractive

### Acessibilidade
- ✅ Contraste de cores (WCAG AA mínimo)
- ✅ Alt text em todas as imagens
- ✅ Navegação por teclado funcional
- ✅ Labels em formulários

### SEO
- ✅ Meta tags (title, description)
- ✅ Headings hierárquicos (H1 → H2 → H3)
- ✅ URLs semânticas
- ✅ Sitemap.xml
- ✅ Schema markup (opcional)

---

## 💰 Custos Estimados

### Setup Inicial (One-time)
- Domínio: R$ 40-80/ano
- Email profissional: R$ 30/mês (Google Workspace - opcional)
- Hospedagem Vercel: Grátis (hobby) ou R$ 100/mês (pro)

### Ferramentas (Todas Grátis)
- Google Analytics 4: ✅ Grátis
- Google Tag Manager: ✅ Grátis
- Meta Pixel: ✅ Grátis
- Looker Studio: ✅ Grátis

### Investimento em Ads (Variável)
- Meta Ads: Budget definido (ex: R$ 500 inicial para teste)
- Google Ads: Opcional (ex: R$ 1.000/mês)

---

## 🔄 Processo de Iteração

### Após 30 dias de dados:

1. **Analisar dashboards Looker Studio**
   - Qual CTA converte mais?
   - Onde há maior drop-off?
   - Qual origem traz leads melhores?

2. **Hipóteses de otimização**
   - Testar nova headline
   - Reposicionar CTAs
   - Ajustar copy de seções com baixo engajamento

3. **A/B Testing (se volume permitir)**
   - Testar 1 variável por vez
   - Mínimo 100 conversões para resultado confiável

4. **Iterar mensalmente**
   - Pequenos ajustes baseados em dados
   - Nunca mudar tudo de uma vez

---

## 🆘 Troubleshooting Comum

### "Site não está convertendo"
- [ ] Verificar se tracking está funcionando
- [ ] Analisar scroll depth (pessoas chegam nos CTAs?)
- [ ] Revisar copy (dores e benefícios ressoam?)
- [ ] Testar WhatsApp link (está funcionando?)

### "Muitos visitantes, poucos cliques"
- [ ] CTAs estão visíveis?
- [ ] Cores dos botões se destacam?
- [ ] Copy do CTA é clara?
- [ ] Há objeções não respondidas?

### "Alto custo por lead"
- [ ] Revisar público dos anúncios
- [ ] Testar criativos diferentes
- [ ] Melhorar copy da landing
- [ ] Verificar se FAQ responde objeções

---

## 📚 Recursos Adicionais

### Documentação Técnica
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Framer Motion: https://www.framer.com/motion

### Analytics
- GA4 Setup: Ver `docs/TRACKING_SETUP.md`
- Eventos: Ver `docs/TRACKING_EVENTS.md`
- Dashboards: Ver `docs/LOOKER_STUDIO_GUIDE.md`

### Templates
- Ver pasta `docs/templates/` para todos os templates prontos

---

**Última atualização:** Novembro 2025
**Versão:** 1.0
**Baseado em:** Projeto Seyune (sucesso comprovado)
