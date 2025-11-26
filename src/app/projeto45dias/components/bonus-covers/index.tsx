'use client';

import { Scale, Shield, TrendingUp, PartyPopper, ChefHat } from 'lucide-react';
import { BonusCover } from './BonusCover';

export function EmagrecimentoSustentavelCover() {
  return (
    <BonusCover
      title="Emagrecimento Sustentável"
      subtitle="GUIA NUTRICIONAL"
      gradient="warm"
      pattern="dots"
      icon={<Scale className="w-14 h-14 text-[#0d0d0d]" strokeWidth={3} />}
    />
  );
}

export function NaoSabotarProcessoCover() {
  return (
    <BonusCover
      title="Não Sabotar Seu Processo"
      subtitle="GUIA COMPORTAMENTAL"
      gradient="elegant"
      pattern="lines"
      icon={<Shield className="w-14 h-14 text-[#0d0d0d]" strokeWidth={3} />}
    />
  );
}

export function GanhoMassaCover() {
  return (
    <BonusCover
      title="Ganho de Massa Muscular"
      subtitle="GUIA HIPERTROFIA"
      gradient="vibrant"
      pattern="grid"
      icon={<TrendingUp className="w-14 h-14 text-[#0d0d0d]" strokeWidth={3} />}
    />
  );
}

export function FestasFimAnoCover() {
  return (
    <BonusCover
      title="Sobrevivência nas Festas"
      subtitle="GUIA ESPECIAL"
      gradient="terracota"
      pattern="waves"
      icon={<PartyPopper className="w-14 h-14 text-[#0d0d0d]" strokeWidth={3} />}
    />
  );
}

export function ReceitasImpressionar() {
  return (
    <BonusCover
      title="Receitas Saudáveis"
      subtitle="GUIA DE RECEITAS"
      gradient="gold"
      pattern="dots"
      icon={<ChefHat className="w-14 h-14 text-[#0d0d0d]" strokeWidth={3} />}
    />
  );
}
