import React, { useState } from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  RefreshCw, 
  PhoneCall, 
  Hospital, 
  Camera, 
  ArrowRight, 
  Info 
} from 'lucide-react';
import { SYMPTOM_CHECKLIST } from '../data/mpoxData';

interface SymptomCheckerProps {
  onGoToScreener: () => void;
  onGoToFacilities: () => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onGoToScreener, onGoToFacilities }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    setHasEvaluated(false);
  };

  // Calculate weighted score
  const totalScore = selectedSymptoms.reduce((sum, id) => {
    const item = SYMPTOM_CHECKLIST.find(s => s.id === id);
    return sum + (item ? item.weight : 0);
  }, 0);

  const hasRash = selectedSymptoms.includes('skin_rash');
  const hasLymph = selectedSymptoms.includes('lymph_nodes');
  const hasFever = selectedSymptoms.includes('fever');
  const hasContact = selectedSymptoms.includes('direct_contact');

  let riskLevel: 'baixo' | 'moderado' | 'elevado' = 'baixo';
  let badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  let title = 'Baixa Probabilidade de Infecção Ativa';
  let description = 'Os sinais assinalados não apresentam o conjunto típico de sintomas do Mpox. Mantenha os hábitos de higiene regulares e vigie a sua saúde.';

  if (hasRash && (hasLymph || hasFever || hasContact)) {
    riskLevel = 'elevado';
    badgeColor = 'bg-red-100 text-red-900 border-red-300';
    title = 'Suspeita Clínica Significativa';
    description = 'A combinação de lesões na pele com gânglios inchados, febre ou contacto com pessoa sintomática sugere forte necessidade de triagem laboratorial presencial. Mantenha a calma, isole-se e contacte a linha 111.';
  } else if (hasRash || (hasFever && hasLymph) || hasContact) {
    riskLevel = 'moderado';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    title = 'Atenção e Monitorização Recomendada';
    description = 'Existem sintomas compatíveis que merecem observação atenta nas próximas 48 a 72 horas. Evite contacto pele a pele e considere realizar o teste fotográfico com a nossa IA.';
  }

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setHasEvaluated(false);
  };

  return (
    <div id="symptom-checker-container" className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Auto-Avaliação Clínica Rápida</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Checklist de Sinais & Sintomas de Mpox
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Selecione abaixo todas as manifestações que tem sentido nos últimos dias. Este formulário auxilia na identificação de padrões clínicos característicos da Mpox no contexto epidemiológico de Angola.
        </p>
      </div>

      {/* Checklist Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SYMPTOM_CHECKLIST.map(item => {
            const isChecked = selectedSymptoms.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSymptom(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? 'border-red-500 bg-red-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Handled by container
                  className="mt-1 rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.label}</span>
                    {item.category === 'exposicao' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Exposição
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {selectedSymptoms.length === 0
              ? 'Nenhum sintoma selecionado.'
              : `${selectedSymptoms.length} ${selectedSymptoms.length === 1 ? 'sinal selecionado' : 'sinais selecionados'}.`}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {selectedSymptoms.length > 0 && (
              <button
                type="button"
                onClick={resetChecker}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-100 transition-colors"
              >
                Limpar Seleção
              </button>
            )}

            <button
              type="button"
              onClick={() => setHasEvaluated(true)}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
            >
              Avaliar Resultado
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {hasEvaluated && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Resultado da Auto-Avaliação
              </span>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold border ${badgeColor}`}>
                  {riskLevel === 'elevado' ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : riskLevel === 'moderado' ? (
                    <Info className="w-4 h-4 text-amber-600" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>{title}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:111"
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Ligar 111 (CISP)</span>
              </a>

              <button
                type="button"
                onClick={onGoToFacilities}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Hospital className="w-3.5 h-3.5" />
                <span>Ver Hospitais</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-200">
            {description}
          </p>

          {/* If the user has a rash, suggest photo test */}
          {hasRash && (
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm text-indigo-950">
                  Tem erupções ou bolhas visíveis na pele?
                </h4>
                <p className="text-xs text-indigo-800">
                  Submeta uma foto da lesão para análise morfológica imediata com o nosso modelo de inteligência artificial.
                </p>
              </div>

              <button
                type="button"
                onClick={onGoToScreener}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 flex-shrink-0 shadow-sm transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Fazer Teste por Imagem (IA)</span>
              </button>
            </div>
          )}

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            * Este teste é exclusivamente informativo e não substitui uma consulta médica formal nem exames laboratoriais oficiais de Angola.
          </div>
        </div>
      )}
    </div>
  );
};
