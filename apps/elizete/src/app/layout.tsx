import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

// Headings - Cormorant Garamond (similar to Carentro)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Body - Manrope
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Display - DM Serif Display (similar to BLOVERLY)
const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Elizete Garcia - Avaliação de Pele e Consulta Estética Profissional",
    template: "%s | Elizete Garcia"
  },
  description: siteConfig.description,
  keywords: [
    "avaliação de pele",
    "consulta estética",
    "raciocínio clínico",
    "estética inteligente",
    "curso de estética",
    "profissional de estética",
    "ficha de anamnese",
    "tratamento de pele",
    "cosmetologia",
    "elizete garcia"
  ],
  authors: [{ name: "Elizete Garcia" }],
  creator: "Elizete Garcia",
  publisher: "Elizete Garcia",
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
    url: siteConfig.url,
    siteName: 'Elizete Garcia',
    title: 'Elizete Garcia - Avaliação de Pele e Consulta Estética Profissional',
    description: siteConfig.description,
    images: [
      {
        url: '/images/hero/elizete.jpg',
        width: 1200,
        height: 630,
        alt: 'Elizete Garcia - Estética Inteligente',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elizete Garcia - Avaliação de Pele',
    description: siteConfig.description,
    images: ['/images/hero/elizete.jpg'],
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
        <meta name="theme-color" content="#E85D04" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${dmSerifDisplay.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
