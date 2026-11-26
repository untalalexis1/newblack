import { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Quote,
} from 'lucide-react';
import {
  CONFIG,
  type VideoTestimonialItem,
  type WrittenTestimonialItem,
} from '../config';

function VideoTestimonialCard({ item }: { item: VideoTestimonialItem }) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showThumbnail = Boolean(item.thumbnailUrl) && !imgError;

  const autoplayUrl = item.embedUrl
    .replace('autoplay=false', 'autoplay=true')
    .replace('preload=false', 'preload=true');

  return (
    <article className="snap-center shrink-0 w-[86%] sm:w-[340px] rounded-3xl bg-[#FAF9F5] border border-[#12243B]/14 overflow-hidden flex flex-col">
      {/* Reproductor diferido: el iframe solo se monta cuando la persona presiona play */}
      <div className="relative aspect-[16/10] w-full bg-[#12243B] overflow-hidden">
        {loaded ? (
          <iframe
            src={autoplayUrl}
            title={item.titular}
            loading="lazy"
            className="w-full h-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Reproducir testimonio en video: ${item.titular}`}
            className="group relative w-full h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#C9A227]"
          >
            {/* Miniatura real de Bunny (solo se descarga cuando el usuario se acerca a la sección) */}
            {showThumbnail && (
              <>
                <img
                  src={item.thumbnailUrl}
                  alt={`Miniatura del testimonio en video: ${item.titular}`}
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {/* Velo oscuro plano para legibilidad sin gradientes */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#12243B]/30 pointer-events-none"
                />
              </>
            )}

            {/* Botón de play centrado */}
            <div className="relative z-10 w-14 h-14 rounded-full bg-[#F1EFE8] text-[#12243B] flex items-center justify-center border-2 border-[#C9A227] group-hover:scale-105 transition-transform duration-200">
              <Play
                className="w-6 h-6 translate-x-0.5 fill-current"
                aria-hidden="true"
              />
            </div>

            {/* Franja inferior sólida translúcida (sin gradiente) para etiqueta y duración */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-3 py-2 bg-[#12243B]/80 flex items-center justify-between gap-2 text-left">
              <span className="text-[11px] font-medium text-[#F1EFE8]">
                Ver testimonio en video
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C9A227] tabular-nums shrink-0">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {item.duracion}
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B7812]">
            {item.contexto}
          </p>
          <h3 className="mt-1.5 font-serif-editorial text-base sm:text-lg font-semibold text-[#12243B] leading-snug">
            “{item.titular}”
          </h3>
        </div>
        <p className="text-xs text-[#526071] pt-2 border-t border-[#12243B]/10">
          {item.programa}
        </p>
      </div>
    </article>
  );
}

function WrittenQuoteCard({ item }: { item: WrittenTestimonialItem }) {
  return (
    <article className="snap-center shrink-0 w-[84%] sm:w-[310px] rounded-2xl bg-[#FAF9F5] border border-[#12243B]/14 p-5 flex flex-col justify-between gap-4">
      <div>
        <Quote className="w-5 h-5 text-[#C9A227] mb-2.5" aria-hidden="true" />
        <p className="font-serif-editorial text-base font-semibold text-[#12243B] leading-snug mb-2">
          {item.titular}
        </p>
        <p className="text-sm text-[#1E293B] leading-relaxed">“{item.cita}”</p>
      </div>
      <div className="pt-3 border-t border-[#12243B]/10 text-xs text-[#526071]">
        <span className="font-semibold text-[#12243B]">{item.nombre}</span>
        <span aria-hidden="true"> · </span>
        <span>{item.lugar}</span>
      </div>
    </article>
  );
}

export function TestimonialsCarousel() {
  const videoTrackRef = useRef<HTMLDivElement | null>(null);
  const writtenTrackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: -1 | 1
  ) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * 356, behavior: 'smooth' });
  };

  return (
    <section id="testimonios" className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#12243B] text-balance leading-tight">
              Lo que otros vivieron{' '}
              <span className="italic text-[#9B7812]">
                trabajando con Alexis
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#526071] leading-relaxed">
              Testimonios en video de personas que participaron en talleres
              grupales y mentorías, compartiendo el impacto de esta mirada en su
              vida cotidiana.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollTrack(videoTrackRef, -1)}
              aria-label="Testimonio en video anterior"
              className="w-10 h-10 rounded-full bg-[#E6E2D6] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(videoTrackRef, 1)}
              aria-label="Testimonio en video siguiente"
              className="w-10 h-10 rounded-full bg-[#E6E2D6] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carrusel de testimonios reales en video (5 videos) */}
        <div
          ref={videoTrackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'thin' }}
        >
          {CONFIG.testimoniosVideo.map((item) => (
            <VideoTestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {/* Testimonios escritos reales de lectores de SentirBIEN */}
        {CONFIG.testimoniosEscritos.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[#12243B]/10">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <h3 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-[#12243B]">
                  Quienes ya leyeron{' '}
                  <span className="italic text-[#9B7812]">SentirBIEN</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#526071] mt-1">
                  Mensajes reales de lectores en Argentina y Latinoamérica.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTrack(writtenTrackRef, -1)}
                  aria-label="Opinión anterior"
                  className="w-9 h-9 rounded-full bg-[#E6E2D6] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(writtenTrackRef, 1)}
                  aria-label="Opinión siguiente"
                  className="w-9 h-9 rounded-full bg-[#E6E2D6] text-[#12243B] border border-[#12243B]/15 flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={writtenTrackRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'thin' }}
            >
              {CONFIG.testimoniosEscritos.map((item) => (
                <WrittenQuoteCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
