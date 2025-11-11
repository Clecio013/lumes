// Server Component - Página Raiz (Homepage)
// Reutiliza componentes de /consulta para evitar duplicação de código
// Canonical URL aponta para /consulta (versão oficial)

import dynamic from "next/dynamic";
import { Metadata } from "next";
import { StructuredData } from "@/components/schema/structured-data";

// Critical Components (Above fold)
import { HeroSection } from "@/app/consulta/components/sections";

// Server Components (carregam rápido, sem JS)
import {
  PainPointsSection,
  BenefitsSection,
  HowItWorksSection,
  PresentialSection,
  TransformationSection,
  TestimonialsSection,
  AboutSection,
} from "@/app/consulta/components/sections";

// Dynamic Imports - Below fold components (carregam sob demanda)
const FAQSection = dynamic(() =>
  import("@/app/consulta/components/sections").then(mod => ({ default: mod.FAQSection })),
  { ssr: true }
);

const CTASection = dynamic(() =>
  import("@/app/consulta/components/sections").then(mod => ({ default: mod.CTASection })),
  { ssr: true }
);

const Footer = dynamic(() =>
  import("@/app/consulta/footer").then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

// Dynamic Imports - Non-critical components (loaded after scroll)
const HeaderScroll = dynamic(() =>
  import("@/app/consulta/components/header-scroll").then(mod => ({ default: mod.HeaderScroll }))
);

// Metadados customizados para a homepage (mais genéricos)
export const metadata: Metadata = {
  title: "Seyune - Nutrição Comportamental em São Paulo",
  description: "Transforme sua relação com a comida através da Nutrição Comportamental. Consultas individuais personalizadas em São Paulo. Pare de fazer dietas que não duram.",
  keywords: [
    "nutrição comportamental",
    "nutricionista são paulo",
    "consulta nutricional",
    "emagrecimento saudável",
    "compulsão alimentar",
    "dieta comportamental",
    "nutricionista vila mariana",
  ],
  alternates: {
    canonical: "https://seyune.com.br/consulta", // Canonical aponta para /consulta
  },
  openGraph: {
    title: "Seyune - Nutrição Comportamental em São Paulo",
    description: "Transforme sua relação com a comida através da Nutrição Comportamental. Consultas individuais personalizadas em São Paulo.",
    url: "https://seyune.com.br",
    siteName: "Seyune",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyune - Nutrição Comportamental em São Paulo",
    description: "Transforme sua relação com a comida através da Nutrição Comportamental. Consultas individuais personalizadas em São Paulo.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Schema.org Structured Data global para SEO */}
      <StructuredData type="organization" />
      <StructuredData type="person" />
      <StructuredData type="webpage" />

      <HeaderScroll />

      <main className="min-h-screen">
        <HeroSection />
        <PainPointsSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PresentialSection />
        <TransformationSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
