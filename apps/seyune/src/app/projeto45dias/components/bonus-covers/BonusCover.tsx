'use client';

import React from 'react';

interface BonusCoverProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient?: 'gold' | 'terracota' | 'warm' | 'elegant' | 'vibrant';
  pattern?: 'dots' | 'lines' | 'grid' | 'waves';
}

const gradients = {
  gold: 'from-[#d4af37] via-[#f4d03f] to-[#d4af37]',
  terracota: 'from-[#874329] via-[#a85835] to-[#874329]',
  warm: 'from-[#602514] via-[#874329] to-[#d4af37]',
  elegant: 'from-[#454c31] via-[#874329] to-[#602514]',
  vibrant: 'from-[#d4af37] via-[#874329] to-[#602514]',
};

export function BonusCover({
  title,
  subtitle = 'GUIA EXCLUSIVO',
  icon,
  gradient = 'gold',
  pattern = 'dots',
}: BonusCoverProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0d0d0d] via-[#1a1410] to-[#0d0d0d] overflow-hidden">
      {/* Sophisticated Pattern Background */}
      {pattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      )}
      {pattern === 'lines' && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(212,175,55,0.3),
              rgba(212,175,55,0.3) 1px,
              transparent 1px,
              transparent 16px
            )`,
          }}
        />
      )}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}
      {pattern === 'waves' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="wave"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 60 Q 30 40, 60 60 T 120 60"
                stroke="rgba(212,175,55,0.3)"
                fill="none"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      )}

      {/* Top Gradient Bar - More Elegant */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[gradient]} opacity-80`}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Top Section - Branding */}
        <div className="space-y-8">
          {/* Minimal Brand Badge */}
          <div className="inline-flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-md bg-gradient-to-br ${gradients[gradient]} flex items-center justify-center shadow-xl`}
            >
              <span className="text-[#0d0d0d] font-black text-lg tracking-tight">45</span>
            </div>
            <div>
              <div className={`text-[#d4af37] text-[10px] font-black tracking-[0.15em] uppercase`}>
                Projeto 45 Dias
              </div>
              <div className="text-zinc-500 text-[9px] uppercase tracking-[0.1em] font-medium">
                {subtitle}
              </div>
            </div>
          </div>

          {/* Icon - Larger and More Prominent */}
          {icon && (
            <div className="flex justify-center py-12">
              <div
                className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${gradients[gradient]} flex items-center justify-center shadow-2xl transform transition-transform hover:scale-105`}
              >
                {icon}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - Title */}
        <div className="space-y-5">
          {/* Title - Elegant Typography */}
          <h3 className="text-[1.75rem] md:text-[2rem] font-black text-white leading-[1.15] tracking-tight min-h-[4rem] flex items-end">
            {title}
          </h3>

          {/* Bottom Accent - Sophisticated */}
          <div
            className={`h-[3px] w-full bg-gradient-to-r ${gradients[gradient]} rounded-full shadow-lg`}
          />
        </div>
      </div>

      {/* Ambient Light Effects - Subtle and Elegant */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradients[gradient]} opacity-10 blur-[80px] pointer-events-none`}
      />
      <div
        className={`absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr ${gradients[gradient]} opacity-10 blur-[80px] pointer-events-none`}
      />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
