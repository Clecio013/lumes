/**
 * Upload Zone Component
 */

'use client';

import { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  loading?: boolean;
  error?: string | null;
}

export function UploadZone({ onUpload, loading = false, error }: UploadZoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.csv')) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        className={`
          relative border-2 border-dashed rounded-lg p-12
          transition-colors duration-200
          ${
            loading
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-300 hover:border-[#874329] bg-white hover:bg-[#efd1af]/10'
          }
        `}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          disabled={loading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          id="file-upload"
        />

        <div className="flex flex-col items-center text-center">
          {loading ? (
            <>
              <div className="w-12 h-12 rounded-full border-4 border-[#874329]/20 border-t-[#874329] animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-900">
                Processando CSV...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Aguarde enquanto analisamos os dados
              </p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-[#874329] mb-4" />
              <p className="text-lg font-medium text-gray-900">
                Arraste seu CSV aqui
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ou clique para selecionar um arquivo
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <FileText className="w-4 h-4" />
                <span>Apenas arquivos .csv do Meta Ads Manager</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">
              Erro ao processar arquivo
            </p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
