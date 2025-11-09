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
  preco: string;
  linkWhatsApp: string;
}

export default function ConfirmacaoCompra({
  nome = 'Maria',
  preco = 'R$ 347,00',
  linkWhatsApp = 'https://chat.whatsapp.com/HkOvWURXKMWGVZjmN2ex5M?mode=wwt',
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
            Sua vaga está confirmada!
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

          {/* Passo 1 - Grupo WhatsApp */}
          <Section style={stepBox}>
            <Text style={stepTitle}>
              <span style={stepNumber}>1.</span> Entre no grupo VIP do WhatsApp
            </Text>
            <Text style={stepText}>
              Acesso exclusivo com suporte direto da Seyune e do Amauri durante todo o programa.
            </Text>
            <Button style={buttonSecondary} href={linkWhatsApp}>
              🚀 Entrar no Grupo VIP
            </Button>
          </Section>

          {/* Passo 2 - Aguardar Instruções */}
          <Section style={stepBox}>
            <Text style={stepTitle}>
              <span style={stepNumber}>2.</span> Aguarde instruções para agendar suas consultas
            </Text>
            <Text style={stepText}>
              Em breve você receberá as orientações para agendar suas consultas
              individuais de 30 minutos com a Seyune (nutricionista) e o Amauri (personal trainer).
            </Text>
          </Section>

          {/* Passo 3 - Preparação */}
          <Section style={stepBox}>
            <Text style={stepTitle}>
              <span style={stepNumber}>3.</span> Prepare-se para começar
            </Text>
            <Text style={stepText}>
              O programa começa em <strong>15 de dezembro de 2025</strong>.
              Até lá, fique de olho no grupo VIP para não perder nenhuma novidade!
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

const stepTitle = {
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: 'bold' as const,
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const stepNumber = {
  color: '#d4af37',
  fontSize: '20px',
  fontWeight: 'bold' as const,
  marginRight: '8px',
};

const stepText = {
  color: '#e0e0e0',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 16px 0',
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
