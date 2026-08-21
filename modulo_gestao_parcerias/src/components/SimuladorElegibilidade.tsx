import React, { useState } from 'react';
import { 
  Building, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Info, 
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';

interface SimuladorElegibilidadeProps {
  language: 'pt' | 'en';
  t: any;
  entityType: 'state' | 'capital' | 'municipality';
  setEntityType: (type: 'state' | 'capital' | 'municipality') => void;
  population: number;
  setPopulation: (pop: number) => void;
  hasAct: boolean;
  setHasAct: (act: boolean) => void;
  selectedUf: string;
  setSelectedUf: (uf: string) => void;
  simOutput: any;
  cnpjSearchQuery: string;
  setCnpjSearchQuery: (val: string) => void;
  handleApiSearch: () => void;
  searchFeedback: { success: boolean; message: string } | null;
  generateRoadmapPdf: () => void;
}

const SimuladorElegibilidade: React.FC<SimuladorElegibilidadeProps> = ({
  language,
  t,
  entityType,
  setEntityType,
  population,
  setPopulation,
  hasAct,
  setHasAct,
  selectedUf,
  setSelectedUf,
  simOutput,
  cnpjSearchQuery,
  setCnpjSearchQuery,
  handleApiSearch,
  searchFeedback,
  generateRoadmapPdf
}) => {
  // Stepper State
  const [step, setStep] = useState<number>(1);

  // Calculate readiness percentage based on selections
  const getReadinessScore = () => {
    if (entityType === 'state') {
      return hasAct ? 100 : 50;
    }
    if (entityType === 'capital') {
      return 75;
    }
    // Municipality
    if (population > 500000) return 85;
    if (population >= 150000) return 65;
    return 35;
  };

  const readinessScore = getReadinessScore();

  // Helper for readiness styling
  const getReadinessColor = (score: number) => {
    if (score >= 80) return { stroke: 'stroke-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: t.simulator.readinessStatusHigh };
    if (score >= 50) return { stroke: 'stroke-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: t.simulator.readinessStatusMed };
    return { stroke: 'stroke-rose-500', text: 'text-rose-450', bg: 'bg-rose-500/10 border-rose-500/20', label: t.simulator.readinessStatusLow };
  };

  const readinessStyle = getReadinessColor(readinessScore);

  // SVG Circle parameters
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  return (
    <section id="diagnostico" className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden border border-slate-800 scroll-mt-20">
      
      {/* Title Header */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building className="w-5.5 h-5.5 text-[#c5a059]" />
          {t.simulator.title}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          {t.simulator.desc}
        </p>
      </div>

      {/* 3-Step Wizard Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/40 border-b border-slate-800 text-[10px] md:text-xs font-bold font-sans">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] ${step >= 1 ? 'bg-[#c5a059] text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>1</span>
          <span className={step === 1 ? 'text-[#c5a059]' : 'text-slate-400'}>{language === 'pt' ? 'Identificação' : 'Identification'}</span>
        </div>
        <div className="h-0.5 flex-1 mx-3 bg-slate-800 relative hidden sm:block">
          <div className={`absolute inset-y-0 left-0 bg-[#c5a059] transition-all duration-350 ${step > 1 ? 'w-full' : 'w-0'}`} />
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] ${step >= 2 ? 'bg-[#c5a059] text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>2</span>
          <span className={step === 2 ? 'text-[#c5a059]' : 'text-slate-400'}>{language === 'pt' ? 'Parâmetros' : 'Parameters'}</span>
        </div>
        <div className="h-0.5 flex-1 mx-3 bg-slate-800 relative hidden sm:block">
          <div className={`absolute inset-y-0 left-0 bg-[#c5a059] transition-all duration-350 ${step > 2 ? 'w-full' : 'w-0'}`} />
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] ${step >= 3 ? 'bg-[#c5a059] text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>3</span>
          <span className={step === 3 ? 'text-[#c5a059]' : 'text-slate-400'}>{language === 'pt' ? 'Resultado' : 'Result'}</span>
        </div>
      </div>

      {/* Step Contents */}
      <div className="p-6 md:p-8 min-h-[340px] flex flex-col justify-between text-slate-350">
        
        {/* STEP 1: ENTITY TYPE & POPULATION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {language === 'pt' ? 'Passo 1: Tipo de Ente Federativo' : 'Step 1: Federated Entity Type'}
              </h3>
              <p className="text-xs text-slate-400">{language === 'pt' ? 'Selecione o tipo de ente que você deseja simular e auditar a adesão.' : 'Select the type of entity you want to simulate and audit adherence.'}</p>
            </div>

            {/* Premium Select Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div 
                onClick={() => setEntityType('state')}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-3 active:scale-98 select-none ${
                  entityType === 'state' 
                    ? 'bg-[#c5a059]/10 border-[#c5a059] text-white shadow-lg' 
                    : 'bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg border ${entityType === 'state' ? 'bg-[#c5a059] text-slate-950 border-[#c5a059]' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-tight">{t.simulator.entityTypes.state}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">{language === 'pt' ? 'Governos Estaduais e Distrito Federal.' : 'State Governments and Federal District.'}</p>
                </div>
              </div>

              <div 
                onClick={() => {
                  setEntityType('capital');
                  setPopulation(750000);
                }}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-3 active:scale-98 select-none ${
                  entityType === 'capital' 
                    ? 'bg-[#c5a059]/10 border-[#c5a059] text-white shadow-lg' 
                    : 'bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg border ${entityType === 'capital' ? 'bg-[#c5a059] text-slate-950 border-[#c5a059]' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-tight">{t.simulator.entityTypes.capital}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">{language === 'pt' ? 'Cidades sedes de governos estaduais.' : 'State capital cities.'}</p>
                </div>
              </div>

              <div 
                onClick={() => {
                  setEntityType('municipality');
                  setPopulation(120000);
                }}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-3 active:scale-98 select-none ${
                  entityType === 'municipality' 
                    ? 'bg-[#c5a059]/10 border-[#c5a059] text-white shadow-lg' 
                    : 'bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg border ${entityType === 'municipality' ? 'bg-[#c5a059] text-slate-950 border-[#c5a059]' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-tight">{t.simulator.entityTypes.municipality}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">{language === 'pt' ? 'Municípios gerais (exceto capitais).' : 'General municipalities (except capitals).'}</p>
                </div>
              </div>
            </div>

            {/* Slider for Municipality population */}
            {entityType === 'municipality' && (
              <div className="space-y-3 bg-slate-950/30 p-4 rounded-xl border border-slate-800 max-w-2xl">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-350 font-semibold">{t.simulator.labelPopulation}</label>
                  <span className="font-mono text-[#c5a059] font-bold">
                    {population >= 1500000 
                      ? (language === 'pt' ? 'Mais de 1.500.000 hab.' : 'More than 1.5M pop.') 
                      : (language === 'pt' ? `${population.toLocaleString('pt-BR')} hab.` : `${population.toLocaleString('en-US')} pop.`)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={5000} 
                  max={1500000} 
                  step={5000}
                  value={population}
                  onChange={(e) => setPopulation(Number(e.target.value))}
                  className="w-full accent-[#c5a059] bg-slate-800 rounded-lg cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>5.000</span>
                  <span>{language === 'pt' ? '500k (Limite PNGI)' : '500k (PNGI Limit)'}</span>
                  <span>1.5M+</span>
                </div>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-end pt-4 border-t border-slate-800/60">
              <button 
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d4a] text-slate-955 font-bold rounded-lg text-xs tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95 text-slate-900"
              >
                <span>{t.simulator.btnNextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DETAILS (CNPJ OR STATE/ACT) */}
        {step === 2 && (
          <div className="space-y-6 animate-fade">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {language === 'pt' ? 'Passo 2: Identificação do Ente' : 'Step 2: Entity Details & Validation'}
              </h3>
              <p className="text-xs text-slate-400">{language === 'pt' ? 'Preencha as informações complementares para auditoria regulatória.' : 'Fill in the complementary info for regulatory auditing.'}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              
              {/* Left Column: API CNPJ Search */}
              <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <label className="text-[10px] text-amber-500 font-bold block font-mono">{t.simulator.apiTitle}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cnpjSearchQuery}
                    onChange={(e) => setCnpjSearchQuery(e.target.value)}
                    placeholder={t.simulator.apiPlaceholder}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#c5a059] text-white outline-none"
                  />
                  <button
                    onClick={handleApiSearch}
                    className="px-3 py-2 bg-[#c5a059] hover:bg-[#b08d4a] text-slate-950 font-bold rounded-lg text-[11px] transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    {t.simulator.btnApiSearch}
                  </button>
                </div>
                <span className="text-[9px] text-slate-450 block leading-relaxed font-mono">
                  {language === 'pt' ? 'Testes: Acre (04.079.547/0001-78 ou 9701), São Paulo (46.395.000/0001-39 ou 7107)' : 'Testing: Acre (04.079.547/0001-78 or 9701), São Paulo (46.395.000/0001-39 or 7107)'}
                </span>
                {searchFeedback && (
                  <span className={`text-[10px] block font-semibold ${searchFeedback.success ? 'text-green-400' : 'text-rose-450'}`}>
                    {searchFeedback.message}
                  </span>
                )}
              </div>

              {/* Right Column: Custom Selections for States */}
              <div className="space-y-4">
                {entityType === 'state' && (
                  <div className="space-y-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-350 block font-semibold">{t.simulator.labelUf}</label>
                      <select 
                        value={selectedUf} 
                        onChange={(e) => setSelectedUf(e.target.value)}
                        className="w-full bg-slate-800 text-slate-200 text-xs p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#c5a059] outline-none"
                      >
                        {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-350 block font-semibold">{t.simulator.labelAct}</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div 
                          onClick={() => setHasAct(true)}
                          className={`p-2.5 rounded-lg border text-xs font-bold text-center cursor-pointer select-none transition-all ${
                            hasAct ? 'bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {t.common.yes}
                        </div>
                        <div 
                          onClick={() => setHasAct(false)}
                          className={`p-2.5 rounded-lg border text-xs font-bold text-center cursor-pointer select-none transition-all ${
                            !hasAct ? 'bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {t.common.no}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {entityType === 'capital' && (
                  <div className="bg-slate-955/20 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-[#c5a059] block mb-1">
                      {language === 'pt' ? 'Regra para Capitais' : 'Capital Rule'}
                    </span>
                    {language === 'pt' ? 'Capitais de estado possuem prioridade máxima de homologação, com transição agendada independente da população.' : 'State capitals have top priority for approval, with scheduled transition independent of population.'}
                  </div>
                )}

                {entityType === 'municipality' && (
                  <div className="bg-slate-955/20 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-[#c5a059] block mb-1">
                      {language === 'pt' ? 'Faixas Populacionais (MGI)' : 'Population Ranges (MGI)'}
                    </span>
                    {language === 'pt' ? 'Municípios acima de 500k habitantes integram a primeira fase do Rollout Geral. Cidades pequenas contam com suporte simplificado.' : 'Municipalities over 500k inhabitants join phase 1 of general rollout. Smaller cities use simplified transition pathways.'}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-800/60">
              <button 
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.simulator.btnPrevStep}</span>
              </button>

              <button 
                onClick={() => setStep(3)}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d4a] text-slate-955 font-bold rounded-lg text-xs tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95 text-slate-900"
              >
                <span>{language === 'pt' ? 'Gerar Diagnóstico' : 'Generate Diagnosis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS DIAGNOSIS & CIRCULAR GAUGE */}
        {step === 3 && (
          <div className="space-y-6 animate-fade">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Speedometer / Gauge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-450 uppercase font-mono tracking-wider font-bold">
                  {t.simulator.readinessLabel}
                </span>

                {/* SVG circular progress */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background track circle */}
                    <circle 
                      cx="56" 
                      cy="56" 
                      r={radius} 
                      className="stroke-slate-800 fill-none" 
                      strokeWidth="8"
                    />
                    {/* Colored percentage arc */}
                    <circle 
                      cx="56" 
                      cy="56" 
                      r={radius} 
                      className={`fill-none transition-all duration-1000 ease-out ${readinessStyle.stroke}`}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Inside circle text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white font-mono leading-none">{readinessScore}%</span>
                  </div>
                </div>

                {/* Status indicator badge */}
                <div className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${readinessStyle.bg} ${readinessStyle.text} leading-none`}>
                  {readinessStyle.label}
                </div>
              </div>

              {/* Right Column: Diagnostic Output Info */}
              <div className="lg:col-span-8 space-y-4">
                {simOutput ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <span className="px-3 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[9px] font-bold rounded uppercase tracking-wider">
                        {language === 'pt' ? 'RESULTADO DA AUDITORIA' : 'AUDIT RESULT'}
                      </span>
                      
                      {simOutput.eligiblePngi ? (
                        <span className="px-2 py-0.5 bg-green-500/10 border border-green-400/20 text-green-400 text-[9px] font-bold rounded flex items-center gap-1 border">
                          <Check className="w-3 h-3" /> {t.simulator.resultEligibleYes}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[9px] font-bold rounded flex items-center gap-1 border">
                          <Info className="w-3 h-3" /> {t.simulator.resultEligibleNo}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono text-[10px] block uppercase">{t.simulator.phase}</span>
                      <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                        {simOutput.rolloutPhase}
                      </h3>
                      <p className="text-[#c5a059] font-mono text-xs font-bold flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t.simulator.date} {simOutput.rolloutDate}
                      </p>
                    </div>

                    <p className="text-slate-350 text-xs leading-relaxed border-t border-slate-800 pt-3">
                      {simOutput.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider block">
                        {t.simulator.kitRecommended}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-slate-350">
                        {simOutput.actionSteps.map((stepItem: string, index: number) => (
                          <div key={`action-${index}`} className="flex items-start gap-1.5 bg-slate-900/60 p-2 rounded border border-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                            <span>{stepItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs py-6">
                    {language === 'pt' ? 'Ocorreu um erro ao calcular o resultado. Refaça o teste.' : 'An error occurred while calculating results. Please redo.'}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-800/60">
              <button 
                onClick={() => {
                  setStep(1);
                }}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>{t.simulator.btnRedo}</span>
              </button>

              <button 
                onClick={generateRoadmapPdf}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d4a] text-slate-900 font-bold rounded-lg text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow"
              >
                <Download className="w-4 h-4" />
                {t.simulator.btnDownloadRoadmap}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SimuladorElegibilidade;
