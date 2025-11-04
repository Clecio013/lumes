# Guia de SEO & AEO - Seyune

## 📊 Status da Implementação

### ✅ Implementado

#### 1. Dados Estruturados (Schema.org)
- ✅ **Organization** - Marca Seyune com logo, redes sociais e contato
- ✅ **Person** - Seyune como profissional (nutricionista)
- ✅ **ProfessionalService** - Serviço de consultoria nutricional
- ✅ **FAQPage** - 6 perguntas frequentes estruturadas
- ✅ **HowTo** - Processo "Como Funciona" em 3 etapas
- ✅ **WebPage** - Informações da página com breadcrumb

**Arquivos:** `/src/components/schema/structured-data.tsx`, `/src/app/consulta/page.tsx:38-44`

#### 2. Meta Tags Avançadas
- ✅ **Meta robots**: index, follow
- ✅ **Google Bot**: Configurações otimizadas
- ✅ **Open Graph**: Para compartilhamento no Facebook/WhatsApp
- ✅ **Twitter Cards**: Para compartilhamento no Twitter/X
- ✅ **Canonical URL**: URLs canônicas configuradas
- ✅ **Keywords**: 10 palavras-chave relevantes
- ✅ **Authors/Creator**: Metadados de autoria

**Arquivo:** `/src/app/layout.tsx:30-99`

#### 3. Robots.txt e Sitemap
- ✅ **robots.txt**: Regras de indexação + AI crawlers permitidos
- ✅ **sitemap.xml**: Sitemap dinâmico com todas as páginas
- ✅ **AI Crawlers**: GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, PerplexityBot, CCBot

**Arquivos:** `/src/app/robots.ts`, `/src/app/sitemap.ts`

#### 4. Estrutura de Conteúdo
- ✅ Linguagem natural e conversacional
- ✅ Headings organizados (H1, H2, H3)
- ✅ FAQ com perguntas diretas e respostas claras
- ✅ Conteúdo original (história pessoal da Seyune)
- ✅ Seção "Como Funciona" estruturada em etapas

---

## 🚀 Próximos Passos (Após Deploy)

### 1. Verificação e Submissão

#### Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione a propriedade: `https://seyune.com.br`
3. Verifique a propriedade (método: Tag HTML ou DNS)
4. Submeta o sitemap: `https://seyune.com.br/sitemap.xml`
5. Monitore indexação e performance

**Como adicionar código de verificação:**
- Copie o código de verificação do Google Search Console
- Adicione em `/src/app/layout.tsx:94`:
```typescript
verification: {
  google: 'seu-codigo-aqui',
},
```

#### Bing Webmaster Tools
1. Acesse: https://www.bing.com/webmasters
2. Adicione o site: `https://seyune.com.br`
3. Verifique (pode importar do Google Search Console)
4. Submeta o sitemap: `https://seyune.com.br/sitemap.xml`
5. **IMPORTANTE**: Bing alimenta ChatGPT e Copilot!

**Como adicionar código de verificação:**
- Adicione em `/src/app/layout.tsx:96`:
```typescript
verification: {
  google: 'codigo-google',
  yandex: 'codigo-bing',
},
```

### 2. Validação dos Schemas

#### Google Rich Results Test
1. Acesse: https://search.google.com/test/rich-results
2. Cole a URL: `https://seyune.com.br/consulta`
3. Verifique se todos os schemas estão válidos
4. Corrija erros, se houver

#### Schema Markup Validator
1. Acesse: https://validator.schema.org/
2. Cole a URL: `https://seyune.com.br/consulta`
3. Valide cada schema individual
4. Verifique se não há warnings

### 3. Testar Indexação de IA

#### Perplexity.ai
1. Acesse: https://www.perplexity.ai
2. Busque: "Seyune nutrição comportamental"
3. Verifique se o site aparece nas fontes citadas
4. Teste variações: "nutricionista comportamental online Brasil"

#### ChatGPT (após algumas semanas)
1. Pergunte: "Você conhece a Seyune, nutricionista comportamental?"
2. Veja se menciona o site e informações corretas
3. Monitore ao longo do tempo

### 4. Criar Autoridade Semântica

#### Publicar em Múltiplos Canais
- [ ] **Medium**: Artigo sobre nutrição comportamental linkando para o site
- [ ] **LinkedIn Articles**: Post sobre a metodologia da Seyune
- [ ] **Dev.to** (se aplicável): Artigos técnicos sobre saúde
- [ ] **Fórum de Nutrição**: Participar de discussões mencionando o site

#### Backlinks de Qualidade
- [ ] Buscar parcerias com blogs de saúde/bem-estar
- [ ] Guest posts em sites de nutrição
- [ ] Diretórios profissionais de nutricionistas
- [ ] Parcerias com influenciadores da área

