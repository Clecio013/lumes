'use client';

import { useState } from 'react';
import { CreditCard, User as UserIcon, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { InstallmentOption } from '@/lib/@lumes/mercadopago';

export interface CardData {
  cardholderName: string;
  installments: number;
}

interface CardPaymentFormProps {
  data: CardData;
  onChange: (data: CardData) => void;
  errors: Partial<Record<keyof CardData, string>>;
  onValidate: (field: keyof CardData) => void;
  installmentOptions: InstallmentOption[] | null;
  isLoadingInstallments?: boolean;
}

export function CardPaymentForm({
  data,
  onChange,
  errors,
  onValidate,
  installmentOptions,
  isLoadingInstallments = false,
}: CardPaymentFormProps) {
  const [touched, setTouched] = useState<Partial<Record<keyof CardData, boolean>>>({});

  const handleBlur = (field: keyof CardData) => {
    setTouched({ ...touched, [field]: true });
    onValidate(field);
  };

  const showError = (field: keyof CardData) => touched[field] && errors[field];

  // Debug: log installment options
  console.log('[CardPaymentForm] installmentOptions:', installmentOptions);
  console.log('[CardPaymentForm] isLoadingInstallments:', isLoadingInstallments);

  return (
    <div className="space-y-4">
      <h3 className="checkout-label mb-4">Dados do Cartão</h3>

      {/* Número do Cartão (iframe MP) */}
      <div>
        <Label htmlFor="cardNumber" className="checkout-label mb-2">
          Número do Cartão
        </Label>
        <div id="cardNumber" className="checkout-iframe w-full" />
        <p className="mt-1 text-xs text-[#a8a8a8]">Seu cartão está seguro (criptografado)</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Validade (iframe MP) */}
        <div>
          <Label htmlFor="expirationDate" className="checkout-label mb-2">
            Validade
          </Label>
          <div id="expirationDate" className="checkout-iframe w-full" />
        </div>

        {/* CVV (iframe MP) */}
        <div>
          <Label htmlFor="securityCode" className="checkout-label mb-2">
            CVV
          </Label>
          <div id="securityCode" className="checkout-iframe w-full" />
        </div>
      </div>

      {/* Nome no Cartão */}
      <div>
        <Label htmlFor="cardholderName" className="checkout-label mb-2">
          Nome no Cartão
        </Label>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="text"
            id="cardholderName"
            value={data.cardholderName}
            onChange={(e) => onChange({ ...data, cardholderName: e.target.value.toUpperCase() })}
            onBlur={() => handleBlur('cardholderName')}
            placeholder="MARIA DA SILVA"
            className={`
              checkout-input pl-12 uppercase
              ${
                showError('cardholderName')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('cardholderName') && (
          <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
        )}
        <p className="mt-1 text-xs text-[#a8a8a8]">Como está escrito no cartão</p>
      </div>

      {/* Parcelas */}
      <div>
        <Label htmlFor="installments" className="checkout-label mb-2">
          Parcelas
        </Label>
        <div className="relative">
          {isLoadingInstallments ? (
            <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 animate-spin" style={{ color: '#d4af37' }} />
          ) : (
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: '#d4af37' }} />
          )}
          <select
            id="installments"
            value={data.installments}
            onChange={(e) => onChange({ ...data, installments: parseInt(e.target.value) })}
            disabled={isLoadingInstallments || !installmentOptions || installmentOptions.length === 0}
            className="checkout-select w-full pl-12 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem',
            }}
          >
            {isLoadingInstallments ? (
              <option>Carregando parcelas...</option>
            ) : !installmentOptions || installmentOptions.length === 0 ? (
              <option>Digite o número do cartão primeiro</option>
            ) : (
              installmentOptions.map((option) => (
                <option key={option.installments} value={option.installments}>
                  {option.recommended_message ||
                    `${option.installments}x de R$ ${option.installment_amount.toFixed(2)}`}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Mensagem de ajuda */}
        {(!installmentOptions || installmentOptions.length === 0) && !isLoadingInstallments && (
          <p className="mt-1 text-xs text-[#a8a8a8] flex items-center gap-1">
            <span>ℹ️</span>
            <span>Digite o número do cartão acima para calcular as parcelas disponíveis</span>
          </p>
        )}

        {/* Indicador de sem juros */}
        {installmentOptions && installmentOptions.length > 0 && data.installments > 0 && (
          <p className="mt-1 text-xs">
            {installmentOptions.find((opt) => opt.installments === data.installments)?.recommended_message?.includes('sem juros') ? (
              <span className="text-green-500 font-medium">✓ Sem juros</span>
            ) : (
              <span className="text-[#a8a8a8]">Com juros aplicados</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
