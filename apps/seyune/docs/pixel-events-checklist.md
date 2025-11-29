# Checklist de Validação: Meta Pixel e Eventos de Conversão

## Visão Geral

Este documento contém um checklist completo para validar que o Meta Pixel está instalado corretamente e rastreando todos os eventos necessários para as campanhas de conversão da Seyune.

**CRÍTICO:** Campanhas de conversão (objetivo: Vendas/Conversões) **NÃO funcionam corretamente** sem Pixel configurado e eventos rastreados.

---

## Pré-Requisitos

- [ ] Meta Business Manager criado (business.facebook.com)
- [ ] Pixel criado e ID do Pixel conhecido
- [ ] Acesso ao código-fonte do site seyune.com.br
- [ ] Acesso ao Meta Events Manager

---

## Eventos Obrigatórios para Campanha Seyune

Para a campanha de consultas individuais, você **precisa** rastrear:

| Evento | Quando dispara | Prioridade | Uso |
|--------|----------------|------------|-----|
| **PageView** | Toda vez que uma página carrega | 🔴 Crítico | Rastrear visitas, criar públicos de retargeting |
| **ViewContent** | Quando usuário visualiza seção importante | 🟡 Importante | Rastrear engajamento, otimizar público |
| **Lead** ou **Contact** | Quando usuário clica no botão WhatsApp | 🔴 CRÍTICO | Evento de conversão principal da campanha |
| **InitiateCheckout** (opcional) | Quando usuário interage com CTA | 🟢 Opcional | Micro-conversão, otimização adicional |

**Evento MAIS IMPORTANTE:** `Lead` ou `Contact` (clique WhatsApp)
- Sem ele, a campanha de conversão **não funciona**
- Meta não consegue otimizar para conversões
- Você não consegue medir ROI

---

## Passo 1: Verificar Instalação do Pixel Base

### Método 1: Meta Pixel Helper (Chrome Extension)

1. **Instalar extensão:**
   - Acesse: https://chrome.google.com/webstore
   - Busque: "Meta Pixel Helper"
   - Instale a extensão oficial da Meta

2. **Testar no site:**
   - Abra: https://seyune.com.br/consulta
   - Clique no ícone do Pixel Helper (canto superior direito do Chrome)
   - Deve aparecer:
     - ✅ Pixel encontrado (com ID do Pixel)
     - ✅ PageView disparado
   - Se aparecer ❌ "No pixels found":
     - Pixel não está instalado ou código está errado

### Método 2: Meta Events Manager (Test Events)

1. **Acessar Test Events:**
   - Acesse: https://business.facebook.com/events_manager2
   - Selecione o Pixel da Seyune
   - Clique em "Test Events" (lado esquerdo)

2. **Testar:**
   - **Opção A: Test Events (Browser)**
     - Copie o link que aparece (ex: `https://www.facebook.com/tr?id=XXXXX&ev=TestEvent`)
     - Cole em nova aba para ativar modo teste
   - **Opção B: Usar aba "Test events" diretamente**
     - Abra https://seyune.com.br/consulta em outra aba
     - Volte para Test Events
     - Deve aparecer evento `PageView` em tempo real

3. **Verificar:**
   - ✅ Evento PageView aparece
   - ✅ ID do Pixel correto
   - ✅ URL: seyune.com.br/consulta
   - ❌ Se nada aparecer: Pixel não instalado ou bloqueado

---

## Passo 2: Verificar Eventos Personalizados (Conversões)

### Eventos a Validar

#### 2.1. Evento: PageView

**Quando:** Carrega qualquer página do site
**Como testar:**
1. Abra Meta Events Manager → Test Events
2. Abra https://seyune.com.br/consulta
3. Verifique em Test Events:
   - ✅ Evento: `PageView`
   - ✅ Parâmetros mínimos: `content_name` (opcional)

**Código esperado (exemplo):**
```javascript
fbq('track', 'PageView');
```

---

#### 2.2. Evento: ViewContent

