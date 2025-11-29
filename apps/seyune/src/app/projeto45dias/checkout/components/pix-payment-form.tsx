'use client';

import { Smartphone, Check } from 'lucide-react';
import { formatPrice } from '../../lib/batches-config';

interface PixPaymentFormProps {
  amount: number;
}

export function PixPaymentForm({ amount }: PixPaymentFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="checkout-label">Pagamento via PIX</h3>

      {/* Valor */}
      <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#f4d03f]/10 rounded-xl p-6 border-2 border-[#d4af37]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#a8a8a8]">Valor a pagar:</span>
          <span className="text-3xl font-bold" style={{ color: '#d4af37' }}>
            {formatPrice(amount)}
          </span>
        </div>
        <p className="text-xs text-[#a8a8a8] text-right">Pagamento instantâneo</p>
      </div>

      {/* Benefícios PIX */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-black" />
          </div>
          <div>
            <p className="font-medium text-white">Aprovação instantânea</p>
            <p className="text-sm text-[#a8a8a8]">Seu acesso é liberado em segundos</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-black" />
          </div>
          <div>
            <p className="font-medium text-white">100% seguro</p>
            <p className="text-sm text-[#a8a8a8]">Criptografado pelo Banco Central</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-black" />
          </div>
          <div>
            <p className="font-medium text-white">Sem taxas</p>
            <p className="text-sm text-[#a8a8a8]">Você paga exatamente R$ {amount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Como funciona */}
      <div className="bg-[#1a1a1a] border-2 border-[#d4af37]/20 rounded-xl p-6">
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Smartphone className="w-5 h-5" style={{ color: '#d4af37' }} />
          Como funciona:
        </h4>
        <ol className="space-y-2 text-sm text-[#a8a8a8]">
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>1.</span>
            <span>Clique em &quot;Gerar PIX&quot;</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>2.</span>
            <span>Escaneie o QR Code com o app do seu banco</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>3.</span>
            <span>Confirme o pagamento</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>4.</span>
            <span>Pronto! Acesso liberado automaticamente</span>
          </li>
        </ol>
      </div>

      {/* Aviso */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
        <p className="text-sm text-amber-400">
          <strong>💡 Dica:</strong> Deixe esta página aberta após gerar o PIX.
          Vamos detectar automaticamente quando você pagar!
        </p>
      </div>
    </div>
  );
}
