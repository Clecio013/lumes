'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, BookOpen, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { BrandLogo } from '../components/brand-logo';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/xxx';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <BrandLogo size="sm" />
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6">
              BEM-VINDA AO PROJETO 45 GRAUS! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Sua vaga está garantida! Você acabou de dar o primeiro passo para uma transformação real.
            </p>
          </motion.div>

          {/* Payment ID */}
          {paymentId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-zinc-400">
                ID do Pagamento: <span className="text-amber-500 font-mono">{paymentId}</span>
              </p>
            </motion.div>
          )}

          {/* Próximos Passos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-amber-500">
              Próximos Passos
            </h2>

            <div className="space-y-6">
              {/* Passo 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-50">
                    Verifique seu email
                  </h3>
                  <p className="text-zinc-400">
                    Enviamos um email de confirmação com todas as informações importantes.
                    Caso não encontre, verifique a caixa de spam.
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-50">
                    Entre no grupo VIP do WhatsApp
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Acesso exclusivo com suporte direto da Seyune e do Amauri durante todo o programa.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20BA5A] transition-colors"
                  >
                    <Users className="w-5 h-5" />
                    ENTRAR NO GRUPO
                  </a>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-50">
                    Aguarde instruções para agendar consultas
                  </h3>
                  <p className="text-zinc-400">
                    Em breve você receberá as orientações para agendar suas consultas individuais
                    de 30 minutos com a Seyune (nutricionista) e com o Amauri (personal trainer).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* O que você recebe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-500" />
              <span className="text-amber-500">O Que Você Recebe</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Consulta individual de 30min com Seyune (Nutricionista)
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Consulta individual de 30min com Amauri (Personal Trainer)
                </span>
              </div>

              <div className="flex gap-3">
                <Calendar className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Plano alimentar 100% personalizado
                </span>
              </div>

              <div className="flex gap-3">
                <BookOpen className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Planilha de treino individualizada para 45 dias
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Acesso aos apps WebDiet e MFit Personal
                </span>
              </div>

              <div className="flex gap-3">
                <Users className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Grupo VIP WhatsApp com suporte direto
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Materiais exclusivos de nutrição e treino
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">
                  Acompanhamento durante todo o desafio
                </span>
              </div>
            </div>
          </motion.div>

          {/* Início do Programa */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-2">
              📅 O programa começa em
            </p>
            <p className="text-2xl md:text-3xl font-bold text-amber-500">
              15 de Dezembro de 2025
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg-dark)] flex items-center justify-center">
          <div className="text-zinc-50">Carregando...</div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
