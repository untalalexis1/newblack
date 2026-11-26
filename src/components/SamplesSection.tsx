import { useEffect, useState } from 'react';
import { BookOpen, Headphones, NotebookPen, X, ZoomIn } from 'lucide-react';
import { CONFIG } from '../config';
import { CalmAudioPlayer } from './CalmAudioPlayer';

export type SampleKey = 'semillas' | 'sentirbien' | 'bitacora';

export interface SampleTabDef {
  key: SampleKey;
  label: string;
}

export interface SampleLightboxItem {
  id: string | number;
  src: string;
  titulo: string;
  placeholderTag?: string;
}

export function getAvailableSampleTabs(): SampleTabDef[] {
  const m = CONFIG.muestras;
  const tabs: SampleTabDef[] = [];

  if (m.semillas.audioSrc.trim()) {
    tabs.push({ key: 'semillas', label: m.semillas.tabLabel });
  }
  if (m.sentirbien.ebookPages.length > 0 || m.sentirbien.audioSrc.trim()) {
    tabs.push({ key: 'sentirbien', label: m.sentirbien.tabLabel });
  }
  if (m.bitacora.pages.length > 0) {
    tabs.push({ key: 'bitacora', label: m.bitacora.tabLabel });
  }

  return tabs;
}

function BitacoraPageCard({
  page,
  onOpen,
}: {
  page: { id: number; src: string; titulo: string; placeholderTag: string };
  onOpen: () => void;
}) {
  const [imgError, setImgError] = useState(!page.src);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar ${page.titulo}`}
      className="group relative text-left rounded-2xl bg-[#F1EFE8] border border-[#12243B]/15 overflow-hidden hover:border-[#C9A227] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] cursor-pointer"
    >
      <div className="aspect-[5/7] w-full bg-[#F1EFE8] flex items-center justify-center overflow-hidden">
        {imgError ? (
          <div className="p-4 text-center flex flex-col items-center justify-center h-full">
            <NotebookPen
              className="w-7 h-7 text-[#12243B] mb-2 opacity-80"
              aria-hidden="true"
            />
            <span className="font-serif-editorial text-sm font-medium text-[#12243B]">
              {page.titulo}
            </span>
          </div>
        ) : (
          <img
            src={page.src}
            alt={page.titulo}
            width={376}
            height={528}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
        )}
      </div>
      <div className="px-3.5 py-2.5 flex items-center justify-between gap-2 bg-[#FAF9F5] border-t border-[#12243B]/10">
        <span className="text-xs font-medium text-[#12243B] truncate">
          {page.titulo}
        </span>
        <ZoomIn
          className="w-3.5 h-3.5 text-[#9B7812] shrink-0"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

function SentirBienSampleBlock() {
  const s = CONFIG.muestras.sentirbien;
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = s.ebookPages[pageIndex] || s.ebookPages[0];

  return (
    <div className="space-y-6">
      {s.audioSrc.trim() && (
        <div>
          <CalmAudioPlayer
            src={s.audioSrc}
            title={s.audioTitle}
            subtitle={s.audioSubtitle}
            placeholderTag={s.audioPlaceholderTag}
          />
        </div>
      )}

      {currentPage && (
        <div className="rounded-2xl bg-[#FAF9F5] border border-[#12243B]/15 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#12243B]/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9B7812]">
                Páginas reales del ebook SentirBIEN
              </p>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-semibold text-[#12243B] mt-0.5">
                {currentPage.titulo}
              </h3>
            </div>

            {s.ebookPages.length > 1 && (
              <div
                role="group"
                aria-label="Seleccionar página de muestra del ebook"
                className="inline-flex items-center p-1 rounded-full bg-[#E6E2D6] border border-[#12243B]/12 self-start sm:self-auto"
              >
                {s.ebookPages.map((pg, idx) => (
                  <button
                    key={pg.id}
                    type="button"
                    onClick={() => setPageIndex(idx)}
                    aria-pressed={idx === pageIndex}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer min-h-[34px] ${
                      idx === pageIndex
                        ? 'bg-[#12243B] text-[#F1EFE8]'
                        : 'text-[#1E293B] hover:text-[#12243B]'
                    }`}
                  >
                    Pág. {pg.pageNumber} · {pg.etiqueta}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3.5 text-sm sm:text-base text-[#1E293B] leading-relaxed">
            {currentPage.parrafos.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {currentPage.destacadoFinal && (
              <p className="pt-2 font-serif-editorial italic text-base sm:text-lg text-[#12243B]">
                {currentPage.destacadoFinal}
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[#12243B]/10 flex items-center justify-between text-xs text-[#526071]">
            <span>SentirBIEN · Alexis Copello</span>
            <span className="tabular-nums font-medium text-[#12243B]">
              Pág. {currentPage.pageNumber}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function SamplePreviewContent({
  activeTab,
  onOpenLightbox,
}: {
  activeTab: SampleKey;
  onOpenLightbox: (item: SampleLightboxItem) => void;
}) {
  const m = CONFIG.muestras;

  if (activeTab === 'semillas') {
    return (
      <div className="space-y-4">
        <p className="text-sm sm:text-base text-[#1E293B]">
          {m.semillas.caption}
        </p>
        <CalmAudioPlayer
          src={m.semillas.audioSrc}
          title="Semillas de Calma · Día 1 (Notar)"
          subtitle="Audio completo de muestra para bajar un cambio cuando la cabeza no para."
          placeholderTag={m.semillas.placeholderTag}
        />
      </div>
    );
  }

  if (activeTab === 'bitacora') {
    return (
      <div className="space-y-4">
        <p className="text-sm sm:text-base text-[#1E293B]">
          Tocá cualquiera de las páginas para verlas más grandes y conocer cómo
          se siente escribir tu día en pocos minutos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {m.bitacora.pages.map((page) => (
            <BitacoraPageCard
              key={page.id}
              page={page}
              onOpen={() => onOpenLightbox(page)}
            />
          ))}
        </div>
      </div>
    );
  }

  return <SentirBienSampleBlock />;
}

const TAB_ICON: Record<SampleKey, typeof Headphones> = {
  semillas: Headphones,
  bitacora: NotebookPen,
  sentirbien: BookOpen,
};

export function SamplesSection() {
  const tabs = getAvailableSampleTabs();
  const [activeTab, setActiveTab] = useState<SampleKey>(
    tabs[0]?.key || 'semillas'
  );
  const [lightboxPage, setLightboxPage] = useState<SampleLightboxItem | null>(
    null
  );
  const [lightboxImgError, setLightboxImgError] = useState(false);

  useEffect(() => {
    setLightboxImgError(false);
  }, [lightboxPage]);

  useEffect(() => {
    if (!lightboxPage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxPage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxPage]);

  if (tabs.length === 0) return null;

  return (
    <section
      id="muestras"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#E6E2D6] border-y border-[#12243B]/10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#12243B] text-balance leading-tight">
            Probalo{' '}
            <span className="italic text-[#9B7812]">antes de elegir</span>
          </h2>
          <p className="mt-3 text-base text-[#526071]">
            Escuchá audios reales, leé páginas del libro y mirá la bitácora por
            dentro antes de decidir.
          </p>
        </div>

        <div className="rounded-3xl bg-[#F1EFE8] border border-[#12243B]/14 p-4 sm:p-8">
          <div
            role="tablist"
            aria-label="Muestras de los packs"
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
          >
            {tabs.map((tab) => {
              const Icon = TAB_ICON[tab.key];
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] min-h-[42px] ${
                    isActive
                      ? 'bg-[#12243B] text-[#F1EFE8]'
                      : 'bg-[#FAF9F5] text-[#12243B] border border-[#12243B]/15 hover:border-[#C9A227]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel">
            <SamplePreviewContent
              activeTab={activeTab}
              onOpenLightbox={(page) => setLightboxPage(page)}
            />
          </div>
        </div>
      </div>

      {/* Lightbox de páginas de Bitácora */}
      {lightboxPage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPage.titulo}
          onClick={() => setLightboxPage(null)}
          className="fixed inset-0 z-50 bg-[#12243B]/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-3xl bg-[#F1EFE8] p-4 sm:p-6 border border-[#C9A227]/50"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="font-serif-editorial text-base sm:text-lg font-semibold text-[#12243B]">
                {lightboxPage.titulo}
              </p>
              <button
                type="button"
                onClick={() => setLightboxPage(null)}
                aria-label="Cerrar vista ampliada"
                className="w-10 h-10 rounded-full bg-[#E6E2D6] text-[#12243B] flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[75vh] mx-auto w-full rounded-2xl overflow-hidden flex items-center justify-center aspect-[5/7] bg-[#F1EFE8]">
              {lightboxImgError || !lightboxPage.src ? (
                <div className="p-6 text-center">
                  <NotebookPen
                    className="w-10 h-10 text-[#12243B] mx-auto mb-3"
                    aria-hidden="true"
                  />
                  <p className="font-serif-editorial text-lg text-[#12243B]">
                    {lightboxPage.titulo}
                  </p>
                </div>
              ) : (
                <img
                  src={lightboxPage.src}
                  alt={lightboxPage.titulo}
                  onError={() => setLightboxImgError(true)}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SamplesSection;
