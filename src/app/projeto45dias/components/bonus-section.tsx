'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface Bonus {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const bonuses: Bonus[] = [
  {
    id: 'emagrecimento-sustentavel',
    title: 'Guia do Emagrecimento Sustentável',
    description:
      'Conceitos de déficit calórico, fome física x emocional, estratégias para manter constância, checklist de hábitos e metas semanais, receitas práticas e leves.',
    image: '/projeto45dias/bonuses/emagrecimento-sustentavel.png',
    imageAlt: 'Capa do Guia do Emagrecimento Sustentável',
  },
  {
    id: 'nao-sabotar-processo',
    title: 'Como Não Sabotar Seu Processo',
    description:
      'Gatilhos comuns e como lidar com eles, estratégias de organização da alimentação (compras, marmitas, refeições fora de casa), ferramentas de autoconhecimento alimentar.',
    image: '/projeto45dias/bonuses/nao-sabotar-processo.png',
    imageAlt: 'Capa do Guia Como Não Sabotar Seu Processo',
  },
  {
    id: 'ganho-massa',
    title: 'Guia Prático para Ganho de Massa',
    description:
      'Explicação sobre superávit calórico, proteína e recuperação muscular, erros comuns que impedem o progresso, sugestão de cardápio + exemplos de lanches proteicos e receitas.',
    image: '/projeto45dias/bonuses/ganho-massa.png',
    imageAlt: 'Capa do Guia Prático para Ganho de Massa',
  },
  {
    id: 'festas-fim-ano',
    title: 'Guia de Sobrevivência nas Festas',
    description:
      'Dicas para lidar com rotina fora do eixo, viagens e eventos sociais, como montar um prato equilibrado, estratégias para equilibrar prazer e saúde, mini planner de metas para o novo ano.',
    image: '/projeto45dias/bonuses/festas-fim-ano.png',
    imageAlt: 'Capa do Guia de Sobrevivência nas Festas de Fim de Ano',
  },
  {
    id: 'receitas-impressionar',
    title: 'Receitas para Impressionar',
    description:
      'Petiscos saudáveis, molhos funcionais, sobremesas equilibradas e drinks sem álcool para você aproveitar sem sair do plano.',
    image: '/projeto45dias/bonuses/receitas-impressionar.png',
    imageAlt: 'Capa do Guia de Receitas para Impressionar',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function BonusSection() {
  return (
    <section className="projeto45-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="projeto45-title text-4xl md:text-6xl font-bold mb-6">
            MATERIAIS EXCLUSIVOS PARA
            <br />
            <span className="projeto45-gold-gradient">
              ACELERAR SUA TRANSFORMAÇÃO
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Além das consultas e acompanhamento, você recebe{' '}
            <strong className="text-[var(--gold-primary)]">
              5 guias completos
            </strong>{' '}
            desenvolvidos pela Seyune para te apoiar em cada etapa da sua
            jornada.
          </p>
        </motion.div>

        {/* Grid de Bônus */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bonuses.map((bonus) => (
            <motion.div
              key={bonus.id}
              variants={cardVariants}
              className="projeto45-card group relative overflow-hidden"
            >
              {/* Badge "Incluído" */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-[var(--success-green)] text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Incluído
                </div>
              </div>

              {/* Imagem da Capa */}
              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-[var(--bg-dark)]">
                <Image
                  src={bonus.image}
                  alt={bonus.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Conteúdo */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {bonus.title}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {bonus.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Bottom (opcional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-6">
            Todos esses materiais são seus{' '}
            <strong className="text-[var(--gold-primary)]">
              para sempre
            </strong>
            , mesmo após os 45 dias.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
