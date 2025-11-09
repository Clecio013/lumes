'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar as CalendarIcon, Users, BookOpen, Sparkles, Loader2, ChevronDownIcon, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ptBR } from 'date-fns/locale';
import { BrandLogo } from '../components/brand-logo';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PageState = 'loading' | 'pending' | 'form' | 'complete' | 'error';

interface PaymentData {
  nome: string;
  email: string;
  telefone: string;
  preco: number;
  hasNascimento: boolean;
  paymentId: string;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id') || searchParams.get('session_id'); // Aceitar payment_id (MP) ou session_id (Stripe)
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  const [state, setState] = useState<PageState>('loading');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [nascimento, setNascimento] = useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/xxx';

  // Fetch payment data on mount
  useEffect(() => {
    // Se status=pending (PIX ou outro método aguardando), mostrar tela de pendente
    if (status === 'pending') {
      if (!paymentId) {
        setState('error');
        setError('ID de pagamento não encontrado. Se você acabou de fazer o pagamento, aguarde alguns instantes e tente novamente.');
        return;
      }
      setState('pending');
      // Iniciar polling para verificar se pagamento foi aprovado
      startPolling(paymentId);
      return;
    }

    // Para outros casos, payment_id é obrigatório
    if (!paymentId) {
      setState('error');
      setError('ID de pagamento não encontrado na URL');
      return;
    }

    fetchPaymentData(paymentId);
  }, [paymentId, status]);

