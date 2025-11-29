import { HeroSection } from './components/hero-section';
import { VSLSection } from './components/vsl-section';
import { CountdownTimer } from './components/countdown-timer';
import { BenefitsSection } from './components/benefits-section';
import { EmotionalTransformationSection } from './components/emotional-transformation-section';
import BonusSection from './components/bonus-section';
import { HowItWorksSection } from './components/how-it-works-section';
// import { TestimonialsSection } from './components/testimonials-section';
import { AboutSection } from './components/about-section';
import { FAQSection } from './components/faq-section';
import { OfertaSection } from './components/oferta-section';
import { Footer } from './components/footer';

export default function Projeto45DiasPage() {
  return (
    <div className="projeto45-container">
      {/* Hero Section */}
      <HeroSection />

      {/* VSL Section */}
      <VSLSection />

      {/* Countdown Timer - Black Friday Urgência */}
      <CountdownTimer />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Transformations Section - Estados Emocionais */}
      <EmotionalTransformationSection />

      {/* Bonus Section - Materiais Exclusivos - REMOVIDO TEMPORARIAMENTE */}
      <BonusSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section - ESCONDIDO: aguardando depoimentos dos profissionais */}
      {/* <TestimonialsSection /> */}

      {/* About Section */}
      <AboutSection />

      {/* Oferta Section - CTA Final */}
      <OfertaSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
