# 📊 Guia de Analytics - Dashboard Seyune

## 🎯 Acesso ao Dashboard

**URL:** `http://localhost:3000/admin/analytics` (desenvolvimento)
**URL Produção:** `https://seyune.com.br/admin/analytics`

---

## 📥 Como Baixar CSV do Meta Ads

### ✅ Opção 1: CSV Agregado (Recomendado)

No Meta Ads Manager:

1. **Ir para Campanhas**
2. **Remover todos os breakdowns** (idade, gênero, dia, etc)
3. **Visualização:** Somente "Campanhas"
4. **Período:** Escolher período desejado
5. **Exportar → CSV**

**Colunas necessárias:**
- Nome da campanha
- Impressões (ou Alcance)
- Cliques (ou Cliques no link)
- Conversões (se configurado)
- Valor gasto (BRL)

### ✅ Opção 2: CSV Segmentado (Suportado)

Se você baixar CSV com breakdown (idade/gênero/dia), **o sistema agrega automaticamente**!

Ou seja: você pode baixar CSV detalhado que o dashboard vai consolidar as campanhas sozinho.

---

## 🚀 Como Usar o Dashboard

### 1. Upload CSV

- Arrastar arquivo `.csv` na área de upload
- Ou clicar para selecionar arquivo
- Dashboard processa automaticamente

### 2. Filtros Inteligentes

**Filtros disponíveis (painel expansível):**

**Performance (baseado em CPL):**
- **Todas**: Mostra todas as campanhas
- **Excelente**: CPL < R$49 (< 70% da meta)
- **Bom**: CPL R$49-70 (dentro da meta)
- **Atenção**: CPL R$70-98 (40% acima da meta)
- **Crítico**: CPL > R$98 ou sem conversões

**Ordenação:**
- CPL (menor primeiro) - padrão
- CPL (maior primeiro)
- Conversões (maior primeiro)
- Gasto (maior primeiro)
- Nome (A-Z)

**Mínimo de conversões:**
- Slider de 0 a 10+
- Útil para filtrar campanhas em teste

**Seleção de campanhas:**
- Checkbox para cada campanha
- Ver apenas campanhas específicas
- Botão "Selecionar/Desmarcar todas"

**Indicador de filtros ativos:**
- Badge "Ativo" quando há filtros aplicados
- Botão "Limpar filtros" para resetar

**Comportamento:**
- Filtros atualizam automaticamente todos os gráficos, tabelas e métricas
- Métricas recalculadas baseadas apenas em campanhas filtradas
- **Insights automáticos recalculados** para analisar apenas campanhas filtradas
- Funil de conversão atualizado com dados filtrados
- Mensagem amigável quando nenhuma campanha corresponde aos filtros

### 3. Visualizações Disponíveis

**Métricas Overview (4 cards):**
- Gasto Total
- Impressões (+ CTR médio)
- Cliques (+ CPC médio)
- Conversões (+ CPL médio) com badge colorido
- **Atualizam dinamicamente** conforme filtros

**Gráficos (Recharts):**
- **Performance Comparativa:** Impressões/Cliques/Conversões por campanha
- **CPL por Campanha:** Com linha de meta (R$70) e cores:
  - 🟢 Verde: CPL < R$50 (excelente)
  - 🔵 Azul: CPL R$50-70 (bom)
  - 🟡 Amarelo: CPL R$70-98 (atenção)
  - 🔴 Vermelho: CPL > R$98 (crítico)

**Tabela Detalhada:**
- Todas as campanhas com métricas completas
- Ordenação por qualquer coluna (clique no cabeçalho)
- Status visual (badges coloridos)

**Funil de Conversão:**
- Visualização do fluxo completo: Impressões → Cliques → Conversões
- Barras proporcionais mostrando drop-off em cada etapa
- CTR e Taxa de Conversão destacados
- Status visual (✅ Ótimo, ⚠️ Normal, 🔴 Fraco)

**Insights Automáticos:**
- Análise baseada em regras predefinidas
- Recomendações acionáveis para cada campanha
- Indicadores de sucesso/warning/erro
- **Atualizam dinamicamente** conforme filtros (analisam apenas campanhas filtradas)

**Análise IA (Opcional):**
- Botão "Gerar Análise IA"
- Suporta **OpenAI (GPT-4)** ou **Anthropic (Claude)**
- Sistema detecta automaticamente qual API key está configurada
- Prioriza OpenAI (mais barato: ~$0.15 por análise)
- Recomendações personalizadas e contextuais

---

## ⚙️ Configuração

### Variáveis de Ambiente

