import React, { useState, useMemo } from 'react';
import { 
  Hospital, 
  MapPin, 
  PhoneCall, 
  Search, 
  ShieldAlert, 
  Clock, 
  Baby, 
  CheckCircle2, 
  Info,
  Navigation,
  Building2,
  Phone
} from 'lucide-react';
import { ANGOLA_HEALTH_FACILITIES } from '../data/mpoxData';
import { HealthFacility } from '../types';

export const HealthCentersAngola: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('todas');
  const [onlyIsolation, setOnlyIsolation] = useState<boolean>(false);
  const [onlyPediatrics, setOnlyPediatrics] = useState<boolean>(false);

  // Extract unique provinces
  const provinces = useMemo(() => {
    const list = Array.from(new Set(ANGOLA_HEALTH_FACILITIES.map(f => f.province)));
    return ['todas', ...list.sort()];
  }, []);

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return ANGOLA_HEALTH_FACILITIES.filter(facility => {
      const matchesSearch = 
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvince = 
        selectedProvince === 'todas' || facility.province === selectedProvince;

      const matchesIsolation = !onlyIsolation || facility.hasIsolationUnit;
      const matchesPediatrics = !onlyPediatrics || facility.hasPediatrics;

      return matchesSearch && matchesProvince && matchesIsolation && matchesPediatrics;
    });
  }, [searchQuery, selectedProvince, onlyIsolation, onlyPediatrics]);

  return (
    <div id="health-facilities-container" className="space-y-8">
      {/* Emergency Hotline Banner */}
      <div className="bg-red-600 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <ShieldAlert className="w-5 h-5 text-red-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-100">
              Linha de Emergência Sanitária Nacional de Angola
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Ligue 111 (CISP - Atendimento Gratuito 24 Horas)
          </h3>
          <p className="text-xs text-red-100 max-w-2xl">
            Em caso de suspeita com febre alta e erupções cutâneas, os operadores do CISP fornecem triagem pré-hospitalar, acionam equipas de resposta rápida do Ministério da Saúde ou orientam para a unidade mais indicada.
          </p>
        </div>

        <a
          id="btn-call-111-hotline"
          href="tel:111"
          className="px-5 py-3 rounded-xl bg-white text-red-600 hover:bg-red-50 font-black text-sm flex items-center gap-2 shadow transition-all flex-shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Ligar Grátis 111</span>
        </a>
      </div>

      {/* Safety Protocol Before Going to the Hospital */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <h3 className="font-bold text-base">
            Protocolo de Segurança: O que fazer ao se deslocar para o Hospital em Angola
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
            <strong className="text-slate-900 block">1. Cubra as Lesões</strong>
            <span>Use roupas leves de manga comprida e calças para evitar que outras pessoas encostem nas feridas.</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
            <strong className="text-slate-900 block">2. Use Máscara Facial</strong>
            <span>Coloque máscara cirúrgica ou de pano bem ajustada para conter gotículas ao falar ou tossir.</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
            <strong className="text-slate-900 block">3. Evite Candongueiros Cheios</strong>
            <span>Se possível, utilize transporte privativo ou solicite orientação pelo 111 para ambulância.</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
            <strong className="text-slate-900 block">4. Avise na Recepção</strong>
            <span>Ao chegar, informe discretamente na entrada que tem lesões suspeitas para ser atendido em sala isolada.</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por hospital, província ou município (ex: Luanda, Palanca, Benguela)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>

          {/* Province Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Província:</span>
            <select
              value={selectedProvince}
              onChange={e => setSelectedProvince(e.target.value)}
              className="text-xs sm:text-sm rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {provinces.map(prov => (
                <option key={prov} value={prov}>
                  {prov === 'todas' ? 'Todas as Províncias' : prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Feature Checkbox Toggles */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyIsolation}
              onChange={e => setOnlyIsolation(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className="text-slate-700 font-medium">Apenas Unidades com Ala de Isolamento</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyPediatrics}
              onChange={e => setOnlyPediatrics(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className="text-slate-700 font-medium">Com Atendimento Pediátrico</span>
          </label>

          <span className="ml-auto text-slate-400 font-medium">
            Mostrando {filteredFacilities.length} {filteredFacilities.length === 1 ? 'unidade' : 'unidades'}
          </span>
        </div>
      </div>

      {/* Facilities Grid */}
      {filteredFacilities.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">Nenhuma unidade encontrada para esta busca</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tente remover os filtros ou pesquisar por outra província. Se precisar de assistência imediata, ligue para a Linha 111.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedProvince('todas');
              setOnlyIsolation(false);
              setOnlyPediatrics(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFacilities.map(facility => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                      {facility.province} • {facility.municipality}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1.5 leading-snug">
                      {facility.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{facility.address}</span>
                </div>

                {facility.guidanceNote && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 block mb-0.5">Observação Especializada:</strong>
                    {facility.guidanceNote}
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {facility.hasIsolationUnit && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800 border border-red-200">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Ala Isolamento</span>
                    </span>
                  )}
                  {facility.hasPediatrics && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                      <Baby className="w-3 h-3" />
                      <span>Pediatria</span>
                    </span>
                  )}
                  {facility.isOpen24h && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Clock className="w-3 h-3" />
                      <span>Urgência 24h</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${facility.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{facility.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
