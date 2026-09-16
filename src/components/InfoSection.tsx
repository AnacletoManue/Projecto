import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  HeartHandshake, 
  Layers, 
  Users, 
  Sparkles, 
  Thermometer, 
  Flame, 
  Activity, 
  CheckCircle2, 
  PhoneCall 
} from 'lucide-react';
import { MPOX_STAGES } from '../data/mpoxData';

interface InfoSectionProps {
  onGoToScreener: () => void;
  onGoToFacilities: () => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ onGoToScreener, onGoToFacilities }) => {
  return (
    <div id="info-section-container" className="space-y-10">
      {/* Hero Overview */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
            <span>Guia Oficial de Saúde Pública • Angola</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Compreenda a Mpox: Informações Reais, Sintomas e Prevenção
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A Mpox (Varíola dos Macacos) é uma doença viral causada pelo vírus Mpox (género <em>Orthopoxvirus</em>). Diante da circulação de novas linhagens em África e dos esforços de vigilância sanitária em Angola, a informação correta e a detecção precoce são as nossas maiores armas para conter o surto comunitário.
          </p>
        </div>

        {/* 3 Key Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              99%
            </div>
            <h3 className="font-bold text-slate-900 text-sm">A Doença Tem Tratamento e Cura</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A imensa maioria dos doentes recupera-se espontaneamente em 2 a 4 semanas. O cuidado médico visa tratar a dor, a febre e impedir complicações bacterianas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
              Ínguas
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Sinal Clínico Distintivo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ao contrário da catapora (varicela), o Mpox causa inchaço notável e doloroso dos gânglios linfáticos (pescoço, axilas e virilhas) antes ou junto com as lesões.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              Apoio
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Sem Estigma nem Discriminação</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qualquer pessoa pode contrair o vírus através de contacto físico próximo. Acolher, testar e proteger são deveres de toda a comunidade angolana.
            </p>
          </div>
        </div>
      </div>

      {/* Como se Transmite */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            <span>Como o Vírus se Transmite?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Conhecer as vias de transmissão é fundamental para interromper a cadeia de contágio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide block">
              1. Contacto Físico Direto
            </span>
            <h4 className="font-semibold text-slate-900 text-sm">Pele com Pele</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toque direto nas erupções cutâneas, crostas ou fluidos corporais de uma pessoa infectada (abraços, relações íntimas, massagens ou ao prestar assistência sem luvas).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide block">
              2. Fômites Contaminados
            </span>
            <h4 className="font-semibold text-slate-900 text-sm">Roupas e Lençóis</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manusear roupas de cama, toalhas, vestuário, copos ou pratos utilizados por um caso ativo sem desinfecção prévia com água e sabão.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide block">
              3. Gotículas Respiratórias
            </span>
            <h4 className="font-semibold text-slate-900 text-sm">Proximidade Prolongada</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conversas frente a frente prolongadas a menos de 1 metro com pessoas sintomáticas sem máscara (especialmente se houver lesões na cavidade oral/boca).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide block">
              4. Origem Zoonótica
            </span>
            <h4 className="font-semibold text-slate-900 text-sm">Fauna Silvestre</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contacto com roedores silvestres, primatas ou caça de animais da floresta, bem como a ingestão de carne de caça mal cozida.
            </p>
          </div>
        </div>
      </div>

      {/* Estágios e Evolução das Lesões Cutâneas */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Evolução Típica das Lesões na Pele</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            As lesões de Mpox passam por fases cronológicas bem definidas. Conhecer cada fase ajuda a identificar o momento exato da doença.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MPOX_STAGES.map((stage, idx) => (
            <div key={idx} className="relative p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    {stage.badge}
                  </span>
                  <span className="text-xs font-semibold text-red-600">
                    {stage.dayRange}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {stage.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Passo {idx + 1} de 4
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cuidados a Ter & Medidas de Prevenção */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Cuidados a Ter & Medidas de Prevenção Recomendadas</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Orientações fundamentais para aplicar em casa, no trabalho e no bairro para travar o contágio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              ✓
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-emerald-950 text-sm">Higiene Constante das Mãos</h4>
              <p className="text-slate-700 leading-relaxed">
                Lave as mãos com água limpa e sabão durante 30 segundos, ou utilize solução alcoólica a 70% várias vezes ao dia, sobretudo após tocar em superfícies compartilhadas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              ✓
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-emerald-950 text-sm">Não Romper nem Coçar as Bolhas</h4>
              <p className="text-slate-700 leading-relaxed">
                Rebentar bolhas ou arrancar cascas espalha o vírus para outras áreas do corpo e para o ambiente, além de provocar cicatrizes permanentes e infecções bacterianas graves.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              ✓
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-emerald-950 text-sm">Cobrir as Lesões e Usar Máscara</h4>
              <p className="text-slate-700 leading-relaxed">
                Caso tenha feridas, cubra-as com tecido de algodão limpo ou gaze e use máscara cirúrgica se precisar estar no mesmo quarto ou espaço com outras pessoas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              ✓
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-emerald-950 text-sm">Separar Roupas e Utensílios Pessoais</h4>
              <p className="text-slate-700 leading-relaxed">
                Toalhas de banho, lençóis, pratos e talheres da pessoa doente devem ser lavados separadamente com água quente e detergente ou sabão em pó.
              </p>
            </div>
          </div>
        </div>

        {/* Action Banners */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base text-white">Tem lesões na pele ou suspeita de sintomas?</h4>
            <p className="text-xs text-slate-300">
              Faça o teste rápido por imagem com a nossa IA ou encontre a unidade de saúde mais próxima em Angola.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={onGoToScreener}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Fazer Teste Rápido (IA)
            </button>
            <button
              type="button"
              onClick={onGoToFacilities}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              Ver Hospitais em Angola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
