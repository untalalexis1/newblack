/**
 * Construye la URL final de checkout en Hotmart conservando todos los parámetros
 * propios de la oferta (como `off` y `checkoutMode`) y sumando con `&` cualquier
 * parámetro de seguimiento presente en la URL actual (UTM, fbclid, etc.).
 */
export function buildCheckoutUrl(baseCheckoutUrl: string): string {
  try {
    const targetUrl = new URL(baseCheckoutUrl);
    if (typeof window === 'undefined' || !window.location.search) {
      return targetUrl.toString();
    }

    const incomingParams = new URLSearchParams(window.location.search);
    incomingParams.forEach((value, key) => {
      // Nunca sobrescribir ni eliminar parámetros propios de Hotmart (off, checkoutMode)
      if (key === 'off' || key === 'checkoutMode') {
        return;
      }
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value);
      }
    });

    return targetUrl.toString();
  } catch {
    return baseCheckoutUrl;
  }
}

const ARGENTINA_LEGACY_TIMEZONES = new Set([
  'America/Buenos_Aires',
  'America/Cordoba',
  'America/Catamarca',
  'America/Jujuy',
  'America/Mendoza',
  'America/Rosario',
]);

export function detectInitialCountry(): 'AR' | 'INTL' {
  try {
    const saved = window.localStorage.getItem('ac_bf_country');
    if (saved === 'AR' || saved === 'INTL') {
      return saved;
    }
  } catch {
    // localStorage puede estar bloqueado en navegadores privados o iframes
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Argentina') || ARGENTINA_LEGACY_TIMEZONES.has(tz)) {
      return 'AR';
    }
  } catch {
    // fallback silencioso
  }

  try {
    const langs = [
      ...(Array.isArray(navigator.languages) ? navigator.languages : []),
      navigator.language || '',
    ];
    if (langs.some((lang) => lang.toLowerCase() === 'es-ar')) {
      return 'AR';
    }
  } catch {
    // fallback silencioso
  }

  return 'INTL';
}

export function persistCountryChoice(country: 'AR' | 'INTL'): void {
  try {
    window.localStorage.setItem('ac_bf_country', country);
  } catch {
    // localStorage bloqueado: continuar sin error
  }
}
