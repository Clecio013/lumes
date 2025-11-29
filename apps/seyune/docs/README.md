# Documentação - Projeto Seyune

## Índice de Documentos

### 📊 Estratégia e Campanha
- **[campanha-seyune.md](./campanha-seyune.md)** - Objetivos, budget, funil de conversão e estratégia de Meta Ads

### 👤 Público-Alvo
- **[persona.md](./persona.md)** - Análise detalhada da persona (mulheres 24-38 anos, dores, comportamentos, desejos)

### ✍️ Copy e Conteúdo
- **[copy.md](./copy.md)** - Framework de 10 perguntas estratégicas (direcionamento para criação de copy)

### 🎨 Identidade Visual
- **[Pré Projeto Seyune Zhou - Nova paleta.pdf](./Pré%20Projeto%20Seyune%20Zhou%20-%20Nova%20paleta.pdf)** - DNA da marca completo
  - Atributos: Moderna, Tranquila, Estável, Elegante
  - Paleta de cores (#454c31, #874329, #602514, #efd1af, #f0f0f0)
  - Tipografia: Recoleta Alt, Nexa, Dreaming Outloud Sans
  - Logo e símbolo (balança com folhas)
  - Tagline: "Cuidar do corpo, respeitar a mente"

### 📊 Tracking e Analytics
- **[TRACKING_EVENTS.md](./TRACKING_EVENTS.md)** - Documentação completa de todos os 23+ eventos configurados
- **[TRACKING_SETUP.md](./TRACKING_SETUP.md)** - Guia passo a passo para configurar GTM, GA4 e Meta Pixel
- **[LOOKER_STUDIO_GUIDE.md](./LOOKER_STUDIO_GUIDE.md)** - Templates de dashboards prontos para Looker Studio

### 🚀 Framework de Desenvolvimento
- **[../FRAMEWORK.md](../FRAMEWORK.md)** - Framework completo para replicar este processo em novos projetos
- **[../QUICKSTART.md](../QUICKSTART.md)** - Guia rápido para iniciar um novo projeto
- **[templates/](./templates/)** - Templates prontos para uso:
  - `campanha-template.md` - Briefing estratégico completo
  - `persona-template.md` - Análise detalhada de persona
  - `copy-template.md` - Framework de 10 perguntas estratégicas
  - `env-template.txt` - Variáveis de ambiente configuráveis
  - `site-config-template.ts` - Configuração centralizada do site

  **Nota:** A copy da landing page é escrita pelo Claude baseado nos templates acima, não precisa de template separado.

---

## Guia Rápido

### Cores da Marca
```css
#454c31  /* Verde Profundo */
#874329  /* Terracota Vivo */
#602514  /* Marrom Terroso */
#efd1af  /* Creme Areia */
#f0f0f0  /* Off White */
```

### Tipografia
- **Títulos:** Recoleta Alt
- **Corpo:** Nexa
- **Citações:** Dreaming Outloud Sans

### Logos Disponíveis
- `/public/logo-terracota.png` - Header (124.7 KB)
- `/public/logotipo-terracota.png` - Hero (359 KB)

---

## Como Usar Esta Documentação

### Para Trabalhar no Projeto Seyune:
1. **Começando?** Leia `/CLAUDE.md` na raiz do projeto primeiro
2. **Entender a persona?** Veja `persona.md`
3. **Criando copy?** Use `copy.md` como direcionamento (não literal)
4. **Dúvidas de design?** Consulte o PDF do pré-projeto
5. **Objetivos da campanha?** Veja `campanha-seyune.md`
6. **Configurar analytics?** Consulte `TRACKING_SETUP.md`
7. **Ver dashboards?** Use `LOOKER_STUDIO_GUIDE.md`

### Para Criar um Novo Projeto (Outro Cliente):
1. **Leia o framework:** `/FRAMEWORK.md` - Entenda todo o processo
2. **Quick start:** `/QUICKSTART.md` - Inicie rapidamente
3. **Use os templates:** `/docs/templates/` - Preencha com dados do novo cliente
4. **Adapte o código:** Clone este projeto como base
5. **Configure:** Use `env-template.txt` e `site-config-template.ts`

---

## Estrutura do Projeto

```
/ (raiz)
  ├── FRAMEWORK.md           # 📚 Framework completo (replicar processo)
  ├── QUICKSTART.md          # ⚡ Guia rápido de início
  └── CLAUDE.md              # 🤖 Instruções para Claude (context)

/docs                        # 📁 Documentação do projeto
  ├── README.md              # Este arquivo (índice)
  ├── campanha-seyune.md     # Estratégia de campanha
  ├── persona.md             # Persona detalhada
  ├── copy.md                # Framework de copy
  ├── Pré Projeto... .pdf    # Identidade visual
  ├── TRACKING_EVENTS.md     # Todos os eventos configurados
  ├── TRACKING_SETUP.md      # Setup de analytics
  ├── LOOKER_STUDIO_GUIDE.md # Dashboards prontos
  └── templates/             # 📋 Templates reutilizáveis (5 arquivos)
      ├── campanha-template.md
      ├── persona-template.md
      ├── copy-template.md
      ├── env-template.txt
      └── site-config-template.ts

/src
  ├── app/
  │   ├── consulta/          # Landing page principal
  │   ├── page.tsx           # Homepage (redirect)
  │   └── layout.tsx         # Root layout
  ├── components/
  │   ├── ui/                # shadcn/ui components
  │   ├── custom/            # Componentes customizados
  │   └── analytics/         # Tracking components
  ├── config/
  │   └── site.ts            # Configuração centralizada
  ├── hooks/
  │   └── useTracking.ts     # Hook de tracking
  └── lib/
      └── utils.ts           # Utilidades

/public
  ├── brand/
  │   ├── logo-terracota.png
  │   └── logotipo-terracota.png
  └── images/
      ├── hero/
      ├── about/
      └── transformacao/
```

---

## Informações-Chave

### Objetivo
Gerar ~10 agendamentos de consulta/semana via WhatsApp

### Budget
R$500 inicial (reinvestir ganhos)

### Funil
Meta Ads → Landing Page → WhatsApp → Consulta

### Persona em Uma Frase
Mulheres 24-38 anos frustradas com dietas restritivas, buscando transformação sustentável (física + emocional)

### Diferencial da Seyune
Nutrição comportamental personalizada + história pessoal inspiradora (45kg → +10kg massa magra)

---

---

## 🎯 Para Sua Agência

Este projeto agora serve como **template base** para criar landing pages de alta conversão para diversos tipos de clientes:

✅ **Profissionais da saúde:** Nutricionistas, psicólogos, fisioterapeutas
✅ **Educação:** Professores particulares, mentores, coaches
✅ **Fitness:** Personal trainers, instrutores de yoga
✅ **Consultoria:** Coaches de carreira, consultores de negócios
✅ **Serviços:** Qualquer profissional autônomo que venda consultas/serviços

### Como Replicar:
1. Clone este repo como base
2. Use os templates em `/docs/templates/` para coletar informações do cliente
3. Siga o FRAMEWORK.md para processo passo a passo
4. Adapte copy, cores, e imagens para o novo cliente
5. Configure analytics e faça deploy

**Tempo estimado:** ~14 horas (2 dias de trabalho)

---

**Última atualização:** 2025-11-03