#### Consistência de Marca
Usar sempre:
- **Nome**: Seyune
- **Título**: Nutricionista Comportamental
- **Bio**: "Ajudando mulheres a transformarem sua relação com a comida através da nutrição comportamental"
- **Link**: https://seyune.com.br/consulta

---

## 📈 Monitoramento e Otimização

### KPIs de SEO

#### Google Search Console
- Impressões (quantas vezes o site apareceu nos resultados)
- Cliques (quantas vezes clicaram)
- CTR (taxa de cliques)
- Posição média (ranking nas buscas)
- Palavras-chave que trazem tráfego

#### Bing Webmaster Tools
- Mesmas métricas do Google
- **Importante**: Monitorar também aqui pois alimenta ChatGPT

### KPIs de AEO (Answer Engine Optimization)

#### Citações em IA
- Quantas vezes o site é citado em respostas de IAs
- Contexto das citações (positivo/negativo)
- Precisão das informações mencionadas

#### Ferramentas
- **Perplexity.ai**: Buscar "Seyune" mensalmente
- **ChatGPT**: Perguntar sobre nutrição comportamental
- **Google Bard/Gemini**: Verificar se aparece nas respostas

### Análise de Conteúdo

#### Tópicos que Performam Bem
- Monitorar quais seções da página geram mais engajamento
- Usar Google Analytics + Search Console para identificar
- Criar mais conteúdo sobre esses tópicos

#### Palavras-chave em Ascensão
- Identificar novas palavras-chave relacionadas
- Criar conteúdo específico para essas buscas
- Atualizar schemas e meta descriptions

---

## 🎯 Estratégias Avançadas (Futuro)

### 1. Blog de Conteúdo
Criar blog em `/blog` com:
- Artigos sobre nutrição comportamental
- Dicas práticas de alimentação saudável
- Histórias de transformação (com permissão)
- Cada artigo com schema Article + FAQ próprio

### 2. Páginas de Serviço Específicas
- `/nutricao-esportiva` - Para atletas
- `/grupos` - Consultas em grupo
- `/emagrecimento` - Foco específico
- Cada uma com schemas específicos

### 3. Vídeos e Conteúdo Multimídia
- Criar vídeos curtos (YouTube Shorts, Reels)
- Adicionar VideoObject schema
- Transcrições para SEO

### 4. Ferramentas Interativas
- Calculadora de IMC
- Quiz de perfil alimentar
- Avaliação gratuita online
- Schemas para WebApplication

---

## 🔧 Manutenção Regular

### Mensal
- [ ] Verificar posições no Google Search Console
- [ ] Revisar erros de indexação
- [ ] Testar schemas com Rich Results Test
- [ ] Verificar citações em Perplexity.ai

### Trimestral
- [ ] Atualizar palavras-chave baseado em performance
- [ ] Revisar e atualizar schemas (novos serviços?)
- [ ] Analisar concorrentes no Google
- [ ] Criar novo conteúdo baseado em dados

### Anual
- [ ] Auditoria completa de SEO
- [ ] Revisar estratégia de conteúdo
- [ ] Avaliar necessidade de novos schemas
- [ ] Revisar backlinks e autoridade de domínio

---

## 📚 Recursos Úteis

### Ferramentas de Validação
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

### Ferramentas de Análise
- Google Analytics: https://analytics.google.com
- Ubersuggest: https://neilpatel.com/br/ubersuggest/
- Ahrefs (pago): https://ahrefs.com
- SEMrush (pago): https://www.semrush.com

### Documentação
- Schema.org: https://schema.org
- Google Search Central: https://developers.google.com/search
- MDN Web Docs: https://developer.mozilla.org

---

## ✅ Checklist de Deploy

Antes de fazer deploy para produção:

- [x] Schemas criados e validados
- [x] Meta tags configuradas
- [x] Robots.txt com AI crawlers
- [x] Sitemap.xml dinâmico
- [x] Canonical URLs configuradas
- [ ] Build sem erros (`npm run build`)
- [ ] Testar em localhost:3000
- [ ] Fazer deploy para Vercel
- [ ] Aguardar propagação DNS
- [ ] Testar URLs públicas
- [ ] Submeter ao Google Search Console
- [ ] Submeter ao Bing Webmaster Tools
- [ ] Validar schemas com Rich Results Test
- [ ] Verificar robots.txt: `https://seyune.com.br/robots.txt`
- [ ] Verificar sitemap: `https://seyune.com.br/sitemap.xml`

---

**Última atualização:** 2025-11-04
**Versão:** 1.0
