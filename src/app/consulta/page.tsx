// Server Component - Página de Consulta
import { HeaderScroll } from "@/app/consulta/components/header-scroll";
import { ScrollTracker } from "@/components/analytics";
import { StructuredData } from "@/components/schema/structured-data";

// All Section Components (Server + Client)
import {
  HeroSection,
  PainPointsSection,
  BenefitsSection,
  HowItWorksSection,
  TransformationSection,
  TestimonialsSection,
  AboutSection,
  FAQSection,
  CTASection,
} from "@/app/consulta/components/sections";

// Footer Component
import { Footer } from "./footer";

export default function ConsultaPage() {
  return (
    <>
      {/* Schema.org Structured Data global para SEO */}
      <StructuredData type="organization" />
      <StructuredData type="person" />
      <StructuredData type="webpage" />

      <HeaderScroll />
      <ScrollTracker />

      <main className="min-h-screen">
        <HeroSection />
        <PainPointsSection />
        <BenefitsSection />
        <HowItWorksSection />
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