**Quando:** Usuário visualiza seção importante (ex: hero, benefícios)
**Como testar:**
1. Abra Meta Events Manager → Test Events
2. Abra https://seyune.com.br/consulta
3. **Navegue pela página** (scroll down)
4. Verifique em Test Events:
   - ✅ Evento: `ViewContent`
   - ✅ Parâmetros:
     - `content_name`: "Seção Benefícios" (exemplo)
     - `content_category`: "consulta" (opcional)

**Código esperado (exemplo):**
```javascript
fbq('track', 'ViewContent', {
  content_name: 'Seção Benefícios',
  content_category: 'consulta'
});
```

---

#### 2.3. Evento: Lead (CRÍTICO - Conversão Principal)

**Quando:** Usuário clica no botão WhatsApp
**Como testar:**
1. Abra Meta Events Manager → Test Events
2. Abra https://seyune.com.br/consulta
3. **Clique no botão "Falar no WhatsApp"** (qualquer CTA)
4. Verifique em Test Events:
   - ✅ Evento: `Lead` (ou `Contact`)
   - ✅ Parâmetros:
     - `content_name`: "CTA Hero" ou "CTA Footer" (identificar origem)
     - `value`: (opcional, pode ser valor médio da consulta)
     - `currency`: "BRL" (se usar value)

**Código esperado (exemplo):**
```javascript
// Ao clicar no botão WhatsApp
fbq('track', 'Lead', {
  content_name: 'CTA Hero WhatsApp',
  content_category: 'consulta',
  value: 200.00, // Valor médio da consulta (opcional)
  currency: 'BRL'
});
```

**IMPORTANTE:**
- Testar **TODOS** os botões WhatsApp da página:
  - CTA Hero (topo)
  - CTA meio da página
  - CTA final (antes do footer)
- Se algum botão NÃO disparar evento, corrigir código

---

#### 2.4. Evento: InitiateCheckout (Opcional)

**Quando:** Usuário clica em CTA secundário ou rola até seção de conversão
**Como testar:**
1. Abra Meta Events Manager → Test Events
2. Abra https://seyune.com.br/consulta
3. Role até seção "Agende sua Consulta" (CTA final)
4. Verifique em Test Events:
   - ✅ Evento: `InitiateCheckout`

**Código esperado (exemplo):**
```javascript
fbq('track', 'InitiateCheckout', {
  content_name: 'CTA Final',
  value: 200.00,
  currency: 'BRL'
});
```

---

## Passo 3: Validar Eventos no Meta Events Manager (Overview)

Após testar manualmente, valide que eventos estão sendo recebidos:

1. **Acessar Events Manager:**
   - https://business.facebook.com/events_manager2
   - Selecione Pixel da Seyune

2. **Visualizar Visão Geral:**
   - Clique em "Overview" (visão geral)
   - Verifique últimas 24h:
     - ✅ `PageView`: Deve ter eventos (se site teve visitas)
     - ✅ `Lead` ou `Contact`: Deve aparecer se alguém clicou WhatsApp

3. **Verificar Status do Evento de Conversão:**
   - Role até "Event Setup" (configuração de eventos)
   - Verifique evento `Lead`:
     - Status: ✅ Ativo (verde)
     - Se ❌ Inativo ou ⚠️ Aviso: corrigir

---

## Passo 4: Configurar Evento de Conversão na Campanha

Após validar que evento `Lead` está funcionando:

1. **Acessar Events Manager:**
   - https://business.facebook.com/events_manager2
   - Selecione Pixel da Seyune
   - Clique em "Aggregated Event Measurement" (lado esquerdo)

2. **Adicionar Evento à Lista (iOS 14+ requirement):**
   - Clique em "Configure Web Events"
   - Selecione domínio: `seyune.com.br`
   - Adicione eventos em ordem de prioridade:
     1. **Lead** (prioridade 1 - MAIS IMPORTANTE)
     2. ViewContent (prioridade 2)
     3. InitiateCheckout (prioridade 3)
     4. PageView (prioridade 4)

3. **Verificar Domínio:**
   - Domínio `seyune.com.br` deve estar verificado
   - Se não estiver: Meta Business Manager → Configurações → Domínios → Verificar

---

## Passo 5: Testar Conversão End-to-End (Jornada Completa)

