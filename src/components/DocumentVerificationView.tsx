import React, { useState } from "react";
import { DocumentAnalysis, RiskLevel } from "../types";
import { INITIAL_DOCUMENT_ANALYSES } from "../data/mockData";
import {
  FileCheck,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  Info,
  Scale,
  FileQuestion,
  ExternalLink,
} from "lucide-react";

interface DocumentVerificationViewProps {
  openAiAssistant: () => void;
}

export const DocumentVerificationView: React.FC<DocumentVerificationViewProps> = ({
  openAiAssistant,
}) => {
  const [documents, setDocuments] = useState<DocumentAnalysis[]>(INITIAL_DOCUMENT_ANALYSES);
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || "");
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const currentDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleSimulateUpload = (sampleIndex: number) => {
    setIsScanning(true);
    setTimeout(() => {
      if (sampleIndex === 0) {
        setSelectedDocId(documents[0].id);
      } else if (sampleIndex === 1) {
        setSelectedDocId(documents[1].id);
      } else {
        // Create a 3rd sample: Plan de Bornage Bastos
        const newDoc: DocumentAnalysis = {
          id: `doc-${Date.now()}`,
          documentType: "Plan de Bornage",
          fileName: "Plan_Bornage_Geometre_Bastos_Yaounde.pdf",
          fileSize: "3.8 Mo",
          uploadDate: "Aujourd'hui",
          status: "FAVORABLE",
          statusLabel: "Bornage régulier avec visa de l'Ordre des Géomètres",
          extractedInfo: {
            volumeFolio: "Réf. Dossier Cadastral N° 9821-Mfoundi",
            landNumber: "Parcelle N° 14 - Lotissement Bastos Centre",
            declaredOwner: "SCI Les Résidences du Centre",
            surfaceDeclared: "500 m² (Polygonale 4 bornes A, B, C, D)",
            cadastralZone: "Mairie de Yaoundé 1er (Bastos)",
            issueDate: "28 Mai 2024",
            conservatorSeal: "Cachet et signature Géomètre Expert Agréé ONGC",
          },
          checks: {
            titleMatch: {
              status: "FAVORABLE",
              label: "Numéro de dossier cadastral",
              comment: "Format rigoureux conforme aux normes de la Direction du Cadastre.",
            },
            boundaryCoherence: {
              status: "FAVORABLE",
              label: "Clôture géométrique de la parcelle",
              comment: "Angles et distances reportés avec coordonnées UTM rattachées au réseau national.",
            },
            mortgageOrDispute: {
              status: "FAVORABLE",
              label: "Contiguïté avec les parcelles voisines",
              comment: "Signatures des riverains portées au procès-verbal de bornage contradictoire.",
            },
            administrativeSeal: {
              status: "FAVORABLE",
              label: "Tampon de l'Ordre des Géomètres",
              comment: "Timbre fiscal et visa de conformité visibles.",
            },
          },
          warnings: [
            "Assurez-vous que les bornes physiques en béton sont toujours intactes sur le terrain avant paiement.",
          ],
          recommendations: [
            "Le plan de bornage est parfaitement cohérent avec le Titre Foncier correspondant.",
            "Conservez ce duplicata pour la demande ultérieure de permis de construire.",
          ],
        };
        setDocuments([newDoc, ...documents]);
        setSelectedDocId(newDoc.id);
      }
      setIsScanning(false);
    }, 1200);
  };

  const getStatusBadge = (status: RiskLevel) => {
    switch (status) {
      case "FAVORABLE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            🟢 Informations cohérentes
          </span>
        );
      case "WARNING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/40">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            🟠 À vérifier
          </span>
        );
      case "RISK":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/40">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
            🔴 Anomalie potentielle
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Domaine 2 • Sécurisation Foncière & Anti-Litiges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Vérification Intelligente des Documents
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Déposez votre titre foncier, certificat de propriété ou contrat pour détecter les incohérences avant tout versement d'argent.
          </p>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Poser une question sur un acte</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dropzone & Upload Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Dropzone */}
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Déposer votre document ici
            </h3>
            <p className="text-xs text-gray-400">
              Glissez-déposez votre fichier ou choisissez un document d'exemple.
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleSimulateUpload(0);
              }}
              onClick={() => handleSimulateUpload(0)}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-[#c5a059] bg-[#c5a059]/10"
                  : "border-[#2a3a52] hover:border-[#c5a059] bg-[#141d2a]"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1b2638] text-[#c5a059] flex items-center justify-center mx-auto mb-3 border border-[#2b3b54]">
                <Upload className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-white block">
                Glissez votre document ou cliquez ici
              </span>
              <span className="text-xs text-gray-400 mt-1 block">
                Formats acceptés : PDF, JPG, PNG (Titre foncier, plan, certificat)
              </span>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#1e2a3c] text-[#e5c378] text-xs font-semibold">
                Analyse IA confidentielle & instantanée
              </span>
            </div>

            {/* Quick Demo Pre-sets */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-gray-400 block">
                💡 Ou tester avec un exemple réel en 1 clic :
              </span>
              <div className="space-y-2">
                <button
                  onClick={() => handleSimulateUpload(0)}
                  className="w-full text-left p-3 rounded-xl bg-[#151e2c] hover:bg-[#1c273a] border border-[#243349] hover:border-[#c5a059] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#34d399]" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Titre Foncier N° 45821/Wouri (Bonapriso)
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Document officiel régulier • M. Eboumbou
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-2 py-0.5 rounded font-bold">
                    Conforme
                  </span>
                </button>

                <button
                  onClick={() => handleSimulateUpload(1)}
                  className="w-full text-left p-3 rounded-xl bg-[#151e2c] hover:bg-[#1c273a] border border-[#243349] hover:border-[#f59e0b] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileQuestion className="w-4 h-4 text-[#fbbf24]" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Convention Coutumière (Oyomabang)
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Acte sous seing privé sans immatriculation
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#f59e0b]/20 text-[#fbbf24] px-2 py-0.5 rounded font-bold">
                    À vérifier
                  </span>
                </button>

                <button
                  onClick={() => handleSimulateUpload(2)}
                  className="w-full text-left p-3 rounded-xl bg-[#151e2c] hover:bg-[#1c273a] border border-[#243349] hover:border-[#34d399] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#38bdf8]" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Plan de Bornage Géomètre (Bastos)
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Plan 4 bornes avec visa de l'Ordre
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#38bdf8]/20 text-[#38bdf8] px-2 py-0.5 rounded font-bold">
                    Bornage
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* List of scanned documents */}
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Vos documents analysés
            </h4>
            <div className="space-y-2">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedDocId === doc.id
                      ? "bg-[#182333] border-[#c5a059]"
                      : "bg-[#141b27] border-[#222f42] hover:bg-[#192231]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-[#c5a059] shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-white">{doc.documentType}</div>
                      <div className="text-xs text-gray-400">{doc.fileName}</div>
                    </div>
                  </div>
                  {getStatusBadge(doc.status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Extraction & Diagnostic Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-6 space-y-6 shadow-xl">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212d41] pb-5">
              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  Rapport d'Analyse Documentaire
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
                  {currentDoc.documentType}
                </h3>
                <p className="text-xs text-gray-400">
                  Fichier : <span className="text-gray-200">{currentDoc.fileName}</span> ({currentDoc.fileSize}) • {currentDoc.uploadDate}
                </p>
              </div>

              <div>{getStatusBadge(currentDoc.status)}</div>
            </div>

            {/* Extracted Key Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c5a059]" />
                <span>Informations extraites par l'IA :</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Numéro & Référence</span>
                  <span className="font-bold text-white text-sm">
                    {currentDoc.extractedInfo.landNumber || "Non renseigné"}
                  </span>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Volume & Folio</span>
                  <span className="font-bold text-white text-sm">
                    {currentDoc.extractedInfo.volumeFolio || "Non spécifié"}
                  </span>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Propriétaire déclaré</span>
                  <span className="font-bold text-[#e5c378] text-sm">
                    {currentDoc.extractedInfo.declaredOwner || "Collectivité / Inconnu"}
                  </span>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Superficie déclarée</span>
                  <span className="font-bold text-white text-sm">
                    {currentDoc.extractedInfo.surfaceDeclared || "Non mesurée"}
                  </span>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Conservation Foncière / Zone</span>
                  <span className="font-bold text-white text-sm">
                    {currentDoc.extractedInfo.cadastralZone || "Non localisé"}
                  </span>
                </div>

                <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                  <span className="text-gray-400 block">Sceau et Visa Officiel</span>
                  <span className="font-bold text-white text-sm">
                    {currentDoc.extractedInfo.conservatorSeal || "Aucun visa visible"}
                  </span>
                </div>
              </div>
            </div>

            {/* Checks & Inconsistency Identification */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#c5a059]" />
                <span>Points de contrôle et détection des anomalies :</span>
              </h4>

              <div className="space-y-3">
                {Object.entries(currentDoc.checks).map(([key, check]) => (
                  <div
                    key={key}
                    className="bg-[#151e2b] p-3.5 rounded-xl border border-[#243349] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {check.label}
                      </span>
                      {getStatusBadge(check.status)}
                    </div>
                    <p className="text-xs text-[#abb5c6] leading-relaxed">
                      {check.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings & Missing Info */}
            {currentDoc.warnings.length > 0 && (
              <div className="bg-[#241a15] border border-[#d97706]/40 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#fbbf24]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Éléments nécessitant une attention immédiate :</span>
                </div>
                <ul className="space-y-1.5">
                  {currentDoc.warnings.map((w, idx) => (
                    <li key={idx} className="text-xs text-gray-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-1.5 shrink-0"></span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Recommendations */}
            <div className="bg-[#162030] border border-[#2a3b54] rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#e5c378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Conseil de démarche sécurisée :</span>
              </div>
              <ul className="space-y-1.5">
                {currentDoc.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-gray-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0"></span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mandatory Non-Certification Legal Warning as demanded by prompt */}
            <div className="bg-[#0f141d] border-l-4 border-[#ef4444] p-4 rounded-r-xl text-xs text-gray-300 space-y-1">
              <span className="font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#f87171]" />
                Clause de non-certification juridique définitive
              </span>
              <p className="leading-relaxed text-gray-300">
                L'analyse automatique effectuée par SmartImmo AI est un outil technique d'aide à la vigilance et de décryptage documentaire. Elle ne constitue en aucun cas une certification juridique définitive ou une garantie de titre foncier. Seul un Notaire assermenté et le Conservateur de la Propriété Foncière (MINDCAF) sont légalement habilités à délivrer un avis opposable et à authentifier une transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
