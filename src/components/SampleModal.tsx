import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import {
  formatPrice,
  getTaxNotice,
  type CountryCode,
  type PackConfig,
} from '../config';
import { buildCheckoutUrl } from '../utils/checkout';
import { trackAddToCart } from '../utils/pixel';
import {
  getAvailableSampleTabs,
  SamplePreviewContent,
  type SampleKey,
  type SampleLightboxItem,
} from './SamplesSection';

interface SampleModalProps {
  pack: PackConfig | null;
  country: CountryCode;
  onClose: () => void;
}

export function SampleModal({ pack, country, onClose }: SampleModalProps) {
  const availableTabs = getAvailableSampleTabs();
  const [activeTab, setActiveTab] = useState<SampleKey>('semillas');
  const [lightboxPage, setLightboxPage] = useState<SampleLightboxItem | null>(
    null
  );

  useEffect(() => {
    if (!pack) return;
    const hasDefault = availableTabs.some(
      (t) => t.key === pack.muestraDefaultTab
    );
    setActiveTab(
      hasDefault ? pack.muestraDefaultTab : availableTabs[0]?.key || 'semillas'
    );
    setLightboxPage(null);
  }, [pack]);

  useEffect(() => {
    if (!pack) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxPage) {
          setLightboxPage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pack, lightboxPage, onClose]);

  if (!pack) return null;

  const tier = country === 'AR' ? pack.ars : pack.usd;
  const checkoutHref = buildCheckoutUrl(tier.checkout);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Muestra del Pack ${pack.id}: ${pack.nombre}`}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#12243B]/75 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#F1EFE8] border border-[#12243B]/15 p-5 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9B7812]">
              Muestra · Pack {pack.id}
            </p>
            <h3 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-[#12243B]">
              {pack.nombre}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar muestra"
            className="w-10 h-10 rounded-full bg-[#E6E2D6] text-[#12243B] flex items-center justify-center hover:bg-[#12243B] hover:text-[#F1EFE8] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {availableTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setActiveTab(t.key);
                setLightboxPage(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
                activeTab === t.key
                  ? 'bg-[#12243B] text-[#F1EFE8]'
                  : 'bg-[#FAF9F5] text-[#12243B] border border-[#12243B]/15'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {lightboxPage ? (
          <div className="rounded-2xl bg-[#FAF9F5] p-4 border border-[#12243B]/15">
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif-editorial text-sm font-semibold text-[#12243B]">
                {lightboxPage.titulo}
              </span>
              <button
                type="button"
                onClick={() => setLightboxPage(null)}
                className="text-xs font-medium text-[#12243B] underline cursor-pointer"
              >
                Volver a la muestra
              </button>
            </div>
            <div className="max-h-[55vh] mx-auto rounded-xl overflow-hidden flex items-center justify-center aspect-[3/4] bg-[#E6E2D6]">
              <img
                src={lightboxPage.src}
                alt={lightboxPage.titulo}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full max-h-[55vh] object-contain"
              />
            </div>
          </div>
        ) : (
          <SamplePreviewContent
            activeTab={activeTab}
            onOpenLightbox={(page) => setLightboxPage(page)}
          />
        )}

        <div className="mt-6 pt-4 border-t border-[#12243B]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm text-[#1E293B]">
            <span className="font-semibold text-[#12243B] tabular-nums text-lg">
              {formatPrice(tier.precio, country)}
            </span>{' '}
            <span className="line-through text-[#9B7812] text-xs tabular-nums">
              {formatPrice(tier.tachado, country)}
            </span>
          </div>
          <div className="flex flex-col items-stretch sm:items-end gap-1">
            <a
              href={checkoutHref}
              onClick={() => trackAddToCart(pack.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#12243B] text-[#F1EFE8] hover:bg-[#1D3554] text-sm font-semibold transition-colors min-h-[44px]"
            >
              <span>Comprar Pack {pack.id}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="text-[11px] text-center sm:text-right text-[#12243B] font-medium">
              Garantía de 7 días: si no te sirve, te devuelvo el dinero.
            </p>
            <p className="text-[11px] text-center sm:text-right text-[#526071] leading-snug">
              {getTaxNotice(country)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleModal;
