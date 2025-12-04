# Seyune - Nutrição Comportamental

Cliente Lumes: landing pages de conversão para nutricionista comportamental.

---

## Visão Geral

**Cliente:** Seyune (nutricionista comportamental)
**Objetivo:** Gerar agendamentos de consultas via WhatsApp
**Público:** Mulheres 24-38 anos, cansadas de dietas restritivas

### Produtos Atuais

1. **Landing Page Consulta** (`/consulta`)
   - Conversão para consultas individuais
   - Funil: Meta Ads → Landing → WhatsApp

2. **Projeto 45 Graus** (`/projeto45dias`)
   - Programa de 45 dias com acompanhamento
   - Checkout via Stripe
   - Modo: Black Friday (até dez/2024) → Evergreen

---

## Estrutura de Rotas

```
/                    → Redirect para /consulta
/consulta            → Landing page consultas (WhatsApp)
/projeto45dias       → Landing page do programa (Stripe checkout)
/projeto45dias/obrigado → Página pós-compra
```

---

## Identidade da Marca

### DNA
**Tagline:** "Cuidar do corpo, respeitar a mente"
**Atributos:** Moderna • Tranquila • Estável • Elegante

### Paleta de Cores
```css
#454c31  /* Verde Profundo - Balance, introspection */
#874329  /* Terracota Vivo - Proximity, empathy */
#602514  /* Marrom Terroso - Solidity, sophistication */
#efd1af  /* Creme Areia - Lightness, breathing space */
#f0f0f0  /* Off White - Clean backgrounds */
```

### Tipografia
- **Título:** Recoleta Alt (elegante, orgânica)
- **Corpo:** Nexa (moderna, limpa)
- **Citação:** Dreaming Outloud Sans (pessoal)

### Assets
- `public/logo-terracota.png` - Header scroll
- `public/logotipo-terracota.png` - Hero section
- `public/images/seyune/` - Fotos do ensaio

---

## Público-Alvo (Persona)

### Demografia
- **Idade:** 24-38 anos
- **Gênero:** Mulheres
- **Perfil:** Conectadas, vaidosas, cansadas de tentativas frustradas

### Dores Principais
1. Ciclo de dietas: "foco total → recaída → culpa → recomeçar"
2. Culpa e compulsão alimentar
3. Efeito sanfona constante
4. Falta de resultados sustentáveis
5. Desconexão emocional com a comida

### Crença Central
> "Eu não aguento mais começar dieta achando que agora vai… e acabar sentindo que tô vivendo pra comer certo."

---

## A Solução Seyune

### Credenciais
- Formação acadêmica em Nutrição
- Especialização em Nutrição Comportamental
- Experiência pessoal: ganhou +10kg de massa magra (era 45kg)

### Diferencial
- Viveu a transformação (45kg → +10kg massa magra)
- Entende as dores emocionais da persona
- Foge dos clichés de "cultura de dieta"
- Foco em bem-estar integral, não só estética

---

## Copy Strategy

### Princípios de Tom e Voz
- ✅ Conversacional, não corporativa
- ✅ Empática, sem julgamento
- ✅ Esperançosa mas realista
- ✅ Foco na persona (70%) > Seyune (30%)
- ✅ Emocional + racional equilibrados

### 10 Perguntas que a Copy Deve Responder
1. Como isso é diferente?
2. O que eu ganho?
3. Como sei que é real?
4. O que me impede?
5. Quem é o culpado?
6. Por que agora?
7. Por que devo confiar?
8. Como funciona?
9. Como começo?
10. [Implícita] Validação social

---

## Design System

### Princípios
- **Clean & Minimal:** Muito espaço em branco
- **Hierarquia Tipográfica:** Forte contraste entre níveis
- **Respiração Visual:** Backgrounds em creme (#efd1af)
- **Mobile-First:** Sempre responsivo

### shadcn/ui
⚠️ **Não modificar** arquivos em `/src/components/ui`
Customizar via `className` ou criar componentes em `/src/components/custom`

---

## Meta Ads - Campanhas

### Regra #1 (CRÍTICA)
**1 criativo = 1 campanha separada**

❌ Múltiplos anúncios diferentes no mesmo conjunto
✅ Campanhas separadas para cada criativo

### Regras Rápidas
- Objetivo: Vendas/Conversões (não Tráfego)
- Evento: `WhatsAppClick` ou `Purchase`
- Local: Site APENAS (não Formulários Instantâneos)
- Budget: Nível de campanha
- Público para testes: IDÊNTICO (mudar apenas criativo)
- Período de aprendizado: NÃO mexer dias 1-3

### Docs de Referência (raiz do monorepo)
- `/docs/meta-ads-rules.md` - Regras fundamentais
- `/docs/meta-ads-setup-guide.md` - Guia de setup
- `/docs/nomenclatura-campanha.md` - Padrão de nomes

---

## Tracking

### Stack
- GA4 (`NEXT_PUBLIC_GA4_ID`)
- Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`)
- Meta Conversions API (server-side)

### Eventos Principais
- `PageView` - Todas as páginas
- `ViewContent` - Scroll na landing
- `InitiateCheckout` - Clicou em comprar
- `Purchase` - Pagamento confirmado (webhook)
- `WhatsAppClick` - CTA WhatsApp

### Docs de Referência
- `/docs/tracking-setup.md` - Setup geral
- `/docs/meta-conversions-api-setup.md` - API server-side
- `docs/TRACKING_EVENTS.md` - Eventos específicos Seyune

---

## Estrutura de Pastas

```
/src
├── app/
│   ├── consulta/            # Landing consultas
│   ├── projeto45dias/       # Landing + checkout + obrigado
│   │   ├── lib/             # Config batches, pricing
│   │   └── components/      # Componentes específicos
│   ├── api/
│   │   ├── stripe/webhook/  # Webhook Stripe
│   │   └── ...
│   └── layout.tsx
├── components/
│   ├── ui/                  # shadcn/ui (não modificar)
│   └── custom/              # Componentes personalizados
└── lib/

/docs                        # Docs específicos Seyune
├── persona.md
├── copy.md
├── campanha-seyune.md
├── TRACKING_EVENTS.md
├── pixel-events-checklist.md
└── ...

/public
├── logo-terracota.png
├── logotipo-terracota.png
└── images/seyune/
```

---

## Documentação Local

### Docs Específicos (nesta pasta)
- `docs/persona.md` - Persona detalhada
- `docs/copy.md` - Framework de copy
- `docs/campanha-seyune.md` - Estratégia de campanha
- `docs/TRACKING_EVENTS.md` - Eventos de tracking
- `docs/manual-operacional-projeto45dias.md` - Manual do programa

### Docs Globais (raiz `/docs`)
- `/docs/meta-ads-rules.md`
- `/docs/stripe-setup-guide.md`
- `/docs/tracking-setup.md`
- `/docs/nomenclatura-campanha.md`

---

## Notas Importantes

- ⚠️ Copy é **livre e natural**, docs são apenas direcionamento
- ⚠️ **Não modificar** componentes em `/src/components/ui`
- ⚠️ **Mobile-first** sempre (maioria do tráfego Meta Ads)
- ⚠️ Persona-first approach (falar da cliente antes da Seyune)

---

**Última atualização:** 2025-12-04
