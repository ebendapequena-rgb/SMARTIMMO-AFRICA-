import React from "react";
import { ActiveTab } from "../types";
import {
  User,
  MapPin,
  FileCheck,
  Building2,
  Calculator,
  Eye,
  Activity,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Bell,
  CheckCircle2,
} from "lucide-react";

interface UserDashboardViewProps {
  onNavigate: (tab: ActiveTab) => void;
  openAiAssistant: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  onNavigate,
  openAiAssistant,
}) => {
  const sections: {
    tab: ActiveTab;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    count: string;
    description: string;
    badge: string;
    preview: string;
  }[] = [
    {
      tab: "land_analysis",
      icon: MapPin,
      title: "Mes Terrains Analysés",
      count: "2 parcelles",
      description: "Analyses de risques, topographie et conformité des terrains à Bonabéri et Oyomabang.",
      badge: "1 Favorable • 1 À vérifier",
      preview: "Dernière analyse : Parcelle Bonabéri 650 m² (Score 86/100)",
    },
    {
      tab: "document_verification",
      icon: FileCheck,
      title: "Mes Documents Sécurisés",
      count: "3 fichiers",
      description: "Titres fonciers, plans géomètres et conventions coutumières scannées.",
      badge: "Sécurité vérifiée",
      preview: "Titre Foncier N° 45821/Wouri (Conforme)",
    },
    {
      tab: "project_design",
      icon: Building2,
      title: "Mes Projets & Conceptions",
      count: "2 projets",
      description: "Orientations d'aménagement, esquisses 3D et recommandations climatiques.",
      badge: "Conception bioclimatique",
      preview: "Duplex R+2 (4 Chambres) - 500 m²",
    },
    {
      tab: "budget_estimation",
      icon: Calculator,
      title: "Mes Estimations & Devis",
      count: "1 chiffrage",
      description: "Prévisions budgétaires des matériaux, main-d'œuvre et raccordements.",
      badge: "65 000 000 FCFA",
      preview: "Duplex 240 m² • Matériaux standards + Solaire",
    },
    {
      tab: "property_search",
      icon: Eye,
      title: "Mes Biens & Visites 360°",
      count: "4 favoris",
      description: "Propriétés sélectionnées et visites virtuelles immersives enregistrées.",
      badge: "2 visites prévues",
      preview: "Villa Duplex Moderne à Bastos (Yaoundé)",
    },
    {
      tab: "smart_management",
      icon: Activity,
      title: "Mes Alertes Équipements",
      count: "1 alerte",
      description: "Suivi des compteurs d'eau CAMWATER et d'électricité ENEO.",
      badge: "Consommation d'eau",
      preview: "Appartement B12 - Bonapriso (Vérification requise)",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#c5a059] text-black font-extrabold flex items-center justify-center text-xl shadow-lg">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                Mon Espace Immobilier Sécurisé
              </h1>
              <span className="text-xs bg-[#10b981]/20 text-[#34d399] font-bold px-2.5 py-0.5 rounded-full border border-[#10b981]/30">
                Membre Vérifié
              </span>
            </div>
            <p className="text-sm text-[#9aa4b8] mt-0.5">
              Retrouvez en un clin d'œil l'ensemble de vos analyses, plans, documents et alertes sans rien chercher.
            </p>
          </div>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Consulter mon conseiller IA</span>
        </button>
      </div>

      {/* Progress Journey Summary */}
      <div className="bg-[#121926] rounded-2xl border border-[#232f44] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Avancement Global de votre Projet Immobilier
          </h3>
          <span className="text-xs font-mono font-bold text-[#e5c378]">
            Étape 3 sur 6 complétée (50%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#1c2637] rounded-full overflow-hidden p-0.5 border border-[#28364c]">
          <div className="h-full bg-gradient-to-r from-[#c5a059] to-[#34d399] rounded-full w-1/2"></div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px] text-center text-gray-400">
          <span className="text-[#34d399] font-semibold">1. Terrain analysé ✓</span>
          <span className="text-[#34d399] font-semibold">2. Titre vérifié ✓</span>
          <span className="text-[#e5c378] font-bold">3. Plan conçu ●</span>
          <span>4. Budget estimé</span>
          <span>5. Permis & Bâtir</span>
          <span>6. Gestion active</span>
        </div>
      </div>

      {/* 6 Clear Functional Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.tab}
              className="bg-[#111722] rounded-2xl border border-[#202c3f] hover:border-[#c5a059]/60 p-6 space-y-4 shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#182333] text-[#c5a059] flex items-center justify-center border border-[#283950]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#e5c378] bg-[#1a2434] px-2.5 py-1 rounded-lg border border-[#2b3b52]">
                    {sec.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#223044] text-xs space-y-1">
                  <span className="text-[10px] text-gray-400 block uppercase font-semibold">
                    Dernière activité
                  </span>
                  <p className="text-gray-200 font-medium truncate">{sec.preview}</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate(sec.tab)}
                className="w-full mt-2 bg-[#182333] hover:bg-[#c5a059] text-gray-200 hover:text-black font-bold py-2.5 px-4 rounded-xl border border-[#27374e] hover:border-[#c5a059] transition-all flex items-center justify-between text-xs"
              >
                <span>Accéder directement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
