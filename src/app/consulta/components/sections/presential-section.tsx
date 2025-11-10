"use client";

// Client Component - Seção Atendimento Presencial com Scroll Reveal
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { MapPin, Clock, Car, CheckCircle2, MessageCircle } from "lucide-react";
import { AnalyticsButton } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

export function PresentialSection() {
  const locations = [
    {
      name: "Vila Mariana",
      address: "Rua Manuel de Paiva, 257",
      neighborhood: "Vila Mariana, São Paulo - SP",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0!2d-46.6!3d-23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiUyA0NsKwMzYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr",
      mapLink: "https://maps.app.goo.gl/BVjHjtk97kcpZTNdA",
      hours: [
        "Segunda e Terça: 9h às 19h",
        "Quarta e Sexta: 8h às 19h",
        "Quinta: 8h às 17h",
        "Sábado: 8h às 16h",
      ],
      access: [
        "Metrô Vila Mariana (500m)",
        "Fácil acesso por transporte público",
      ],
    },
    {
      name: "Indianópolis/Moema",
      address: "Av Sabiá, 384",
      neighborhood: "Indianópolis, São Paulo - SP",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0!2d-46.6!3d-23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiUyA0NsKwMzYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr",
      mapLink: "https://maps.app.goo.gl/wS32W5TducdR5Bi3A",
      hours: [
        "Segunda e Terça: 9h às 19h",
        "Quarta e Sexta: 8h às 19h",
        "Quinta: 8h às 17h",
        "Sábado: 8h às 16h",
      ],
      access: [
        "Próximo ao Parque Ibirapuera",
        "Fácil acesso pela Av. Ibirapuera",
      ],
    },
  ];

  return (
    <section data-section="atendimento_presencial" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Atendimento presencial ou online
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              <span className="text-accent font-semibold">Atendo online</span> para todo o Brasil e{" "}
              <span className="text-accent font-semibold">presencial</span> em dois endereços em São Paulo.
              Escolha a modalidade que melhor se encaixa na sua rotina.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos encontros presenciais, você tem acesso a um ambiente acolhedor e profissional.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de Locais */}
        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="bg-background rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl overflow-hidden h-full flex flex-col">
                {/* Google Maps Embed */}
                <div className="relative w-full h-64 bg-muted">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa de ${location.name}`}
                    className="w-full h-full"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-accent" />
                      {location.name}
                    </h3>
                    <p className="text-lg text-foreground font-medium">
                      {location.address}
                    </p>
                    <p className="text-muted-foreground">
                      {location.neighborhood}
                    </p>
                  </div>

                  {/* Horários */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold text-foreground">Horários</h4>
                    </div>
                    <ul className="space-y-1 text-muted-foreground ml-7">
                      {location.hours.map((hour, idx) => (
                        <li key={idx}>{hour}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Acesso */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Car className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold text-foreground">Como chegar</h4>
                    </div>
                    <ul className="space-y-2 ml-7">
                      {location.access.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg group"
                    >
                      <MapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Bottom */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <AnalyticsButton
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer px-10 md:px-12 py-5 md:py-6 text-base md:text-lg font-semibold inline-flex items-center justify-center"
              trackingLocation="atendimento_presencial"
              trackingLabel="Agende sua consulta"
              trackingType="schedule"
              onClick={() => window.open(siteConfig.whatsapp.url, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              <span className="whitespace-nowrap">Agende sua consulta</span>
            </AnalyticsButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
