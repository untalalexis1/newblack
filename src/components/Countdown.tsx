import { useEffect, useState } from 'react';
import { CONFIG } from '../config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const diff = new Date(CONFIG.deadlineISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, expired: false };
}

interface CountdownProps {
  variant?: 'compact' | 'large';
}

export function Countdown({ variant = 'compact' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (timeLeft.expired) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (variant === 'compact') {
    return (
      <span
        className="tabular-nums text-[11px] sm:text-xs font-semibold sm:font-medium text-[#C9A227] whitespace-nowrap shrink-0"
        aria-label={`Faltan ${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`}
      >
        <span className="sm:hidden">
          {timeLeft.days}d {pad(timeLeft.hours)}h
        </span>
        <span className="hidden sm:inline">
          {timeLeft.days}d · {pad(timeLeft.hours)}h · {pad(timeLeft.minutes)}m
        </span>
      </span>
    );
  }

  return (
    <div
      className="inline-flex items-center justify-center gap-3 sm:gap-5 px-5 py-3 rounded-2xl bg-[#F1EFE8]/8 border border-[#C9A227]/45"
      aria-label={`Tiempo restante hasta el 30 de noviembre: ${timeLeft.days} días, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos`}
    >
      <div className="text-center min-w-[54px]">
        <div className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F1EFE8] tabular-nums leading-none">
          {pad(timeLeft.days)}
        </div>
        <div className="text-[11px] text-[#F1EFE8]/70 mt-1">días</div>
      </div>
      <span className="text-[#C9A227] text-lg font-light" aria-hidden="true">
        ·
      </span>
      <div className="text-center min-w-[54px]">
        <div className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F1EFE8] tabular-nums leading-none">
          {pad(timeLeft.hours)}
        </div>
        <div className="text-[11px] text-[#F1EFE8]/70 mt-1">horas</div>
      </div>
      <span className="text-[#C9A227] text-lg font-light" aria-hidden="true">
        ·
      </span>
      <div className="text-center min-w-[54px]">
        <div className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F1EFE8] tabular-nums leading-none">
          {pad(timeLeft.minutes)}
        </div>
        <div className="text-[11px] text-[#F1EFE8]/70 mt-1">min</div>
      </div>
    </div>
  );
}
