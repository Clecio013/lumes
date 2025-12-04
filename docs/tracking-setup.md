# Guia Completo de Configuração de Tracking

Este guia vai te orientar passo a passo na configuração do Google Tag Manager (GTM), Google Analytics 4 (GA4) e Meta Pixel para o site Seyune.

---

## 📋 Índice

1. [Google Tag Manager (GTM)](#1-google-tag-manager-gtm)
2. [Google Analytics 4 (GA4)](#2-google-analytics-4-ga4)
3. [Meta Pixel (Facebook)](#3-meta-pixel-facebook)
4. [Configuração do .env.local](#4-configuração-do-envlocal)
5. [Testando o Tracking](#5-testando-o-tracking)
6. [Eventos Configurados](#6-eventos-configurados)

---

## 1. Google Tag Manager (GTM)

### Por que usar GTM?
O GTM centraliza todos os seus scripts de tracking e permite adicionar/modificar tags sem alterar código.

### Passo a Passo:

#### 1.1. Criar conta no GTM
1. Acesse: https://tagmanager.google.com/
2. Clique em "Criar conta"
3. Preencha:
   - **Nome da conta**: Seyune
   - **País**: Brasil
   - **Nome do contêiner**: seyune.com.br
   - **Plataforma de destino**: Web
4. Aceite os termos e clique em "Criar"

#### 1.2. Obter o ID do GTM
Após criar, você verá uma tela com o código GTM. O ID tem formato: **GTM-XXXXXXX**

📝 **Anote esse ID** - você vai precisar dele no arquivo `.env.local`

#### 1.3. Configurar Tags Básicas no GTM (Opcional)
Você pode adicionar o GA4 e Meta Pixel via GTM também. Vou te mostrar como fazer isso nas seções específicas.

---

## 2. Google Analytics 4 (GA4)

### Opção A: Instalação Direta (Recomendado para começar)

#### 2.1. Criar propriedade GA4
1. Acesse: https://analytics.google.com/
2. Clique em "Administrador" (ícone de engrenagem no canto inferior esquerdo)
3. Na coluna "Conta", clique em "Criar conta"
4. Preencha:
   - **Nome da conta**: Seyune
   - **País**: Brasil
5. Clique em "Avançar"
6. Configure a propriedade:
   - **Nome da propriedade**: Seyune Website
   - **Fuso horário**: (GMT-03:00) Brasília
   - **Moeda**: Real brasileiro (BRL)
7. Clique em "Avançar"
8. Preencha os detalhes da empresa
9. Clique em "Criar"

#### 2.2. Obter o ID do GA4
1. Após criar, vá em "Administrador" > "Fluxos de dados"
2. Clique em "Adicionar fluxo" > "Web"
3. Preencha:
   - **URL do website**: https://seyune.com.br
   - **Nome do fluxo**: Seyune Production
4. Clique em "Criar fluxo"
5. Você verá o **ID de medição** no formato: **G-XXXXXXXXXX**

📝 **Anote esse ID** - você vai precisar dele no arquivo `.env.local`

### Opção B: Instalação via GTM (Avançado)

Se preferir gerenciar tudo pelo GTM:

1. No GTM, vá em "Tags" > "Nova"
2. Nome da tag: "GA4 - Todas as páginas"
3. Configuração da tag:
   - Tipo: Google Analytics: Google Analytics 4
   - ID de medição: Cole o ID do GA4 (G-XXXXXXXXXX)
4. Acionamento: All Pages
5. Salve e publique

---

## 3. Meta Pixel (Facebook)

### 3.1. Criar o Meta Pixel
1. Acesse: https://business.facebook.com/
2. Vá em "Eventos" no menu lateral
3. Clique em "Conectar fontes de dados" > "Web" > "Meta Pixel"
4. Clique em "Começar"
5. Dê um nome: "Seyune Website"
6. Opcional: adicione a URL do site (https://seyune.com.br)
7. Clique em "Criar Pixel"

### 3.2. Obter o ID do Pixel
1. Após criar, você verá as instruções de instalação
2. Escolha "Instalar código manualmente"
3. O ID do Pixel está no código, é um número longo (ex: **123456789012345**)
4. Procure por `fbq('init', 'SEU_ID_AQUI');`

📝 **Anote esse ID** - você vai precisar dele no arquivo `.env.local`

### 3.3. Testar o Pixel
1. Instale a extensão "Meta Pixel Helper" no Chrome: https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc
2. Depois de adicionar o ID no .env.local e rodar o site, a extensão mostrará se o pixel está ativo

---

## 4. Configuração do .env.local

Agora que você tem todos os IDs, crie/atualize o arquivo `.env.local` na raiz do projeto:

```bash
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# WhatsApp (já configurado)
NEXT_PUBLIC_WHATSAPP_NUMBER=5511975171391
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Vi o site e me identifiquei muito com a proposta da nutrição comportamental. Gostaria de agendar uma consulta!

# Site Info (já configurado)
NEXT_PUBLIC_SITE_URL=https://seyune.com.br
NEXT_PUBLIC_SITE_NAME=Seyune - Nutrição Comportamental
NEXT_PUBLIC_SITE_DESCRIPTION=Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.

# Instagram (já configurado)
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/seyune
```

**⚠️ IMPORTANTE:**
- Substitua `GTM-XXXXXXX` pelo seu ID do GTM
- Substitua `G-XXXXXXXXXX` pelo seu ID do GA4
- Substitua `123456789012345` pelo seu ID do Meta Pixel
- Se não tiver algum deles ainda, pode deixar em branco que o componente não vai carregar

---

## 5. Testando o Tracking

### 5.1. Reiniciar o servidor de desenvolvimento
```bash
pnpm dev
```

### 5.2. Verificar GTM
1. Abra o site no navegador
2. Abra o DevTools (F12)
3. Vá na aba "Console"
4. Digite: `dataLayer`
5. Você deve ver um array com dados

### 5.3. Verificar GA4
1. No Google Analytics, vá em "Relatórios" > "Tempo real"
2. Abra o site em outra aba
3. Você deve ver sua visita em tempo real

### 5.4. Verificar Meta Pixel
1. Instale a extensão "Meta Pixel Helper"
2. Abra o site
3. Clique no ícone da extensão
4. Deve mostrar que o pixel foi encontrado e está ativo (verde)

### 5.5. Testar eventos de conversão
1. Clique em um dos botões "Agende sua consulta"
2. No DevTools, aba Console, você deve ver eventos sendo disparados
3. No GA4 (Tempo real > Eventos), você deve ver eventos como:
   - `whatsapp_click`
   - `schedule_consultation`

---

## 6. Eventos Configurados

O site já está configurado para rastrear os seguintes eventos automaticamente:

### Eventos Automáticos
- **PageView**: Toda vez que uma página é carregada

### Eventos de Conversão
- **schedule_consultation**: Quando clicam em "Agende sua consulta"
  - Locais rastreados:
    - Hero (topo da página)
    - CTA Final
    - Header scroll

### Eventos de Engajamento
- **whatsapp_click**: Quando clicam em qualquer CTA do WhatsApp
  - Locais rastreados:
    - Hero
    - Transformação Seyune
    - Quem é Seyune
    - Depoimentos
    - CTA Final
    - Header scroll

- **faq_open**: Quando abrem uma pergunta no FAQ

---

## 📊 Próximos Passos

### Depois de configurar tudo:

1. **Deixe o tracking rodando por 7-14 dias** para coletar dados
2. **Configure conversões no Google Ads** (se for usar anúncios)
3. **Configure eventos de conversão no Meta Ads** (se for usar anúncios no Instagram/Facebook)
4. **Monitore os relatórios semanalmente** para entender o comportamento dos visitantes

### Métricas importantes para acompanhar:
- Número de visitantes únicos
- Taxa de cliques nos CTAs (especialmente "Agende sua consulta")
- Tempo médio na página
- Taxa de rejeição
- Origem do tráfego (Instagram, Google, direto, etc.)

---

## 🆘 Problemas Comuns

### "Não vejo dados no GA4"
- Aguarde 24-48h (GA4 pode ter delay)
- Verifique se o ID está correto no .env.local
- Certifique-se que reiniciou o servidor após adicionar as variáveis

### "Meta Pixel Helper mostra erro"
- Verifique se o ID está correto
- Limpe o cache do navegador
- Verifique se não tem bloqueadores de ads/tracking ativos

### "GTM não está carregando"
- Verifique o formato do ID (deve ser GTM-XXXXXXX)
- Verifique no DevTools > Network se o script do GTM está carregando
- Publique o container no GTM (botão "Enviar" no canto superior direito)

---

## 📞 Suporte

Se tiver dúvidas durante a configuração:
1. Revise este guia
2. Verifique a documentação oficial:
   - GTM: https://support.google.com/tagmanager
   - GA4: https://support.google.com/analytics
   - Meta Pixel: https://www.facebook.com/business/help/952192354843755

---

**Última atualização:** Novembro 2025
