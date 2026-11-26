import { CONFIG } from '../config';

export function NaserCompass() {
  return (
    <div id="naser" className="mt-10 pt-8 border-t border-[#12243B]/12">
      <div className="text-center mb-5">
        <h3 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-[#12243B]">
          Qué es <span className="text-[#9B7812]">NASER</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {CONFIG.naser.map((item) => (
          <div
            key={item.letra}
            className="rounded-2xl bg-[#FAF9F5] border border-[#12243B]/12 p-3.5 sm:p-4 flex flex-col"
          >
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#C9A227] leading-none">
                {item.letra}
              </span>
              <span className="font-serif-editorial text-base sm:text-lg font-semibold text-[#12243B] leading-tight">
                {item.nombre}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#526071] leading-snug">
              {item.linea}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
