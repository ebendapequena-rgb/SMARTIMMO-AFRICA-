import React from "react";
import { ActiveTab, City } from "../types";
import {
  Compass,
  MapPin,
  FileCheck,
  Building2,
  Calculator,
  Search,
  Activity,
  User,
  Globe2,
  Sparkles,
  PhoneCall,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentCity: City;
  setCurrentCity: (city: City) => void;
  openAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentCity,
  setCurrentCity,
  openAiAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { tab: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: "home", label: "Accueil", icon: Compass },
    { tab: "land_analysis", label: "1. Terrains", icon: MapPin },
    { tab: "document_verification", label: "2. Documents", icon: FileCheck },
    { tab: "project_design", label: "3. Conception", icon: Building2 },
    { tab: "budget_estimation", label: "4. Budget", icon: Calculator },
    { tab: "property_search", label: "5. Recherche & Visite", icon: Search },
    { tab: "smart_management", label: "6. Gestion", icon: Activity },
    { tab: "user_dashboard", label: "Mon Espace", icon: User },
    { tab: "smart_city", label: "Smart City", icon: Globe2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f15]/90 backdrop-blur-md border-b border-[#232d3f]">
      {/* Top micro-bar: Location & Hotline */}
      <div className="bg-[#111722] border-b border-[#1e2638] px-4 py-1.5 text-xs text-[#9aa4b8] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#e5c378] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Cameroun (Pilote Smart City)
            </span>
            <div className="flex items-center gap-1 bg-[#182030] rounded-md px-2 py-0.5 border border-[#26334a]">
              <span className="text-gray-400">Ville active :</span>
              <button
                onClick={() => setCurrentCity("Douala")}
                className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                  currentCity === "Douala"
                    ? "bg-[#c5a059] text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Douala
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setCurrentCity("Yaoundé")}
                className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                  currentCity === "Yaoundé"
                    ? "bg-[#c5a059] text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Yaoundé
              </button>
            </div>
            <span className="hidden md:inline text-gray-500 text-[11px]">
              (Extension prochaine : Abidjan, Dakar, Kigali)
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="hidden sm:inline">
              Besoin d'aide ? Conseil gratuit par téléphone :
            </span>
            <a
              href="tel:+237690000000"
              className="flex items-center gap-1.5 text-[#e5c378] hover:underline font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+237 690 00 00 00</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8d6e35] p-0.5 shadow-lg shadow-[#c5a059]/10 group-hover:shadow-[#c5a059]/20 transition-all">
              <div className="w-full h-full bg-[#0d121a] rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#e5c378]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  SMARTIMMO <span className="text-[#c5a059]">AFRICA</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e5c378] border border-[#c5a059]/30">
                  IA & Smart City
                </span>
              </div>
              <p className="text-xs text-[#9aa4b8] tracking-tight">
                L'intelligence au service de votre projet immobilier.
              </p>
            </div>
          </button>

          {/* Desktop Nav Pills */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#121824] p-1.5 rounded-xl border border-[#222c3e]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#c5a059] text-[#0d121a] shadow-sm font-bold"
                      : "text-[#abb5c6] hover:text-white hover:bg-[#1b2333]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: SmartImmo AI Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={openAiAssistant}
              className="flex items-center gap-2 bg-gradient-to-r from-[#c5a059] to-[#dfba6e] text-[#0b0f15] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Parler à l'assistant IA</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#141b27] border border-[#232e42] text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e141f] border-b border-[#232d3f] px-4 pt-2 pb-6 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Les 6 Domaines & Services
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#c5a059] text-black font-bold"
                      : "bg-[#141a26] text-gray-200 hover:bg-[#1d2536]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