```bash
# .env.local

# Opcional: Análise IA avançada (escolha uma ou ambas)
# Sistema prioriza OpenAI (mais barato e fácil de configurar)
OPENAI_API_KEY=sk-proj-xxx                    # OpenAI (recomendado)
# OU
ANTHROPIC_API_KEY=sk-ant-api03-xxx           # Anthropic Claude

# Targets personalizados (opcional)
NEXT_PUBLIC_ANALYTICS_CPL_TARGET=70  # Meta de CPL em R$
```

### Como obter API keys:

**OpenAI (Recomendado - Mais barato)**

1. Acesse: https://platform.openai.com/api-keys
2. Faça login ou crie conta (aceita cartão brasileiro)
3. Clique em **"Create new secret key"**
4. Dê um nome (ex: "Seyune Analytics")
5. Copie a chave (começa com `sk-proj-...`)
6. **Adicionar créditos**:
   - Menu **"Billing"** → **"Add to credit balance"**
   - Mínimo: $5 USD (~R$25)
   - Custo por análise: ~$0.15 USD (~R$0.75)

**Anthropic Claude (Alternativa)**

1. Acesse: https://console.anthropic.com/settings/keys
2. Faça login ou crie conta
3. Clique em **"Create Key"**
4. Copie a chave (começa com `sk-ant-api03-...`)
5. **Adicionar créditos**:
   - Menu **"Billing"** → **"Purchase Credits"**
   - Mínimo: $5 USD
   - Custo por análise: ~$0.20 USD

**Configurar no projeto:**

```bash
# Adicione no .env.local
OPENAI_API_KEY=sua-chave-aqui

# Reinicie o servidor
pnpm dev
```

---

## 🎯 UTM Tracking Automático

### Como Funciona

O sistema captura automaticamente UTMs das URLs e envia para Meta Pixel + Google Analytics:

```
URL: /consulta?utm_source=facebook&utm_campaign=travada&utm_content=video1
       ↓
Cookie salvo (7 dias)
       ↓
Evento WhatsAppClick inclui UTMs automaticamente
       ↓
Meta Ads sabe qual campanha converteu! ✅
```

### Testar UTMs

1. Acessar: `http://localhost:3000/consulta?utm_source=facebook&utm_campaign=travada&utm_content=video1`
2. Abrir DevTools → Application → Cookies
3. Ver cookie `seyune_utms` com os parâmetros salvos
4. Clicar em botão WhatsApp
5. Verificar no Meta Pixel Helper que evento tem UTMs

---

## 📊 Métricas Calculadas

### CPL (Custo Por Lead)
```
CPL = Gasto Total / Conversões
```

**Interpretação:**
- < R$50: Excelente 🟢
- R$50-70: Bom 🔵
- R$70-98: Atenção 🟡
- > R$98: Crítico 🔴

### CTR (Click-Through Rate)
```
CTR = (Cliques / Impressões) × 100
```

**Interpretação:**
- > 2%: Ótimo (criativo engajando)
- 1-2%: Normal
- < 1%: Fraco (testar novo criativo)

### CPC (Custo Por Clique)
```
CPC = Gasto Total / Cliques
```

**Meta:** < R$5

### Taxa de Conversão
```
Taxa = (Conversões / Cliques) × 100
```

**Interpretação:**
- > 5%: Excelente (landing page ótima)
- 2-5%: Bom
- < 2%: Baixo (otimizar landing page)

### Funil de Conversão

O funil mostra visualmente o fluxo completo de pessoas:

```
Impressões (100%)
    ↓ (perde X pessoas - baixo CTR)
Cliques (Y%)
    ↓ (perde Z pessoas - baixa conversão)
Conversões (W%)
```

**Como interpretar:**
- **Drop-off alto na 1ª etapa (Impressões → Cliques):**
  - CTR < 1% = Problema no criativo/anúncio
  - Ação: Testar novos vídeos/imagens/copy

- **Drop-off alto na 2ª etapa (Cliques → Conversões):**
  - Taxa < 2% = Problema na landing page
  - Ação: Otimizar /consulta (headline, CTAs, confiança)

---

## 🐛 Troubleshooting

### Erro: "CSV inválido"

**Possíveis causas:**
- Formato não é CSV
- Colunas essenciais faltando
- Encoding incorreto

**Solução:**
- Exportar novamente do Meta Ads
- Garantir que tem coluna "Nome da campanha"

### Erro: "API key de IA não configurada"

**Normal!** Análise IA é opcional. Insights automáticos já fornecem excelentes análises.

**Solução (se quiser usar IA):**

**Opção 1: OpenAI (Recomendado - Mais fácil)**
1. Acesse: https://platform.openai.com/api-keys
2. Crie conta e adicione $5 USD em créditos
3. Gere API key
4. Adicione no `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-proj-xxxxxxxxxx
   ```
5. Reinicie servidor: `pnpm dev`

**Opção 2: Anthropic Claude**
1. Acesse: https://console.anthropic.com/settings/keys
2. Crie conta e adicione $5 USD em créditos
3. Gere API key
4. Adicione no `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxx
   ```
