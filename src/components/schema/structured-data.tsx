import Script from 'next/script';

type SchemaType = 'organization' | 'person' | 'service' | 'faq' | 'webpage' | 'howto';

interface StructuredDataProps {
  type: SchemaType;
  data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schemas: Record<SchemaType, Record<string, unknown>> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Seyune",
      "alternateName": "Seyune Nutrição Comportamental",
      "url": process.env.NEXT_PUBLIC_SITE_URL,
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/brand/logotipo-terracota.png`,
      "description": "Nutrição comportamental para mulheres que buscam transformar sua relação com a comida. Resultados sustentáveis sem restrições severas.",
      "sameAs": [
        process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/seyune"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
        "contactType": "Customer Service",
        "availableLanguage": "Portuguese"
      }
    },
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Seyune",
      "jobTitle": "Nutricionista Comportamental",
      "description": "Nutricionista especializada em Nutrição Comportamental, ajudando mulheres a transformarem sua relação com a comida através de uma abordagem que integra aspectos físicos, emocionais e comportamentais.",
      "url": process.env.NEXT_PUBLIC_SITE_URL,
      "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/about/profile.jpg`,
      "sameAs": [
        process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/seyune"
      ],
      "knowsAbout": [
        "Nutrição Comportamental",
        "Nutrição Clínica",
        "Psicologia Alimentar",
        "Emagrecimento Sustentável",
        "Ganho de Massa Muscular",
        "Relação Saudável com Comida"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Degree",
          "educationalLevel": "Bachelor's Degree",
          "about": "Nutrição"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Specialization",
          "about": "Nutrição Comportamental"
        }
      ]
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Consultoria de Nutrição Comportamental",
      "description": "Consultoria personalizada em nutrição comportamental. Transforme sua relação com a comida através de planos personalizados, sem restrições severas e com acompanhamento contínuo.",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta`,
      "provider": {
        "@type": "Person",
        "name": "Seyune",
        "jobTitle": "Nutricionista Comportamental"
      },
      "serviceType": "Consultoria Nutricional",
      "category": "Nutrição Comportamental",
      "areaServed": {
        "@type": "Country",
        "name": "Brasil"
      },
      "availableLanguage": "Portuguese",
      "offers": [
        {
          "@type": "Offer",
          "name": "Consulta Individual",
          "description": "Consulta inicial personalizada para entender suas necessidades e objetivos",
          "availability": "https://schema.org/InStock",
          "availableDeliveryMethod": "https://schema.org/OnlineOnly"
        },
        {
          "@type": "Offer",
          "name": "Plano Alimentar Personalizado",
          "description": "Plano alimentar feito especialmente para você, respeitando sua rotina e preferências",
          "availability": "https://schema.org/InStock",
          "availableDeliveryMethod": "https://schema.org/OnlineOnly"
        },
        {
          "@type": "Offer",
          "name": "Acompanhamento Contínuo",
          "description": "Suporte e ajustes regulares durante todo o processo de transformação",
          "availability": "https://schema.org/InStock",
          "availableDeliveryMethod": "https://schema.org/OnlineOnly"
        }
      ]
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto custa a consulta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O investimento varia de acordo com o tipo de acompanhamento que você precisa. Vamos conversar no WhatsApp para eu entender seus objetivos e te passar os valores personalizados."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo leva para ver resultados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Resultados físicos começam a aparecer nas primeiras semanas, mas a verdadeira transformação — mental e comportamental — é um processo contínuo. Não é sobre ser rápido, é sobre ser sustentável."
          }
        },
        {
          "@type": "Question",
          "name": "É mais uma dieta restritiva?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não! Nutrição comportamental é justamente o OPOSTO de dietas restritivas. Trabalhamos seus comportamentos, emoções e relação com a comida — sem proibições extremas que levam à compulsão."
          }
        },
        {
          "@type": "Question",
          "name": "Eu já tentei tudo e nada funcionou. Por que seria diferente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Porque você provavelmente tentou abordagens genéricas que não consideram quem VOCÊ é. Aqui, o plano é 100% personalizado para sua rotina, preferências e desafios emocionais. E você tem acompanhamento contínuo."
          }
        },
        {
          "@type": "Question",
          "name": "Como funciona o acompanhamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Após a consulta inicial e criação do seu plano, mantemos contato regular para ajustes, suporte e motivação. Você não fica sozinha no processo."
          }
        },
        {
          "@type": "Question",
          "name": "As consultas são presenciais ou online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As consultas podem ser online, então você pode estar em qualquer lugar do Brasil (ou do mundo) para ter acesso ao acompanhamento."
          }
        }
      ]
    },
    howto: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Como funciona a consultoria de nutrição comportamental",
      "description": "Processo completo de consultoria nutricional comportamental personalizada, desde a primeira consulta até o acompanhamento contínuo.",
      "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/seyune-gradient.png`,
      "totalTime": "PT1M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Disponibilidade para consulta online"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "WhatsApp para agendamento"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Consulta inicial",
          "text": "Vamos conversar — de verdade. Quero entender sua história, seus desafios, seus objetivos. Não é só sobre números numa balança. É sobre você como um todo: corpo, mente, emoções e estilo de vida.",
          "position": 1,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta#como-funciona`
        },
        {
          "@type": "HowToStep",
          "name": "Plano alimentar personalizado",
          "text": "Com base na nossa conversa, vou criar um plano alimentar feito para VOCÊ. Não é genérico. Não é copiado de influencer. É construído considerando suas preferências, sua rotina, seus desafios emocionais e comportamentais.",
          "position": 2,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta#como-funciona`
        },
        {
          "@type": "HowToStep",
          "name": "Acompanhamento contínuo",
          "text": "Você não fica sozinha. Durante todo o processo, estarei ao seu lado para ajustes, suporte e motivação. Quando surgir um desafio (e vai surgir), estaremos juntas para superá-lo.",
          "position": 3,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta#como-funciona`
        }
      ]
    },
    webpage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Consultoria de Nutrição Comportamental - Seyune",
      "description": "Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas. Agende sua consulta.",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta`,
      "inLanguage": "pt-BR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Seyune",
        "url": process.env.NEXT_PUBLIC_SITE_URL
      },
      "about": {
        "@type": "Thing",
        "name": "Nutrição Comportamental",
        "description": "Abordagem nutricional que integra aspectos físicos, emocionais e comportamentais da alimentação"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/seyune-gradient.png`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": process.env.NEXT_PUBLIC_SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Consulta",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL}/consulta`
          }
        ]
      }
    }
  };

  const schema = data || schemas[type];

  if (!schema) return null;

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Componente para agrupar múltiplos schemas
export function StructuredDataGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
