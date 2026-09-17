import React, { useState } from "react";
import { ArchitecturalConcept } from "../types";
import { SAMPLE_ARCHITECTURAL_CONCEPTS } from "../data/mockData";
import {
  Building2,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Info,
  Maximize2,
  Home,
  SunMedium,
  Wind,
  Droplets,
  DollarSign,
} from "lucide-react";

interface ProjectDesignViewProps {
  openAiAssistant: () => void;
}

export const ProjectDesignView: React.FC<ProjectDesignViewProps> = ({
  openAiAssistant,
}) => {
  const [naturalWish, setNaturalWish] = useState(
    "Je veux construire un duplex R+2 de 4 chambres sur un terrain de 500 m² à Douala."
  );
  const [buildingType, setBuildingType] = useState("Duplex Moderne");
  const [landSurface, setLandSurface] = useState<number>(500);
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(4);
  const [floors, setFloors] = useState("R+2");
  const [architecturalStyle, setArchitecturalStyle] = useState("Contemporain Tropical Africain");
  const [budget, setBudget] = useState<number>(65000000);
  const [specialNeeds, setSpecialNeeds] = useState(
    "Toit terrasse aménagé avec vue, cuisine africaine extérieure et chambre d'amis au rez-de-chaussée."
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [concept, setConcept] = useState<ArchitecturalConcept>(
    SAMPLE_ARCHITECTURAL_CONCEPTS[0]
  );

  const handleGenerateConcept = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const newConcept: ArchitecturalConcept = {
        id: `concept-${Date.now()}`,
        title: `${buildingType} (${floors}) • ${bedrooms} Chambres`,
        buildingType,
        floors,
        bedrooms,
        bathrooms,
        landSurface,
        footprintSurface: Math.round(landSurface * 0.38),
        style: architecturalStyle,
        budgetEstimated: budget,
        mainFeatures: [
          `Emprise au sol optimisée (${Math.round(landSurface * 0.38)} m²) préservant 60% d'espaces verts et parking`,
          "Ventilation traversante pour minimiser l'usage de la climatisation en saison humide",
          "Claustras décoratifs en béton et pare-soleil protégeant les pièces de vie du soleil couchant",
          "Toit terrasse panoramique étanchéisé avec pergola végétale",
        ],
        spaces: [
          {
            level: "Niveau 0 : Rez-de-Chaussée (RDC - 190 m²)",
            rooms: [
              { name: "Hall d'entrée & Vestiaire", surface: 14, purpose: "Sas d'accueil avec rangement" },
              { name: "Grand Séjour & Salle à manger", surface: 52, purpose: "Espace de réception traversant" },
              { name: "Cuisine moderne + Arrière-cuisine", surface: 24, purpose: "Îlot central et cellier ventilé" },
              { name: "Suite Invités avec SDB", surface: 20, purpose: "Chambre accessible de plain-pied" },
              { name: "Terrasse couverte & Cuisine d'été", surface: 30, purpose: "Espace convivial protégé des pluies" },
            ],
          },
          {
            level: "Niveau 1 : Étage Intermédiaire (R+1 - 160 m²)",
            rooms: [
              { name: "Suite Parentale Royale", surface: 38, purpose: "Chambre, dressing et salle de bain avec baignoire" },
              { name: "Chambres Enfants (x2)", surface: 34, purpose: "Deux chambres autonomes avec placards" },
              { name: "Salon familial intime / TV", surface: 22, purpose: "Détente et devoirs scolaires" },
              { name: "Balcon filant sécurisé", surface: 16, purpose: "Ombrage pour le niveau inférieur" },
            ],
          },
          {
            level: "Niveau 2 : Attique / Toit-Terrasse (R+2 - 90 m²)",
            rooms: [
              { name: "Salon d'été / Espace Barbecue", surface: 28, purpose: "Espace festif en plein air" },
              { name: "Bureau / Salle d'étude", surface: 18, purpose: "Télétravail au calme avec vue" },
              { name: "Solarium & Local Technique Solaire", surface: 44, purpose: "Batteries solaires et réserve d'eau" },
            ],
          },
        ],
        bioclimaticAdvice: [
          "Orienter les baies principales vers le Nord-Sud pour limiter la surchauffe solaire directe.",
          "Utiliser des auvents d'au moins 80 cm pour abriter les menuiseries aluminium des fortes pluies équatoriales.",
          "Installer un chauffe-eau solaire et une cuve de récupération d'eau de pluie pour l'entretien extérieur.",
          "Privilégier la brique de terre compressée (BTC) pour son inertie thermique et son esthétique noble.",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        elevationUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      };

      setConcept(newConcept);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Domaine 3 • Conception & Architecture Intelligente</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Conception & Idées Architecturales
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Exprimez librement ce que vous voulez construire : l'intelligence artificielle structure vos espaces, propose des façades modernes et optimise le climat intérieur.
          </p>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Conseil architectural IA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Describe your dream project */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-4 shadow-xl">
            <div className="border-b border-[#212d41] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Votre Projet en Langage Naturel
                </h3>
                <p className="text-xs text-gray-400">
                  Décrivez votre envie avec vos propres mots.
                </p>
              </div>
              <span className="text-xs bg-[#c5a059]/20 text-[#e5c378] px-2.5 py-1 rounded-lg border border-[#c5a059]/30 font-bold">
                Assistance IA
              </span>
            </div>

            <form onSubmit={handleGenerateConcept} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Décrivez votre souhait :
                </label>
                <textarea
                  value={naturalWish}
                  onChange={(e) => setNaturalWish(e.target.value)}
                  rows={2}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  placeholder="Ex : Je veux construire un duplex R+2 de 4 chambres sur 500 m²..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Type de bâtiment
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Villa Basse">Villa Basse (plain-pied)</option>
                    <option value="Duplex Moderne">Duplex R+1</option>
                    <option value="Duplex Élevé R+2">Duplex R+2</option>
                    <option value="Immeuble de rapport R+3">Immeuble de rapport R+3</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Superficie terrain (m²)
                  </label>
                  <input
                    type="number"
                    value={landSurface}
                    onChange={(e) => setLandSurface(Number(e.target.value))}
                    min={200}
                    max={5000}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Chambres
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-2.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value={2}>2 ch</option>
                    <option value={3}>3 ch</option>
                    <option value={4}>4 ch</option>
                    <option value={5}>5 ch</option>
                    <option value={6}>6+ ch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Salles de bain
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-2.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value={2}>2 SDB</option>
                    <option value={3}>3 SDB</option>
                    <option value={4}>4 SDB</option>
                    <option value={5}>5+ SDB</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Étages
                  </label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(e.target.value)}
                    className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-2.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="RDC">RDC</option>
                    <option value="R+1">R+1</option>
                    <option value="R+2">R+2</option>
                    <option value="R+3">R+3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Style architectural
                </label>
                <select
                  value={architecturalStyle}
                  onChange={(e) => setArchitecturalStyle(e.target.value)}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="Contemporain Tropical Africain">
                    Contemporain Tropical Africain (Bois, Claustras, Verdure)
                  </option>
                  <option value="Moderne Épuré & Minimaliste">
                    Moderne Épuré & Minimaliste (Lignes droites, Verre, Métal)
                  </option>
                  <option value="Sahélien Bioclimatique">
                    Sahélien Bioclimatique (Inertie terre, Patios intérieurs)
                  </option>
                  <option value="Villa Coloniale Revisité">
                    Villa Tropicale avec Grandes Galeries Circulaires
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Budget estimé envisagé (FCFA)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  step={5000000}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Besoins particuliers ou envies
                </label>
                <textarea
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
                  rows={2}
                  className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  placeholder="Ex : Garage 2 véhicules, bureau indépendant, toiture solaire..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-[#c5a059] hover:bg-[#d6b065] text-black font-extrabold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10 active:scale-98 text-sm"
              >
                {isGenerating ? (
                  <span className="animate-spin text-lg">⏳ Génération du concept...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Générer l'Orientation Architecturale</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Output: Spatial Layout, Indicative Elevation, & Bioclimatic Tips */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-6 shadow-xl">
            {/* Header of the generated concept */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212d41] pb-5">
              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  Orientation Architecturale Préliminaire
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
                  {concept.title}
                </h3>
                <p className="text-xs text-gray-400">
                  Style : <span className="text-[#e5c378]">{concept.style}</span> • Emprise : {concept.footprintSurface} m² sur terrain de {concept.landSurface} m²
                </p>
              </div>

              <div className="bg-[#192333] px-4 py-2 rounded-xl border border-[#293a52] text-right">
                <span className="text-[10px] text-gray-400 block uppercase">Budget indicatif</span>
                <span className="text-lg font-bold text-[#e5c378]">
                  {new Intl.NumberFormat("fr-FR").format(concept.budgetEstimated)} FCFA
                </span>
              </div>
            </div>

            {/* Visual 3D Elevation Render & Façade */}
            <div className="relative rounded-xl overflow-hidden h-64 sm:h-72 w-full bg-[#0a0f16] border border-[#243349]">
              <img
                src={concept.imageUrl}
                alt="Façade architecturale indicative"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-medium">
                  🏛️ Façade indicative bioclimatique avec claustras & brise-soleil
                </span>
                <span className="bg-[#c5a059] text-black font-bold px-2.5 py-1 rounded-md text-[11px]">
                  Rendu 3D Indicatif
                </span>
              </div>
            </div>

            {/* Key Architectural Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Points clés de la proposition
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {concept.mainFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-[#151e2b] p-3 rounded-xl border border-[#243349] flex items-start gap-2 text-xs text-gray-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spatial Layout (Floor by Floor) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a059]" />
                <span>Organisation des espaces par niveau :</span>
              </h4>

              <div className="space-y-3">
                {concept.spaces.map((lvl, idx) => (
                  <div
                    key={idx}
                    className="bg-[#151e2b] rounded-xl border border-[#243349] p-4 space-y-3"
                  >
                    <span className="text-xs font-extrabold text-[#e5c378] tracking-wide uppercase block">
                      {lvl.level}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lvl.rooms.map((room, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-[#1a2538] p-2.5 rounded-lg border border-[#2b3b54] flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-white block">{room.name}</span>
                            <span className="text-[11px] text-gray-400">{room.purpose}</span>
                          </div>
                          <span className="font-mono font-semibold text-[#e5c378] bg-[#0f1521] px-2 py-1 rounded">
                            {room.surface} m²
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bioclimatic & Sustainable Recommendations (Air, Sun, Rain) */}
            <div className="bg-[#162132] border border-[#2a3c56] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#e5c378]">
                <Wind className="w-4 h-4" />
                <span>Conseils Bioclimatiques pour le Cameroun (Douala & Yaoundé)</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-200">
                {concept.bioclimaticAdvice.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0"></span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mandatory Preliminary Disclaimer */}
            <div className="bg-[#0f141d] border-l-4 border-[#c5a059] p-4 rounded-r-xl text-xs text-gray-300 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Proposition préliminaire non contractuelle
                </span>
                Ces orientations spatiales et idées de façades sont fournies à titre indicatif pour vous aider à formaliser votre vision. Pour l'obtention du permis de bâtir et l'établissement des plans d'exécution définitifs (génie civil, électricité, plomberie), le recours à un architecte inscrit à l'Ordre National des Architectes du Cameroun (ONAC) est légalement requis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
