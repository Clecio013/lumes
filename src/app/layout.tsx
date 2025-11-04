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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'),
  title: {
    default: "Seyune - Nutrição Comportamental",
    template: "%s | Seyune"
  },
  description: "Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.",
  keywords: [
    "nutrição comportamental",
    "nutricionista comportamental",
    "emagrecimento saudável",
    "dieta sem restrição",
    "psicologia alimentar",
    "consultoria nutricional",
    "ganho de massa magra",
    "relação com comida",
    "nutrição online",
    "nutricionista online"
  ],
  authors: [{ name: "Seyune" }],
  creator: "Seyune",
  publisher: "Seyune",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    images: [
      {
        url: '/images/hero/seyune-gradient.png',
        width: 1200,
        height: 630,
        alt: 'Seyune - Nutricionista Comportamental',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seyune - Nutrição Comportamental',
    description: 'Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.',
    images: ['/images/hero/seyune-gradient.png'],
  },
  verification: {
    // Adicionar após criar no Google Search Console
    // google: 'seu-codigo-de-verificacao-aqui',
    // Adicionar após criar no Bing Webmaster Tools
    // yandex: 'seu-codigo-bing-aqui',
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
