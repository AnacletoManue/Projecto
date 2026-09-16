import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  PhoneCall, 
  Hospital, 
  RefreshCw, 
  FileText, 
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Stethoscope,
  X
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { SAMPLE_TEST_CASES } from '../data/mpoxData';

interface AiScreenerProps {
  onNavigateToFacilities: () => void;
}

export const AiScreener: React.FC<AiScreenerProps> = ({ onNavigateToFacilities }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clinical context questionnaire
  const [hasFever, setHasFever] = useState<boolean>(false);
  const [hasSwollenLymph, setHasSwollenLymph] = useState<boolean>(false);
  const [hasMusclePain, setHasMusclePain] = useState<boolean>(false);
  const [lesionDuration, setLesionDuration] = useState<string>('1_3_dias');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resultCardRef = useRef<HTMLDivElement | null>(null);

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setErrorMsg('A imagem é muito pesada. Por favor, envie uma foto com até 12 MB.');
      return;
    }

    setErrorMsg(null);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
      setErrorMsg('Não foi possível acessar a câmera do dispositivo. Verifique as permissões do navegador ou escolha uma foto da galeria.');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Capture photo from video
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setImageMimeType('image/jpeg');
      setResult(null);
      stopCamera();
    }
  };

  // Load sample test image
  const handleSelectSample = (dataUrl: string) => {
    setSelectedImage(dataUrl);
    setImageMimeType('image/png');
    setResult(null);
    setErrorMsg(null);
    stopCamera();
  };

  // Run AI Analysis via backend API
  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg('Por favor, faça upload ou tire uma foto de uma lesão na pele antes de iniciar a triagem.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    const symptomList: string[] = [];
    if (hasFever) symptomList.push('Febre recente');
    if (hasSwollenLymph) symptomList.push('Gânglios / Ínguas inchadas no pescoço ou virilha');
    if (hasMusclePain) symptomList.push('Dores musculares ou fraqueza');
    symptomList.push(`Duração estimada das lesões: ${lesionDuration.replace('_', ' ')}`);

    try {
      const response = await fetch('/api/analyze-lesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: imageMimeType,
          symptoms: symptomList,
          notes: additionalNotes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro na análise do servidor (${response.status})`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);

      // Smooth scroll to result
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Erro na requisição da triagem:', err);
      setErrorMsg(
        err.message || 'Ocorreu uma falha temporária ao comunicar com o modelo de inteligência artificial. Por favor, tente novamente.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setErrorMsg(null);
    stopCamera();
  };

  return (
    <div id="ai-screener-container" className="space-y-8">
      {/* Introduction and context card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modelo de Triagem em Treino por Startup Angolana</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Teste Rápido de Triagem de Mpox por Imagem
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            Envie uma fotografia nítida de uma lesão, bolha ou erupção cutânea suspeita. Nosso modelo de visão computacional analisa os padrões dermatológicos para identificar sinais compatíveis com Mpox, oferecendo <strong className="text-white font-medium">orientações acolhedoras, cautelosas e imediatas</strong> para tranquilizar e proteger você e a sua família em Angola.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
              <HeartHandshake className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold block text-white">Abordagem Empática</span>
                <span className="text-slate-400">Avaliação sem pânico, destacando alternativas benignas.</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
              <Stethoscope className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold block text-white">Triagem Clínica</span>
                <span className="text-slate-400">Indicações passo a passo de isolamento e cuidados.</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
              <Hospital className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold block text-white">Rede de Saúde em Angola</span>
                <span className="text-slate-400">Direcionamento para hospitais de referência nas províncias.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Upload & Capture Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Selection & Capture */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>1. Registo Fotográfico da Lesão</span>
              </h3>
              {selectedImage && (
                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Trocar Imagem</span>
                </button>
              )}
            </div>

            {/* Error banner if any */}
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMsg(null)}
                  className="text-red-500 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Camera View Mode */}
            {isCameraActive ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-800">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-white/40 pointer-events-none m-8 rounded-lg flex items-center justify-center">
                    <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      Aproxime e foque a lesão no centro
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    id="btn-capture-photo"
                    type="button"
                    onClick={capturePhoto}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capturar Fotografia</span>
                  </button>

                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected Image Preview */
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video sm:aspect-[4/3] flex items-center justify-center border border-slate-200">
                  <img
                    src={selectedImage}
                    alt="Lesão cutânea selecionada para triagem"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fotografia Carregada</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Certifique-se de que a imagem está bem iluminada e em foco para permitir uma análise morfológica adequada pelo modelo.
                  </span>
                </div>
              </div>
            ) : (
              /* Empty state: Upload or Camera options */
              <div className="space-y-4">
                <div
                  id="dropzone-area"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-red-500 hover:bg-red-50/20 rounded-2xl p-8 text-center cursor-pointer transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="lesion-file-input"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">
                    Arraste ou clique para carregar a foto da lesão
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                    Suporta imagens em formato JPG, PNG ou WEBP do telemóvel ou computador.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors pointer-events-none"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Escolher Ficheiro</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase tracking-wider">
                    ou utilize a câmera
                  </span>
                </div>

                <button
                  id="btn-open-camera"
                  type="button"
                  onClick={startCamera}
                  className="w-full py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span>Tirar Foto com a Câmera Agora</span>
                </button>
              </div>
            )}

            {/* Sample Reference Images for quick testing */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Ou experimente com casos didáticos de referência:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_TEST_CASES.map(sample => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample.dataUrl)}
                    className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2.5 group"
                  >
                    <img
                      src={sample.dataUrl}
                      alt={sample.title}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                    />
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-slate-900 block truncate group-hover:text-red-600">
                        {sample.category}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {sample.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Symptoms Questionnaire & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                2. Sinais & Sintomas Associados
              </h3>
              <p className="text-xs text-slate-500">
                Informações complementares ajudam a refinar a triagem clínica do modelo.
              </p>
            </div>

            <div className="space-y-2.5">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/70 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasFever}
                  onChange={e => setHasFever(e.target.checked)}
                  className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">Febre repentina recente (&gt; 38°C)</span>
                  <span className="text-slate-500">Sensação de calor intenso, calafrios ou suores.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/70 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasSwollenLymph}
                  onChange={e => setHasSwollenLymph(e.target.checked)}
                  className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">Ínguas / Gânglios dolorosos ou inchados</span>
                  <span className="text-slate-500">Nódulos no pescoço, axilas ou virilhas (muito típico de Mpox).</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/70 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasMusclePain}
                  onChange={e => setHasMusclePain(e.target.checked)}
                  className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">Dores musculares, fadiga ou dor lombar</span>
                  <span className="text-slate-500">Corpo mole, dor de cabeça ou dor nas costas.</span>
                </div>
              </label>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lesion-time-select" className="text-xs font-semibold text-slate-700 block">
                Há quantos dias as erupções na pele apareceram?
              </label>
              <select
                id="lesion-time-select"
                value={lesionDuration}
                onChange={e => setLesionDuration(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="hoje_ou_ontem">Hoje ou há 1 dia (surgimento recente)</option>
                <option value="1_3_dias">Há 2 a 3 dias (início de bolhas ou líquido)</option>
                <option value="4_7_dias">Há 4 a 7 dias (formação de pústulas ou crostas)</option>
                <option value="mais_de_1_semana">Há mais de 1 semana</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="additional-notes" className="text-xs font-semibold text-slate-700 block">
                Observações adicionais (opcional):
              </label>
              <textarea
                id="additional-notes"
                rows={2}
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder="Ex.: Localização das lesões (rosto, mãos, genitais), comichão, viagens recentes..."
                className="w-full text-xs rounded-xl border border-slate-300 bg-white p-2.5 text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                id="btn-run-ai-analysis"
                type="button"
                disabled={!selectedImage || isAnalyzing}
                onClick={handleAnalyze}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                  !selectedImage
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : isAnalyzing
                    ? 'bg-red-700 text-white cursor-wait animate-pulse'
                    : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Avaliando lesão com Modelo de IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Iniciar Triagem Rápida por IA</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center mt-2.5">
                Privacidade garantida: a imagem é processada estritamente para a finalidade de triagem sanitária.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Analysis Results Card */}
      {result && (
        <div
          ref={resultCardRef}
          id="triage-result-card"
          className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden transition-all"
        >
          {/* Reassurance & Calming Header Banner (User requested calming tone) */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                <HeartHandshake className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100">
                    Acolhimento & Tranquilidade
                  </span>
                  <span className="text-xs text-emerald-200">
                    Triagem Segura
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {result.calmingMessage}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
                  Lembre-se: diversas alterações na pele ocorrem por motivos comuns (varicela, picadas, alergias, acne). Mesmo quando se trata de Mpox, a doença é tratável e a esmagadora maioria das pessoas recupera-se plenamente em poucas semanas com os devidos cuidados.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Status & Diagnostic Classification Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Parecer Visual do Modelo
                </span>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-bold ${
                    result.isLikelyMpox
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {result.isLikelyMpox ? (
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    )}
                    <span>{result.assessment}</span>
                  </span>

                  <span className="text-xs text-slate-500 font-medium">
                    (Compatibilidade: <strong className="capitalize text-slate-800">{result.confidenceLevel}</strong>)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:111"
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Contactar 111 Angola</span>
                </a>

                <button
                  type="button"
                  onClick={onNavigateToFacilities}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Hospital className="w-3.5 h-3.5" />
                  <span>Ver Hospitais</span>
                </button>
              </div>
            </div>

            {/* Clinical Summary */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Resumo da Avaliação da Imagem</span>
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                {result.summary}
              </p>
            </div>

            {/* Two column grid: Visual Observations & Differential Possibilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visual Observations */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Características Observadas na Pele</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-700">
                  {result.visualObservations.map((obs, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Differential Diagnoses */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Outras Possibilidades Médicas a Considerar</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-700">
                  {result.differentialPossibilities.map((diff, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  Somente um teste laboratorial molecular (PCR) pode confirmar ou descartar o vírus definitivamente.
                </p>
              </div>
            </div>

            {/* Step-by-Step Immediate Home Care */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Recomendações e Cuidados Imediatos em Casa</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.stepByStepCare.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-amber-200/80 text-xs text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning signs & Angola Referral */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Warning signs */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Sinais de Alarme (Procure a Urgência Imediatamente):</span>
                </span>
                <ul className="space-y-1.5 text-xs text-red-800">
                  {result.warningSigns.map((warn, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Angola specific direct guidance */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Hospital className="w-4 h-4 text-sky-400" />
                  <span>Protocolo de Saúde em Angola:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.angolaAdvice}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onNavigateToFacilities}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Localizar Hospital Próximo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:111"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Ligar 111 (Gratuito)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Aviso Legal de Saúde Pública:</strong> Esta triagem inteligente por visão computacional é uma tecnologia experimental desenvolvida para suporte comunitário e auxílio preventivo. Ela <strong>não constitui diagnóstico médico</strong> e não substitui a consulta médica presencial ou a realização de teste PCR pelo Instituto Nacional de Saúde Pública (INSP) ou unidades hospitalares autorizadas de Angola.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