Simule a jornada completa do usuário:

1. **Preparar Test Events:**
   - Meta Events Manager → Test Events
   - Deixe aberto em uma aba

2. **Simular Usuário Real:**
   - Abra https://seyune.com.br/consulta em aba anônima (Ctrl+Shift+N)
   - Aguarde 5 segundos (simular leitura)
   - Role a página até o meio
   - Aguarde 3 segundos
   - Clique em botão "Falar no WhatsApp"

3. **Verificar Eventos no Test Events:**
   - Volte para aba Test Events
   - Deve aparecer sequência:
     1. ✅ `PageView` (ao carregar)
     2. ✅ `ViewContent` (ao rolar - se configurado)
     3. ✅ `Lead` (ao clicar WhatsApp) ← **CRÍTICO**

4. **Verificar Detalhes do Evento Lead:**
   - Clique no evento `Lead` em Test Events
   - Verifique parâmetros:
     - ✅ `content_name`: identificado corretamente (ex: "CTA Hero")
     - ✅ `event_source_url`: https://seyune.com.br/consulta
     - ✅ `value` e `currency` (se configurado)

**SE TUDO ESTIVER ✅ → Pixel configurado corretamente! Pode lançar campanha.**

**SE ALGUM ❌ → Corrigir antes de lançar campanha.**

---

## Checklist Final de Validação

Use este checklist antes de lançar campanhas:

### Pixel Base
- [ ] Meta Pixel Helper (Chrome) detecta Pixel
- [ ] ID do Pixel está correto
- [ ] Pixel carrega em todas as páginas do site
- [ ] Nenhum erro no console do navegador (F12)

### Evento: PageView
- [ ] Dispara ao carregar página
- [ ] Aparece em Test Events
- [ ] Aparece em Events Manager (Overview - últimas 24h)

### Evento: ViewContent (Opcional mas Recomendado)
- [ ] Dispara ao rolar página
- [ ] Parâmetros `content_name` identificam seção
- [ ] Aparece em Test Events

### Evento: Lead (CRÍTICO - Conversão)
- [ ] Dispara ao clicar botão WhatsApp (TODOS os botões)
- [ ] Parâmetros identificam qual botão foi clicado
- [ ] Aparece em Test Events imediatamente após clique
- [ ] Aparece em Events Manager (Overview - últimas 24h)
- [ ] Evento `Lead` está na lista de Aggregated Event Measurement (prioridade 1)

### Domínio e Configurações
- [ ] Domínio `seyune.com.br` verificado no Business Manager
- [ ] Evento `Lead` configurado como conversão principal
- [ ] Nenhum aviso ou erro em Events Manager

### Teste End-to-End
- [ ] Simulação completa (PageView → ViewContent → Lead) funciona
- [ ] Teste em desktop e mobile (comportamento pode variar)
- [ ] Teste com ad blockers desativados (usuários reais podem ter)

---

## Troubleshooting: Problemas Comuns

### Problema 1: "No pixels found" no Pixel Helper

**Causas possíveis:**
- Pixel não instalado
- Código do Pixel em local errado (não no `<head>`)
- Ad blocker ativo bloqueando Pixel

**Solução:**
1. Verificar código-fonte da página (Ctrl+U)
2. Buscar por `fbq` (deve aparecer código do Pixel)
3. Verificar se está entre `<head>` e `</head>`
4. Desativar ad blockers e testar novamente

