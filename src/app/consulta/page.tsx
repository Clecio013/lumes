// Server Component - Página de Consulta
import { HeaderScroll } from "@/components/custom/header-scroll";
import { ScrollTracker } from "@/components/analytics";
import { StructuredData } from "@/components/schema/structured-data";

// Server Components
import { PainPointsSection } from "@/components/sections/pain-points-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TransformationSection } from "@/components/sections/transformation-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { AboutSection } from "@/components/sections/about-section";

// Client Components
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

// Footer Component (inline client)
import { Footer } from "./footer";

export default function ConsultaPage() {
  return (
    <>
      {/* Schema.org Structured Data para SEO */}
      <StructuredData type="organization" />
      <StructuredData type="person" />
      <StructuredData type="service" />
      <StructuredData type="howto" />
      <StructuredData type="faq" />
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
