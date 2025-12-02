import dynamic from "next/dynamic";
import { StructuredData } from "@/components/schema/structured-data";

// Critical Components (Above fold)
import { HeroSection } from "@/app/avaliacao-pele/components/sections";
import { CTABanner } from "@/app/avaliacao-pele/components/cta-banner";

// Server Components (carregam rápido, sem JS)
import {
  PainPointsSection,
  SolutionSection,
  CourseContentSection,
  AboutSection,
  TestimonialsSection,
} from "@/app/avaliacao-pele/components/sections";

// Dynamic Imports - Below fold components (carregam sob demanda)
const FAQSection = dynamic(() =>
  import("@/app/avaliacao-pele/components/sections").then(mod => ({ default: mod.FAQSection })),
  { ssr: true }
);

const CTASection = dynamic(() =>
  import("@/app/avaliacao-pele/components/sections").then(mod => ({ default: mod.CTASection })),
  { ssr: true }
);

const Footer = dynamic(() =>
  import("./footer").then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

export default function AvaliacaoPelePage() {
  return (
    <>
      {/* Schema.org Structured Data para SEO */}
      <StructuredData type="organization" />
      <StructuredData type="person" />
      <StructuredData type="course" />
      <StructuredData type="faq" />
      <StructuredData type="webpage" />

      <main className="min-h-screen">
        <HeroSection />
        <PainPointsSection />

        {/* CTA após dores - oferece a solução */}
        <CTABanner
          variant="minimal"
          headline="Existe um caminho diferente. Quer conhecer?"
        />

        <SolutionSection />

        {/* CTA após solução - com preço */}
        <CTABanner
          variant="with-price"
          headline="Aprenda o método de raciocínio clínico"
          subheadline="49 anos de experiência condensados em um curso prático"
        />

        <CourseContentSection />

        {/* CTA após conteúdo - urgência */}
        <CTABanner
          variant="urgent"
          headline="Pare de copiar. Comece a pensar."
          subheadline="Domine a avaliação de pele e crie protocolos personalizados com segurança."
        />

        <AboutSection />
        <TestimonialsSection />

        {/* CTA após depoimentos - minimal */}
        <CTABanner
          variant="minimal"
          headline="Junte-se a milhares de profissionais que já aprenderam"
        />

        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
