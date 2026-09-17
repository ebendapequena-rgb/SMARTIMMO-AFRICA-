import React from "react";
import { ActiveTab } from "../types";
import {
  Globe2,
  Cpu,
  Droplets,
  Zap,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TreePine,
  Layers,
} from "lucide-react";

interface SmartCityViewProps {
  onNavigate: (tab: ActiveTab) => void;
  openAiAssistant: () => void;
}

export const SmartCityView: React.FC<SmartCityViewProps> = ({
  onNavigate,
  openAiAssistant,
}) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "1. Sécurisation Foncière Zéro Litige",
      description:
        "L'IA et la traçabilité numérique permettent de croiser les coordonnées cadastrales avec les archives du MINDCAF pour empêcher les doubles ventes de terrains et pacifier le développement urbain.",
      badge: "Confiance & Investissement",
    },
    {
      icon: Droplets,
      title: "2. Prévention Active des Inondations",
      description:
        "Modélisation hydrologique des bassins versants (Wouri à Douala, Mfoundi à Yaoundé). L'analyse de terrain bloque la construction en zones marécageuses dangereuses et préconise des radiers surélevés.",
      badge: "Résilience Climatique",
    },
    {
      icon: Zap,
      title: "3. Efficacité Énergétique & Eau",
      description:
        "Capteurs intelligents pour traquer les fuites invisibles de CAMWATER et intégration native de centrales solaires hybrides pour assurer l'autonomie face aux délestages du réseau ENEO.",
      badge: "Sobriété des Ressources",
    },
    {
      icon: TreePine,
      title: "4. Architecture Bioclimatique Africaine",
      description:
        "Valorisation des matériaux locaux (Briques de terre compressée BTC, bois durable) et conception favorisant la ventilation naturelle pour diviser par deux la dépendance aux climatiseurs énergivores.",
      badge: "Durabilité & Carbone Réduit",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#111927] via-[#0e141f] to-[#151e2d] border border-[#233146] p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#e5c378] text-xs font-bold">
            <Globe2 className="w-4 h-4" />
            <span>Thématique Entrepreneuriale Smart Cities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
            Immobilier Intelligent &{" "}
            <span className="text-[#c5a059]">Smart Cities</span> en Afrique
          </h1>

          <p className="text-base sm:text-lg text-[#abb5c6] leading-relaxed">
            Une ville intelligente ne se résume pas à des écrans : c'est avant tout une ville qui protège ses habitants des risques naturels, garantit leurs droits de propriété et optimise l'eau et l'énergie.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("land_analysis")}
              className="bg-[#c5a059] hover:bg-[#d8b46b] text-black font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm shadow-md"
            >
              <span>Tester l'analyse d'un terrain</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openAiAssistant}
              className="bg-[#192333] hover:bg-[#233045] text-white font-bold px-5 py-3 rounded-xl border border-[#2b3c54] transition-all flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#e5c378]" />
              <span>Questionner l'IA sur la vision urbaine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Representation of African Modern Smart City */}
      <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 w-full border border-[#24334a] shadow-2xl bg-[#0b1017]">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          alt="Smart City Africaine Durable"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15] via-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider block">
              Douala & Yaoundé Horizon 2035
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk']">
              La convergence entre technologie numérique et écosystème tropical
            </h3>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs text-gray-200">
            📊 Pilote en cours à Bonapriso, Bonabéri et Bastos
          </div>
        </div>
      </div>

      {/* The 4 Core Smart City Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#182333] text-[#c5a059] flex items-center justify-center border border-[#283850]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#34d399] bg-[#10b981]/15 px-3 py-1 rounded-full border border-[#10b981]/30">
                  {p.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                {p.title}
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
