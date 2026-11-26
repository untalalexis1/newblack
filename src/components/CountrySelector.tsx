import type { CountryCode } from '../config';

interface CountrySelectorProps {
  country: CountryCode;
  onChange: (next: CountryCode) => void;
  variant?: 'topbar' | 'light' | 'dark';
  showHint?: boolean;
}

export function CountrySelector({
  country,
  onChange,
  variant = 'light',
  showHint = false,
}: CountrySelectorProps) {
  const isTopBar = variant === 'topbar';
  const isDark = variant === 'dark';

  const containerClass = isTopBar
    ? 'inline-flex items-center p-0.5 rounded-full bg-[#F1EFE8]/12 border border-[#F1EFE8]/25'
    : isDark
      ? 'inline-flex items-center p-1 rounded-full bg-[#F1EFE8]/12 border border-[#F1EFE8]/25'
      : 'inline-flex items-center p-1 rounded-full bg-[#E6E2D6] border border-[#12243B]/15';

  const getBtnClass = (active: boolean) => {
    const base =
      'whitespace-nowrap shrink-0 rounded-full font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] cursor-pointer ';
    const size = isTopBar
      ? 'px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs min-h-[28px] sm:min-h-[30px]'
      : 'px-4 py-2 text-xs sm:text-sm min-h-[40px]';

    if (isTopBar || isDark) {
      return (
        base +
        size +
        (active
          ? ' bg-[#F1EFE8] text-[#12243B] font-semibold'
          : ' text-[#F1EFE8]/85 hover:text-[#F1EFE8]')
      );
    }

    return (
      base +
      size +
      (active
        ? ' bg-[#12243B] text-[#F1EFE8] font-semibold'
        : ' text-[#1E293B]/80 hover:text-[#12243B]')
    );
  };

  return (
    <div
      className={
        isTopBar ? 'inline-flex items-center' : 'flex flex-col items-center gap-2'
      }
    >
      <div
        role="group"
        aria-label="Selector de país y moneda"
        className={containerClass}
      >
        <button
          type="button"
          onClick={() => onChange('AR')}
          aria-pressed={country === 'AR'}
          className={getBtnClass(country === 'AR')}
        >
          Argentina
        </button>
        <button
          type="button"
          onClick={() => onChange('INTL')}
          aria-pressed={country === 'INTL'}
          className={getBtnClass(country === 'INTL')}
        >
          Otros países
        </button>
      </div>
      {showHint && (
        <p
          className={`text-xs text-center ${
            isDark ? 'text-[#F1EFE8]/80' : 'text-[#526071]'
          }`}
        >
          Elegí tu país para ver el precio y pagar en tu moneda.
        </p>
      )}
    </div>
  );
}
