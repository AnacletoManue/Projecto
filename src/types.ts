export interface HealthFacility {
  id: string;
  name: string;
  province: string;
  municipality: string;
  address: string;
  phone: string;
  type: 'hospital_geral' | 'hospital_provincial' | 'hospital_pediatrico' | 'centro_saude' | 'referencia_infecciosas';
  hasIsolationUnit: boolean;
  hasPediatrics: boolean;
  isOpen24h: boolean;
  guidanceNote?: string;
}

export interface AnalysisResult {
  success: boolean;
  isSimulation?: boolean;
  assessment: string;
  confidenceLevel: 'alta' | 'moderada' | 'baixa' | 'inconclusiva';
  isLikelyMpox: boolean;
  calmingMessage: string;
  summary: string;
  visualObservations: string[];
  differentialPossibilities: string[];
  urgencyLevel: 'urgente' | 'atencao_rapida' | 'rotina_observacao';
  stepByStepCare: string[];
  warningSigns: string[];
  angolaAdvice: string;
}

export interface SymptomItem {
  id: string;
  label: string;
  description: string;
  category: 'primario' | 'lesao' | 'exposicao';
  weight: number;
}

export interface SampleImage {
  id: string;
  title: string;
  category: string;
  description: string;
  dataUrl: string;
}
