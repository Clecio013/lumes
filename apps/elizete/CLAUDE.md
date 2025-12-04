# Elizete Garcia - Estética Inteligente

Cliente Lumes: landing pages para cursos de estética profissional.

---

## Visão Geral

**Cliente:** Elizete Garcia (esteticista, 49 anos de experiência)
**Objetivo:** Venda de cursos online via Hotmart
**Público:** Profissionais de estética (esteticistas, biomédicas, enfermeiras)

### Produtos Atuais

1. **Avaliação de Pele** (`/avaliacao-pele`)
   - Curso de Avaliação de Pele e Consulta Estética Profissional
   - Preço: R$ 97 (de R$ 197)
   - Checkout: Hotmart

2. **Clareamento Íntimo** (`/clareamento-intimo`)
   - Curso com Raciocínio Clínico
   - Preço: R$ 97 (de R$ 397)
   - Checkout: Hotmart

---

## Estrutura de Rotas

```
/                    → Homepage (redirect ou institucional)
/avaliacao-pele      → Landing page curso Avaliação de Pele
/clareamento-intimo  → Landing page curso Clareamento Íntimo
```

---

## Identidade da Marca

### Posicionamento
- **Experiente:** 49 anos de atuação em estética
- **Técnica:** Raciocínio clínico, não "receita de bolo"
- **Ética:** Abordagem responsável e fundamentada
- **Referência:** Para esteticistas que querem se destacar

### Redes Sociais
- Instagram: @eli.zetegarcia
- YouTube: @eli.zetegarcia

---

## Público-Alvo

### Profissionais
- Esteticistas formadas ou em formação
- Biomédicas estetas
- Enfermeiras da área de estética
- Profissionais de saúde e bem-estar

### Dores Principais
1. Insegurança técnica (medo de causar reações)
2. Falta de fundamentação (aplicar sem entender)
3. Abordagem superficial (tratar sintoma, não causa)
4. Cursos genéricos que não diferenciam

### Resultados Desejados
- Confiança técnica para atuar
- Diferenciação no mercado
- Raciocínio clínico (não decorar protocolos)
- Tornar-se referência na área

---

## Configuração Centralizada

Todas as configs estão em `src/config/site.ts`:
- Preços dos cursos
- URLs de checkout Hotmart
- Analytics IDs
- Links de redes sociais

---

## Estrutura de Pastas

```
/src
├── app/
│   ├── page.tsx                 # Homepage
│   ├── avaliacao-pele/          # Landing curso Avaliação
│   │   ├── page.tsx
│   │   └── components/sections/
│   ├── clareamento-intimo/      # Landing curso Clareamento
│   │   ├── page.tsx
│   │   └── components/
│   └── layout.tsx
├── components/
│   ├── animations/              # Scroll reveal, etc
│   └── schema/                  # Structured data
└── config/
    └── site.ts                  # Config centralizada

/docs
└── clareamento-intimo.md        # Copy e estrutura do curso

/public
├── brand/                       # Logo
└── images/
    ├── hero/
    ├── about/
    ├── depoimentos/
    └── ensaio/
```

---

## Tracking

### Stack
- GA4 (`NEXT_PUBLIC_GA4_ID`)
- GTM (`NEXT_PUBLIC_GTM_ID`)
- Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`)

### Eventos
- `PageView` - Todas as páginas
- `ViewContent` - Scroll na landing
- `InitiateCheckout` - Clicou em comprar (redirect Hotmart)

---

## Documentação

### Local
- `docs/clareamento-intimo.md` - Estrutura do curso, copy, FAQs

### Global (raiz `/docs`)
- `/docs/meta-ads-rules.md` - Regras de campanha
- `/docs/tracking-setup.md` - Setup de tracking

---

## Notas Importantes

- ⚠️ Checkout via **Hotmart** (não Stripe)
- ⚠️ Público B2B (profissionais, não consumidor final)
- ⚠️ Tom técnico e profissional (não emocional como Seyune)
- ⚠️ Mobile-first sempre

---

**Última atualização:** 2025-12-04
