'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Phone, Loader2, CheckCircle, ChevronDown, User, Mail, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface CompleteDataBeforeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  loteId: number;
}

export const CompleteDataBeforeCheckout: React.FC<CompleteDataBeforeCheckoutProps> = ({
  isOpen,
  onClose,
  loteId,
}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [date, setDate] = useState<Date>();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setTelefone(formatted);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10 || numbers.length === 11;
  };

  const validateDate = (date: Date): boolean => {
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age >= 18 && age <= 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!nome || !email || !telefone || !date) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (nome.split(' ').length < 2) {
      setError('Por favor, informe seu nome completo');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    if (!validatePhone(telefone)) {
      setError('Telefone inválido. Use o formato (XX) XXXXX-XXXX');
      return;
    }

    if (!validateDate(date)) {
      setError('Data de nascimento inválida. Você deve ter entre 18 e 100 anos.');
      return;
    }

    setLoading(true);

    try {
      // 1. Salvar lead no Google Sheets
      const leadResponse = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          telefone: telefone.replace(/\D/g, ''),
          nascimento: format(date, 'yyyy-MM-dd'),
          lote_id: loteId,
        }),
      });

      if (!leadResponse.ok) {
        const leadData = await leadResponse.json();
        throw new Error(leadData.error || 'Erro ao salvar seus dados');
      }

      // 2. Criar checkout no Mercado Pago
      const checkoutResponse = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          telefone: telefone.replace(/\D/g, ''),
          nascimento: format(date, 'yyyy-MM-dd'),
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (!checkoutResponse.ok) {
        throw new Error(checkoutData.error || 'Erro ao criar checkout');
      }

      // 3. Armazenar dados no localStorage (backup)
      localStorage.setItem('projeto45_lead_data', JSON.stringify({
        nome,
        email,
        telefone: telefone.replace(/\D/g, ''),
        nascimento: format(date, 'yyyy-MM-dd'),
        preference_id: checkoutData.preferenceId,
      }));

      // 4. Redirecionar para Mercado Pago
      window.location.href = checkoutData.checkoutUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar solicitação';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] cursor-pointer"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-8 relative my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-50 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-50 mb-2">
                  Garanta sua vaga!
                </h3>
                <p className="text-zinc-400">
                  Preencha seus dados para continuar com a inscrição
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome Completo */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-zinc-200 mb-2"
                  >
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="João Silva"
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-amber-500/30 rounded-lg text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-200 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-amber-500/30 rounded-lg text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-zinc-200 mb-2"
                  >
                    Telefone/WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      id="telefone"
                      value={telefone}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-amber-500/30 rounded-lg text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label
                    htmlFor="nascimento"
                    className="block text-sm font-medium text-zinc-200 mb-2"
                  >
                    Data de Nascimento
                  </label>
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        disabled={loading}
                        className={cn(
                          "w-full px-4 py-3 bg-zinc-950 border border-amber-500/30 rounded-lg text-left flex items-center justify-between gap-2",
                          "focus:outline-none focus:border-amber-500 transition-colors",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          !date && "text-zinc-500"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setDatePickerOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        fromYear={1924}
                        toYear={new Date().getFullYear()}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="projeto45-cta w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      CONTINUAR PARA PAGAMENTO
                    </>
                  )}
                </button>
              </form>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-zinc-500">
                  🔒 Seus dados estão seguros e protegidos
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