5. Reinicie servidor: `pnpm dev`

**Qual escolher?**
- **OpenAI**: Mais barato (~$0.15/análise), aceita cartão brasileiro facilmente
- **Claude**: Análises um pouco mais detalhadas (~$0.20/análise)

### Erro: "Your credit balance is too low"

**Causa:** Conta criada mas sem créditos adicionados

**Solução:**
1. OpenAI: https://platform.openai.com/settings/organization/billing/overview
2. Anthropic: https://console.anthropic.com/settings/billing
3. Adicione método de pagamento
4. Compre mínimo $5 USD em créditos
5. Aguarde ~1 minuto e tente novamente

### Chaves Duplicadas no Console

**Corrigido!** Se ainda aparecer:
- Limpar cache do navegador (Cmd+Shift+R)
- Recompilar: `pnpm run build`

### CSV com muitas linhas (segmentado)

**Normal!** Sistema agrega automaticamente.

Se preferir CSV agregado:
- Remover breakdowns no Meta Ads Manager antes de exportar

---

## 💡 Dicas de Uso

### Para Decisões Rápidas

1. **Usar Filtros de Performance:**
   - Clicar "Crítico" → ver campanhas que precisam atenção urgente
   - Clicar "Excelente" → identificar campanhas para escalar
   - Comparar métricas antes/depois dos filtros

2. **Olhar badges na tabela:**
   - 🟢 Excelente → Escalar
   - 🔴 Crítico → Pausar

3. **Gráfico CPL:**
   - Campanhas abaixo da linha → manter/escalar
   - Campanhas acima da linha → otimizar/pausar

4. **Funil de Conversão:**
   - CTR < 1% → Trocar criativo (problema no anúncio)
   - Taxa conversão < 2% → Otimizar landing page
   - Visualizar onde está perdendo mais pessoas

5. **Insights automáticos:**
   - Ler recomendações acionáveis
   - Priorizar "erro" (🔴) > "warning" (🟡)

### Para Análise Profunda

1. **Comparar CTR entre campanhas:**
   - Criativo com CTR alto → usar em outras campanhas
   - Criativo com CTR baixo → trocar

2. **Comparar Taxa de Conversão:**
   - Se todas têm taxa baixa → problema na landing page
   - Se só uma tem taxa baixa → problema no público/match

3. **Usar Análise IA:**
   - Pedir recomendações específicas
   - Validar insights automáticos

### Workflows Comuns com Filtros

**Workflow 1: Identificar campanhas para pausar**
1. Filtrar por "Crítico"
2. Ordenar por "Gasto (maior primeiro)"
3. Pausar campanhas com alto gasto e CPL > R$100

**Workflow 2: Encontrar campanhas para escalar**
1. Filtrar por "Excelente"
2. Ordenar por "Conversões (maior primeiro)"
3. Aumentar budget das top 3

**Workflow 3: Analisar apenas campanhas ativas**
1. Filtrar "Mínimo de conversões: 1"
2. Analisar performance real (ignorar testes sem conversão)

**Workflow 4: Comparar criativo A vs B**
1. Selecionar apenas as 2 campanhas
2. Ver métricas lado a lado no funil
3. Decidir qual criativo performou melhor

**Workflow 5: Análise de público**
1. Ordenar por "CPL (menor primeiro)"
2. Identificar padrão nos nomes das campanhas top 3
3. Replicar configuração de público

**Workflow 6: Insights focados**
1. Filtrar por "Crítico" para ver apenas problemas urgentes
2. Ler insights automáticos (agora mostram apenas campanhas críticas)
3. Tomar ações prioritárias baseadas nas recomendações
4. Filtrar por "Excelente" para ver oportunidades de escala
5. Insights agora mostram apenas campanhas de sucesso

---

## 🚀 Próximos Passos (Futuro)

- [ ] Proteção com senha (área admin)
- [ ] Exportar relatório em PDF
- [ ] Integração direta com API Meta (automatizar)
- [ ] Comparar períodos (histórico)
- [ ] Alertas automáticos (email quando CPL > threshold)

---

## 📝 Notas Técnicas

### Arquitetura

- **Biblioteca:** `@lumes/analytics` (reutilizável)
- **Adapter Pattern:** Fácil trocar CSV → API
- **Agregação:** Automática para CSVs segmentados
- **UTM Tracking:** Cookie first-touch (7 dias)
- **Design:** Paleta Seyune (terracota, verde, creme)

### Stack

- Next.js 16 (App Router)
- Recharts (gráficos)
- Tailwind CSS (styling)
- Anthropic API (análise IA opcional)

---

**Última atualização:** 2025-11-12
**Versão Dashboard:** 1.3.0 (com filtros inteligentes + suporte OpenAI)
