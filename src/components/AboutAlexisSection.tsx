import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { CONFIG, type AboutGalleryItem } from '../config';

export function AboutAlexisSection() {
  const items = CONFIG.aboutGallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<AboutGalleryItem | null>(
    null
  );

  const total = items.length;
  const current = items[activeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => {
          const nextIdx = (prev - 1 + total) % total;
          setLightboxItem(items[nextIdx]);
          return nextIdx;
        });
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => {
          const nextIdx = (prev + 1) % total;
          setLightboxItem(items[nextIdx]);
          return nextIdx;
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem, items, total]);

  return (
    <section
      id="sobre-mi"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#E6E2D6] border-y border-[#12243B]/10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Texto biográfico corto (máximo 4 líneas) */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-4">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#12243B] leading-tight">
              Soy Alexis Copello.
            </h2>
            <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed">
              Desde 2016 acompaño a personas que funcionan bien hacia afuera
              pero están cansadas de pelear con su propia cabeza. Soy autor de{' '}
              <em>SentirBIEN</em> y ponente del 1er Foro de Paz y Salud Mental
              de Latinoamérica. No te voy a dar una técnica para controlar lo
              que pensás: te invito a ver algo que cambia cómo lo vivís.
            </p>
          </div>

          {/* Galería editorial optimizada en WebP */}
          {current && (
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#FAF9F5] border border-[#12243B]/14 p-3 sm:p-4">
                <div className="relative overflow-hidden rounded-2xl border border-[#12243B]/10 bg-[#12243B]">
                  <button
                    type="button"
                    onClick={() => setLightboxItem(current)}
                    aria-label={`Ampliar imagen: ${current.caption}`}
                    className="group relative block w-full aspect-[4/4.5] sm:aspect-[4/4.2] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#C9A227]"
                  >
                    <img
                      src={current.src}
                      alt={current.alt}
                      width={current.width}
                      height={current.height}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.015] ${
                        current.fit === 'contain'
                          ? 'object-contain bg-[#12243B]'
                          : `object-cover ${current.objectPosition || 'object-center'}`
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#12243B]/85 text-[#F1EFE8] text-[11px] font-medium border border-[#F1EFE8]/20"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ampliar</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F1EFE8] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Foto siguiente"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F1EFE8] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-3 px-1 flex items-start justify-between gap-3">
                  <p className="text-xs sm:text-sm text-[#1E293B] leading-snug">
                    {current.caption}
                  </p>
                  <span className="text-xs font-medium text-[#526071] tabular-nums shrink-0">
                    {activeIndex + 1} / {total}
                  </span>
                </div>

                <div
                  role="tablist"
                  aria-label="Galería de charlas y talleres de Alexis Copello"
                  className="mt-3 grid grid-cols-5 gap-2"
                >
                  {items.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Ver foto ${idx + 1}: ${item.caption}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] ${
                          isActive
                            ? 'border-[#C9A227] opacity-100'
                            : 'border-transparent opacity-65 hover:opacity-95'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt=""
                          width={180}
                          height={180}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full ${
                            item.fit === 'contain'
                              ? 'object-cover object-top bg-[#12243B]'
                              : `object-cover ${item.objectPosition || 'object-center'}`
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.caption}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-[#12243B]/85 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-3xl bg-[#F1EFE8] p-4 sm:p-5 border border-[#C9A227]/50"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-serif-editorial text-sm sm:text-base font-semibold text-[#12243B] leading-snug">
                {lightboxItem.caption}
              </p>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Cerrar imagen ampliada"
                className="w-9 h-9 rounded-full bg-[#E6E2D6] text-[#12243B] flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[76vh] w-full rounded-2xl overflow-hidden bg-[#12243B] flex items-center justify-center">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="w-full max-h-[76vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AboutAlexisSection;
