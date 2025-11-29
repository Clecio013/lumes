'use client';

import { motion, type Variants } from 'framer-motion';
import {
  EmagrecimentoSustentavelCover,
  NaoSabotarProcessoCover,
  GanhoMassaCover,
  FestasFimAnoCover,
  ReceitasImpressionar,
} from './bonus-covers';

interface Bonus {
  id: string;
  title: string;
  description: string;
  CoverComponent: React.ComponentType;
}

const bonuses: Bonus[] = [
  {
    id: 'emagrecimento-sustentavel',
    title: 'Guia do Emagrecimento Sustentável',
    description:
      'Conceitos de déficit calórico, fome física x emocional, estratégias para manter constância, checklist de hábitos e metas semanais, receitas práticas e leves.',
    CoverComponent: EmagrecimentoSustentavelCover,
  },
  {
    id: 'nao-sabotar-processo',
    title: 'Como Não Sabotar Seu Processo',
    description:
      'Gatilhos comuns e como lidar com eles, estratégias de organização da alimentação (compras, marmitas, refeições fora de casa), ferramentas de autoconhecimento alimentar.',
    CoverComponent: NaoSabotarProcessoCover,
  },
  {
    id: 'ganho-massa',
    title: 'Guia Prático para Ganho de Massa',
    description:
      'Explicação sobre superávit calórico, proteína e recuperação muscular, erros comuns que impedem o progresso, sugestão de cardápio + exemplos de lanches proteicos e receitas.',
    CoverComponent: GanhoMassaCover,
  },
  {
    id: 'festas-fim-ano',
    title: 'Guia de Sobrevivência nas Festas',
    description:
      'Dicas para lidar com rotina fora do eixo, viagens e eventos sociais, como montar um prato equilibrado, estratégias para equilibrar prazer e saúde, mini planner de metas para o novo ano.',
    CoverComponent: FestasFimAnoCover,
  },
  {
    id: 'receitas-impressionar',
    title: 'Receitas para Impressionar',
    description:
      'Petiscos saudáveis, molhos funcionais, sobremesas equilibradas e drinks sem álcool para você aproveitar sem sair do plano.',
    CoverComponent: ReceitasImpressionar,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
              {/* Capa em Código */}
              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <bonus.CoverComponent />
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
          <div className="bg-[var(--bg-dark)] border-2 border-[var(--gold-primary)] rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-[var(--text-light)] mb-4">
              📚 Esses <strong className="text-[var(--gold-primary)]">5 guias exclusivos</strong> são seus{' '}
              <strong className="text-[var(--gold-primary)]">para sempre</strong>, mesmo após os 45 dias.
            </p>
            <p className="text-base text-[var(--text-muted)] mb-3">
              💡 Diferente do acesso aos apps WebDiet e MFit Personal (válidos por 45 dias),
              esses materiais ficam com você permanentemente para consultar sempre que precisar.
            </p>
            <p className="text-base text-[var(--text-muted)]">
              📩 <strong className="text-[var(--text-light)]">Importante:</strong> Após a compra, entraremos em contato para enviar todos os materiais e credenciais de acesso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
