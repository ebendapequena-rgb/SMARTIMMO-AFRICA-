import React, { useState } from "react";
import { ActiveTab, City, SearchExtraction } from "./types";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { LandAnalysisView } from "./components/LandAnalysisView";
import { DocumentVerificationView } from "./components/DocumentVerificationView";
import { ProjectDesignView } from "./components/ProjectDesignView";
import { BudgetEstimationView } from "./components/BudgetEstimationView";
import { PropertySearchView } from "./components/PropertySearchView";
import { SmartManagementView } from "./components/SmartManagementView";
import { UserDashboardView } from "./components/UserDashboardView";
import { SmartCityView } from "./components/SmartCityView";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { Footer } from "./components/Footer";
import { Sparkles, MessageSquare } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [currentCity, setCurrentCity] = useState<City>("Douala");
  const [searchContext, setSearchContext] = useState<SearchExtraction | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  const handleNavigate = (tab: ActiveTab, context?: SearchExtraction) => {
    if (context) {
      setSearchContext(context);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f15] text-[#f1f3f7] selection:bg-[#c5a059] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        openAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === "home" && (
          <HomeView
            onNavigate={handleNavigate}
            currentCity={currentCity}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "land_analysis" && (
          <LandAnalysisView
            currentCity={currentCity}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "document_verification" && (
          <DocumentVerificationView
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "project_design" && (
          <ProjectDesignView
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "budget_estimation" && (
          <BudgetEstimationView
            currentCity={currentCity}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "property_search" && (
          <PropertySearchView
            currentCity={currentCity}
            initialSearchContext={searchContext}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "smart_management" && (
          <SmartManagementView
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "user_dashboard" && (
          <UserDashboardView
            onNavigate={handleNavigate}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {activeTab === "smart_city" && (
          <SmartCityView
            onNavigate={handleNavigate}
            openAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger (present on all screens) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#c5a059] to-[#e4bf73] text-[#0b0f15] font-extrabold px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/30"
          aria-label="Parler à l'assistant IA"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#0b0f15]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white"></span>
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight">
            Parler à l'assistant IA
          </span>
        </button>
      </div>

      {/* Assistant Modal / Chat Drawer */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        activeTab={activeTab}
        onNavigateToTab={handleNavigate}
      />

      {/* Reassuring Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
