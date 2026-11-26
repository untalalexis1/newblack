import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrapper liviano sin dependencias externas (evita cargar librerías de animación en el bundle inicial).
 */
export function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className}>{children}</div>;
}
