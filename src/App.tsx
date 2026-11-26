import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  MessageCircle,
  Minus,
} from 'lucide-react';
import {
  CONFIG,
  formatPrice,
  getIsBlackFriday,
  getWhatsAppUrl,
  type CountryCode,
  type PackConfig,
} from './config';
import {
  detectInitialCountry,
  persistCountryChoice,
} from './utils/checkout';
import {
  initMetaPixel,
  trackContact,
  trackViewContent,
} from './utils/pixel';
import { AlexisPhoto } from './components/AlexisPhoto';
import { Countdown } from './components/Countdown';
import { CountrySelector } from './components/CountrySelector';
import { DeferredSection } from './components/DeferredSection';
import { NaserCompass } from './components/NaserCompass';
import { PackCard } from './components/PackCard';

const SamplesSection = lazy(() => import('./components/SamplesSection'));
const TestimonialsCarousel = lazy(
  () => import('./components/TestimonialsCarousel')
);
const AboutAlexisSection = lazy(
  () => import('./components/AboutAlexisSection')
);
const FaqAccordion = lazy(() => import('./components/FaqAccordion'));
const SampleModal = lazy(() => import('./components/SampleModal'));

const SHORT_QUOTES_BEFORE_OFFER = [
  {
    cita: 'Bajar la intensidad de la ansiedad de 8 a 2 en el taller vivencial',
    autor: 'Participante de Taller Vivencial',
  },
  {
    cita: 'Cambios concretos en mi día a día al dejar de reaccionar',
    autor: 'Participante de Mentoría individual',
  },
];

