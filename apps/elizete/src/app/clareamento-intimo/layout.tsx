import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clareamento Íntimo com Raciocínio Clínico | Elizete Garcia",
  description:
    "Domine o clareamento íntimo com a metodologia de raciocínio clínico. 49 anos de experiência em um curso que transforma sua carreira na estética.",
  keywords: [
    "clareamento íntimo",
    "curso clareamento íntimo",
    "raciocínio clínico",
    "estética inteligente",
    "elizete garcia",
    "tratamento íntimo",
    "escurecimento íntimo",
    "estética profissional",
  ],
  openGraph: {
    title: "Clareamento Íntimo com Raciocínio Clínico | Elizete Garcia",
    description:
      "Pare de copiar. Comece a pensar. Domine o clareamento íntimo com 49 anos de experiência.",
    type: "website",
  },
};

export default function ClareamentoIntimoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
