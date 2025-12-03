import {
  VideoHero,
  ProblemSection,
  EmpathyBridge,
  Authority,
  Method,
  CourseModules,
  BonusSection,
  SocialProof,
  Pricing,
  FinalCTA,
  FAQ,
  Footer,
} from "./components";

export default function ClareamentoIntimoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero com vídeo VSL */}
      <VideoHero />

      {/* Seção de problemas - identificação */}
      <ProblemSection />

      {/* Ponte de empatia - "A culpa não é sua" */}
      <EmpathyBridge />

      {/* Apresentação da Elizete */}
      <Authority />

      {/* O método - Estética Inteligente */}
      <Method />

      {/* Conteúdo do curso - 5 módulos */}
      <CourseModules />

      {/* Bônus especiais */}
      <BonusSection />

      {/* Prova social - depoimentos */}
      <SocialProof />

      {/* Preço e oferta */}
      <Pricing />

      {/* CTA final - As 3 opções */}
      <FinalCTA />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
