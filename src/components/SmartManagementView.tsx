import React, { useState } from "react";
import { SmartManagementAlert } from "../types";
import { INITIAL_SMART_ALERTS } from "../data/mockData";
import {
  Activity,
  Droplets,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Sparkles,
  Phone,
  ShieldCheck,
  TrendingUp,
  Home,
  Users,
  Bell,
  RefreshCw,
} from "lucide-react";

interface SmartManagementViewProps {
  openAiAssistant: () => void;
}

export const SmartManagementView: React.FC<SmartManagementViewProps> = ({
  openAiAssistant,
}) => {
  const [alerts, setAlerts] = useState<SmartManagementAlert[]>(INITIAL_SMART_ALERTS);
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState("Appartement B12 - Bonapriso");
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "water" | "power" | "maintenance">("overview");

  // Simulated live metrics
  const [waterFlow, setWaterFlow] = useState(14.8); // Liters/min
  const [powerLoad, setPowerLoad] = useState(3.4); // kW
  const [occupancyRate, setOccupancyRate] = useState(92); // %

  const handleResolveAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, isResolved: true } : a)));
  };

  const handleTriggerSimulatedLeak = () => {
    const newAlert: SmartManagementAlert = {
      id: `alert-${Date.now()}`,
      propertyTitle: "Villa Moderne - Bastos",
      type: "water",
      severity: "CRITICAL",
      title: "Consommation inhabituelle d'eau détectée : risque de fuite",
      usualValue: "6 000 FCFA / mois",
      currentValue: "13 000 FCFA (hausse anormale de +116%)",
      possibleCause: "Fuite continue au niveau de la chasse d'eau ou rupture de canalisation enterrée.",
      recommendedAction: "Vérifier immédiatement l'installation sanitaire ou fermer la vanne générale d'arrivée CAMWATER.",
      technicianContact: "+237 699 12 34 56 (Plombier Agréé SmartImmo)",
      timestamp: "À l'instant",
      isResolved: false,
    };
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Domaine 6 • Gestion Intelligente & Maintenance Prédictive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Tableau de Bord des Équipements & Fluides
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Surveillez en direct l'eau (CAMWATER), l'électricité (ENEO) et recevez des alertes claires en cas de surconsommation ou de fuite.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerSimulatedLeak}
            className="bg-[#241a18] hover:bg-[#38201d] text-[#f87171] font-bold px-3.5 py-2.5 rounded-xl border border-[#ef4444]/40 transition-all flex items-center gap-2 text-xs"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Simuler une fuite d'eau</span>
          </button>

          <button
            onClick={openAiAssistant}
            className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#e5c378]" />
            <span>Interroger l'IA</span>
          </button>
        </div>
      </div>

      {/* Selector: Active Building */}
      <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5 text-[#c5a059]" />
          <span className="text-sm font-bold text-white">Bien sélectionné :</span>
          <select
            value={selectedPropertyFilter}
            onChange={(e) => setSelectedPropertyFilter(e.target.value)}
            className="bg-[#161f2e] border border-[#27364e] text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#c5a059]"
          >
            <option value="Appartement B12 - Bonapriso">Appartement B12 - Bonapriso (Douala)</option>
            <option value="Villa Moderne - Bastos">Villa Moderne - Bastos (Yaoundé)</option>
            <option value="Immeuble Le Flamboyant - Bonabéri">Immeuble Le Flamboyant - Bonabéri (Douala)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span>Compteurs connectés IoT actifs</span>
        </div>
      </div>

      {/* 4 Big Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Eau */}
        <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">💧 Eau (CAMWATER)</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Droplets className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            13 000 FCFA
          </div>
          <div className="text-xs text-[#f87171] font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>+116% vs moyenne habituelle</span>
          </div>
        </div>

        {/* Électricité */}
        <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">⚡ Électricité (ENEO)</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            32 400 FCFA
          </div>
          <div className="text-xs text-[#34d399] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Consommation normale stable</span>
          </div>
        </div>

        {/* Occupation */}
        <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">🏠 Taux d'Occupation</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            {occupancyRate}%
          </div>
          <div className="text-xs text-gray-400">
            Loyers à jour • 0 litige locatif
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">🔧 Maintenance</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wrench className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            1 Action
          </div>
          <div className="text-xs text-[#fbbf24]">
            Climatisation salon à nettoyer
          </div>
        </div>
      </div>

      {/* EXACT USER PROMPT EXAMPLE: Consommation inhabituelle d'eau détectée */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#c5a059]" />
            <span>Alertes Actives & Diagnostics en Langage Simple</span>
          </h3>
          <span className="text-xs text-gray-400">
            {alerts.filter((a) => !a.isResolved).length} alerte(s) en attente
          </span>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-6 transition-all shadow-xl ${
                alert.isResolved
                  ? "bg-[#101722]/60 border-[#1f2b3c] opacity-75"
                  : alert.severity === "CRITICAL"
                  ? "bg-[#1d1214] border-[#ef4444]/60"
                  : "bg-[#191814] border-[#f59e0b]/50"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                      alert.isResolved
                        ? "bg-[#10b981]/20 text-[#34d399]"
                        : alert.severity === "CRITICAL"
                        ? "bg-[#ef4444] text-white animate-pulse"
                        : "bg-[#f59e0b] text-black"
                    }`}
                  >
                    {alert.isResolved ? "✓" : "!"}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-300">
                      {alert.propertyTitle} • {alert.timestamp}
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-white">
                      {alert.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {alert.isResolved ? (
                    <span className="text-xs font-bold text-[#34d399] bg-[#10b981]/20 px-3 py-1 rounded-full border border-[#10b981]/40">
                      Résolu
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-white bg-[#ef4444] px-3 py-1 rounded-full uppercase tracking-wider">
                      Action requise
                    </span>
                  )}
                </div>
              </div>

              {/* Exact side-by-side data comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-gray-400 block mb-1">Consommation habituelle</span>
                  <span className="text-sm font-bold text-gray-200">
                    {alert.usualValue}
                  </span>
                </div>

                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-gray-400 block mb-1">Consommation actuelle</span>
                  <span className="text-sm font-bold text-[#f87171]">
                    {alert.currentValue}
                  </span>
                </div>

                <div className="bg-black/30 p-3 rounded-xl border border-white/10 sm:col-span-2">
                  <span className="text-gray-400 block mb-1">Cause possible identifiée</span>
                  <span className="text-xs font-semibold text-white">
                    {alert.possibleCause}
                  </span>
                </div>
              </div>

              {/* Recommended Action & Contact Technician Button */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#e5c378] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Action recommandée :</span>
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 font-medium">
                    {alert.recommendedAction}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  {!alert.isResolved && (
                    <>
                      <a
                        href={`tel:${alert.technicianContact.split(" ")[0]}`}
                        className="flex-1 sm:flex-none bg-[#c5a059] hover:bg-[#d8b46b] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Appeler le technicien</span>
                      </a>
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="bg-[#1f2b3e] hover:bg-[#2b3c56] text-gray-200 font-bold px-3 py-2.5 rounded-xl text-xs transition-all border border-[#2d3e58]"
                      >
                        Marquer résolu
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
