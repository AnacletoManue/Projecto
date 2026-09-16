import React, { useState } from 'react';
import { Header } from './components/Header';
import { AiScreener } from './components/AiScreener';
import { InfoSection } from './components/InfoSection';
import { HealthCentersAngola } from './components/HealthCentersAngola';
import { SymptomChecker } from './components/SymptomChecker';
import { FaqSection } from './components/FaqSection';
import { ShieldCheck, PhoneCall, Heart, Sparkles, Building } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'screener' | 'info' | 'facilities' | 'symptoms' | 'faq'>('screener');

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col antialiased selection:bg-red-500 selection:text-white">
      {/* Top Navigation & Emergency Banner */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'screener' && (
          <AiScreener onNavigateToFacilities={() => setActiveTab('facilities')} />
        )}

        {activeTab === 'info' && (
          <InfoSection 
            onGoToScreener={() => setActiveTab('screener')} 
            onGoToFacilities={() => setActiveTab('facilities')} 
          />
        )}

        {activeTab === 'facilities' && (
          <HealthCentersAngola />
        )}

        {activeTab === 'symptoms' && (
          <SymptomChecker 
            onGoToScreener={() => setActiveTab('screener')} 
            onGoToFacilities={() => setActiveTab('facilities')} 
          />
        )}

        {activeTab === 'faq' && (
          <FaqSection />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center text-white font-black text-xs">
              M
            </div>
            <span className="font-semibold text-slate-800">
              Mpox Angola • Iniciativa Tecnológica de Triagem Comunitária
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <span>Fontes: Ministério da Saúde de Angola (MINSA)</span>
            <span>•</span>
            <span>Organização Mundial da Saúde (OMS)</span>
            <span>•</span>
            <span>Africa CDC</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:111"
              className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Linha 111 Gratuita</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
