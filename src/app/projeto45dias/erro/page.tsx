'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BrandLogo } from '../components/brand-logo';

export default function ErrorPage() {
  const whatsappSupportLink = 'https://wa.me/5511999999999?text=Olá! Tive um problema com o pagamento do Projeto 45 Graus';

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-light)]">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <BrandLogo size="sm" />
          </motion.div>

          {/* Error Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-light)]">
              Ops! Algo deu errado com seu pagamento
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              Não se preocupe, isso acontece. Vamos te ajudar a resolver!
            </p>
          </motion.div>

          {/* Possíveis Causas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] rounded-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[var(--gold-primary)]">
              Possíveis causas:
            </h2>

            <ul className="space-y-4 text-[var(--text-muted)]">
              <li className="flex gap-3">
                <span className="text-[var(--gold-primary)]">•</span>
                <span>Dados do cartão incorretos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold-primary)]">•</span>
                <span>Limite do cartão insuficiente</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold-primary)]">•</span>
                <span>Cartão bloqueado ou vencido</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold-primary)]">•</span>
                <span>Problema temporário com a operadora</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold-primary)]">•</span>
                <span>Pagamento cancelado durante o processo</span>
              </li>
            </ul>
          </motion.div>

          {/* O que fazer agora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] rounded-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[var(--gold-primary)]">
              O que fazer agora:
            </h2>

            <div className="space-y-6">
              {/* Opção 1 */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--text-light)]">
                  <RefreshCw className="w-6 h-6 text-[var(--gold-primary)]" />
                  Tente novamente
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  Verifique os dados do seu cartão e tente realizar o pagamento novamente.
                  Suas vagas ainda estão disponíveis!
                </p>
                <Link
                  href="/projeto45dias"
                  className="inline-flex items-center gap-2 bg-[var(--gold-primary)] text-black px-6 py-3 rounded-lg font-bold hover:bg-[var(--gold-light)] transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  TENTAR NOVAMENTE
                </Link>
              </div>

              {/* Opção 2 */}
              <div className="pt-6 border-t border-[var(--gold-dark)]">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--text-light)]">
                  <MessageCircle className="w-6 h-6 text-[var(--gold-primary)]" />
                  Fale conosco
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  Está com dúvidas ou precisa de ajuda? Nossa equipe está pronta para te ajudar
                  pelo WhatsApp.
                </p>
                <a
                  href={whatsappSupportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20BA5A] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  FALAR NO WHATSAPP
                </a>
              </div>
            </div>
          </motion.div>

          {/* Lembrete de Urgência */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-[var(--accent-red)]/10 border border-[var(--accent-red)] rounded-xl p-6 text-center"
          >
            <p className="text-[var(--text-light)] font-semibold mb-2">
              ⚠️ Atenção: As vagas são limitadas!
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              Quanto mais rápido você resolver o problema do pagamento, maior a chance de
              garantir sua vaga no lote atual com o melhor preço.
            </p>
          </motion.div>

          {/* Voltar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-8"
          >
            <Link
              href="/projeto45dias"
              className="inline-flex items-center gap-2 text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para a página do Projeto
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
