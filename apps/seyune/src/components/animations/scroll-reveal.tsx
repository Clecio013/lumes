"use client";

// Componente de animação scroll reveal otimizado
import { useRef, ReactNode } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
