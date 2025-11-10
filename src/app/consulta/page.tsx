// Server Component - Página de Consulta
import dynamic from "next/dynamic";
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
  import("./footer").then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

// Dynamic Imports - Non-critical components (loaded after scroll)
const HeaderScroll = dynamic(() =>
  import("@/app/consulta/components/header-scroll").then(mod => ({ default: mod.HeaderScroll }))
);

export default function ConsultaPage() {
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
