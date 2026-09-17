import React, { useState } from "react";
import { City, District, LandEvaluation, RiskLevel } from "../types";
import {
  INITIAL_LAND_EVALUATIONS,
  DOUALA_DISTRICTS,
  YAOUNDE_DISTRICTS,
} from "../data/mockData";
import {
  MapPin,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Upload,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Building,
  Info,
} from "lucide-react";

interface LandAnalysisViewProps {
  currentCity: City;
  openAiAssistant: () => void;
}

export const LandAnalysisView: React.FC<LandAnalysisViewProps> = ({
  currentCity,
  openAiAssistant,
}) => {
  // Current active evaluation displayed
  const [evaluations, setEvaluations] = useState<LandEvaluation[]>(INITIAL_LAND_EVALUATIONS);
  const [selectedEvalId, setSelectedEvalId] = useState<string>(evaluations[0]?.id || "");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(3);

  // Form State for new analysis
  const [city, setCity] = useState<City>(currentCity);
  const [district, setDistrict] = useState<District>(
    currentCity === "Douala" ? "Bonabéri" : "Bastos"
  );
  const [locationName, setLocationName] = useState("Angle Carrefour Marché");
  const [surface, setSurface] = useState<number>(650);
  const [gps, setGps] = useState("4.0784 N, 9.6642 E");
  const [projectType, setProjectType] = useState("Duplex R+1 résidentiel");
  const [floors, setFloors] = useState("R+1");
  const [budget, setBudget] = useState<number>(45000000);
  const [additionalNotes, setAdditionalNotes] = useState("Terrain plat avec 2 arbres fruitiers.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Map layer toggle
  const [mapLayer, setMapLayer] = useState<"standard" | "flood" | "zoning">("standard");

  const districtsList = city === "Douala" ? DOUALA_DISTRICTS : YAOUNDE_DISTRICTS;

  const currentEval = evaluations.find((e) => e.id === selectedEvalId) || evaluations[0];

  const handleLaunchAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setCurrentStep(2);

    setTimeout(() => {
      // Create new evaluation
      const isHighRisk = district === "Bépanda" || district === "Deido" || floors === "R+3";
      const newEval: LandEvaluation = {
        id: `eval-${Date.now()}`,
        title: `Parcelle ${district} (${city}) - ${surface} m²`,
        city,
        district,
        surface,
        projectType,
        floors,
        budget,
        hasGPS: true,
        gpsCoords: city === "Douala" ? { lat: 4.051, lng: 9.767 } : { lat: 3.848, lng: 11.502 },
        status: isHighRisk ? "WARNING" : "FAVORABLE",
        overallScore: isHighRisk ? 68 : 86,
        criteria: {
          accessibility: {
            status: "FAVORABLE",
            text: "🟢 Voie d'accès carrossable stabilisée",
            details: "Largeur estimée à 7m, raccordable facilement aux voiries secondaires.",
          },
          topography: {
            status: isHighRisk ? "WARNING" : "FAVORABLE",
            text: isHighRisk ? "🟠 Légère dépression topographique" : "🟢 Pente douce < 4%",
            details: "Terrassement standard requis. Pas d'éboulement constaté aux alentours.",
          },
          floodRisk: {
            status: district === "Bépanda" ? "RISK" : (district === "Bonabéri" ? "WARNING" : "FAVORABLE"),
            text: district === "Bépanda" ? "🔴 Risque d'inondation en forte pluie" : "🟢 Zone hors talweg inondable",
            details: "Recommandation d'élévation du radier de 40 cm pour précaution.",
          },
          zoning: {
            status: "FAVORABLE",
            text: "🟢 Zone Urbaine Planifiée constructible",
            details: "Compatible avec le schéma directeur d'urbanisme municipal.",
          },
          utilities: {
            status: "FAVORABLE",
            text: "🟢 Réseau ENEO et CAMWATER accessibles sous 50 mètres",
            details: "Raccordement basse tension possible sans transformateur dédié.",
          },
        },
        recommendations: [
          `Faire procéder au bornage contradictoire par un géomètre assermenté à ${district}.`,
          "Consulter la fiche d'urbanisme à la mairie de céans avant le dépôt du permis de bâtir.",
          "Prévoir des semelles filantes en béton armé dosées à 350 kg/m³.",
        ],
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        date: "À l'instant",
      };

      setEvaluations([newEval, ...evaluations]);
      setSelectedEvalId(newEval.id);
      setIsAnalyzing(false);
      setCurrentStep(3);
    }, 1200);
  };

  const getStatusBadge = (status: RiskLevel) => {
    switch (status) {
      case "FAVORABLE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            🟢 Favorable
          </span>
        );
      case "WARNING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/40">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            🟠 À vérifier
          </span>
        );
      case "RISK":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/40">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
            🔴 Risque potentiel
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Title Bar */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Domaine 1 • Prévention & Évaluation Foncière</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Analyse Intelligente des Terrains
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Évaluez la faisabilité de votre projet avant d'acheter : topographie, risques naturels, accès routiers et règles d'urbanisme.
          </p>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Interroger SmartImmo AI</span>
        </button>
      </div>

      {/* 4-Step Visual Process Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { num: 1, title: "ÉTAPE 1", desc: "Collecte des informations" },
          { num: 2, title: "ÉTAPE 2", desc: "Analyse automatique" },
          { num: 3, title: "ÉTAPE 3", desc: "Détection des risques" },
          { num: 4, title: "ÉTAPE 4", desc: "Recommandations claires" },
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num as 1 | 2 | 3 | 4)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isActive
                  ? "bg-[#c5a059] text-black font-bold border-[#c5a059] shadow-lg shadow-[#c5a059]/10"
                  : isDone
                  ? "bg-[#141d2a] text-white border-[#24344d]"
                  : "bg-[#0e141f] text-gray-400 border-[#1c2637]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive
                      ? "bg-black text-[#e5c378]"
                      : "bg-[#1d2737] text-gray-300"
                  }`}
                >
                  {step.title}
                </span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-[#34d399]" />}
              </div>
              <p
                className={`text-sm mt-2 font-medium ${
                  isActive ? "text-black" : "text-gray-200"
                }`}
              >
                {step.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form (Step 1 & 2) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6">
            <div className="border-b border-[#212d41] pb-4 mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Renseigner un terrain à analyser
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Formulaire simplifié avec aide pas à pas.
                </p>
              </div>
              <span className="text-xs bg-[#1a2332] text-[#e5c378] px-2.5 py-1 rounded-lg border border-[#283850]">
                Étape 1
              </span>
            </div>

            <form onSubmit={handleLaunchAnalysis} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Ville
                  </label>
                  <select
                    value={city}
                    onChange={(e) => {
                      const newCity = e.target.value as City;
                      setCity(newCity);
                      setDistrict(newCity === "Douala" ? "Bonabéri" : "Bastos");
                    }}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Quartier
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value as District)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Localisation ou repère connu
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Ex : Derrière la chefferie, à 200m du carrefour..."
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Superficie (m²)
                  </label>
                  <input
                    type="number"
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    min={100}
                    max={10000}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Coordonnées GPS (facultatif)
                  </label>
                  <input
                    type="text"
                    value={gps}
                    onChange={(e) => setGps(e.target.value)}
                    placeholder="Lat, Long ou pointage"
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Type de projet
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Villa basse (RDC)">Villa basse (RDC)</option>
                    <option value="Duplex R+1 résidentiel">Duplex R+1 résidentiel</option>
                    <option value="Duplex R+2 moderne">Duplex R+2 moderne</option>
                    <option value="Immeuble locatif R+3">Immeuble locatif R+3</option>
                    <option value="Bureaux / Commerce">Bureaux / Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Nombre d'étages
                  </label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(e.target.value)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="RDC">RDC uniquement</option>
                    <option value="R+1">R+1 (1 étage)</option>
                    <option value="R+2">R+2 (2 étages)</option>
                    <option value="R+3">R+3 (3 étages)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Budget indicatif envisagé (FCFA)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  step={1000000}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Photos & documents upload box */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Photos ou plan de bornage (facultatif)
                </label>
                <div className="border-2 border-dashed border-[#283952] hover:border-[#c5a059] rounded-xl p-4 text-center cursor-pointer bg-[#141d2a] transition-all">
                  <Upload className="w-5 h-5 text-[#c5a059] mx-auto mb-1.5" />
                  <span className="text-xs text-gray-300 block font-medium">
                    Déposez une photo du terrain ou cliquez pour choisir
                  </span>
                  <span className="text-[10px] text-gray-500">
                    JPG, PNG, PDF (max 10 Mo)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Informations complémentaires
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-[#c5a059] hover:bg-[#d6b065] text-black font-extrabold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10 active:scale-98"
              >
                {isAnalyzing ? (
                  <span className="animate-spin text-lg">⏳ Analyse IA en cours...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Lancer l'Analyse Complète du Terrain</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List of Analyzed Parcels */}
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Historique de vos analyses de parcelles
            </h4>
            <div className="space-y-2">
              {evaluations.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => {
                    setSelectedEvalId(ev.id);
                    setCurrentStep(3);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedEvalId === ev.id
                      ? "bg-[#182333] border-[#c5a059]"
                      : "bg-[#141b27] border-[#222f42] hover:bg-[#192231]"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{ev.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {ev.surface} m² • {ev.projectType}
                    </div>
                  </div>
                  {getStatusBadge(ev.status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Map & Step 3/4 Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulated Interactive Satellite & Cadastral Map */}
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] overflow-hidden shadow-xl">
            {/* Map Header Controls */}
            <div className="p-4 bg-[#141c2a] border-b border-[#202c3f] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#c5a059]" />
                <span className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Cartographie & Données Spatiales ({currentEval.city} - {currentEval.district})
                </span>
              </div>

              {/* Layer switchers */}
              <div className="flex items-center gap-1 bg-[#101622] p-1 rounded-lg border border-[#233045] text-xs">
                <button
                  onClick={() => setMapLayer("standard")}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    mapLayer === "standard"
                      ? "bg-[#c5a059] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Vue Satellite
                </button>
                <button
                  onClick={() => setMapLayer("flood")}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    mapLayer === "flood"
                      ? "bg-[#c5a059] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Zone Inondable
                </button>
                <button
                  onClick={() => setMapLayer("zoning")}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    mapLayer === "zoning"
                      ? "bg-[#c5a059] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Réseaux ENEO/Eau
                </button>
              </div>
            </div>

            {/* Simulated Map Visualizer */}
            <div className="relative h-72 sm:h-80 w-full bg-[#0a0f16] flex items-center justify-center overflow-hidden">
              <img
                src={currentEval.imageUrl}
                alt="Terrain vue aérienne"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Map grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

              {/* Dynamic Map Layers simulation */}
              {mapLayer === "flood" && (
                <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400/40 pointer-events-none flex items-center justify-center">
                  <div className="bg-[#0b1017]/90 px-4 py-2 rounded-xl border border-blue-400 text-blue-300 text-xs font-bold shadow-lg">
                    🌊 Couche Risque Pluvial : Bassin versant modélisé (Wouri / Mfoundi)
                  </div>
                </div>
              )}

              {mapLayer === "zoning" && (
                <div className="absolute inset-0 bg-amber-500/15 pointer-events-none flex items-center justify-center">
                  <div className="bg-[#0b1017]/90 px-4 py-2 rounded-xl border border-[#c5a059] text-[#e5c378] text-xs font-bold shadow-lg">
                    ⚡ Raccordement : Ligne basse tension 230V à 18m • Conduite CAMWATER Ø 63mm
                  </div>
                </div>
              )}

              {/* Pin Indicator */}
              <div className="absolute z-10 flex flex-col items-center">
                <div className="bg-[#c5a059] text-black text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 animate-bounce">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Parcelle {currentEval.district}</span>
                </div>
                <div className="w-3 h-3 bg-[#c5a059] rotate-45 -mt-1.5 shadow-md"></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#c5a059] bg-[#c5a059]/20 animate-ping mt-1"></div>
              </div>

              {/* Coordinates Pill */}
              <div className="absolute bottom-3 left-3 bg-[#0d131d]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#233045] text-xs text-gray-300 font-mono">
                GPS : {currentEval.gpsCoords?.lat}, {currentEval.gpsCoords?.lng} • {currentEval.surface} m²
              </div>
            </div>
          </div>

          {/* Results Display: Step 3 (Risk Detection) & Step 4 (Recommendations) */}
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212d41] pb-5">
              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  Diagnostic Automatique
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
                  Résultats & Détection des Risques
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Score Global</span>
                  <span className="text-2xl font-black text-[#e5c378]">
                    {currentEval.overallScore}/100
                  </span>
                </div>
                {getStatusBadge(currentEval.status)}
              </div>
            </div>

            {/* 5 Risk Analysis Criteria as requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Access */}
              <div className="bg-[#141d2a] p-4 rounded-xl border border-[#233147] space-y-1.5">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  1. Accessibilité & Voirie
                </span>
                <div className="text-sm font-bold text-white">
                  {currentEval.criteria.accessibility.text}
                </div>
                <p className="text-xs text-[#9aa4b8]">
                  {currentEval.criteria.accessibility.details}
                </p>
              </div>

              {/* Topography */}
              <div className="bg-[#141d2a] p-4 rounded-xl border border-[#233147] space-y-1.5">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  2. Topographie & Pente
                </span>
                <div className="text-sm font-bold text-white">
                  {currentEval.criteria.topography.text}
                </div>
                <p className="text-xs text-[#9aa4b8]">
                  {currentEval.criteria.topography.details}
                </p>
              </div>

              {/* Flood Risk */}
              <div className="bg-[#141d2a] p-4 rounded-xl border border-[#233147] space-y-1.5">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  3. Risque d'Inondation Pluviale
                </span>
                <div className="text-sm font-bold text-white">
                  {currentEval.criteria.floodRisk.text}
                </div>
                <p className="text-xs text-[#9aa4b8]">
                  {currentEval.criteria.floodRisk.details}
                </p>
              </div>

              {/* Zoning & Urbanism */}
              <div className="bg-[#141d2a] p-4 rounded-xl border border-[#233147] space-y-1.5">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  4. Conformité Urbanistique
                </span>
                <div className="text-sm font-bold text-white">
                  {currentEval.criteria.zoning.text}
                </div>
                <p className="text-xs text-[#9aa4b8]">
                  {currentEval.criteria.zoning.details}
                </p>
              </div>

              {/* Utilities */}
              <div className="bg-[#141d2a] p-4 rounded-xl border border-[#233147] space-y-1.5 md:col-span-2">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  5. Raccordement Réseaux (ENEO & CAMWATER)
                </span>
                <div className="text-sm font-bold text-white">
                  {currentEval.criteria.utilities.text}
                </div>
                <p className="text-xs text-[#9aa4b8]">
                  {currentEval.criteria.utilities.details}
                </p>
              </div>
            </div>

            {/* Step 4: Recommandations */}
            <div className="bg-[#172131] border border-[#293952] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#e5c378]">
                <ShieldCheck className="w-5 h-5" />
                <span>ÉTAPE 4 : Recommandations Pratiques de l'IA</span>
              </div>
              <ul className="space-y-2">
                {currentEval.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0"></span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mandatory Professional Caution Banner */}
            <div className="bg-[#131924] border-l-4 border-[#c5a059] p-4 rounded-r-xl text-xs text-gray-300 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Rappel légal et sécuritaire indispensable
                </span>
                Cette analyse algorithmique constitue une aide à la décision préliminaire. Seul un géomètre assermenté inscrit à l'Ordre et un bureau d'études géotechniques peuvent délivrer un avis technique opposable avant achat ou fondation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
