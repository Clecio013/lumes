'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Smile, TrendingUp, Zap } from 'lucide-react';

const transformations = [
  {
    id: 1,
    before: {
      title: 'Inseguros',
      description: 'Sentindo-se perdidos e sem direção em relação à alimentação e treino',
      icon: Shield,
      color: 'text-red-400',
    },
    after: {
      title: 'Confiantes',
      description: 'Com clareza sobre o caminho e segurança nas escolhas diárias',
      icon: Shield,
      color: 'text-green-400',
    },
  },
  {
    id: 2,
    before: {
      title: 'Sem autoestima',
      description: 'Frustrados com tentativas anteriores e resultados inconsistentes',
      icon: Heart,
      color: 'text-red-400',
    },
    after: {
      title: 'Realizados',
      description: 'Orgulhosos da transformação e dos resultados alcançados',
      icon: Sparkles,
      color: 'text-green-400',
    },
  },
  {
    id: 3,
    before: {
      title: 'Desmotivados',
      description: 'Cansados de dietas restritivas e treinos que não funcionam',
      icon: TrendingUp,
      color: 'text-red-400',
    },
    after: {
      title: 'Energizados',
      description: 'Com energia renovada e disposição para conquistar objetivos',
      icon: Zap,
      color: 'text-green-400',
    },
  },
  {
    id: 4,
    before: {
      title: 'Frustrados',
      description: 'Tentando sozinhos sem apoio profissional qualificado',
      icon: Smile,
      color: 'text-red-400',
    },
    after: {
      title: 'Acompanhados',
      description: 'Com suporte profissional individualizado em cada etapa',
      icon: Smile,
      color: 'text-green-400',
    },
  },
];

export function EmotionalTransformationSection() {
  return (
    <section className="projeto45-section py-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Transformação Que Você Vai Sentir
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Muito além dos números na balança, o Projeto 45 Graus transforma
            como você se sente e se relaciona com seu corpo
          </p>
        </motion.div>

        {/* Grid de Transformações */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {transformations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="projeto45-card bg-dark-lighter p-8 rounded-xl border border-gold/20"
            >
              {/* Before */}
              <div className="mb-6 pb-6 border-b border-gold/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${item.before.color}`}>
                    <item.before.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-400">
                    Antes: {item.before.title}
                  </h3>
                </div>
                <p className="text-gray-400">{item.before.description}</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-4">
                <div className="text-gold">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>

              {/* After */}
              <div className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${item.after.color}`}>
                    <item.after.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400">
                    Depois: {item.after.title}
                  </h3>
                </div>
                <p className="text-gray-300">{item.after.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Essas são as transformações reais que nossos clientes experimentam.
            <br />
            <span className="text-gold font-semibold">
              Resultados sustentáveis começam de dentro para fora.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
