import React, { useState, useMemo } from "react";
import { City } from "../types";
import {
  Calculator,
  DollarSign,
  TrendingDown,
  Sparkles,
  PieChart,
  Layers,
  CheckCircle2,
  Info,
  Wrench,
  Zap,
  Droplets,
  HardHat,
  ArrowRight,
  Download,
} from "lucide-react";

interface BudgetEstimationViewProps {
  currentCity: City;
  openAiAssistant: () => void;
}

export const BudgetEstimationView: React.FC<BudgetEstimationViewProps> = ({
  currentCity,
  openAiAssistant,
}) => {
  // Inputs
  const [city, setCity] = useState<City>(currentCity);
  const [buildingType, setBuildingType] = useState<"villa" | "duplex_r1" | "duplex_r2" | "immeuble_r3">("duplex_r1");
  const [surface, setSurface] = useState<number>(240); // Built surface in m²
  const [standing, setStanding] = useState<"standard" | "medium" | "high">("medium");
  const [materials, setMaterials] = useState<"standard" | "btc" | "premium">("standard");
  const [terrainTerrain, setTerrainTerrain] = useState<"flat" | "slope" | "wetland">("flat");
  const [includeFence, setIncludeFence] = useState<boolean>(true);
  const [includeSolar, setIncludeSolar] = useState<boolean>(true);

  // Dynamic calculation logic in FCFA calibrated for Cameroon market
  const calculation = useMemo(() => {
    // Base price per m² according to standing
    let baseM2 = 180000; // Standard FCFA/m²
    if (standing === "medium") baseM2 = 250000;
    if (standing === "high") baseM2 = 380000;

    // Material adjustment
    if (materials === "btc") baseM2 *= 0.93; // 7% economy on air conditioning and cooling
    if (materials === "premium") baseM2 *= 1.25; // imported tiles, high-end aluminum

    // Foundation & Earthwork adjustment according to terrain
    let foundationMultiplier = 1.0;
    if (terrainTerrain === "slope") foundationMultiplier = 1.12; // +12% for retaining walls
    if (terrainTerrain === "wetland") foundationMultiplier = 1.18; // +18% for elevated raft foundation

    const totalBase = surface * baseM2 * foundationMultiplier;

    // Structural breakdown
    const grosOeuvre = Math.round(totalBase * 0.46);
    const finitions = Math.round(totalBase * 0.32);
    const mainOeuvre = Math.round(totalBase * 0.28);
    const materiaux = Math.round(totalBase * 0.62);

    // Utilities (ENEO, CAMWATER, septic tank)
    let raccordements = 2800000; // Standard connection + fosse biophile
    if (includeSolar) raccordements += 3200000; // Hybrid solar kit 5kVA with lithium battery

    // Clôture
    const cloture = includeFence ? 3500000 : 0;

    const subTotal = grosOeuvre + finitions + raccordements + cloture;
    const contingency = Math.round(subTotal * 0.1); // 10% contingency margin
    const totalMin = Math.round((subTotal + contingency) * 0.94);
    const totalMax = Math.round((subTotal + contingency) * 1.08);

    return {
      grosOeuvre,
      finitions,
      mainOeuvre,
      materiaux,
      raccordements,
      cloture,
      contingency,
      totalMin,
      totalMax,
      average: Math.round((totalMin + totalMax) / 2),
      costPerM2: Math.round(((totalMin + totalMax) / 2) / surface),
    };
  }, [surface, standing, materials, terrainTerrain, includeFence, includeSolar]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Domaine 4 • Chiffrage & Maîtrise des Coûts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Estimateur de Budget & Travaux en Francs CFA
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Calculez précisément les postes de dépenses (matériaux, main-d'œuvre, raccordements ENEO/CAMWATER) et découvrez les leviers d'économies sans rogner sur la sécurité.
          </p>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Pourquoi ce coût ? (IA)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-5 shadow-xl">
            <div className="border-b border-[#212d41] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Paramètres de votre construction
                </h3>
                <p className="text-xs text-gray-400">
                  Ajustez les curseurs pour voir le budget en temps réel.
                </p>
              </div>
              <span className="text-xs bg-[#10b981]/20 text-[#34d399] px-2.5 py-1 rounded-lg border border-[#10b981]/30 font-bold">
                Calcul instantané
              </span>
            </div>

            <div className="space-y-4">
              {/* Ville */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Ville d'implantation
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as City)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Type d'ouvrage
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value as any)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="villa">Villa Basse (RDC)</option>
                    <option value="duplex_r1">Duplex R+1</option>
                    <option value="duplex_r2">Duplex R+2</option>
                    <option value="immeuble_r3">Immeuble locatif R+3</option>
                  </select>
                </div>
              </div>

              {/* Surface Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-300">
                    Surface totale construite
                  </label>
                  <span className="text-sm font-extrabold text-[#e5c378]">
                    {surface} m²
                  </span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={600}
                  step={10}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="w-full h-2 bg-[#202c3f] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>80 m² (Villa 2 ch)</span>
                  <span>240 m² (Duplex 4 ch)</span>
                  <span>600 m² (Immeuble R+3)</span>
                </div>
              </div>

              {/* Standing Selection */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Niveau de standing des finitions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Standard", desc: "Carrelage 40x40, toiture aluzinc" },
                    { id: "medium", label: "Moyen Standing", desc: "Grès cérame, alu vitré" },
                    { id: "high", label: "Haut Standing", desc: "Marbre, baies coulissantes" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStanding(s.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        standing === s.id
                          ? "bg-[#c5a059] text-black border-[#c5a059] font-bold"
                          : "bg-[#151e2c] text-gray-300 border-[#243349] hover:bg-[#1b2738]"
                      }`}
                    >
                      <div className="text-xs">{s.label}</div>
                      <div className={`text-[9px] mt-0.5 ${standing === s.id ? "text-gray-800" : "text-gray-400"}`}>
                        {s.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials Choice */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Choix des matériaux de maçonnerie
                </label>
                <select
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value as any)}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="standard">Parpaings de ciment dosés 350 kg/m³ (Standard)</option>
                  <option value="btc">Briques de Terre Compressée (BTC) - Écologique & Économe</option>
                  <option value="premium">Matériaux haute performance & Finitions importées</option>
                </select>
              </div>

              {/* Ground Topology */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Contraintes du terrain
                </label>
                <select
                  value={terrainTerrain}
                  onChange={(e) => setTerrainTerrain(e.target.value as any)}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="flat">Terrain plat stabilisé (Terrassement standard)</option>
                  <option value="slope">Terrain en pente (Mur de soutènement requis +12%)</option>
                  <option value="wetland">Zone humide ou bas-fond (Radier étanche +18%)</option>
                </select>
              </div>

              {/* Additional Options Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-gray-300 block">
                  Équipements complémentaires inclus :
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-gray-200 cursor-pointer bg-[#151e2b] p-2.5 rounded-xl border border-[#243349]">
                    <input
                      type="checkbox"
                      checked={includeFence}
                      onChange={(e) => setIncludeFence(e.target.checked)}
                      className="rounded text-[#c5a059] focus:ring-0"
                    />
                    <span>Clôture maçonnée sécurisée + portail métallique (+3.5M FCFA)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-gray-200 cursor-pointer bg-[#151e2b] p-2.5 rounded-xl border border-[#243349]">
                    <input
                      type="checkbox"
                      checked={includeSolar}
                      onChange={(e) => setIncludeSolar(e.target.checked)}
                      className="rounded text-[#c5a059] focus:ring-0"
                    />
                    <span>Centrale solaire hybride anti-délestage ENEO (+3.2M FCFA)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Detailed Budget Breakdown & Cost Reduction Tips */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-6 shadow-xl">
            {/* Main Total Display Card */}
            <div className="bg-gradient-to-r from-[#172233] to-[#121926] border border-[#27374e] rounded-2xl p-6 text-center space-y-2 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059]">
                Fourchette Budgétaire Globale Estimée
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                {new Intl.NumberFormat("fr-FR").format(calculation.totalMin)}{" "}
                <span className="text-gray-400 font-normal text-xl sm:text-2xl">—</span>{" "}
                {new Intl.NumberFormat("fr-FR").format(calculation.totalMax)}{" "}
                <span className="text-[#e5c378] text-xl sm:text-2xl font-bold">FCFA</span>
              </div>
              <p className="text-xs text-gray-400">
                Moyenne indicative :{" "}
                <span className="text-white font-bold">
                  {new Intl.NumberFormat("fr-FR").format(calculation.average)} FCFA
                </span>{" "}
                (soit env.{" "}
                <span className="text-[#e5c378] font-bold">
                  {new Intl.NumberFormat("fr-FR").format(calculation.costPerM2)} FCFA / m²
                </span>
                )
              </p>
            </div>

            {/* Detailed Itemized Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#c5a059]" />
                  <span>Détail poste par poste en Francs CFA :</span>
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  Chiffrage transparent
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Gros Œuvre */}
                <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">1. Gros Œuvre & Structure</span>
                    <span className="text-gray-400 text-[11px]">
                      Fondations, béton armé, parpaings, toiture
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#e5c378] shrink-0">
                    {new Intl.NumberFormat("fr-FR").format(calculation.grosOeuvre)} F
                  </span>
                </div>

                {/* Finitions */}
                <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">2. Second Œuvre & Finitions</span>
                    <span className="text-gray-400 text-[11px]">
                      Plomberie, électricité, carrelage, peinture
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#e5c378] shrink-0">
                    {new Intl.NumberFormat("fr-FR").format(calculation.finitions)} F
                  </span>
                </div>

                {/* Main d'œuvre */}
                <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">3. Main-d'œuvre locale</span>
                    <span className="text-gray-400 text-[11px]">
                      Maçons, ferrailleurs, charpentiers, coffreurs
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">
                    {new Intl.NumberFormat("fr-FR").format(calculation.mainOeuvre)} F
                  </span>
                </div>

                {/* Raccordements & Assainissement */}
                <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">4. Raccordements & Réseaux</span>
                    <span className="text-gray-400 text-[11px]">
                      Branchement ENEO, CAMWATER, fosse étanche
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">
                    {new Intl.NumberFormat("fr-FR").format(calculation.raccordements)} F
                  </span>
                </div>

                {/* Clôture & Sécurité */}
                {includeFence && (
                  <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block">5. Clôture maçonnée</span>
                      <span className="text-gray-400 text-[11px]">
                        Mur d'enceinte 2.20m + portail
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white shrink-0">
                      {new Intl.NumberFormat("fr-FR").format(calculation.cloture)} F
                    </span>
                  </div>
                )}

                {/* Marge d'imprévus */}
                <div className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">6. Marge d'imprévus (10%)</span>
                    <span className="text-gray-400 text-[11px]">
                      Fluctuations ciment/fer, intempéries
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#34d399] shrink-0">
                    {new Intl.NumberFormat("fr-FR").format(calculation.contingency)} F
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Savings Advice: How to reduce cost without sacrificing safety */}
            <div className="bg-[#151e2b] border border-[#243248] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#34d399]">
                <TrendingDown className="w-5 h-5" />
                <span>Conseils de l'IA pour réduire le budget sans sacrifier la solidité :</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] mt-1.5 shrink-0"></span>
                  <span>
                    <strong>Préférer des formes compactes :</strong> Les retraits et angles multiples augmentent de 15% le linéaire de murs porteurs et de chaînages en béton armé.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] mt-1.5 shrink-0"></span>
                  <span>
                    <strong>Utiliser les matériaux locaux (BTC) :</strong> La brique de terre compressée stabilisée à 8% de ciment réduit la consommation de climatisation et évite le coût des enduits lourds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] mt-1.5 shrink-0"></span>
                  <span>
                    <strong>Acheter le fer et le ciment en gros dès le démarrage :</strong> Les hausses saisonnières du prix du sac de ciment (CIMENCAM, DANGOTE) peuvent être anticipées avec un hangar de stockage sec.
                  </span>
                </li>
              </ul>
            </div>

            {/* Mandatory Non-Contractual Warning */}
            <div className="bg-[#0f141d] border-l-4 border-[#c5a059] p-4 rounded-r-xl text-xs text-gray-300 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Estimation indicative et non contractuelle
                </span>
                Ce chiffrage automatique repose sur les cours moyens du marché de la construction à Douala et Yaoundé. Il ne remplace pas un devis quantitatif estimatif (DQE) établi par un métreur ou une entreprise générale de BTP après sondage géotechnique de votre parcelle.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
