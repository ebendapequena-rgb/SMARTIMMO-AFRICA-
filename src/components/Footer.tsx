import React from "react";
import { ActiveTab } from "../types";
import {
  Building2,
  PhoneCall,
  ShieldCheck,
  Scale,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0a0e14] border-t border-[#1e2738] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059] flex items-center justify-center text-black font-extrabold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-base font-extrabold text-white font-['Space_Grotesk']">
                SMARTIMMO <span className="text-[#c5a059]">AFRICA</span>
              </span>
            </div>
            <p className="text-xs text-[#9aa4b8] leading-relaxed">
              « L'intelligence au service de votre projet immobilier. »
              Plateforme numérique d'aide à la décision pour le développement des Smart Cities au Cameroun et en Afrique.
            </p>
            <div className="flex items-center gap-2 text-xs text-white pt-1">
              <PhoneCall className="w-4 h-4 text-[#e5c378]" />
              <span className="font-semibold">+237 690 00 00 00</span>
              <span className="text-gray-500">(Hotline gratuite)</span>
            </div>
          </div>

          {/* Col 2: 6 Domaines */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Les 6 Domaines Intelligents
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate("land_analysis")}
                  className="hover:text-white transition-colors"
                >
                  1. Analyse des terrains & risques
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("document_verification")}
                  className="hover:text-white transition-colors"
                >
                  2. Sécurisation & vérification documents
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("project_design")}
                  className="hover:text-white transition-colors"
                >
                  3. Conception architecturale du projet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("budget_estimation")}
                  className="hover:text-white transition-colors"
                >
                  4. Estimation du budget en FCFA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("property_search")}
                  className="hover:text-white transition-colors"
                >
                  5. Recherche de biens & visite 360°
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("smart_management")}
                  className="hover:text-white transition-colors"
                >
                  6. Gestion intelligente eau & électricité
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Zones couvertes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Territoires Pilotes au Cameroun
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-gray-300 block">DOUALA :</strong>
                <span className="text-gray-400">
                  Bépanda, Bonanjo, Bonapriso, Bonabéri, Deido
                </span>
              </div>
              <div>
                <strong className="text-gray-300 block">YAOUNDÉ :</strong>
                <span className="text-gray-400">
                  Bastos, Nkolbisson, Nkoaban, Oyomabang, Odza, Etoudi, Manguier, Nsam
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Institutional & Legal Partners */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Encadrement Professionnel
            </h4>
            <p className="text-[11px] leading-relaxed text-gray-400">
              Conçu en conformité avec les directives d'urbanisme du Ministère de l'Habitat et du Développement Urbain (MINHDU), l'Ordre National des Géomètres du Cameroun (OGC) et l'Ordre National des Architectes du Cameroun (ONAC).
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#162030] text-[#e5c378] text-[11px] border border-[#23334c]">
                <Scale className="w-3.5 h-3.5" />
                <span>Certification notariée toujours requise</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Disclaimer */}
        <div className="border-t border-[#1c2433] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>
            © {new Date().getFullYear()} SMARTIMMO AFRICA. « Immobilier intelligent : une approche innovante pour le développement des Smart Cities ».
          </p>
          <p className="text-right">
            Toutes les simulations sont identifiées comme données préliminaires d'aide à la décision.
          </p>
        </div>
      </div>
    </footer>
  );
};
