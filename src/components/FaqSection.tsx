import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Check, X, PhoneCall } from 'lucide-react';
import { MPOX_FAQS } from '../data/mpoxData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div id="faq-section-container" className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Esclarecimento Comunitário</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Perguntas Frequentes & Mitos vs. Factos
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Combater informações incorretas e crenças populares prejudiciais é indispensável para evitar queimaduras na pele, disseminação em família e isolamento indevido de pessoas doentes.
        </p>
      </div>

      {/* Mitos vs Factos Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mito 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
            <X className="w-4 h-4" />
            <span>Mito Perigoso</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            "Passar cinzas, pó de bateria ou lixívia nas feridas queima o vírus e cura mais rápido."
          </h4>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Facto Real:</span>
            </div>
            <p className="leading-relaxed">
              Substâncias químicas ou abrasivas destroem a pele, causam infecções graves por bactérias (sépsis) e deixam cicatrizes deformantes. Lave apenas delicadamente com água limpa e sabão neutro e procure um centro de saúde.
            </p>
          </div>
        </div>

        {/* Mito 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
            <X className="w-4 h-4" />
            <span>Mito Perigoso</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            "A Mpox atinge apenas determinados grupos ou é uma doença incurável e mortal para todos."
          </h4>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Facto Real:</span>
            </div>
            <p className="leading-relaxed">
              O vírus não discrimina raça, género ou classe social. Qualquer pessoa exposta ao contacto próximo pode ser infectada, e com repouso e hidratação a recuperação ocorre espontaneamente na quase totalidade dos casos.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-lg mb-2">
          Perguntas Frequentes sobre a Doença e Atendimento em Angola
        </h3>

        <div className="space-y-3">
          {MPOX_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-4.5 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4.5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Help Footer */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-sm text-white">Continua com dúvidas ou sintomas suspeitos?</h4>
          <p className="text-xs text-slate-400">
            A Linha 111 de Angola está disponível 24 horas por dia para esclarecimentos e encaminhamentos oficiais.
          </p>
        </div>
        <a
          href="tel:111"
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-colors flex-shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Ligar Grátis 111 (CISP)</span>
        </a>
      </div>
    </div>
  );
};
