'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { BrandLogo } from './brand-logo';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-dark)] border-t border-[var(--gold-dark)] py-12 z-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo e descrição */}
          <motion.div {...fadeIn} className="space-y-6">
            <BrandLogo size="sm" />
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Transformação real em 45 dias. Nutrição + Treino personalizado para resultados que duram.
            </p>
          </motion.div>

          {/* Links importantes */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <h4 className="text-[var(--text-light)] font-bold mb-4 uppercase tracking-wider text-sm">
              Links Importantes
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#vsl-section"
                  className="text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors text-sm"
                >
                  Como Funciona
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Redes sociais */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <h4 className="text-[var(--text-light)] font-bold mb-4 uppercase tracking-wider text-sm">
              Redes Sociais
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://instagram.com/seyune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] flex items-center justify-center group-hover:border-[var(--gold-primary)] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-sm">@seyune</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dorea.personal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] flex items-center justify-center group-hover:border-[var(--gold-primary)] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-sm">@dorea.personal</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--gold-dark)] pt-8">
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          >
            <p className="text-[var(--text-muted)] text-sm">
              © {currentYear} Projeto 45 Graus. Todos os direitos reservados.
            </p>

            <p className="text-[var(--text-muted)] text-xs">
              Desenvolvido por{' '}
              <a
                href="https://www.instagram.com/lumesdigital_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors font-semibold"
              >
                Lumes Digital
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
