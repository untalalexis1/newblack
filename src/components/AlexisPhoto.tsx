import { useState } from 'react';
import { Camera } from 'lucide-react';

interface AlexisPhotoProps {
  src: string;
  alt: string;
  placeholderLabel: string;
  shape?: 'tilted-rect' | 'circle';
  eager?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function AlexisPhoto({
  src,
  alt,
  placeholderLabel,
  shape = 'tilted-rect',
  eager = false,
  width = 640,
  height = 853,
  className = '',
}: AlexisPhotoProps) {
  const [failed, setFailed] = useState(!src);

  const isCircle = shape === 'circle';

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center text-center px-5 py-6 bg-[#E6E2D6] text-[#12243B] ${
          isCircle
            ? 'rounded-full border-4 border-[#FAF9F5] ring-2 ring-[#C9A227]'
            : 'rounded-2xl border-4 border-[#FAF9F5] ring-1 ring-[#C9A227]/45'
        } ${className}`}
      >
        <div className="w-11 h-11 rounded-full bg-[#12243B]/8 flex items-center justify-center mb-3 text-[#12243B]">
          <Camera className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="font-serif-editorial text-sm font-medium text-[#12243B]">
          {placeholderLabel}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={`object-cover object-[center_20%] ${
        isCircle
          ? 'rounded-full border-4 border-[#FAF9F5] ring-2 ring-[#C9A227]'
          : 'rounded-2xl border-4 border-[#FAF9F5] ring-1 ring-[#12243B]/15 shadow-[0_12px_30px_rgba(18,36,59,0.12)]'
      } ${className}`}
    />
  );
}
