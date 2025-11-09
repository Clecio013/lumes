'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, CheckCircle, Shield, CreditCard, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import checkout styles
import './styles.css';

// shadcn/ui components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Custom components
import { PersonalDataForm, type PersonalData } from './components/personal-data-form';
import { CardPaymentForm, type CardData } from './components/card-payment-form';
import { PixPaymentForm } from './components/pix-payment-form';
import { PixQRCodeDisplay } from './components/pix-qrcode-display';
import { OrderSummary } from './components/order-summary';
import { BrandLogo } from '../components/brand-logo';

// Core Methods
import {
  CardFieldsManager,
  CardTokenizer,
  InstallmentsManager,
  type InstallmentOption,
} from '@/lib/@lumes/mercadopago';

// Validators
import {
  validateCPF,
  validatePhone,
  validateAge,
  validateEmail,
} from '@/lib/validators/brazilian-validators';

type PaymentMethod = 'card' | 'pix';

type CheckoutStep = 'form' | 'pix-qrcode' | 'processing' | 'success';

interface PixData {
  qrCodeBase64: string;
  qrCodeText: string;
  expiresAt: string;
  paymentId: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Form data
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    email: '',
    phone: '',
    birthdate: '',
    cpf: '',
  });

  const [cardData, setCardData] = useState<CardData>({
    cardholderName: '',
    installments: 1,
  });

  // Validation errors
  const [personalErrors, setPersonalErrors] = useState<Partial<Record<keyof PersonalData, string>>>({});
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardData, string>>>({});

  // Checkout state
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('form');
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Core Methods managers
  const [cardFieldsManager, setCardFieldsManager] = useState<CardFieldsManager | null>(null);
  const [cardTokenizer, setCardTokenizer] = useState<CardTokenizer | null>(null);
  const [installmentsManager, setInstallmentsManager] = useState<InstallmentsManager | null>(null);

  // Installments state
  const [installmentOptions, setInstallmentOptions] = useState<InstallmentOption[] | null>(null);
  const [isLoadingInstallments, setIsLoadingInstallments] = useState(false);

  // Amount (R$ 397,00 para o Projeto 45 Dias)
  const amount = 397.0;

  // Initialize Core Methods (Card Fields)
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
    if (!publicKey) {
      console.error('NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY não configurada');
      return;
    }

    const manager = new CardFieldsManager(publicKey);
    const instManager = new InstallmentsManager(publicKey);

    setCardFieldsManager(manager);
    setInstallmentsManager(instManager);

    // Initialize card fields when payment method is card
    if (paymentMethod === 'card') {
      manager
        .createAllFields(
          {
            cardNumber: 'cardNumber',
            expirationDate: 'expirationDate',
            securityCode: 'securityCode',
          },
          {
            global: {
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                '::placeholder': {
                  color: '#a8a8a8',
                },
              },
            },
          }
        )
        .then(() => {
          // Criar tokenizer com SDK já inicializado
          const sdk = manager.getSDK();
          const tokenizer = new CardTokenizer(sdk);
          setCardTokenizer(tokenizer);

          // Buscar o card number field para detectar BIN
          const cardNumberField = manager.getField('cardNumber');

          if (cardNumberField) {
            instManager.detectBinFromCardField(cardNumberField, async (bin, paymentMethodId) => {
              setIsLoadingInstallments(true);
              try {
                const options = await instManager.getInstallments({
                  amount,
                  bin,
                  paymentMethodId: paymentMethodId || undefined,
                });
                setInstallmentOptions(options);
                // Definir primeira opção como padrão
                if (options.length > 0) {
                  setCardData((prev) => ({ ...prev, installments: options[0].installments }));
                }
              } catch (error) {
                console.error('Erro ao buscar parcelas:', error);
                setInstallmentOptions([]);
              } finally {
                setIsLoadingInstallments(false);
              }
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao inicializar card fields:', error);
        });
    }

    // Cleanup on unmount
    return () => {
      manager.unmountAll();
    };
  }, [paymentMethod, amount]);

  // Validate personal data field
  const validatePersonalField = (field: keyof PersonalData) => {
    const errors: Partial<Record<keyof PersonalData, string>> = {};

    switch (field) {
      case 'fullName':
        if (!personalData.fullName.trim()) {
          errors.fullName = 'Nome completo é obrigatório';
        } else if (personalData.fullName.trim().split(' ').length < 2) {
          errors.fullName = 'Digite nome e sobrenome';
        }
        break;

      case 'email':
        if (!personalData.email) {
          errors.email = 'Email é obrigatório';
        } else if (!validateEmail(personalData.email)) {
          errors.email = 'Email inválido';
        }
        break;

      case 'phone':
        if (!personalData.phone) {
          errors.phone = 'Telefone é obrigatório';
        } else if (!validatePhone(personalData.phone)) {
          errors.phone = 'Telefone inválido';
        }
        break;

      case 'birthdate':
        if (!personalData.birthdate) {
          errors.birthdate = 'Data de nascimento é obrigatória';
        } else {
          const validation = validateAge(personalData.birthdate);
          if (!validation.valid) {
            errors.birthdate = validation.error;
          }
        }
        break;

      case 'cpf':
        if (!personalData.cpf) {
          errors.cpf = 'CPF é obrigatório';
        } else if (!validateCPF(personalData.cpf)) {
          errors.cpf = 'CPF inválido';
        }
        break;
    }

    setPersonalErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  // Validate card data field
  const validateCardField = (field: keyof CardData) => {
    const errors: Partial<Record<keyof CardData, string>> = {};

    if (field === 'cardholderName') {
      if (!cardData.cardholderName.trim()) {
        errors.cardholderName = 'Nome no cartão é obrigatório';
      } else if (cardData.cardholderName.trim().length < 3) {
        errors.cardholderName = 'Nome muito curto';
      }
    }

    setCardErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  // Validate all personal data
  const validateAllPersonalData = (): boolean => {
    const fields: Array<keyof PersonalData> = ['fullName', 'email', 'phone', 'birthdate', 'cpf'];
    const results = fields.map((field) => validatePersonalField(field));
    return results.every((valid) => valid);
  };

  // Validate all card data
  const validateAllCardData = (): boolean => {
    const fields: Array<keyof CardData> = ['cardholderName'];
    const results = fields.map((field) => validateCardField(field));
    return results.every((valid) => valid);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate personal data
    if (!validateAllPersonalData()) {
      setErrorMessage('Por favor, corrija os erros no formulário');
      return;
    }

    // Validate payment-specific data
    if (paymentMethod === 'card') {
      if (!validateAllCardData()) {
        setErrorMessage('Por favor, corrija os erros no formulário');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === 'card') {
        await handleCardPayment();
      } else {
        await handlePixPayment();
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao processar pagamento. Tente novamente.'
      );
      setIsSubmitting(false);
    }
  };

  // Handle card payment
  const handleCardPayment = async () => {
    if (!cardTokenizer) {
      throw new Error('Tokenizador não inicializado');
    }

    // Create card token
    const token = await cardTokenizer.createToken({
      cardholderName: cardData.cardholderName,
      identificationType: 'CPF',
      identificationNumber: personalData.cpf,
    });

    // Send to API
    const response = await fetch('/api/checkout/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'card',
        token: token.id,
        paymentMethodId: token.payment_method_id, // visa, master, elo, etc.
        installments: cardData.installments,
        amount,
        personalData: {
          fullName: personalData.fullName,
          email: personalData.email,
          phone: personalData.phone,
          birthdate: personalData.birthdate,
          cpf: personalData.cpf,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erro ao processar pagamento');
    }

    // Success - redirect to thank you page
    setCheckoutStep('success');
    setTimeout(() => {
      router.push(`/projeto45dias/obrigado?payment_id=${result.paymentId}`);
    }, 1500);
  };

  // Handle PIX payment
  const handlePixPayment = async () => {
    // Send to API to generate PIX
    const response = await fetch('/api/checkout/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'pix',
        amount,
        personalData: {
          fullName: personalData.fullName,
          email: personalData.email,
          phone: personalData.phone,
          birthdate: personalData.birthdate,
          cpf: personalData.cpf,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erro ao gerar PIX');
    }

    // Show QR Code
    setPixData({
      qrCodeBase64: result.qrCode,
      qrCodeText: result.qrCodeText,
      expiresAt: result.expiresAt,
      paymentId: result.paymentId,
    });
    setCheckoutStep('pix-qrcode');
    setIsSubmitting(false);

    // Start polling for payment
    startPixPolling(result.paymentId);
  };

  // Poll for PIX payment confirmation
  const startPixPolling = (paymentId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/checkout/check-payment?payment_id=${paymentId}`);
        const result = await response.json();

        if (result.status === 'approved') {
          clearInterval(interval);
          setCheckoutStep('success');
          setTimeout(() => {
            router.push(`/projeto45dias/obrigado?payment_id=${paymentId}`);
          }, 1500);
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
      }
    }, 5000); // Check every 5 seconds

    // Stop polling after 30 minutes
    setTimeout(() => clearInterval(interval), 30 * 60 * 1000);
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="checkout-container">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#d4af37]/30">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/projeto45dias"
            className="flex items-center gap-2 font-semibold transition-colors"
            style={{ color: '#d4af37' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f4d03f')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#d4af37')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <BrandLogo size="sm" />
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          {checkoutStep === 'form' && (
            <motion.div
              key="form"
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Coluna Esquerda: Resumo da Compra */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <OrderSummary amount={amount} />
              </motion.div>

              {/* Coluna Direita: Formulário de Pagamento */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Card className="checkout-card p-6 md:p-8 shadow-xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                    Finalizar Pagamento
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Data Section */}
                    <PersonalDataForm
                      data={personalData}
                      onChange={setPersonalData}
                      errors={personalErrors}
                      onValidate={validatePersonalField}
                    />

                    {/* Divider */}
                    <div className="checkout-divider border-t-2" />

                    {/* Payment Method Tabs */}
                    <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                      <div className="space-y-4">
                        <h3 className="checkout-label">Método de Pagamento</h3>
                        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-[#151515] border border-[#aa8a2e]">
                          <TabsTrigger
                            value="card"
                            className="cursor-pointer data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f4d03f] data-[state=active]:text-black py-3 text-base font-bold text-[#a8a8a8] transition-all flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-5 h-5" />
                            Cartão de Crédito
                          </TabsTrigger>
                          <TabsTrigger
                            value="pix"
                            className="cursor-pointer data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f4d03f] data-[state=active]:text-black py-3 text-base font-bold text-[#a8a8a8] transition-all flex items-center justify-center gap-2"
                          >
                            <Smartphone className="w-5 h-5" />
                            PIX
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="card" className="space-y-4 mt-6">
                        <CardPaymentForm
                          data={cardData}
                          onChange={setCardData}
                          errors={cardErrors}
                          onValidate={validateCardField}
                          installmentOptions={installmentOptions}
                          isLoadingInstallments={isLoadingInstallments}
                        />
                      </TabsContent>

                      <TabsContent value="pix" className="space-y-4 mt-6">
                        <PixPaymentForm amount={amount} />
                      </TabsContent>
                    </Tabs>

                    {/* Error Message */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="checkout-error"
                      >
                        <p className="font-medium">{errorMessage}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="checkout-submit-btn w-full py-6 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Processando...
                          </>
                        ) : paymentMethod === 'card' ? (
                          'Finalizar Pagamento'
                        ) : (
                          'Gerar PIX'
                        )}
                      </Button>
                    </motion.div>

                    {/* Security Notice */}
                    <p className="checkout-security flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      Pagamento 100% seguro via Mercado Pago
                    </p>
                  </form>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {checkoutStep === 'pix-qrcode' && pixData && (
            <motion.div
              key="pix-qrcode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="checkout-card p-6 md:p-8 shadow-xl">
                <PixQRCodeDisplay
                  qrCodeBase64={pixData.qrCodeBase64}
                  qrCodeText={pixData.qrCodeText}
                  amount={amount}
                  expiresAt={pixData.expiresAt}
                />
              </Card>
            </motion.div>
          )}

          {checkoutStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <Card className="checkout-success-card p-12 shadow-xl text-center">
                <CheckCircle className="checkout-success-icon w-20 h-20 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Pagamento Confirmado!</h2>
                <p className="text-[#a8a8a8]">Redirecionando...</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
