import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONFIG } from '../config';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="preguntas" className="mt-12 sm:mt-16">
      <div className="text-center mb-8">
        <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#12243B] text-balance">
          Preguntas{' '}
          <span className="italic text-[#9B7812]">frecuentes</span>
        </h2>
      </div>

      <div className="space-y-3">
        {CONFIG.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.pregunta}
              className="rounded-2xl bg-[#FAF9F5] border border-[#12243B]/14 overflow-hidden transition-colors"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-serif-editorial text-base sm:text-lg font-medium text-[#12243B] hover:bg-[#E6E2D6]/55 transition-colors cursor-pointer min-h-[54px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
              >
                <span>{faq.pregunta}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#9B7812] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-sm sm:text-base text-[#1E293B] leading-relaxed border-t border-[#12243B]/10">
                  {faq.respuesta}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqAccordion;