export default function App() {
  const [country, setCountry] = useState<CountryCode>(detectInitialCountry);
  const [isBlackFriday, setIsBlackFriday] = useState<boolean>(() =>
    getIsBlackFriday()
  );
  const [modalPack, setModalPack] = useState<PackConfig | null>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const packsSectionRef = useRef<HTMLElement | null>(null);
  const viewContentFiredRef = useRef(false);

  // Inicializar Meta Pixel (solo en soyalexis.ai.studio) y reloj de Black Friday
  useEffect(() => {
    initMetaPixel(CONFIG.metaPixelId);

    const timer = window.setInterval(() => {
      setIsBlackFriday(getIsBlackFriday());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // Disparar ViewContent una vez cuando la sección de packs entra en pantalla
  useEffect(() => {
    const el = packsSectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewContentFiredRef.current) {
            viewContentFiredRef.current = true;
            trackViewContent(country);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [country]);

  // Mostrar barra fija inferior en mobile después de pasar el Inicio
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setShowMobileBar(
            !entry.isIntersecting && entry.boundingClientRect.top < 0
          );
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleCountryChange = (next: CountryCode) => {
    setCountry(next);
    persistCountryChoice(next);
  };

  // Solo desplazamiento hacia la sección 5 (#packs), sin disparar ningún evento del píxel
  const scrollToPacks = () => {
    const el = document.getElementById('packs');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = getWhatsAppUrl();
  const minPackPrice = formatPrice(
    country === 'AR' ? CONFIG.packs[0].ars.precio : CONFIG.packs[0].usd.precio,
    country
  );

  return (
    <div className="min-h-screen bg-[#F1EFE8] text-[#1E293B]">
      {/* Barra superior fija */}
      <header className="sticky top-0 z-40 bg-[#12243B] text-[#F1EFE8] border-b border-[#C9A227]/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 min-h-[46px]">
          {isBlackFriday ? (
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              <span className="text-[11px] sm:text-xs font-medium text-[#F1EFE8] whitespace-nowrap">
                <span className="hidden sm:inline">
                  Black Friday · precios especiales hasta el lunes 30/11
                </span>
                <span className="sm:hidden">Black Friday · termina en</span>
              </span>
              <span
                className="hidden sm:inline text-[#C9A227]/70"
                aria-hidden="true"
              >
                ·
              </span>
              <Countdown variant="compact" />
            </div>
          ) : (
            <a
              href="#inicio"
              className="font-serif-editorial italic text-base sm:text-lg text-[#F1EFE8] whitespace-nowrap shrink-0"
            >
              Alexis Copello
            </a>
          )}

          <div className="shrink-0">
            <CountrySelector
              country={country}
              onChange={handleCountryChange}
              variant="topbar"
            />
          </div>
        </div>
      </header>

      <main>
        {/* 1. INICIO (visible sin bajar en celular) */}
        <section
          id="inicio"
          ref={heroRef}
          className="pt-6 pb-10 sm:pt-14 sm:pb-18 px-4 sm:px-6"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="order-1 lg:col-span-7 text-center lg:text-left">
              <h1 className="font-serif-editorial text-[36px] sm:text-5xl lg:text-[56px] font-semibold text-[#12243B] leading-[1.08] tracking-tight text-balance">
                Pará un segundo.
              </h1>

              <p className="mt-3 sm:mt-4 font-serif-editorial text-[20px] sm:text-2xl lg:text-[26px] font-medium text-[#12243B] leading-snug max-w-xl mx-auto lg:mx-0 text-balance">
                Si tu cabeza no para, no hay nada que arreglar en vos. Solo te sobra ruido.
              </p>

              <p className="mt-3 sm:mt-4 text-[15px] sm:text-[17px] text-[#1E293B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Un libro, 21 audios breves y una guía de 21 días para ver de
                dónde viene ese ruido y volver a estar en tu vida.
              </p>

              {/* Testimonio de una sola línea, en cursiva */}
              <p className="mt-4 text-xs sm:text-sm italic text-[#526071] leading-snug max-w-xl mx-auto lg:mx-0">
                “Un balde de agua fresca sin vueltas ni teorías complejas.”{' '}
                <span className="not-italic font-medium text-[#12243B]">
                  — Participante de Taller Vivencial
                </span>
              </p>

              {/* Un solo botón que baja a la sección 5 (sin evento de píxel) */}
              <div className="mt-5 sm:mt-7 flex flex-col items-center lg:items-start gap-2.5">
                <button
                  type="button"
                  onClick={scrollToPacks}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#12243B] text-[#F1EFE8] hover:bg-[#1D3554] text-base font-semibold transition-colors cursor-pointer min-h-[50px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
                >
                  <span>Elegí por dónde empezar</span>
                  <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <p className="text-[11.5px] sm:text-xs text-[#526071] leading-relaxed">
                  Desde{' '}
                  <span className="font-semibold text-[#12243B] tabular-nums">
                    {minPackPrice}
                  </span>{' '}
                  · Acceso inmediato · Garantía de 7 días · Precio especial
                  hasta el lunes 30/11
                </p>
              </div>
            </div>

            {/* Foto actual del mate (WebP comprimida con dimensiones fijas) */}
            <div className="order-2 lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[185px] sm:max-w-[260px] lg:max-w-[320px]">
                <AlexisPhoto
                  src={CONFIG.media.heroCasualPhoto}
                  alt={CONFIG.media.heroCasualAlt}
                  placeholderLabel={CONFIG.media.heroCasualPlaceholder}
                  width={CONFIG.media.heroWidth}
                  height={CONFIG.media.heroHeight}
                  shape="tilted-rect"
                  eager
                  className="w-full aspect-[3/4] max-h-[30vh] sm:max-h-[38vh] lg:max-h-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. "ES PARA VOS SI…" */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#E6E2D6] border-y border-[#12243B]/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#12243B] text-center mb-7">
              Es para vos si…
            </h2>
            <ul className="space-y-4 text-base sm:text-lg text-[#1E293B] leading-relaxed">
              <li className="flex items-start gap-3.5 rounded-2xl bg-[#FAF9F5] border border-[#12243B]/12 px-5 py-4">
                <span
                  aria-hidden="true"
                  className="mt-1 w-6 h-6 rounded-full bg-[#C9A227]/20 text-[#9B7812] flex items-center justify-center shrink-0"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>Sentís que pensás de más y descansás de menos.</span>
              </li>
              <li className="flex items-start gap-3.5 rounded-2xl bg-[#FAF9F5] border border-[#12243B]/12 px-5 py-4">
                <span
                  aria-hidden="true"
                  className="mt-1 w-6 h-6 rounded-full bg-[#C9A227]/20 text-[#9B7812] flex items-center justify-center shrink-0"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>
                  Ya probaste libros, técnicas o meditación, y entendés todo,
                  pero en el día a día no te cambia la experiencia.
                </span>
              </li>
              <li className="flex items-start gap-3.5 rounded-2xl bg-[#FAF9F5] border border-[#12243B]/12 px-5 py-4">
                <span
                  aria-hidden="true"
                  className="mt-1 w-6 h-6 rounded-full bg-[#C9A227]/20 text-[#9B7812] flex items-center justify-center shrink-0"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>
                  Querés llegar a fin de año con la cabeza más liviana.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. EL CAMBIO + NASER compacto */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif-editorial text-2xl sm:text-4xl font-semibold text-[#12243B] leading-tight text-balance">
                No es lo que pasa. Es lo que pensás sobre lo que pasa.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#1E293B] leading-relaxed">
                No te falta control ni tenés que pensar en positivo. Lo que te
                pesa es el pensamiento tomado como si fuera la realidad. Cuando
                ves eso, no hay nada que hacer con el pensamiento: pierde fuerza
                solo.
              </p>

              {/* Mantra destacado en Lora, textual en 3 líneas exactas */}
              <blockquote className="mt-8 px-6 py-6 sm:px-8 sm:py-7 rounded-2xl bg-[#12243B] text-[#F1EFE8] border-l-4 border-[#C9A227] text-left sm:text-center">
                <p className="font-serif-editorial text-lg sm:text-2xl leading-relaxed font-medium">
                  No te falta nada. Te sobra ruido.
                  <br />
                  Y cuando ves su origen, afloja solo.
                  <br />
                  <span className="italic text-[#C9A227]">
                    Y volvés a estar en tu vida. Y a disfrutarla.
                  </span>
                </p>
              </blockquote>
            </div>

            {/* Qué es NASER (compacto: 1 línea corta por letra) */}
            <NaserCompass />
          </div>
        </section>

        {/* 4. DOS TESTIMONIOS CORTOS EN TEXTO (justo antes de la oferta) */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#E6E2D6] border-y border-[#12243B]/10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SHORT_QUOTES_BEFORE_OFFER.map((item) => (
              <figure
                key={item.cita}
                className="rounded-2xl bg-[#FAF9F5] border border-[#12243B]/12 px-5 py-5 flex flex-col justify-between gap-3"
              >
                <blockquote className="font-serif-editorial italic text-base sm:text-lg text-[#12243B] leading-snug">
                  “{item.cita}”
                </blockquote>
                <figcaption className="text-xs font-medium text-[#526071]">
                  — {item.autor}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. LA OFERTA: SOLO 2 PACKS (único lugar de la página donde aparecen) */}
        <section
          id="packs"
          ref={packsSectionRef}
          className="py-16 sm:py-22 px-4 sm:px-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#12243B] leading-tight text-balance">
                Elegí por dónde empezar
              </h2>

              <div className="mt-6 flex justify-center">
                <CountrySelector
                  country={country}
                  onChange={handleCountryChange}
                  variant="light"
                  showHint
                />
              </div>
            </div>

            {/* En celular: Pack 2 primero y Pack 1 después */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 items-stretch">
              {CONFIG.packs.map((pack) => {
                const orderClass =
                  pack.id === 2
                    ? 'order-1 md:order-2'
                    : 'order-2 md:order-1';
                return (
                  <div key={pack.id} className={`flex ${orderClass}`}>
                    <PackCard
                      pack={pack}
                      country={country}
                      isBlackFriday={isBlackFriday}
                      onOpenSample={(p) => setModalPack(p)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bloque chico solo texto para acompañamiento con sesiones */}
            <p className="mt-8 text-center text-sm sm:text-base text-[#526071] leading-relaxed max-w-xl mx-auto">
              ¿Preferís hacerlo acompañado, con sesiones conmigo? Escribime y lo
              armamos.{' '}
              <a
                href={CONFIG.accompanimentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('WhatsApp · Acompañamiento Packs')}
                className="font-semibold text-[#12243B] hover:text-[#9B7812] underline underline-offset-4 transition-colors whitespace-nowrap"
              >
                Escribime por WhatsApp
              </a>
            </p>
          </div>
        </section>

        {/* 6. MUESTRA GRATIS (carga diferida al acercarse) */}
        <DeferredSection minHeightClass="min-h-[360px]">
          <Suspense fallback={<div className="min-h-[360px]" />}>
            <SamplesSection />
          </Suspense>
        </DeferredSection>

        {/* 7. TESTIMONIOS EN VIDEO (5 videos, sin los 3 de sesiones 1 a 1; carga diferida) */}
        <DeferredSection minHeightClass="min-h-[420px]">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <TestimonialsCarousel />
          </Suspense>
        </DeferredSection>

        {/* 8. SOY ALEXIS (corto, máx. 4 líneas + foto; carga diferida) */}
        <DeferredSection minHeightClass="min-h-[360px]">
          <Suspense fallback={<div className="min-h-[360px]" />}>
            <AboutAlexisSection />
          </Suspense>
        </DeferredSection>

        {/* 9. "NO ES PARA VOS SI…" + PREGUNTAS FRECUENTES */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* No es para vos si… */}
            <div className="rounded-3xl bg-[#E6E2D6] border border-[#12243B]/14 p-6 sm:p-8">
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#12243B] mb-5">
                No es para vos si…
              </h2>
              <ul className="space-y-4 text-sm sm:text-base text-[#1E293B] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 w-6 h-6 rounded-full bg-[#12243B]/10 text-[#526071] flex items-center justify-center shrink-0"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    Querés acumular más técnicas y teorías a tu biblioteca de
                    conocimientos sin llevarlo a la práctica.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 w-6 h-6 rounded-full bg-[#12243B]/10 text-[#526071] flex items-center justify-center shrink-0"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    No estás dispuesto a poner a prueba un nuevo enfoque para
                    tus emociones.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 w-6 h-6 rounded-full bg-[#12243B]/10 text-[#526071] flex items-center justify-center shrink-0"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </span>
                  <span>Vas a comprarlo y guardarlo en un cajón.</span>
                </li>
              </ul>
            </div>

            {/* Preguntas frecuentes (7 preguntas) */}
            <DeferredSection minHeightClass="min-h-[320px]">
              <Suspense fallback={<div className="min-h-[320px]" />}>
                <FaqAccordion />
              </Suspense>
            </DeferredSection>
          </div>
        </section>

        {/* 10. CIERRE (sin repetir los packs; un solo botón hacia la sección 5) */}
        <section className="py-16 sm:py-22 px-4 sm:px-6 bg-[#12243B] text-[#F1EFE8]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight text-balance">
              El ruido de diciembre va a llegar igual.
              <br />
              <span className="italic text-[#C9A227] font-medium">
                La diferencia es desde dónde lo vas a vivir.
              </span>
            </h2>

            {isBlackFriday && (
              <div className="mt-7 flex flex-col items-center gap-2">
                <Countdown variant="large" />
                <p className="text-xs text-[#F1EFE8]/75 mt-1">
                  Precios especiales disponibles hasta el lunes 30/11 a las
                  23:59 (hora Argentina)
                </p>
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToPacks}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C9A227] text-[#12243B] hover:bg-[#D4B038] text-base font-semibold transition-colors cursor-pointer min-h-[52px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1EFE8]"
              >
                <span>Elegí por dónde empezar</span>
                <ArrowUp className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-7 text-sm sm:text-base text-[#F1EFE8]/80 leading-relaxed max-w-xl mx-auto">
              ¿Preferís hacerlo acompañado, con sesiones conmigo? Escribime y lo
              armamos.{' '}
              <a
                href={CONFIG.accompanimentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('WhatsApp · Acompañamiento Cierre')}
                className="font-semibold text-[#C9A227] hover:text-[#F1EFE8] underline underline-offset-4 transition-colors whitespace-nowrap"
              >
                Escribime por WhatsApp
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-[#0D1A2B] text-[#F1EFE8]/80 py-10 px-4 sm:px-6 border-t border-[#F1EFE8]/10 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="font-serif-editorial italic text-xl text-[#F1EFE8]">
            Alexis Copello
          </p>
          <p className="text-xs sm:text-sm">
            Instagram:{' '}
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A227] hover:text-[#F1EFE8] underline underline-offset-2"
            >
              {CONFIG.instagramHandle}
            </a>
            <span className="mx-2 opacity-50" aria-hidden="true">
              ·
            </span>
            <a
              href={`mailto:${CONFIG.contactEmail}`}
              className="text-[#C9A227] hover:text-[#F1EFE8] underline underline-offset-2"
            >
              {CONFIG.contactEmail}
            </a>
          </p>
          <p className="text-xs text-[#F1EFE8]/65 max-w-xl mx-auto leading-relaxed">
            Los resultados de cada persona son personales. Este acompañamiento
            no reemplaza un tratamiento de salud.
          </p>
          <p className="text-xs text-[#F1EFE8]/50">© 2026 Alexis Copello</p>
        </div>
      </footer>

      {/* Barra fija inferior mobile + botón WhatsApp */}
      <div className="fixed bottom-3 inset-x-3 md:inset-x-auto md:bottom-4 md:right-4 z-40 pointer-events-none flex items-center justify-end gap-2.5">
        {showMobileBar && (
          <button
            type="button"
            onClick={scrollToPacks}
            className="md:hidden pointer-events-auto flex-1 min-w-0 h-12 px-5 rounded-full bg-[#12243B] text-[#F1EFE8] font-semibold text-sm border border-[#C9A227]/60 flex items-center justify-between gap-2 cursor-pointer shadow-lg"
          >
            <span className="truncate">Elegí por dónde empezar</span>
            <ArrowDown
              className="w-4 h-4 text-[#C9A227] shrink-0"
              aria-hidden="true"
            />
          </button>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact('WhatsApp · Botón Flotante')}
          aria-label="¿Dudas? Escribime por WhatsApp"
          title="¿Dudas? Escribime"
          className={`pointer-events-auto inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#2E7D5B] hover:bg-[#25694C] text-white text-xs sm:text-sm font-semibold border-2 border-[#F1EFE8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] shadow-lg ${
            showMobileBar ? 'w-12 md:w-auto md:px-4' : 'px-4'
          }`}
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className={showMobileBar ? 'hidden md:inline' : 'inline'}>
            ¿Dudas? Escribime
          </span>
        </a>
      </div>

      {/* Modal de muestra por pack (solo se carga si el usuario lo abre) */}
      {modalPack && (
        <Suspense fallback={null}>
          <SampleModal
            pack={modalPack}
            country={country}
            onClose={() => setModalPack(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
