import React from 'react';
import { ShieldAlert, PhoneCall, Activity, HeartPulse, Hospital, HelpCircle, CheckSquare } from 'lucide-react';

interface HeaderProps {
  activeTab: 'screener' | 'info' | 'facilities' | 'symptoms' | 'faq';
  onSelectTab: (tab: 'screener' | 'info' | 'facilities' | 'symptoms' | 'faq') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Top emergency announcement bar */}
      <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-600 text-white tracking-wide">
              ANGOLA EM ALERTA
            </span>
            <span className="text-slate-200 font-medium">
              Vigilância Ativa de Mpox (Varíola dos Macacos)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-300 hidden md:inline text-xs">
              Linha de Emergência Gratuita (CISP):
            </span>
            <a
              id="emergency-call-btn"
              href="tel:111"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs transition-colors shadow-sm"
              title="Ligar gratuitamente para a linha de emergência de saúde pública 111 em Angola"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ligue Grátis 111</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
            <ShieldAlert className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Mpox Angola
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                Triagem por IA
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Iniciativa de triagem rápida e contenção de surtos • República de Angola
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none" aria-label="Abas de navegação">
          <button
            id="tab-btn-screener"
            type="button"
            onClick={() => onSelectTab('screener')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'screener'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Teste Rápido (IA)</span>
          </button>

          <button
            id="tab-btn-info"
            type="button"
            onClick={() => onSelectTab('info')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'info'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Sobre a Doença</span>
          </button>

          <button
            id="tab-btn-facilities"
            type="button"
            onClick={() => onSelectTab('facilities')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'facilities'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Hospital className="w-4 h-4" />
            <span>Hospitais em Angola</span>
          </button>

          <button
            id="tab-btn-symptoms"
            type="button"
            onClick={() => onSelectTab('symptoms')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'symptoms'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Auto-Avaliação</span>
          </button>

          <button
            id="tab-btn-faq"
            type="button"
            onClick={() => onSelectTab('faq')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'faq'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Mitos & Dúvidas</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
