import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleTagManagerNoScript, GoogleAnalytics, MetaPixel } from "@/components/analytics";

// Títulos - Cormorant Garamond (elegante, editorial, alta legibilidade)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Corpo - Manrope (moderna, limpa, geométrica)
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Citações - Caveat (manuscrita, pessoal)
const caveat = Caveat({
  variable: "--font-quote",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seyune - Nutrição Comportamental",
  description: "Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Seyune',
    title: 'Seyune - Nutrição Comportamental',
    description: 'Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seyune - Nutrição Comportamental',
    description: 'Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
        <MetaPixel />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${caveat.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}
