import { HeroSection } from './components/hero-section';
import { VSLSection } from './components/vsl-section';
import { BenefitsSection } from './components/benefits-section';
import { EmotionalTransformationSection } from './components/emotional-transformation-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { TestimonialsSection } from './components/testimonials-section';
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
      <VSLSection pandaVideoId="" />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Transformations Section - Estados Emocionais */}
      <EmotionalTransformationSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

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
