import React, { useState, useEffect, useRef } from "react";
import { ActiveTab, ChatMessage } from "../types";
import { askSmartImmoAi } from "../services/api";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Volume2,
} from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onNavigateToTab?: (tab: ActiveTab) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bonjour ! Je suis SmartImmo AI, votre conseiller immobilier intelligent. Je suis à vos côtés pour vous expliquer les risques d'un terrain, vérifier vos documents ou vous guider dans vos travaux au Cameroun. Comment puis-je vous aider simplement ?",
      timestamp: "Maintenant",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Contextual suggested questions per screen
  const contextualPrompts: Record<ActiveTab, string[]> = {
    home: [
      "Quelles sont les étapes pour acheter un terrain en sécurité à Douala ?",
      "Quelle est la différence entre un titre foncier et une convention coutumière ?",
      "Quel est le prix moyen de construction d'une maison au m² au Cameroun ?",
    ],
    land_analysis: [
      "Pourquoi ce terrain présente-t-il un risque ?",
      "Comment savoir si un quartier comme Bépanda ou Deido est inondable ?",
      "Pourquoi une étude géotechnique est-elle nécessaire avant de bâtir ?",
    ],
    document_verification: [
      "Que signifie cette information sur le titre foncier ?",
      "Comment vérifier l'authenticité d'un volume et folio auprès du cadastre ?",
      "Pourquoi un acte de vente coutumier ne suffit-il pas ?",
    ],
    project_design: [
      "Quel type de duplex me conseillez-vous pour un terrain de 500 m² ?",
      "Comment bien orienter les ouvertures de ma maison face au soleil et aux pluies ?",
      "Pourquoi choisir des briques de terre compressée (BTC) ?",
    ],
    budget_estimation: [
      "Pourquoi le coût du gros œuvre est-il élevé ?",
      "Combien coûte le raccordement au réseau ENEO et CAMWATER ?",
      "Pourquoi faut-il toujours prévoir une marge d'imprévus de 10% ?",
    ],
    property_search: [
      "Montre-moi uniquement les biens avec 3 chambres.",
      "Quels sont les quartiers les plus calmes et sécurisés de Yaoundé ?",
      "Comment réserver une visite physique après la visite virtuelle ?",
    ],
    smart_management: [
      "Que signifie l'alerte rouge sur la consommation d'eau ?",
      "Comment détecter une fuite invisible dans les canalisations ?",
      "Comment un compteur connecté permet-il d'économiser l'électricité ENEO ?",
    ],
    user_dashboard: [
      "Comment ajouter un nouveau terrain à mon suivi personnel ?",
      "Mes documents analysés sont-ils confidentiels et protégés ?",
      "Puis-je exporter mon rapport complet pour ma banque ?",
    ],
    smart_city: [
      "Comment les Smart Cities améliorent-elles la vie à Douala et Yaoundé ?",
      "Quel est le rôle de l'IA dans la prévention des inondations urbaines ?",
      "Comment la planification urbaine numérique évite-t-elle les démolitions ?",
    ],
  };

  const currentPrompts = contextualPrompts[activeTab] || contextualPrompts.home;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const reply = await askSmartImmoAi(messageText, { activeTab });
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "Je suis là pour vous orienter. Pourriez-vous reformuler simplement votre question sur votre projet ou votre terrain ?",
          timestamp: "Maintenant",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0e141f] border border-[#232f45] w-full sm:w-[480px] h-[90vh] sm:h-[680px] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141c2b] to-[#1a2538] p-4 border-b border-[#232f45] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8c6b2b] flex items-center justify-center text-[#0d121a] shadow-md">
              <Bot className="w-6 h-6 text-[#0d121a]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  SmartImmo AI
                </h3>
                <span className="bg-[#10b981]/20 text-[#34d399] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#10b981]/30">
                  En ligne
                </span>
              </div>
              <p className="text-xs text-[#9aa4b8]">
                Conseiller simple & clair • Contexte :{" "}
                <span className="text-[#e5c378] capitalize">
                  {activeTab.replace("_", " ")}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setMessages([
                  {
                    id: "welcome",
                    sender: "ai",
                    text: "Conversation réinitialisée. Posez-moi vos questions immobilières en toute simplicité.",
                    timestamp: "Maintenant",
                  },
                ])
              }
              title="Réinitialiser"
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1f2b3e] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1f2b3e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reassuring Banner */}
        <div className="bg-[#151c29] px-4 py-2 text-[11px] text-[#abb5c6] border-b border-[#202b3d] flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
          <span>
            Langage clair et sans jargon. Les avis sont préliminaires et ne remplacent pas un notaire ou géomètre.
          </span>
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-[#c5a059]/20 text-[#e5c378] flex items-center justify-center shrink-0 mt-0.5 border border-[#c5a059]/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#c5a059] text-[#0b0f15] font-medium rounded-br-none"
                    : "bg-[#161f2e] text-[#f1f3f7] border border-[#26344a] rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 flex items-center justify-between gap-3 ${
                    msg.sender === "user" ? "text-[#3f3115]" : "text-gray-400"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === "ai" && (
                    <button
                      onClick={() => speakText(msg.text)}
                      title="Écouter la réponse"
                      className="hover:text-[#e5c378] flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Lire</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-lg bg-[#27354b] text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-sm text-[#e5c378]">
              <div className="w-7 h-7 rounded-lg bg-[#c5a059]/20 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4 text-[#e5c378]" />
              </div>
              <div className="bg-[#161f2e] border border-[#26344a] px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-gray-400 ml-1">
                  SmartImmo AI réfléchit pour vous...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Contextual Suggestion Pills */}
        <div className="bg-[#121824] px-4 py-2 border-t border-[#202b3d]">
          <div className="text-[11px] font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-3 h-3 text-[#e5c378]" />
            <span>Questions rapides pour cette page :</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {currentPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs bg-[#1a2333] hover:bg-[#253249] text-gray-200 hover:text-white px-3 py-1.5 rounded-full border border-[#2a384e] transition-all shrink-0 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0d121a] border-t border-[#202b3d]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question en français simple..."
              className="flex-1 bg-[#161f2e] border border-[#29374d] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#c5a059]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#c5a059] hover:bg-[#d8b46b] disabled:opacity-50 text-[#0b0f15] font-bold p-3 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
