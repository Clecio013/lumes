import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultoria de Nutrição Comportamental - Seyune",
  description: "Transforme sua relação com a comida através da nutrição comportamental. Agende sua consulta individual com a nutricionista Seyune.",
  alternates: {
    canonical: "/consulta",
  },
  openGraph: {
    title: "Consultoria de Nutrição Comportamental - Seyune",
    description: "Transforme sua relação com a comida através da nutrição comportamental. Agende sua consulta individual com a nutricionista Seyune.",
    url: "/consulta",
  },
};

export default function ConsultaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
