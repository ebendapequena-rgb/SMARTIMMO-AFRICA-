import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { message, context } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message requis" });
  }

  const systemInstruction = `Tu es SmartImmo AI, l'assistant immobilier intelligent de la plateforme SmartImmo Africa.
Tu t'adresses principalement à des citoyens, bâtisseurs, acheteurs et propriétaires au Cameroun (Douala et Yaoundé) et dans les Smart Cities africaines.
RÈGLES D'OR :
1. Langage très simple, direct, rassurant et pédagogique (évite le jargon technologique ou juridique incompréhensible).
2. Clarté maximale : utilise des phrases courtes, des listes à puces simples et des conseils concrets.
3. Toujours préciser avec bienveillance que pour les actes officiels et études de sol, le recours à un géomètre assermenté, un architecte inscrit à l'ONAC (Ordre National des Architectes du Cameroun) ou un notaire est indispensable.
4. Connaissances locales : Monnaie = Francs CFA (FCFA), régularisation foncière (Titre foncier, certificat d'abandon coutumier, morcellement), ENEO (électricité), CAMWATER (eau), zones inondables (ex: bas-fonds de Bépanda ou Deido vs plateaux de Bonanjo ou collines de Bastos/Etoudi).
5. Contexte courant : ${context ? JSON.stringify(context) : "Page générale"}.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    let answer =
      "Bienvenue sur SmartImmo Africa ! Je suis là pour vous orienter simplement dans votre projet immobilier à Douala ou Yaoundé.";
    const mLower = message.toLowerCase();
    if (mLower.includes("risque") || mLower.includes("terrain")) {
      answer =
        "Sur ce terrain, les points d'attention concernent principalement la topographie (pente), le risque d'inondation en saison des pluies et la vérification du titre foncier au cadastre. Je vous recommande une visite avec un géomètre agréé.";
    } else if (mLower.includes("coût") || mLower.includes("budget") || mLower.includes("prix")) {
      answer =
        "Le coût dépend de la surface, des fondations adaptées au sol et du choix des matériaux (parpaings pleins, ciment local Dangote ou Cimencam, toiture aluzinc). Prévoyez toujours une marge d'imprévus de 10% pour les raccordements ENEO et CAMWATER.";
    } else if (mLower.includes("document") || mLower.includes("titre")) {
      answer =
        "Le Titre Foncier est la seule garantie légale de pleine propriété au Cameroun. Assurez-vous que le numéro de volume et folio est authentifié à la conservation foncière avant tout versement.";
    }
    return res.status(200).json({ reply: answer, source: "demo_assistant" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    return res.status(200).json({ reply: response.text, source: "gemini" });
  } catch (err) {
    console.error("Gemini chat error:", err);
    return res.status(200).json({
      reply:
        "Je suis à votre écoute pour vous aider à analyser un terrain, chiffrer vos travaux ou vérifier un document à Douala et Yaoundé.",
      source: "fallback",
    });
  }
}
