"use client";

import { ScrollReveal } from "@/components/animations";

export function CourseContentSection() {
  const modules = [
    {
      number: "01",
      title: "Ficha de Anamnese",
      description: "A base de todo tratamento bem-sucedido",
      lessons: [
        "A importância da Avaliação Estética",
        "Por que a Ficha de Anamnese é Fundamental",
        "Avaliação, Entrevista ou Consulta Estética?",
        "A Ficha como Estrela Guia do Tratamento",
      ],
      color: "bg-[var(--tangerine)]",
    },
    {
      number: "02",
      title: "Passo a Passo",
      description: "O método na prática",
      lessons: [
        "Como fazer a avaliação - Passo a Passo completo",
      ],
      color: "bg-[var(--salmon)]",
    },
    {
      number: "03",
      title: "Relações com a Pele",
      description: "O conhecimento que diferencia",
      lessons: [
        "Pele e Intestino",
        "Pele e Ingestão de Água",
        "Pele e Diabetes",
        "Pele e Hormônios",
        "Pele e Anticoncepcional",
        "Pele e Melatonina",
        "Pele e Tireóide",
        "Pele, Álcool, Atividade física e Estresse",
        "Pele, Tabagismo, Medicamentos e Ergonomia",
      ],
      color: "bg-[var(--secondary)]",
    },
    {
      number: "04",
      title: "Organizando Informações",
      description: "Da análise ao protocolo",
      lessons: [
        "Como organizar todas as informações coletadas",
      ],
      color: "bg-foreground",
    },
  ];

  return (
    <section data-section="course-content" className="py-24 lg:py-32 px-6 bg-[var(--chiffon)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
              O curso
            </p>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 className="font-display text-3xl lg:text-5xl text-foreground leading-tight">
                4 módulos para dominar a avaliação de pele
              </h2>
              <p className="text-lg text-muted-foreground">
                Conteúdo prático e aplicável imediatamente. Cada aula foi pensada para
                construir seu raciocínio clínico de forma progressiva.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Modules */}
        <div className="space-y-6">
          {modules.map((module, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="group bg-white hover:shadow-lg transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-6 p-6 lg:p-8">
                  {/* Number & Title */}
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <div className={`${module.color} w-14 h-14 flex items-center justify-center shrink-0`}>
                      <span className="text-white font-display text-2xl">{module.number}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl lg:text-2xl text-foreground mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="lg:col-span-7">
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center gap-3 text-muted-foreground py-1">
                          <span className="w-1.5 h-1.5 bg-[var(--tangerine)] rounded-full shrink-0" />
                          <span className="text-sm">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lesson count */}
                  <div className="lg:col-span-1 flex lg:justify-end items-start">
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1">
                      {module.lessons.length} {module.lessons.length === 1 ? 'aula' : 'aulas'}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Total */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-8 bg-white px-8 py-4">
              <div className="text-center">
                <p className="font-display text-4xl text-[var(--tangerine)]">15</p>
                <p className="text-sm text-muted-foreground">aulas</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-4xl text-[var(--tangerine)]">4</p>
                <p className="text-sm text-muted-foreground">módulos</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-4xl text-[var(--tangerine)]">∞</p>
                <p className="text-sm text-muted-foreground">acesso</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