  // Limpar polling ao desmontar
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Polling para verificar se pagamento foi aprovado
  const startPolling = (id: string) => {
    let attempts = 0;
    const maxAttempts = 180; // 15 minutos (180 * 5s = 900s)

    // Verificar a cada 5 segundos
    const interval = setInterval(async () => {
      attempts++;

      // Timeout após 15 minutos (para boleto/métodos lentos)
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setPollingInterval(null);
        console.log('[Polling] Timeout após 15 minutos. Usuário deve recarregar manualmente.');
        return;
      }

      try {
        const res = await fetch(`/api/payment-data?payment_id=${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            // Pagamento aprovado! Parar polling e mostrar formulário
            clearInterval(interval);
            setPollingInterval(null);
            setPaymentData(data.data);
            setState(data.data.hasNascimento ? 'complete' : 'form');
          }
        }
      } catch (err) {
        // Continuar tentando
        console.log('Aguardando aprovação do pagamento...', `(${attempts}/${maxAttempts})`);
      }
    }, 5000);

    setPollingInterval(interval);
  };

  const fetchPaymentData = async (id: string) => {
    try {
      const res = await fetch(`/api/payment-data?payment_id=${id}`);

      if (!res.ok) {
        throw new Error('Pagamento não encontrado');
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Erro ao buscar dados');
      }

      setPaymentData(data.data);

      // Se já tem nascimento, ir direto para complete
      if (data.data.hasNascimento) {
        setState('complete');
      } else {
        setState('form');
      }
    } catch (err: any) {
      console.error('Erro ao buscar dados do pagamento:', err);
      setState('error');
      setError(err.message || 'Erro ao carregar dados. Entre em contato com o suporte.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!nascimento) {
      setError('Por favor, selecione sua data de nascimento');
      setIsSubmitting(false);
      return;
    }

    try {
      // Converter Date para string YYYY-MM-DD
      const nascimentoStr = nascimento.toISOString().split('T')[0];

      const res = await fetch('/api/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: paymentData?.paymentId,
          nascimento: nascimentoStr,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao salvar dados');
      }

      // Sucesso! Ir para estado complete
      setState('complete');
    } catch (err: any) {
      console.error('Erro ao completar cadastro:', err);
      setError(err.message || 'Erro ao salvar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calcular data mínima (18 anos atrás) e máxima (100 anos atrás)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  // LOADING STATE
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-zinc-400">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  // PENDING STATE (PIX aguardando pagamento)
  if (state === 'pending') {
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

            {/* Icon Animado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
                </motion.div>
              </div>
            </motion.div>

            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Aguardando confirmação do pagamento
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {paymentType === 'bank_transfer' ? (
                  <>Seu PIX foi gerado! Assim que confirmarmos o pagamento, você poderá continuar.</>
                ) : paymentType === 'ticket' ? (
                  <>Seu boleto foi gerado! Após o pagamento (1-3 dias úteis), você receberá um email de confirmação.</>
                ) : paymentType === 'atm' ? (
                  <>Pagamento em lotérica gerado! Após efetuar o pagamento, você receberá um email de confirmação.</>
                ) : (
                  <>Estamos aguardando a confirmação do seu pagamento. Isso pode levar alguns minutos.</>
                )}
              </p>
            </motion.div>

            {/* Instruções */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-zinc-900 border border-yellow-500/30 rounded-2xl p-8 md:p-12 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">
                {paymentType === 'bank_transfer' ? '📱 Para concluir:' : '⏰ Próximos passos:'}
              </h2>

              {paymentType === 'bank_transfer' ? (
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-yellow-500">1.</span>
                    <span>Abra o app do seu banco</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">2.</span>
                    <span>Acesse a área PIX</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">3.</span>
                    <span>Escaneie o QR Code ou cole o código Pix Copia e Cola</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">4.</span>
                    <span><strong>Confirme o pagamento</strong></span>
                  </div>
                  <div className="flex gap-3 mt-6 p-4 bg-zinc-800 rounded-lg">
                    <span className="text-yellow-500">✓</span>
                    <span>Após o pagamento, <strong>esta página será atualizada automaticamente</strong> em alguns segundos</span>
                  </div>
                </div>
              ) : paymentType === 'ticket' ? (
                // Boleto - instruções específicas
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-yellow-500">1.</span>
                    <span>Seu boleto foi gerado e enviado para o email cadastrado</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">2.</span>
                    <span>Você pode pagar em qualquer banco, lotérica ou app de pagamentos</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">3.</span>
                    <span>Após o pagamento, <strong>o banco pode levar de 1 a 3 dias úteis</strong> para processar</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">4.</span>
                    <span>Você receberá um <strong>email de confirmação</strong> assim que constatarmos o pagamento</span>
                  </div>
                  <div className="flex gap-3 mt-6 p-4 bg-zinc-800 rounded-lg">
                    <span className="text-yellow-500">✓</span>
                    <span><strong>Pode fechar esta página!</strong> Você receberá um email com os próximos passos quando o pagamento for confirmado.</span>
                  </div>
                </div>
              ) : paymentType === 'atm' ? (
                // Lotérica/ATM - instruções específicas
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-yellow-500">1.</span>
                    <span>Seu código de pagamento foi gerado e enviado para o email cadastrado</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">2.</span>
                    <span>Leve o código ou o email impresso até uma lotérica ou correspondente bancário</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">3.</span>
                    <span>Após efetuar o pagamento, <strong>pode levar algumas horas</strong> para processar</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">4.</span>
                    <span>Você receberá um <strong>email de confirmação</strong> assim que constatarmos o pagamento</span>
                  </div>
                  <div className="flex gap-3 mt-6 p-4 bg-zinc-800 rounded-lg">
                    <span className="text-yellow-500">✓</span>
                    <span><strong>Pode fechar esta página!</strong> Você receberá um email com os próximos passos quando o pagamento for confirmado.</span>
                  </div>
                </div>
              ) : (
                // Cartão de crédito ou método genérico
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Estamos verificando seu pagamento com a operadora</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Isso pode levar alguns minutos</span>
                  </div>
                  <div className="flex gap-3 mt-6 p-4 bg-zinc-800 rounded-lg">
                    <span className="text-yellow-500">✓</span>
                    <span><strong>Aguarde nesta página.</strong> Você será redirecionado automaticamente quando o pagamento for confirmado.</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-6 text-center"
            >
              <p className="text-white font-semibold mb-2 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {paymentType === 'bank_transfer'
                  ? 'Verificando pagamento PIX automaticamente...'
                  : paymentType === 'ticket' || paymentType === 'atm'
                  ? 'Verificando pagamento (esta verificação irá parar em 15 minutos)'
                  : 'Verificando pagamento automaticamente...'}
              </p>
              <p className="text-gray-400 text-sm">
                {paymentType === 'bank_transfer'
                  ? 'Atualizando a cada 5 segundos - geralmente leva menos de 1 minuto'
                  : paymentType === 'ticket' || paymentType === 'atm'
                  ? 'Você receberá um email quando o pagamento for confirmado'
                  : 'Atualizando a cada 5 segundos'}
              </p>
            </motion.div>

            {/* Suporte */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-8"
            >
              <p className="text-gray-400 text-sm mb-4">
                {paymentType === 'bank_transfer'
                  ? 'Problemas com o pagamento PIX?'
                  : paymentType === 'ticket'
                  ? 'Não recebeu o boleto ou precisa de ajuda?'
                  : paymentType === 'atm'
                  ? 'Não recebeu o código de pagamento?'
                  : 'Problemas com o pagamento?'}
              </p>
              <a
                href={`https://wa.me/5511950822727?text=Olá! Preciso de ajuda com meu pagamento${
                  paymentType === 'bank_transfer'
                    ? ' PIX'
                    : paymentType === 'ticket'
                    ? ' por boleto'
                    : paymentType === 'atm'
                    ? ' em lotérica'
                    : ''
                } - Payment ID: ${paymentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com o suporte
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <BrandLogo size="sm" />
            <div className="mt-12">
              <h1 className="text-3xl font-bold text-red-500 mb-4">Ops! Algo deu errado</h1>
              <p className="text-zinc-400 mb-8">{error}</p>
              <p className="text-zinc-500 text-sm mb-6">
                Se você acabou de fazer o pagamento, aguarde alguns segundos e recarregue a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FORM STATE
  if (state === 'form' && paymentData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <BrandLogo size="sm" />
            </motion.div>

            {/* Success Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </motion.div>

            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">
                Pagamento Confirmado! 🎉
              </h1>
              <p className="text-lg md:text-xl text-zinc-400">
                Olá, <span className="text-amber-500 font-semibold">{paymentData.nome}</span>!
              </p>
              <p className="text-lg md:text-xl text-zinc-400">
                Sua vaga no Projeto 45 Graus está garantida.
              </p>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-center mb-2 text-amber-500">
                📋 Complete Seu Cadastro
              </h2>
              <p className="text-center text-zinc-400 mb-8">
                Precisamos da sua data de nascimento para agendar suas consultas com a Seyune e o Amauri.
              </p>

              {/* Dados já salvos (readonly) */}
              <div className="space-y-4 mb-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-1">Nome</label>
                  <p className="text-zinc-50">{paymentData.nome}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-1">Email</label>
                  <p className="text-zinc-50">{paymentData.email}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nascimento" className="text-zinc-300 mb-3 block">
                    Data de Nascimento *
                  </Label>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="nascimento"
                        className="w-full justify-between font-normal bg-zinc-800 border-zinc-700 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 h-12"
                      >
                        {nascimento ? (
                          nascimento.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                        ) : (
                          <span className="text-zinc-500">Selecione sua data de nascimento</span>
                        )}
                        <ChevronDownIcon className="w-4 h-4 text-zinc-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700" align="start">
                      <Calendar
                        mode="single"
                        selected={nascimento}
                        onSelect={(date) => {
                          setNascimento(date);
                          setIsPopoverOpen(false);
                        }}
                        locale={ptBR}
                        captionLayout="dropdown"
                        hidden={{
                          before: minDate,
                          after: maxDate,
                        }}
                        defaultMonth={new Date(1995, 0)}
                        disabled={(date) => date > maxDate || date < minDate}
                        formatters={{
                          formatMonthDropdown: (date) => {
                            const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
                            return monthName.charAt(0).toUpperCase() + monthName.charAt(1);
                          },
                          formatYearDropdown: (date) => String(date.getFullYear()),
                          formatWeekdayName: (date) => {
                            const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });
                            // Remove ponto e capitaliza primeira letra
                            const clean = weekday.replace('.', '');
                            return clean.charAt(0).toUpperCase() + clean.slice(1);
                          },
                        }}
                        className={cn(
                          '[&_.rdp-month_caption]:text-zinc-50',
                          '[&_.rdp-weekday]:text-zinc-400',
                          '[&_button]:text-zinc-50',
                          '[&_.rdp-dropdown]:text-zinc-50 [&_.rdp-dropdown]:bg-transparent',
                          '[&_.rdp-dropdown_root]:border-zinc-700 [&_.rdp-dropdown_root]:bg-zinc-800',
                          '[&_.rdp-caption_label]:text-zinc-50 [&_.rdp-caption_label]:!text-zinc-50',
                          '[&_select]:text-zinc-50',
                          '[&_svg]:text-zinc-400',
                          '[&_.rdp-dropdowns]:text-zinc-50',
                          '[&_.rdp-dropdowns_root]:text-zinc-50',
                        )}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !nascimento}
                  className="w-full bg-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Completar Cadastro'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // COMPLETE STATE
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <BrandLogo size="sm" />
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6">
              CADASTRO COMPLETO! ✅
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Você está pronta para começar sua transformação no Projeto 45 Graus!
            </p>
          </motion.div>

          {/* Próximos Passos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-amber-500">
              📬 Próximos Passos
            </h2>

            <div className="space-y-6">
              {/* Passo 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-50">Verifique seu email</h3>
                  <p className="text-zinc-400">
                    Enviamos um email de confirmação com todas as informações importantes. Caso não encontre,
                    verifique a caixa de spam.
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-50">Entre no grupo VIP do WhatsApp</h3>
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
                    Em breve você receberá as orientações para agendar suas consultas individuais de 30 minutos
                    com a Seyune (nutricionista) e com o Amauri (personal trainer).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* O que você recebe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-500" />
              <span className="text-amber-500">O Que Você Recebe</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Consulta individual de 30min com Seyune (Nutricionista)</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Consulta individual de 30min com Amauri (Personal Trainer)</span>
              </div>

              <div className="flex gap-3">
                <CalendarIcon className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Plano alimentar 100% personalizado</span>
              </div>

              <div className="flex gap-3">
                <BookOpen className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Planilha de treino individualizada para 45 dias</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Grupo VIP WhatsApp com suporte direto</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Acompanhamento durante todo o programa</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Garantia de 7 dias (satisfação ou devolução)</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-50">Suporte durante todo o programa</span>
              </div>
            </div>
          </motion.div>

          {/* Início do Programa */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-2">📅 O programa começa em</p>
            <p className="text-2xl md:text-3xl font-bold text-amber-500">15 de Dezembro de 2025</p>
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
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="text-zinc-50">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-xl text-zinc-400">Carregando...</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
