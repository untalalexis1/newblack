import { ArrowRight, Check, Eye } from 'lucide-react';
import {
  formatPrice,
  getTaxNotice,
  type CountryCode,
  type PackConfig,
} from '../config';
import { buildCheckoutUrl } from '../utils/checkout';
import { trackAddToCart } from '../utils/pixel';

interface PackCardProps {
  pack: PackConfig;
  country: CountryCode;
  isBlackFriday: boolean;
  onOpenSample: (pack: PackConfig) => void;
}

export function PackCard({
  pack,
  country,
  isBlackFriday,
  onOpenSample,
}: PackCardProps) {
  const tier = country === 'AR' ? pack.ars : pack.usd;
  const checkoutHref = buildCheckoutUrl(tier.checkout);

  return (
    <article
      className={`relative flex flex-col w-full rounded-3xl p-6 sm:p-7 ${
        pack.destacado
          ? 'bg-[#FAF9F5] border-2 border-[#C9A227] shadow-[0_14px_34px_rgba(18,36,59,0.08)]'
          : 'bg-[#FAF9F5] border border-[#12243B]/15'
      }`}
    >
      {/* Etiqueta de Pack + sello dorado "Mi recomendación" en Pack 2 */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs font-semibold tracking-wider text-[#526071] uppercase">
          Pack {pack.id}
        </p>
        {pack.sello && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A227] text-[#12243B] text-[11px] font-bold tracking-wide shrink-0">
            {pack.sello}
          </span>
        )}
      </div>

      {/* Nombre del pack */}
      <h3 className="font-serif-editorial text-2xl sm:text-[28px] font-semibold text-[#12243B] leading-snug">
        {pack.nombre}
      </h3>

      {/* Frase */}
      <p className="mt-1.5 font-serif-editorial italic text-[#9B7812] text-base leading-snug">
        “{pack.frase}”
      </p>

      {/* Imagen compacta del pack */}
      <div className="mt-5 mb-5 aspect-square max-w-[220px] sm:max-w-[250px] mx-auto w-full rounded-2xl overflow-hidden bg-[#E6E2D6] border border-[#12243B]/10">
        <img
          src={pack.imagen}
          alt={pack.imagenAlt}
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Qué incluye */}
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#526071] mb-3">
          Incluye
        </p>
        <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#1E293B] leading-snug">
          {pack.incluye.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-0.5 w-5 h-5 rounded-full bg-[#C9A227]/20 text-[#9B7812] flex items-center justify-center shrink-0"
              >
                <Check className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span className="font-medium text-[#12243B]">{item}</span>
            </li>
          ))}
        </ul>

        {pack.incluyeMas && pack.incluyeMas.length > 0 && (
          <div className="mt-4">
            {pack.incluyeMasTitulo && (
              <p className="text-xs sm:text-sm font-bold text-[#12243B] mb-2.5">
                {pack.incluyeMasTitulo}
              </p>
            )}
            <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#1E293B] leading-snug">
              {pack.incluyeMas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-5 text-center font-bold text-base leading-snug text-[#C9A227] shrink-0"
                  >
                    +
                  </span>
                  <span className="font-medium text-[#12243B]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pack.regalos && (
          <div className="mt-5 w-full rounded-2xl bg-[#F1EFE8] border border-[#C9A227] p-4 sm:p-5">
            <h4 className="font-serif-editorial text-base sm:text-[17px] font-semibold text-[#12243B] leading-snug">
              <span className="text-[#C9A227]">+</span> {pack.regalos.titulo}
            </h4>
            <p className="mt-0.5 text-sm italic text-[#526071] leading-snug">
              {pack.regalos.subtitulo}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#1E293B] leading-relaxed">
              {pack.regalos.items.map((bonus, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="font-bold text-[#C9A227] shrink-0"
                  >
                    ·
                  </span>
                  <span>
                    <strong className="font-semibold text-[#12243B]">
                      {bonus.nombre}:
                    </strong>{' '}
                    {bonus.descripcion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-3.5 text-xs text-[#526071]">{pack.nota}</p>
      </div>

      {/* Precio + CTA + Garantía + Nota de pago */}
      <div className="mt-6 pt-5 border-t border-[#12243B]/12">
        <div className="flex items-baseline justify-center gap-2.5 flex-wrap text-center">
          <span className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#12243B] tabular-nums">
            {formatPrice(tier.precio, country)}
          </span>
          <span className="text-xs sm:text-sm text-[#526071] tabular-nums">
            valor por separado{' '}
            <span className="line-through text-[#9B7812] font-medium">
              {formatPrice(tier.tachado, country)}
            </span>
          </span>
        </div>

        {isBlackFriday && (
          <p className="mt-1 text-center text-xs text-[#526071]">
            Precio especial hasta el lunes 30/11.
          </p>
        )}

        <a
          href={checkoutHref}
          onClick={() => trackAddToCart(pack.id)}
          aria-label={`Comprar Pack ${pack.id}: ${pack.nombre} por ${formatPrice(tier.precio, country)}`}
          className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-colors duration-150 min-h-[50px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] ${
            pack.destacado
              ? 'bg-[#12243B] text-[#F1EFE8] hover:bg-[#1D3554]'
              : 'bg-[#12243B] text-[#F1EFE8] hover:bg-[#1D3554]'
          }`}
        >
          <span>Comprar Pack {pack.id}</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>

        <div className="mt-3 space-y-1 text-[11.5px] text-center text-[#526071] leading-snug">
          <p className="font-medium text-[#12243B]">
            Garantía de 7 días: si no te sirve, te devuelvo el dinero.
          </p>
          <p>{getTaxNotice(country)}</p>
        </div>

        <button
          type="button"
          onClick={() => onOpenSample(pack)}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#12243B] bg-[#F1EFE8] hover:bg-[#E6E2D6] border border-[#12243B]/15 transition-colors cursor-pointer min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
        >
          <Eye className="w-4 h-4 text-[#9B7812]" aria-hidden="true" />
          <span>Ver una muestra</span>
        </button>
      </div>
    </article>
  );
}
