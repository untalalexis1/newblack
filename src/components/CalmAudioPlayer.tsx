import { useEffect, useRef, useState } from 'react';
import { Loader2, Pause, Play, RotateCcw, Volume2 } from 'lucide-react';

interface CalmAudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  placeholderTag: string;
}

function formatSeconds(secs: number): string {
  if (!Number.isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const SPEEDS = [1, 1.25, 1.5] as const;

export function CalmAudioPlayer({
  src,
  title,
  subtitle,
  placeholderTag,
}: CalmAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentTime(0);
    setDuration(0);
    setSpeedIdx(0);
    setHasError(false);
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !src) {
      setHasError(true);
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setHasError(false);
      setIsLoading(true);
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const next = Number(e.target.value);
    setCurrentTime(next);
    if (audio && Number.isFinite(next)) {
      audio.currentTime = next;
    }
  };

  const handleRewind15 = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.max(0, audio.currentTime - 15);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const handleCycleSpeed = () => {
    const nextIdx = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(nextIdx);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEEDS[nextIdx];
    }
  };

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="rounded-2xl bg-[#FAF9F5] border border-[#12243B]/15 p-5 sm:p-6">
      {/* preload="none" para que no descargue nada hasta presionar play */}
      <audio
        ref={audioRef}
        src={src || undefined}
        preload="none"
        playsInline
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />

      <div className="flex items-start sm:items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pausar ${title}` : `Reproducir ${title}`}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#12243B] text-[#F1EFE8] flex items-center justify-center shrink-0 hover:bg-[#1D3554] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Play className="w-5 h-5 translate-x-0.5" aria-hidden="true" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-serif-editorial text-base sm:text-lg font-medium text-[#12243B] truncate">
              {title}
            </p>
            <Volume2
              className="w-4 h-4 text-[#9B7812] shrink-0"
              aria-hidden="true"
            />
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#526071] mb-3 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="flex items-center gap-3">
            <div className="relative flex-1 flex items-center h-4">
              <div
                aria-hidden="true"
                className="w-full h-1.5 rounded-full bg-[#12243B]/15 overflow-hidden"
              >
                <div
                  className="h-full bg-[#12243B]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                aria-label={`Progreso de reproducción de ${title}`}
                disabled={!duration}
                className="calm-range absolute inset-0 w-full h-full m-0"
              />
            </div>
            <span className="tabular-nums text-xs text-[#526071] shrink-0 min-w-[74px] text-right">
              {formatSeconds(currentTime)} /{' '}
              {duration ? formatSeconds(duration) : '--:--'}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRewind15}
                disabled={!duration}
                aria-label="Retroceder 15 segundos"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#12243B] bg-[#E6E2D6] hover:bg-[#DDD7C7] disabled:opacity-45 transition-colors cursor-pointer min-h-[30px]"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>-15s</span>
              </button>
              <button
                type="button"
                onClick={handleCycleSpeed}
                aria-label={`Velocidad de reproducción ${SPEEDS[speedIdx]}x`}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-[#12243B] bg-[#E6E2D6] hover:bg-[#DDD7C7] transition-colors cursor-pointer tabular-nums min-h-[30px]"
              >
                {SPEEDS[speedIdx]}x
              </button>
            </div>
            <span className="text-[11px] text-[#526071]">
              {isPlaying ? 'Reproduciendo' : 'Tocá play para escuchar'}
            </span>
          </div>
        </div>
      </div>

      {hasError && (
        <p className="mt-3 text-xs text-[#9B7812] bg-[#E6E2D6] rounded-xl px-3 py-2 border border-[#C9A227]/40">
          No se pudo reproducir el audio en este momento ({placeholderTag}).
        </p>
      )}
    </div>
  );
}
