/**
 * Analytics Admin Layout
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics | Seyune',
  description: 'Painel de analytics de campanhas Meta Ads',
  robots: 'noindex, nofollow', // Não indexar área admin
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Análise de performance - Campanhas Meta Ads
              </p>
            </div>
            {/* Logo pequeno */}
            <div className="text-sm text-gray-400">
              Seyune
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
