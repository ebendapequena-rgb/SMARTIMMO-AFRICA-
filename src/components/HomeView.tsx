import React, { useState } from "react";
import { ActiveTab, SearchExtraction, City } from "../types";
import { parseSearchQuery } from "../services/api";
import {
  Search,
  MapPin,
  FileCheck,
  Building2,
  Calculator,
  Eye,
  Activity,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Globe2,
} from "lucide-react";

interface HomeViewProps {
  onNavigate: (tab: ActiveTab, searchContext?: SearchExtraction) => void;
  currentCity: City;
  openAiAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  currentCity,
  openAiAssistant,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedSearch, setExtractedSearch] = useState<SearchExtraction | null>(null);

  const sampleQueries = [
    "Je veux un terrain à Bonabéri de 800 m² pour construire une maison de 4 chambres avec un budget de 40 millions FCFA.",
    "Je cherche un terrain à Oyomabang pour construire un duplex R+3",
    "Je cherche un appartement à Bonapriso avec 3 chambres",
    "Je cherche un terrain de 500 m² à Bastos",
    "Je veux construire une maison avec un budget de 50 millions FCFA",
  ];

  const handleSearchSubmit = async (queryText?: string) => {
    const text = queryText || searchQuery;
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await parseSearchQuery(text);
      setExtractedSearch(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const domainCards: {
    tab: ActiveTab;
    number: string;
    title: string;
    description: string;
    buttonLabel: string;
    image: string;
    badge: string;
  }[] = [
    {
      tab: "land_analysis",
      number: "01",
      title: "1. ANALYSER UN TERRAIN",
      description:
        "Analysez un terrain avant d'acheter : vérifiez la pente, l'accès routier, le risque d'inondation et la compatibilité avec votre projet.",
      buttonLabel: "Analyser mon terrain",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      badge: "Sécurité avant achat",
    },
    {
      tab: "document_verification",
      number: "02",
      title: "2. SÉCURISER MES DOCUMENTS",
      description:
        "Déposez votre titre foncier, contrat ou plan. L'intelligence artificielle repère les incohérences apparentes et les pièces manquantes.",
      buttonLabel: "Vérifier mes documents",
      image:
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      badge: "Anti-litiges fonciers",
    },
    {
      tab: "project_design",
      number: "03",
      title: "3. CONCEVOIR MON PROJET",
      description:
        "Décrivez la maison ou le duplex de vos rêves. Recevez une orientation d'aménagement de pièces, de façade et d'architecture tropicale.",
      buttonLabel: "Imaginer ma construction",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      badge: "Plans & Architecture",
    },
    {
      tab: "budget_estimation",
      number: "04",
      title: "4. ESTIMER MON BUDGET",
      description:
        "Calculez le coût prévisionnel de vos travaux en FCFA : matériaux, main-d'œuvre locale, raccordements ENEO et CAMWATER.",
      buttonLabel: "Calculer mon devis",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80",
      badge: "Chiffrage en Francs CFA",
    },
    {
      tab: "property_search",
      number: "05",
      title: "5. RECHERCHER & VISITER EN 360°",
      description:
        "Trouvez des terrains titrés, villas et appartements à Douala et Yaoundé. Visitez chaque pièce virtuellement avant de vous déplacer.",
      buttonLabel: "Voir les biens & visites",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      badge: "Visite virtuelle pièce par pièce",
    },
    {
      tab: "smart_management",
      number: "06",
      title: "6. GÉRER & SURVEILLER MON BIEN",
      description:
        "Suivez vos consommations d'eau et d'électricité. Recevez une alerte immédiate en cas de fuite ou d'anomalie de compteur.",
      buttonLabel: "Surveiller mon bâtiment",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      badge: "Compteurs & Alertes fuites",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#111723] via-[#0d121a] to-[#0b0f15] border-b border-[#212c3f] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle architectural grid decoration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e5c378] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plateforme Numérique Intelligente pour le Cameroun et l'Afrique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
            SMARTIMMO <span className="text-[#c5a059]">AFRICA</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#abb5c6] font-normal max-w-2xl mx-auto">
            « L'intelligence au service de votre projet immobilier. »
          </p>

          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Une interface simple, pensée pour tous, pour rechercher, analyser, sécuriser et bâtir en toute sérénité à Douala et Yaoundé.
          </p>
        </div>

        {/* Central Smart Search Bar */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-[#151d2b] p-2.5 sm:p-3 rounded-2xl border-2 border-[#2f3d56] focus-within:border-[#c5a059] shadow-2xl transition-all">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <div className="flex items-center gap-3 px-3 flex-1">
                <Search className="w-6 h-6 text-[#c5a059] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Que recherchez-vous ? (ex: Je cherche un terrain à Oyomabang de 500 m²...)"
                  className="w-full bg-transparent text-white text-base sm:text-lg placeholder-gray-400 focus:outline-none py-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#c5a059] hover:bg-[#d6b065] text-[#0b0f15] font-extrabold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#c5a059]/20 active:scale-98 text-base shrink-0"
              >
                {loading ? (
                  <span className="animate-spin text-lg">⏳</span>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Rechercher</span>
              </button>
            </form>
          </div>

          {/* Quick-Click Query Examples */}
          <div className="mt-4">
            <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1.5">
              <span>💡 Ou cliquez directement sur un exemple :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(query);
                    handleSearchSubmit(query);
                  }}
                  className="text-xs bg-[#17202e] hover:bg-[#202b3d] text-[#c9d2e1] hover:text-white px-3 py-1.5 rounded-lg border border-[#27354c] transition-all text-left"
                >
                  « {query} »
                </button>
              ))}
            </div>
          </div>

          {/* Extracted Search Result Card */}
          {extractedSearch && (
            <div className="mt-6 bg-[#131b27] border-2 border-[#c5a059]/60 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-[#243147] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#c5a059] text-black flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Votre recherche comprise par l'IA
                  </h3>
                </div>
                <span className="text-xs bg-[#10b981]/20 text-[#34d399] px-2.5 py-1 rounded-full border border-[#10b981]/30 font-medium">
                  Analyse instantanée
                </span>
              </div>

              {/* Extraction Badges matching prompt requirements */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4 text-left">
                <div className="bg-[#192333] p-3 rounded-xl border border-[#27364e]">
                  <span className="text-xs text-gray-400 block">📍 Localisation</span>
                  <span className="text-sm font-bold text-white">
                    {extractedSearch.district} — {extractedSearch.city}
                  </span>
                </div>

                <div className="bg-[#192333] p-3 rounded-xl border border-[#27364e]">
                  <span className="text-xs text-gray-400 block">📐 Superficie</span>
                  <span className="text-sm font-bold text-white">
                    {extractedSearch.surface} m²
                  </span>
                </div>

                <div className="bg-[#192333] p-3 rounded-xl border border-[#27364e]">
                  <span className="text-xs text-gray-400 block">🏠 Type de bien</span>
                  <span className="text-sm font-bold text-white capitalize">
                    {extractedSearch.propertyType}
                  </span>
                </div>

                <div className="bg-[#192333] p-3 rounded-xl border border-[#27364e]">
                  <span className="text-xs text-gray-400 block">🛏️ Chambres / Étages</span>
                  <span className="text-sm font-bold text-white">
                    {extractedSearch.bedrooms ? `${extractedSearch.bedrooms} ch` : ""} {extractedSearch.floors || ""}
                  </span>
                </div>

                <div className="bg-[#192333] p-3 rounded-xl border border-[#27364e] col-span-2 sm:col-span-1">
                  <span className="text-xs text-gray-400 block">💰 Budget estimé</span>
                  <span className="text-sm font-bold text-[#e5c378]">
                    {new Intl.NumberFormat("fr-FR").format(extractedSearch.budget)} FCFA
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-xs text-gray-300 italic">
                  {extractedSearch.summary}
                </p>
                <button
                  onClick={() => onNavigate("property_search", extractedSearch)}
                  className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#d6b065] text-black font-extrabold px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <span>Voir les résultats</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* The 6 Main Domain Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#202b3d] pb-4">
          <div>
            <span className="text-xs font-bold text-[#c5a059] tracking-wider uppercase">
              Parcours Immobilier Intelligent
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              Les 6 Domaines Principaux
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Tout est accessible en un clic. Choisissez l'étape de votre projet.
            </p>
          </div>
          <div className="text-xs text-[#9aa4b8] bg-[#141b26] px-3 py-1.5 rounded-lg border border-[#243044] self-start sm:self-auto">
            📍 Données de démonstration réalistes pour Douala et Yaoundé
          </div>
        </div>

        {/* 6 Big Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainCards.map((domain) => (
            <div
              key={domain.tab}
              className="group bg-[#111723] rounded-2xl border border-[#202c40] hover:border-[#c5a059]/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#182131]">
                <img
                  src={domain.image}
                  alt={domain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111723] via-transparent to-black/30"></div>
                
                {/* Number Badge */}
                <span className="absolute top-3 left-3 bg-[#0d121a]/80 backdrop-blur-md text-[#e5c378] font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-[#c5a059]/40">
                  {domain.number}
                </span>

                {/* Status Badge */}
                <span className="absolute top-3 right-3 bg-[#111723]/90 text-gray-200 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-[#27364e]">
                  {domain.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#e5c378] transition-colors font-['Space_Grotesk']">
                    {domain.title}
                  </h3>
                  <p className="text-sm text-[#9aa4b8] mt-2 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onNavigate(domain.tab)}
                  className="w-full bg-[#182232] hover:bg-[#c5a059] text-white hover:text-black font-bold py-3 px-4 rounded-xl border border-[#2a3952] hover:border-[#c5a059] transition-all flex items-center justify-between text-sm shadow-sm group/btn"
                >
                  <span>{domain.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cameroon Real Estate & Smart City Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101622] rounded-2xl border border-[#1f2a3e] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#212c40] pb-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#c5a059]" />
                <span>Indicateurs de Marché & Smart Cities ({currentCity})</span>
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Données d'aide à la décision actualisées pour orienter vos investissements.
              </p>
            </div>
            <span className="text-xs bg-[#192333] text-[#e5c378] px-3 py-1.5 rounded-lg border border-[#2c3d59]">
              🟢 Données de démonstration fiables
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#151d2a] p-4 rounded-xl border border-[#243247]">
              <span className="text-xs text-gray-400 block">Prix moyen terrain titré</span>
              <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">
                {currentCity === "Douala" ? "55 000 FCFA/m²" : "45 000 FCFA/m²"}
              </span>
              <span className="text-[11px] text-[#34d399] mt-1 block">
                +4.2% ce trimestre (Bonapriso / Bastos)
              </span>
            </div>

            <div className="bg-[#151d2a] p-4 rounded-xl border border-[#243247]">
              <span className="text-xs text-gray-400 block">Coût moyen gros œuvre</span>
              <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">
                195 000 FCFA/m²
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">
                Béton dosé 350kg/m³ + parpaings
              </span>
            </div>

            <div className="bg-[#151d2a] p-4 rounded-xl border border-[#243247]">
              <span className="text-xs text-gray-400 block">Taux de viabilisation ENEO/CAMWATER</span>
              <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">
                88% des zones pilotes
              </span>
              <span className="text-[11px] text-[#e5c378] mt-1 block">
                Priorité Bonabéri & Oyomabang
              </span>
            </div>

            <div className="bg-[#151d2a] p-4 rounded-xl border border-[#243247]">
              <span className="text-xs text-gray-400 block">Titre Foncier vérifié</span>
              <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">
                100% garanti
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">
                Avec contrôle notarié officiel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Smart City Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#172233] to-[#121926] border border-[#28374d] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c5a059]">
              <Globe2 className="w-4 h-4" />
              Vision Urbaine Durable
            </span>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Comment SmartImmo Africa façonne les Smart Cities de demain
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              En croisant données foncières, imagerie satellite, topographie et intelligence artificielle, nous réduisons les risques d'inondation, évitons les litiges et facilitons l'accès à une énergie et une eau mieux gérées.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate("smart_city")}
              className="bg-[#c5a059] hover:bg-[#d6b065] text-black font-extrabold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <span>Découvrir la vision Smart City</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openAiAssistant}
              className="bg-[#1a2332] hover:bg-[#253246] text-white font-bold px-5 py-3 rounded-xl border border-[#2f3f58] transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#e5c378]" />
              <span>Poser une question à l'IA</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