**Código esperado no `<head>`:**
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID_AQUI');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->
```

---

### Problema 2: PageView funciona, mas Lead não dispara

**Causas possíveis:**
- Evento `Lead` não configurado no clique do botão
- Botão redireciona antes de evento disparar (timing)
- JavaScript com erro bloqueando execução

**Solução:**

**Verificar se evento está no código do botão:**
```javascript
// Exemplo correto - aguarda evento disparar antes de redirecionar
document.querySelector('.btn-whatsapp').addEventListener('click', function(e) {
  e.preventDefault(); // Impede redirecionamento imediato

  // Disparar evento Pixel
  fbq('track', 'Lead', {
    content_name: 'CTA Hero WhatsApp'
  });

  // Aguardar 300ms e então redirecionar
  setTimeout(function() {
    window.open('https://wa.me/5511999999999?text=...', '_blank');
  }, 300);
});
```

**Ou usar callback do Pixel:**
```javascript
fbq('track', 'Lead', {
  content_name: 'CTA Hero WhatsApp'
}, function() {
  // Callback: redireciona após Pixel confirmar
  window.open('https://wa.me/5511999999999?text=...', '_blank');
});
```

---

### Problema 3: Eventos aparecem em Test Events mas não em Overview

**Causa:**
- Test Events mostra eventos em tempo real (incluindo você testando)
- Overview mostra dados agregados (pode ter delay de até 24h)

**Solução:**
- Aguardar 24-48h
- Se após 48h ainda não aparecer:
  - Verificar filtros de data em Overview
  - Verificar se Pixel está em modo "test" (desativar)

---

### Problema 4: "Pixel ativo mas eventos não otimizam campanha"

**Causa:**
- Evento de conversão não está em Aggregated Event Measurement
- Domínio não verificado (requisito iOS 14+)

**Solução:**
1. Meta Events Manager → Aggregated Event Measurement
2. Configure Web Events → Adicionar domínio
3. Adicionar evento `Lead` como prioridade 1
4. Verificar domínio em Business Settings

---

### Problema 5: "Eventos duplicados"

**Causa:**
- Pixel instalado duas vezes (código duplicado)
- Google Tag Manager + código manual (conflito)

**Solução:**
1. Verificar código-fonte (Ctrl+U)
2. Buscar por `fbq('init'` - deve aparecer **apenas 1 vez**
3. Se aparecer 2x, remover duplicata
4. Se usar GTM, remover código manual e deixar apenas GTM

---

## Ferramentas de Diagnóstico

### 1. Meta Pixel Helper (Chrome Extension)
- **URL:** https://chrome.google.com/webstore
- **Uso:** Detecta Pixel, eventos, erros em tempo real
- **Ideal para:** Desenvolvimento, debugging

### 2. Meta Events Manager (Test Events)
- **URL:** https://business.facebook.com/events_manager2
- **Uso:** Ver eventos em tempo real, debugar parâmetros
- **Ideal para:** Validar eventos antes de lançar campanha

### 3. Facebook Pixel Helper (versão web)
- **URL:** https://developers.facebook.com/docs/meta-pixel/get-started
- **Uso:** Documentação oficial, troubleshooting
- **Ideal para:** Entender conceitos, resolver problemas complexos

### 4. Console do Navegador (F12)
- **Uso:** Ver erros JavaScript, verificar se `fbq` está definido
- **Como usar:**
  - Abrir site (F12)
  - Aba "Console"
  - Digitar: `fbq` + Enter
  - Deve retornar: `function` (se Pixel carregado)
  - Se retornar `undefined`: Pixel não carregou

---

## Próximos Passos

Após validar todos os eventos:

1. ✅ **Marcar todos os itens do Checklist Final**
2. ✅ **Documentar IDs importantes:**
   - ID do Pixel: `__________________`
   - Evento de conversão principal: `Lead`
   - Domínio verificado: `seyune.com.br`

3. ✅ **Criar campanhas no Meta Ads** (usar `/docs/meta-ads-setup-guide.md`)

4. ✅ **Monitorar eventos após lançar:**
   - Primeiras 24h: verificar diariamente em Events Manager
   - Confirmar que conversões reais (não testes) aparecem
   - Ajustar se necessário

---

## Contato e Suporte

**Problemas técnicos com Pixel:**
- Meta Support: https://business.facebook.com/business/help
- Meta Developers: https://developers.facebook.com/support

**Problemas com código do site:**
- Revisar `/src/app/layout.tsx` (provável local do Pixel)
- Buscar por `fbq` no código-fonte
- Verificar se Google Tag Manager está gerenciando Pixel

---

**Última atualização:** 2025-11-10
**Versão:** 1.0

**Documentos relacionados:**
- `/docs/meta-ads-setup-guide.md` - Configurar campanhas
- `/docs/nomeclatura-campanha.md` - Nomenclatura padronizada
