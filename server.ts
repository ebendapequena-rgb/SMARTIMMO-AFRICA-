import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Gemini initialization error:", err);
  }
}

// Health endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "SmartImmo Africa API",
    geminiConfigured: !!apiKey,
    cities: ["Douala", "Yaoundé"],
  });
});

// 1. Natural Language Search Parser Endpoint
app.post("/api/ai/parse-search", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Requête de recherche invalide" });
  }

  // Fallback heuristic extraction for Cameroon context
  const fallbackExtract = () => {
    const qLower = query.toLowerCase();
    const isDouala = qLower.includes("douala") ||
      ["bépanda", "bepanda", "bonanjo", "bonapriso", "bonabéri", "bonaberi", "deido"].some(d => qLower.includes(d));
    const isYaounde = qLower.includes("yaoundé") || qLower.includes("yaounde") ||
      ["bastos", "nkolbisson", "nkoaban", "oyomabang", "odza", "etoudi", "manguier", "nsam"].some(d => qLower.includes(d));

    let detectedCity = isDouala ? "Douala" : (isYaounde ? "Yaoundé" : "Douala");
    
    const districts = [
      "Bépanda", "Bonanjo", "Bonapriso", "Bonabéri", "Deido",
      "Bastos", "Nkolbisson", "Nkoaban", "Oyomabang", "Odza", "Etoudi", "Manguier", "Nsam"
    ];
    const detectedDistrict = districts.find(d => qLower.includes(d.toLowerCase())) ||
      (detectedCity === "Douala" ? "Bonabéri" : "Bastos");

    let propertyType = "terrain";
    if (qLower.includes("duplex") || qLower.includes("villa") || qLower.includes("maison")) propertyType = "maison";
    else if (qLower.includes("appartement") || qLower.includes("studio")) propertyType = "appartement";
    else if (qLower.includes("bureau") || qLower.includes("commerce")) propertyType = "bureau";

    const surfaceMatch = query.match(/(\d+)\s*(m²|m2|mètres|metres)/i);
    const surface = surfaceMatch ? parseInt(surfaceMatch[1], 10) : 500;

    const budgetMatch = query.match(/(\d+[\s.]?\d*)\s*(millions?|m|fcfa|f cfa|cfa)/i);
    let budget = 45000000;
    if (budgetMatch) {
      const val = parseFloat(budgetMatch[1].replace(/\s/g, ""));
      if (budgetMatch[2].toLowerCase().startsWith("m")) {
        budget = val * 1000000;
      } else {
        budget = val;
      }
    }

    const bedMatch = query.match(/(\d+)\s*(chambres?|ch)/i);
    const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : 3;

    let floors = "RDC";
    if (qLower.includes("r+3")) floors = "R+3";
    else if (qLower.includes("r+2")) floors = "R+2";
    else if (qLower.includes("r+1")) floors = "R+1";

    return {
      city: detectedCity,
      district: detectedDistrict,
      propertyType,
      surface,
      budget,
      bedrooms,
      floors,
      projectType: qLower.includes("construire") ? "construction" : (qLower.includes("louer") || qLower.includes("location") ? "location" : "achat"),
      summary: `Recherche analysée : ${propertyType} à ${detectedDistrict} (${detectedCity}), env. ${surface} m², budget ${new Intl.NumberFormat("fr-FR").format(budget)} FCFA.`
    };
  };

  if (!ai) {
    return res.json({ result: fallbackExtract(), source: "local_heuristic" });
  }

  try {
    const prompt = `Tu es le moteur d'analyse de requêtes de SmartImmo Africa (Cameroun : Douala et Yaoundé).
Extrais les paramètres de cette demande immobilière en langage naturel :
"${query}"

Réponds uniquement avec un objet JSON strict au format suivant :
{
  "city": "Douala ou Yaoundé",
  "district": "un quartier camerounais détecté parmi (Bépanda, Bonanjo, Bonapriso, Bonabéri, Deido, Bastos, Nkolbisson, Nkoaban, Oyomabang, Odza, Etoudi, Manguier, Nsam) ou null",
  "propertyType": "terrain | maison | appartement | bureau | commerce",
  "surface": 500,
  "budget": 40000000,
  "bedrooms": 4,
  "floors": "RDC | R+1 | R+2 | R+3",
  "projectType": "achat | construction | location",
  "summary": "Courte phrase récapitulative claire en français"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ result: parsed, source: "gemini" });
  } catch (err) {
    console.warn("Gemini parse failed, using fallback:", err);
    return res.json({ result: fallbackExtract(), source: "fallback_heuristic" });
  }
});

// 2. Chat Assistant SmartImmo AI
app.post("/api/ai/chat", async (req, res) => {
  const { message, context } = req.body;
  if (!message) {
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

  if (!ai) {
    // Helpful local response
    let answer = "Bienvenue sur SmartImmo Africa ! Je suis là pour vous orienter simplement dans votre projet immobilier à Douala ou Yaoundé.";
    const mLower = message.toLowerCase();
    if (mLower.includes("risque") || mLower.includes("terrain")) {
      answer = "Sur ce terrain, les points d'attention concernent principalement la topographie (pente), le risque d'inondation en saison des pluies et la vérification du titre foncier au cadastre. Je vous recommande une visite avec un géomètre agréé.";
    } else if (mLower.includes("coût") || mLower.includes("budget") || mLower.includes("prix")) {
      answer = "Le coût dépend de la surface, des fondations adaptées au sol et du choix des matériaux (parpaings pleins, ciment local Dangote ou Cimencam, toiture aluzinc). Prévoyez toujours une marge d'imprévus de 10% pour les raccordements ENEO et CAMWATER.";
    } else if (mLower.includes("document") || mLower.includes("titre")) {
      answer = "Le Titre Foncier est la seule garantie légale de pleine propriété au Cameroun. Assurez-vous que le numéro de volume et folio est authentifié à la conservation foncière avant tout versement.";
    }
    return res.json({ reply: answer, source: "demo_assistant" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    return res.json({ reply: response.text, source: "gemini" });
  } catch (err) {
    console.error("Gemini chat error:", err);
    return res.json({
      reply: "Je suis à votre écoute pour vous aider à analyser un terrain, chiffrer vos travaux ou vérifier un document à Douala et Yaoundé.",
      source: "fallback",
    });
  }
});

// Vite Middleware for development / Static files for production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartImmo Africa backend running at http://0.0.0.0:${PORT}`);
  });
}

start();
