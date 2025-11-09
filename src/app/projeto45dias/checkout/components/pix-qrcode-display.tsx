'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, Clock, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface PixQRCodeDisplayProps {
  qrCodeBase64: string;
  qrCodeText: string;
  amount: number;
  expiresAt?: string;
  onPaymentDetected?: () => void;
}

export function PixQRCodeDisplay({
  qrCodeBase64,
  qrCodeText,
  amount,
  expiresAt,
  onPaymentDetected,
}: PixQRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Copiar código PIX
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  // Download QR Code
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCodeBase64}`;
    link.download = 'pix-qrcode.png';
    link.click();
  };

  // Calcular tempo restante
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiration = new Date(expiresAt).getTime();
      const diff = expiration - now;

      if (diff <= 0) {
        setTimeLeft('Expirado');
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          PIX Gerado com Sucesso! 🎉
        </h2>
        <p className="text-[#a8a8a8]">
          Escaneie o QR Code abaixo com o app do seu banco
        </p>
      </div>

      {/* QR Code */}
      <div className="bg-[#151515] border-2 border-[#d4af37] rounded-xl p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Imagem do QR Code */}
          <div className="relative w-64 h-64 bg-white rounded-lg shadow-lg">
            <Image
              src={`data:image/png;base64,${qrCodeBase64}`}
              alt="QR Code PIX"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Valor */}
          <div className="text-center">
            <p className="text-sm text-[#a8a8a8] mb-1">Valor a pagar:</p>
            <p className="text-3xl font-bold" style={{ color: '#d4af37' }}>
              R$ {amount.toFixed(2)}
            </p>
          </div>

          {/* Timer */}
          {expiresAt && timeLeft && (
            <div className="flex items-center gap-2 text-sm text-[#a8a8a8]">
              <Clock className="w-4 h-4" />
              <span>Válido por: <strong>{timeLeft}</strong></span>
            </div>
          )}

          {/* Botão Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors text-sm font-medium border border-[#d4af37]/30"
          >
            <Download className="w-4 h-4" />
            Baixar QR Code
          </button>
        </div>
      </div>

      {/* Código Copia e Cola */}
      <div className="bg-[#1a1a1a] border-2 border-[#d4af37]/30 rounded-xl p-6">
        <p className="text-sm font-semibold text-white mb-3">
          Ou copie o código PIX:
        </p>
        <div className="flex gap-2">
          <div className="flex-1 bg-[#151515] border border-[#aa8a2e] rounded-lg px-4 py-3 text-sm text-[#a8a8a8] font-mono break-all">
            {qrCodeText.substring(0, 60)}...
          </div>
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${
                copied
                  ? 'bg-green-500 text-black'
                  : 'bg-gradient-to-br from-[#d4af37] to-[#f4d03f] text-black hover:from-[#f4d03f] hover:to-[#d4af37]'
              }
            `}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copiar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status de detecção */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          <p className="font-semibold text-blue-400">
            Aguardando confirmação do pagamento...
          </p>
        </div>
        <p className="text-sm text-blue-300">
          Estamos verificando automaticamente a cada 5 segundos.
          <br />
          <strong>Deixe esta página aberta</strong> após efetuar o pagamento.
        </p>
      </div>

      {/* Instruções */}
      <div className="bg-[#151515] border-2 border-[#d4af37]/20 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">
          📱 Como pagar pelo app do banco:
        </h3>
        <ol className="space-y-2 text-sm text-[#a8a8a8]">
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>1.</span>
            <span>Abra o app do seu banco</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>2.</span>
            <span>Acesse a área PIX</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>3.</span>
            <span>Escolha &quot;Pagar com QR Code&quot; ou &quot;PIX Copia e Cola&quot;</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>4.</span>
            <span>Escaneie o QR Code acima ou cole o código copiado</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: '#d4af37' }}>5.</span>
            <span><strong>Confirme o pagamento de R$ {amount.toFixed(2)}</strong></span>
          </li>
        </ol>
      </div>
    </motion.div>
  );
}
