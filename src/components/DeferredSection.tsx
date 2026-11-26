import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  minHeightClass?: string;
  rootMargin?: string;
}

/**
 * Retrasa el montaje de secciones debajo del pliegue hasta que el usuario se
 * acerca a ellas, evitando descargas de imágenes, miniaturas o chunks antes de tiempo.
 */
export function DeferredSection({
  children,
  minHeightClass = 'min-h-[240px]',
  rootMargin = '380px 0px',
}: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (shouldRender) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender, rootMargin]);

  if (shouldRender) {
    return <>{children}</>;
  }

  return <div ref={containerRef} className={minHeightClass} aria-hidden="true" />;
}
