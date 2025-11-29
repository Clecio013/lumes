import { Metadata } from 'next';
import { Bebas_Neue, Inter, Oswald, Playfair_Display } from 'next/font/google';
import './styles.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Projeto 45 Graus | Transformação em 45 Dias',
  description: 'O único programa que une nutrição comportamental + treino personalizado para resultados que duram. Black Friday - Vagas Limitadas.',
  keywords: ['nutrição', 'treino personalizado', 'emagrecimento', 'ganho de massa', 'black friday', 'seyune', 'personal trainer'],
  openGraph: {
    title: 'Projeto 45 Graus | Transformação em 45 Dias',
    description: 'Nutrição + Treino Personalizado. 45 dias para transformar corpo e mente.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projeto 45 Graus | Transformação em 45 Dias',
    description: 'Nutrição + Treino Personalizado. 45 dias para transformar corpo e mente.',
  },
};

export default function Projeto45DiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${inter.variable} ${oswald.variable} ${playfairDisplay.variable}`}
    >
      {children}
    </div>
  );
}
