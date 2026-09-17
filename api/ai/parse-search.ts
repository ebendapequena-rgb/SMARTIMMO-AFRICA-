import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

function fallbackExtract(query: string) {
  const qLower = query.toLowerCase();
  const isDouala =
    qLower.includes("douala") ||
    ["bépanda", "bepanda", "bonanjo", "bonapriso", "bonabéri", "bonaberi", "deido"].some(
      (d) => qLower.includes(d)
    );
  const isYaounde =
    qLower.includes("yaoundé") ||
    qLower.includes("yaounde") ||
    ["bastos", "nkolbisson", "nkoaban", "oyomabang", "odza", "etoudi", "manguier", "nsam"].some(
      (d) => qLower.includes(d)
    );

  const detectedCity = isDouala ? "Douala" : isYaounde ? "Yaoundé" : "Douala";

  const districts = [
    "Bépanda", "Bonanjo", "Bonapriso", "Bonabéri", "Deido",
    "Bastos", "Nkolbisson", "Nkoaban", "Oyomabang", "Odza", "Etoudi", "Manguier", "Nsam",
  ];
  const detectedDistrict =
    districts.find((d) => qLower.includes(d.toLowerCase())) ||
    (detectedCity === "Douala" ? "Bonabéri" : "Bastos");

  let propertyType = "terrain";
  if (qLower.includes("duplex") || qLower.includes("villa") || qLower.includes("maison"))
    propertyType = "maison";
  else if (qLower.includes("appartement") || qLower.includes("studio"))
    propertyType = "appartement";
  else if (qLower.includes("bureau") || qLower.includes("commerce"))
    propertyType = "bureau";

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
    projectType: qLower.includes("construire")
      ? "construction"
      : qLower.includes("louer") || qLower.includes("location")
      ? "location"
      : "achat",
    summary: `Recherche analysée : ${propertyType} à ${detectedDistrict} (${detectedCity}), env. ${surface} m², budget ${new Intl.NumberFormat(
      "fr-FR"
    ).format(budget)} FCFA.`,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { query } = req.body || {};
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Requête de recherche invalide" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ result: fallbackExtract(query), source: "local_heuristic" });
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
    return res.status(200).json({ result: parsed, source: "gemini" });
  } catch (err) {
    console.warn("Gemini parse-search failed, using fallback:", err);
    return res.status(200).json({ result: fallbackExtract(query), source: "fallback_heuristic" });
  }
}
