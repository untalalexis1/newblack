import type { CountryCode } from '../config';

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
    __META_PIXEL_INITIALIZED__?: boolean;
  }
}

const ALLOWED_PIXEL_HOST = 'soyalexis.ai.studio';

export function isPixelAllowedHost(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.location.hostname === ALLOWED_PIXEL_HOST
  );
}

export function initMetaPixel(pixelId: string): void {
  if (!isPixelAllowedHost() || !pixelId) return;
  if (window.__META_PIXEL_INITIALIZED__) return;
  window.__META_PIXEL_INITIALIZED__ = true;

  if (!window.fbq) {
    const n: NonNullable<Window['fbq']> = function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue?.push(args);
      }
    };
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    window.fbq = n;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

export function trackViewContent(country: CountryCode): void {
  if (!isPixelAllowedHost() || !window.fbq) return;
  window.fbq('track', 'ViewContent', {
    content_name: 'Packs Black Friday',
    content_type: 'product_group',
    content_ids: ['pack1', 'pack2'],
    currency: country === 'AR' ? 'ARS' : 'USD',
  });
}

export function trackAddToCart(packId: 1 | 2): void {
  if (!isPixelAllowedHost() || !window.fbq) return;
  const payload =
    packId === 1
      ? {
          content_name: 'Pack 1',
          content_ids: ['pack1'],
          value: 17,
          currency: 'USD',
        }
      : {
          content_name: 'Pack 2',
          content_ids: ['pack2'],
          value: 37,
          currency: 'USD',
        };
  window.fbq('track', 'AddToCart', payload);
}

export function trackContact(source?: string): void {
  if (!isPixelAllowedHost() || !window.fbq) return;
  if (source) {
    window.fbq('track', 'Contact', {
      content_name: source,
    });
  } else {
    window.fbq('track', 'Contact');
  }
}
