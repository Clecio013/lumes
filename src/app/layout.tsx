import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsProvider } from "@/lib/analytics";

// Títulos - Cormorant Garamond (otimizado: 5 → 3 weights)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Removido 300, 500
  display: "swap",
});

// Corpo - Manrope (otimizado: 6 → 3 weights)
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Removido 300, 600, 800
  display: "swap",
});

// Citações - Caveat (otimizado: 4 → 2 weights)
const caveat = Caveat({
  variable: "--font-quote",
  subsets: ["latin"],
  weight: ["400", "600"], // Removido 500, 700 (pouco usado)
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
        {/* Favicons - favicon.ico e apple-touch-icon.png são servidos automaticamente de app/ */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#874329" />

        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="wy3iq9fn6iiys6f014tlh9mpo2z5ss" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${caveat.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {/* Analytics - GA4, Meta Pixel, Scroll Tracking */}
        <AnalyticsProvider />
        {children}

        {/* Mercado Pago SDK - Necessário para Payment Bricks */}
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
