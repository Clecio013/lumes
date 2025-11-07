import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ConfirmacaoCompraProps {
  nome: string;
  lote: string;
  preco: string;
  linkObrigado: string;
  linkWhatsApp: string;
}

export default function ConfirmacaoCompra({
  nome = 'Maria',
  lote = '1° Lote',
  preco = 'R$ 347,00',
  linkObrigado = 'https://seyune.com.br/projeto45dias/obrigado',
  linkWhatsApp = 'https://chat.whatsapp.com/xxx',
}: ConfirmacaoCompraProps) {
  return (
    <Html>
      <Head />
      <Preview>Sua vaga no Projeto 45 Graus está garantida! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Heading style={h1}>🎉 Bem-vinda ao Projeto 45 Graus!</Heading>

          <Text style={text}>Olá, {nome}! 👋</Text>

          <Text style={text}>
            Sua vaga no <strong>{lote}</strong> está confirmada!
            Você acabou de dar o primeiro passo para uma transformação real
            em apenas 45 dias.
          </Text>

          {/* Confirmação */}
          <Section style={confirmationBox}>
            <Text style={confirmationText}>✅ Pagamento confirmado</Text>
            <Text style={confirmationText}>💰 Valor: {preco}</Text>
            <Text style={confirmationText}>📅 Início: 15 de dezembro</Text>
          </Section>

          {/* Próximos Passos */}
          <Heading style={h2}>Próximos passos:</Heading>

          {/* Passo 1 */}
          <Section style={stepBox}>
            <Text style={stepNumber}>1</Text>
            <Text style={stepText}>
              <strong>Complete seus dados</strong>
              <br />
              Precisamos de mais algumas informações para personalizar seu plano.
            </Text>
            <Button style={button} href={linkObrigado}>
              Completar dados
            </Button>
          </Section>

          {/* Passo 2 */}
          <Section style={stepBox}>
            <Text style={stepNumber}>2</Text>
            <Text style={stepText}>
              <strong>Entre no grupo VIP</strong>
              <br />
              Acesso exclusivo com suporte direto da Seyune e do Amauri.
            </Text>
            <Button style={buttonSecondary} href={linkWhatsApp}>
              Entrar no WhatsApp
            </Button>
          </Section>

          {/* Passo 3 */}
          <Section style={stepBox}>
            <Text style={stepNumber}>3</Text>
            <Text style={stepText}>
              <strong>Aguarde instruções</strong>
              <br />
              Em breve você receberá as orientações para agendar suas consultas
              individuais com a Seyune (nutricionista) e o Amauri (personal trainer).
            </Text>
          </Section>

          {/* Bônus */}
          <Section style={bonusBox}>
            <Heading style={h3}>🎁 O que você recebe:</Heading>
            <Text style={text}>
              • Consulta individual 30min com Seyune
              <br />
              • Consulta individual 30min com Amauri
              <br />
              • Acesso aos apps WebDiet e MFit Personal
              <br />
              • Grupo VIP WhatsApp com suporte direto
              <br />
              • Materiais exclusivos de nutrição e treino
              <br />• Acompanhamento durante todo o desafio
            </Text>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            Dúvidas? Responda este email ou entre em contato pelo WhatsApp.
          </Text>

          <Text style={footer}>
            <strong>Seyune & Amauri</strong>
            <br />
            Projeto 45 Graus
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#1a1a1a',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#2d2d2d',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  borderRadius: '8px',
};

const h1 = {
  color: '#d4af37',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const h2 = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '30px 0 20px',
};

const h3 = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const text = {
  color: '#e0e0e0',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const confirmationBox = {
  backgroundColor: '#3a3a3a',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #d4af37',
  margin: '20px 0',
};

const confirmationText = {
  color: '#d4af37',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '8px 0',
};

const stepBox = {
  backgroundColor: '#3a3a3a',
  border: '1px solid #4a4a4a',
  borderRadius: '8px',
  padding: '20px',
  margin: '16px 0',
};

const stepNumber = {
  backgroundColor: '#d4af37',
  color: '#1a1a1a',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  marginBottom: '12px',
  padding: '6px',
  textAlign: 'center' as const,
};

const stepText = {
  color: '#e0e0e0',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '12px 0',
};

const button = {
  backgroundColor: '#d4af37',
  color: '#1a1a1a',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
  display: 'inline-block',
  margin: '12px 0',
};

const buttonSecondary = {
  backgroundColor: '#25D366',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
  display: 'inline-block',
  margin: '12px 0',
};

const bonusBox = {
  backgroundColor: '#3a3a3a',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #4a4a4a',
  margin: '30px 0',
};

const footer = {
  color: '#999',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '30px 0 10px',
};
