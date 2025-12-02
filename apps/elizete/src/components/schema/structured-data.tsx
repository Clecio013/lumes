import Script from 'next/script';
import { siteConfig } from "@/config/site";

type SchemaType = 'organization' | 'person' | 'course' | 'faq' | 'webpage';

interface StructuredDataProps {
  type: SchemaType;
  data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schemas: Record<SchemaType, Record<string, unknown>> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Elizete Garcia",
      "alternateName": "Estética Inteligente",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/brand/logo.jpg`,
      "description": "Especialista em estética com 49 anos de experiência. Pioneira no primeiro curso técnico de estética no Brasil pelo Senac.",
      "sameAs": [
        siteConfig.social.instagram
      ]
    },
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Elizete Garcia",
      "jobTitle": "Especialista em Cosmetologia Clínica",
      "description": "Bióloga especialista em Cosmetologia Clínica com 49 anos de experiência em estética. Pioneira no primeiro curso técnico de estética no Brasil pelo Senac. Consultora de fábricas de cosméticos, palestrante e mentora.",
      "url": siteConfig.url,
      "image": `${siteConfig.url}/images/about/profile.jpg`,
      "sameAs": [
        siteConfig.social.instagram
      ],
      "knowsAbout": [
        "Avaliação de Pele",
        "Raciocínio Clínico em Estética",
        "Cosmetologia Clínica",
        "Estética Facial",
        "Protocolos de Tratamento",
        "Ficha de Anamnese"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Degree",
          "educationalLevel": "Bachelor's Degree",
          "about": "Biologia"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Specialization",
          "about": "Cosmetologia Clínica"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Specialization",
          "about": "Visagismo"
        }
      ]
    },
    course: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": siteConfig.course.name,
      "description": "Aprenda a avaliar a pele com raciocínio clínico e domine protocolos personalizados. Curso com 4 módulos abrangendo ficha de anamnese, relações da pele com saúde e organização de tratamentos.",
      "provider": {
        "@type": "Person",
        "name": "Elizete Garcia",
        "url": siteConfig.url
      },
      "offers": {
        "@type": "Offer",
        "price": siteConfig.course.price,
        "priceCurrency": siteConfig.course.currency,
        "availability": "https://schema.org/InStock",
        "url": siteConfig.course.checkoutUrl
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "courseWorkload": "4 módulos"
      }
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que vou aprender no curso?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você vai aprender a fazer avaliação de pele profissional usando o método de raciocínio clínico. O curso abrange ficha de anamnese, relações da pele com intestino, hormônios, diabetes e outros fatores, além de como organizar as informações para criar protocolos personalizados."
          }
        },
        {
          "@type": "Question",
          "name": "Para quem é o curso?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O curso é para profissionais de estética formados em Biomedicina, Biologia, Enfermagem, Odontologia, Dermatologia e áreas correlatas que querem se diferenciar no mercado através do raciocínio clínico."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo tenho acesso ao curso?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você terá acesso vitalício ao conteúdo do curso, podendo assistir quantas vezes quiser, no seu próprio ritmo."
          }
        },
        {
          "@type": "Question",
          "name": "O curso tem garantia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim! Você tem ${siteConfig.course.guarantee} dias de garantia incondicional. Se não gostar do curso, pode pedir reembolso total.`
          }
        },
        {
          "@type": "Question",
          "name": "Preciso ter experiência prévia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O curso é voltado para profissionais da área de estética. Conhecimento básico em estética é recomendado, mas o método de raciocínio clínico é ensinado do zero."
          }
        }
      ]
    },
    webpage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Avaliação de Pele e Consulta Estética Profissional - Elizete Garcia",
      "description": siteConfig.description,
      "url": `${siteConfig.url}/avaliacao-pele`,
      "inLanguage": "pt-BR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Elizete Garcia",
        "url": siteConfig.url
      },
      "about": {
        "@type": "Thing",
        "name": "Avaliação de Pele",
        "description": "Método de raciocínio clínico para avaliação profissional de pele"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/images/hero/elizete.jpg`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Avaliação de Pele",
            "item": `${siteConfig.url}/avaliacao-pele`
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
