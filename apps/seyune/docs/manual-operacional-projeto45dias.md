# Manual Operacional - Projeto 45 Graus

**Versão:** 1.0
**Data:** Novembro 2025
**Para:** Seyune (Nutricionista) & Amauri (Personal Trainer)

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Fluxo de Compra](#fluxo-de-compra)
3. [Gestão de Vendas (Google Sheets)](#gestão-de-vendas-google-sheets)
4. [Comunicação com Clientes](#comunicação-com-clientes)
5. [Agendamento de Consultas](#agendamento-de-consultas)
6. [Entrega dos Planos](#entrega-dos-planos)
7. [Grupo VIP WhatsApp](#grupo-vip-whatsapp)
8. [Splits de Pagamento](#splits-de-pagamento)
9. [Troubleshooting](#troubleshooting)
10. [Checklist Semanal](#checklist-semanal)

---

## Visão Geral

O **Projeto 45 Graus** é um programa de 45 dias que combina nutrição comportamental e treino personalizado. Cada cliente recebe:

- ✅ Consulta individual 30min com Seyune (Nutricionista)
- ✅ Consulta individual 30min com Amauri (Personal Trainer)
- ✅ Plano alimentar 100% personalizado
- ✅ Planilha de treino individualizada para 45 dias
- ✅ Acesso aos apps WebDiet e MFit Personal
- ✅ Grupo VIP WhatsApp com suporte direto
- ✅ Materiais exclusivos de nutrição e treino
- ✅ Acompanhamento durante todo o desafio

**Início do Programa:** 15 de Dezembro de 2025

**Sistema de Lotes:**
- 4 lotes, cada um com 25 vagas
- Preço aumenta R$50 a cada lote
- Total máximo: 100 clientes

---

## Fluxo de Compra

### 1. Cliente acessa a landing page
**URL:** https://seyune.com/projeto45dias

### 2. Cliente clica em "Garantir Minha Vaga"
- Modal de captura de email aparece
- Cliente insere email
- Sistema cria checkout Mercado Pago
- Redireciona para pagamento

### 3. Cliente paga via Mercado Pago
- Cartão de crédito (até 12x)
- Pix (à vista)
- Boleto bancário

### 4. Após pagamento aprovado (AUTOMÁTICO):
✅ Vaga do lote é decrementada
✅ Dados salvos no Google Sheets
✅ Email de confirmação enviado para o cliente

### 5. Cliente é redirecionado para página de obrigado
**URL:** https://seyune.com/projeto45dias/obrigado

**Conteúdo:**
- Confirmação de compra
- Link para grupo VIP WhatsApp
- Instruções para aguardar contato
- Modal (após 3 segundos) pedindo data de nascimento e telefone

### 6. Cliente completa dados adicionais
- Data de nascimento
- Telefone/WhatsApp
- Dados salvos automaticamente no Google Sheets

---

## Gestão de Vendas (Google Sheets)

### Acessar a Planilha

**URL:** [Link fornecido separadamente por segurança]

**Permissões:**
- Seyune: Editor
- Amauri: Editor
- Lumes (Clecio): Proprietário

### Colunas da Planilha

| Coluna | Descrição | Preenchimento |
|--------|-----------|---------------|
| **Data** | Data/hora da compra | Automático |
| **Nome** | Nome completo do cliente | Automático (Mercado Pago) |
| **Email** | Email do cliente | Automático (Mercado Pago) |
| **CPF** | CPF do cliente | Automático (Mercado Pago) |
| **Telefone** | Telefone/WhatsApp | Semi-automático (modal obrigado) |
| **Nascimento** | Data de nascimento | Semi-automático (modal obrigado) |
| **Lote** | Qual lote comprou (1°, 2°, 3°, 4°) | Automático |
| **Preço Total** | Valor pago | Automático |
| **Lumes (20%)** | Split Lumes | Automático |
| **Amauri (40%)** | Split Amauri | Automático |
| **Seyune (40%)** | Split Seyune | Automático |
| **Status** | Status do pagamento | Automático (approved) |
| **WebDiet?** | Cliente tem acesso WebDiet? | Manual (Seyune) |
| **MFit?** | Cliente tem acesso MFit? | Manual (Amauri) |
| **ID MP** | ID do pagamento Mercado Pago | Automático |
| **Link** | Link direto para pagamento | Automático |

### Campos Manuais

**Seyune deve atualizar:**
- ✏️ `WebDiet?` - Marcar "Sim" após dar acesso ao app

**Amauri deve atualizar:**
- ✏️ `MFit?` - Marcar "Sim" após dar acesso ao app

### Exportar Dados

Para exportar lista de clientes:
1. Clicar em **Arquivo** > **Fazer download** > **CSV**
2. Abrir no Excel ou Google Sheets local
3. Filtrar/ordenar conforme necessário

---

## Comunicação com Clientes

### Email de Confirmação (AUTOMÁTICO)

**Enviado por:** noreply@seyune.com (via Resend)
**Assunto:** ✅ Sua vaga está garantida no Projeto 45 Graus!

**Conteúdo:**
1. Boas-vindas personalizadas
2. Confirmação de pagamento e lote
3. Data de início (15/12/2025)
4. Link para completar dados
5. Link para grupo VIP WhatsApp
6. Instruções para aguardar contato

**⚠️ IMPORTANTE:** Se cliente não receber email em 10 minutos:
- Verificar caixa de spam
- Verificar se email está correto na planilha
- Reenviar manualmente se necessário (copiar conteúdo do template)

### Primeiro Contato Manual (VIA WHATSAPP)

**Prazo:** Até 48h após a compra

**Template sugerido:**

```
Olá [Nome]! 👋

Tudo bem? Aqui é [Seyune/Amauri] do Projeto 45 Graus!

Seja muito bem-vindo(a)! 🎉

Já vi que sua vaga está confirmada no [X° Lote].

Agora vamos agendar nossa consulta individual de 30 minutos.

Qual desses horários funciona melhor para você?

Opção 1: [dia] às [hora]
Opção 2: [dia] às [hora]
Opção 3: [dia] às [hora]

Caso nenhum funcione, me manda teus horários disponíveis que a gente se ajusta! 😊

Qualquer dúvida, pode me chamar aqui mesmo!

Abraço,
[Seyune/Amauri]
```

---

## Agendamento de Consultas

### Consulta com Seyune (Nutricionista)

**Duração:** 30 minutos
**Plataforma:** Google Meet ou WhatsApp Vídeo
**Objetivo:** Entender rotina, objetivos, preferências alimentares, histórico

**Checklist da Consulta:**
- [ ] Apresentação e boas-vindas
- [ ] Entender objetivo principal (emagrecimento, ganho de massa, performance)
- [ ] Mapear rotina (horários, trabalho, estudos)
- [ ] Identificar preferências e restrições alimentares
- [ ] Entender relação emocional com comida
- [ ] Explicar abordagem comportamental
- [ ] Alinhar expectativas para os 45 dias
- [ ] Informar prazo de entrega do plano (até 7 dias)

**Após a consulta:**
1. Anotar informações relevantes (planilha pessoal ou app)
2. Montar plano alimentar personalizado
3. Enviar plano por email em até 7 dias
4. Dar acesso ao WebDiet
5. Atualizar planilha (`WebDiet?` = Sim)

### Consulta com Amauri (Personal Trainer)

**Duração:** 30 minutos
**Plataforma:** Google Meet ou WhatsApp Vídeo
**Objetivo:** Avaliar condicionamento, disponibilidade, equipamentos

**Checklist da Consulta:**
- [ ] Apresentação e boas-vindas
- [ ] Entender experiência com treino
- [ ] Identificar lesões ou limitações físicas
- [ ] Mapear disponibilidade (quantos dias/semana treina)
- [ ] Equipamentos disponíveis (academia, casa, parque)
- [ ] Objetivo principal (estética, performance, saúde)
- [ ] Explicar metodologia do treino
- [ ] Alinhar expectativas para os 45 dias
- [ ] Informar prazo de entrega da planilha (até 7 dias)

**Após a consulta:**
1. Anotar informações relevantes (planilha pessoal ou app)
2. Montar planilha de treino personalizada para 45 dias
3. Enviar planilha por email em até 7 dias
4. Dar acesso ao MFit Personal
5. Atualizar planilha (`MFit?` = Sim)

---

## Entrega dos Planos

### Plano Alimentar (Seyune)

**Formato:** PDF via email
**Prazo:** Até 7 dias após consulta
**Conteúdo mínimo:**
- Introdução personalizada
- Objetivos claros
- Plano de refeições para 45 dias (ou template semanal)
- Lista de compras
- Dicas comportamentais
- Instruções de acesso ao WebDiet

**Template de Email:**

```
Assunto: Seu Plano Alimentar - Projeto 45 Graus 🥗

Olá [Nome]!

Conforme prometido, segue anexo seu plano alimentar personalizado!

Nele você vai encontrar:
✅ Seu plano de refeições adaptado à sua rotina
✅ Lista de compras
✅ Dicas práticas para os próximos 45 dias

Também liberamos seu acesso ao app WebDiet:
📱 [Link/Instruções]

Qualquer dúvida, pode me chamar no grupo VIP ou aqui no direct!

Vamos juntas nessa jornada! 💪

Abraço,
Seyune
```

### Planilha de Treino (Amauri)

**Formato:** PDF ou Excel via email
**Prazo:** Até 7 dias após consulta
**Conteúdo mínimo:**
- Introdução personalizada
- Periodização dos 45 dias (se aplicável)
- Divisão de treino (ABC, ABCD, Full Body, etc.)
- Exercícios detalhados (séries, repetições, descanso)
- Progressão de carga
- Instruções de acesso ao MFit Personal

**Template de Email:**

```
Assunto: Sua Planilha de Treino - Projeto 45 Graus 💪

E aí [Nome]!

Conforme combinado, segue anexa sua planilha de treino personalizada!

Nela você vai encontrar:
✅ Divisão de treino adaptada à sua rotina
✅ Exercícios detalhados com séries e repetições
✅ Instruções de progressão para os 45 dias

Também liberamos seu acesso ao app MFit Personal:
📱 [Link/Instruções]

Qualquer dúvida sobre execução ou adaptação, me chama no grupo VIP!

Bora pra cima! 🔥

Abraço,
Amauri
```

---

## Grupo VIP WhatsApp

### Configuração do Grupo

**Nome sugerido:** 🔥 Projeto 45 Graus - Turma [Mês/Ano]
**Descrição:**

```
Bem-vindos ao grupo VIP do Projeto 45 Graus! 🎉

Este é o espaço para:
✅ Tirar dúvidas sobre treino e alimentação
✅ Compartilhar progresso e conquistas
✅ Receber suporte direto da Seyune e Amauri
✅ Trocar experiências com a turma

Regras:
📌 Respeito sempre
📌 Evitar conversas paralelas (criar grupo externo se quiser)
📌 Dúvidas sobre planos individuais: chamar no privado

Início oficial: 15 de Dezembro
Duração: 45 dias

Vamos juntos! 💪🥗
```

**Admins:**
- Seyune
- Amauri
- Lumes (Clecio) - opcional

### Gestão do Grupo

**Adicionar novos membros:**
1. Cliente compra e recebe link de convite no email
2. Cliente clica e entra automaticamente
3. Caso link não funcione, adicionar manualmente via número de telefone da planilha

**Boas-vindas:**

```
Olá [Nome]! 👋

Seja muito bem-vindo(a) ao grupo! 🎉

Já estamos te aguardando para agendar sua consulta. Te chamamos no direct em breve!

Qualquer dúvida, pode perguntar aqui mesmo. Estamos juntos nessa jornada! 💪
```

**Conteúdo Regular:**
- Posts motivacionais (2-3x/semana)
- Dicas rápidas de nutrição (Seyune)
- Dicas de execução de exercícios (Amauri)
- Lembretes de marcos (Semana 1, Semana 2, etc.)
- Comemoração de pequenas vitórias

---

## Splits de Pagamento

### Distribuição Automática

Cada venda é automaticamente dividida:

- **20% Lumes** (Clecio - infraestrutura, ads, suporte técnico)
- **40% Amauri** (Personal Trainer)
- **40% Seyune** (Nutricionista)

**Exemplo:**
- Venda de R$ 347,00:
  - Lumes: R$ 69,40
  - Amauri: R$ 138,80
  - Seyune: R$ 138,80

### Pagamento Manual

**⚠️ IMPORTANTE:** O split é calculado automaticamente na planilha, mas o pagamento é MANUAL.

**Responsável pelo repasse:** Lumes (Clecio)

**Frequência:** Semanal ou Quinzenal (a definir)

**Método:**
- Pix ou Transferência bancária
- Baseado nos valores da planilha

**Processo:**
1. Clecio recebe pagamentos no Mercado Pago
2. Calcula totais por profissional (soma da coluna)
3. Realiza transferências
4. Envia comprovante via WhatsApp

---

## Troubleshooting

### Cliente não recebeu email de confirmação

**Causa:** Email na caixa de spam, erro de digitação, delay do servidor

**Solução:**
1. Verificar planilha Google Sheets (email correto?)
2. Pedir cliente verificar spam/lixo eletrônico
3. Se não encontrar, reenviar manualmente:
   - Copiar conteúdo do template de email (arquivo separado)
   - Enviar via seu email pessoal ou WhatsApp

### Cliente não consegue entrar no grupo WhatsApp

**Causa:** Link expirado, número privado, problema no WhatsApp

**Solução:**
1. Gerar novo link de convite e enviar
2. Se não funcionar, adicionar manualmente via telefone da planilha
3. Se número está privado, pedir cliente mudar configuração

### Cliente quer cancelar (primeiros 7 dias)

**Causa:** Garantia de 7 dias

**Solução:**
1. Entender motivo (tentar reverter se possível)
2. Se insistir, aceitar e processar:
   - Avisar Clecio via WhatsApp
   - Clecio processa estorno no Mercado Pago
   - Remover cliente do grupo VIP
   - Marcar na planilha (coluna Status: "Cancelado")

### Cliente quer trocar de lote

**Causa:** Cliente comprou lote mais caro e quer desconto

**Solução:**
- **NÃO é possível.** Explicar que lotes são por ordem de chegada e o preço é fixo por lote.
- Política clara de "primeiro a comprar, melhor preço"

### Pagamento pendente (Pix/Boleto não confirmado)

**Causa:** Cliente não completou pagamento

**Solução:**
1. Verificar status na planilha (Status: "pending")
2. Entrar em contato via WhatsApp
3. Lembrar que vaga só é garantida após confirmação de pagamento
4. Se cliente desistir, vaga volta ao pool

---

## Checklist Semanal

### Seyune

**Segunda-feira:**
- [ ] Revisar novos clientes da semana anterior
- [ ] Agendar consultas individuais
- [ ] Responder dúvidas do grupo VIP

**Quarta-feira:**
- [ ] Enviar planos alimentares pendentes
- [ ] Atualizar planilha (WebDiet?)
- [ ] Postar dica de nutrição no grupo

**Sexta-feira:**
- [ ] Verificar pendências (consultas, planos)
- [ ] Responder direct/grupo
- [ ] Planejar conteúdo da próxima semana

### Amauri

**Segunda-feira:**
- [ ] Revisar novos clientes da semana anterior
- [ ] Agendar consultas individuais
- [ ] Responder dúvidas do grupo VIP

**Quarta-feira:**
- [ ] Enviar planilhas de treino pendentes
- [ ] Atualizar planilha (MFit?)
- [ ] Postar dica de treino no grupo

**Sexta-feira:**
- [ ] Verificar pendências (consultas, planilhas)
- [ ] Responder direct/grupo
- [ ] Gravar vídeo de execução se necessário

### Lumes (Clecio)

**Segunda-feira:**
- [ ] Monitorar campanhas de ads
- [ ] Verificar taxa de conversão
- [ ] Conferir erros técnicos

**Quinta-feira:**
- [ ] Calcular repasses (Seyune + Amauri)
- [ ] Realizar transferências
- [ ] Enviar comprovantes

**Domingo:**
- [ ] Relatório semanal (vendas, vagas restantes, próximo lote)
- [ ] Ajustar orçamento de ads se necessário

---

## Dúvidas ou Problemas?

**Suporte Técnico (site, pagamentos, planilha):**
- WhatsApp: Clecio (Lumes)

**Suporte Clientes (dúvidas sobre programa):**
- Nutrição: Seyune
- Treino: Amauri

---

**Última atualização:** Novembro 2025
**Versão:** 1.0
