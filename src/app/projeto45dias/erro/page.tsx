'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrandLogo } from '../components/brand-logo';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const whatsappSupportLink = 'https://wa.me/5511950822727?text=Olá! Tive um problema com o pagamento do Projeto 45 Graus';

  // Detectar se foi cancelamento (todos parâmetros null) vs erro real
  const paymentId = searchParams.get('payment_id');
  const collectionStatus = searchParams.get('collection_status');
  const status = searchParams.get('status');

  // Se payment_id é null, significa que usuário voltou sem tentar pagar
  const isCancellation = paymentId === 'null' || !paymentId;

  // Estado para loading do checkout
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  // Função para criar checkout e redirecionar
  const handleRetryCheckout = async () => {
    setIsCreatingCheckout(true);

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirecionar para Mercado Pago
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Erro ao criar checkout:', data.error);
        alert('Erro ao criar checkout. Tente novamente.');
        setIsCreatingCheckout(false);
      }
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      alert('Erro ao criar checkout. Tente novamente.');
      setIsCreatingCheckout(false);
    }
  };

  return (
    <div className="projeto45-container min-h-screen">
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

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              isCancellation
                ? 'bg-yellow-500/20'
                : 'bg-red-500/20'
            }`}>
              {isCancellation ? (
                <AlertCircle className="w-16 h-16 text-yellow-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
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
              {isCancellation
                ? 'Você não finalizou seu pagamento'
                : 'Ops! Algo deu errado com seu pagamento'
              }
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              {isCancellation
                ? 'Notamos que você voltou sem completar a compra. Suas vagas ainda estão disponíveis!'
                : 'Não se preocupe, isso acontece. Vamos te ajudar a resolver!'
              }
            </p>
          </motion.div>

          {/* Possíveis Causas - Apenas para erros reais */}
          {!isCancellation && (
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
          )}

          {/* O que fazer agora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] rounded-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[var(--gold-primary)]">
              {isCancellation ? 'Pronto para garantir sua vaga?' : 'O que fazer agora:'}
            </h2>

            <div className="space-y-6">
              {/* Opção 1 */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--text-light)]">
                  <RefreshCw className="w-6 h-6 text-[var(--gold-primary)]" />
                  {isCancellation ? 'Finalizar minha compra' : 'Tente novamente'}
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  {isCancellation
                    ? 'Suas vagas ainda estão reservadas! Clique no botão abaixo para finalizar seu pagamento e garantir sua transformação.'
                    : 'Verifique os dados do seu cartão e tente realizar o pagamento novamente. Suas vagas ainda estão disponíveis!'
                  }
                </p>

                {isCancellation ? (
                  <button
                    onClick={handleRetryCheckout}
                    disabled={isCreatingCheckout}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-black"
                    style={{
                      background: isCreatingCheckout
                        ? 'linear-gradient(135deg, #aa8a2e 0%, #d4af37 100%)'
                        : 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
                    }}
                  >
                    <RefreshCw className={`w-5 h-5 ${isCreatingCheckout ? 'animate-spin' : ''}`} />
                    {isCreatingCheckout ? 'PROCESSANDO...' : 'FINALIZAR MINHA COMPRA'}
                  </button>
                ) : (
                  <Link
                    href="/projeto45dias"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold transition-all text-black hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
                    }}
                  >
                    <RefreshCw className="w-5 h-5" />
                    TENTAR NOVAMENTE
                  </Link>
                )}
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
            className={`border rounded-xl p-6 text-center ${
              isCancellation
                ? 'bg-[var(--gold-primary)]/10 border-[var(--gold-primary)]'
                : 'bg-[var(--accent-red)]/10 border-[var(--accent-red)]'
            }`}
          >
            <p className="text-[var(--text-light)] font-semibold mb-2">
              {isCancellation ? '⏰ Sua vaga ainda está disponível!' : '⚠️ Atenção: As vagas são limitadas!'}
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              {isCancellation
                ? 'Não perca essa oportunidade! Finalize sua compra agora e comece sua transformação em 45 dias.'
                : 'Quanto mais rápido você resolver o problema do pagamento, maior a chance de garantir sua vaga no lote atual com o melhor preço.'
              }
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
