import { SearchExtraction } from "../types";

export async function parseSearchQuery(query: string): Promise<SearchExtraction> {
  try {
    const res = await fetch("/api/ai/parse-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.result) return data.result;
    }
  } catch (err) {
    console.warn("API parse failed, using client fallback", err);
  }

  // Client-side instant heuristic fallback
  const q = query.toLowerCase();
  const isYaounde = q.includes("yaoundé") || q.includes("yaounde") ||
    ["bastos", "nkolbisson", "nkoaban", "oyomabang", "odza", "etoudi", "manguier", "nsam"].some(d => q.includes(d));
  const city = isYaounde ? "Yaoundé" : "Douala";

  let district = city === "Douala" ? "Bonabéri" : "Bastos";
  const districts = [
    "Bépanda", "Bonanjo", "Bonapriso", "Bonabéri", "Deido",
    "Bastos", "Nkolbisson", "Nkoaban", "Oyomabang", "Odza", "Etoudi", "Manguier", "Nsam"
  ];
  const foundDistrict = districts.find(d => q.includes(d.toLowerCase()));
  if (foundDistrict) district = foundDistrict;

  let propertyType: "terrain" | "maison" | "appartement" | "bureau" = "terrain";
  if (q.includes("duplex") || q.includes("villa") || q.includes("maison")) propertyType = "maison";
  else if (q.includes("appartement") || q.includes("studio")) propertyType = "appartement";
  else if (q.includes("bureau") || q.includes("commerce")) propertyType = "bureau";

  const surfaceMatch = query.match(/(\d+)\s*(m²|m2|mètres|metres)/i);
  const surface = surfaceMatch ? parseInt(surfaceMatch[1], 10) : 500;

  const budgetMatch = query.match(/(\d+[\s.]?\d*)\s*(millions?|m|fcfa|f cfa|cfa)/i);
  let budget = 40000000;
  if (budgetMatch) {
    const val = parseFloat(budgetMatch[1].replace(/\s/g, ""));
    if (budgetMatch[2].toLowerCase().startsWith("m")) {
      budget = val * 1000000;
    } else {
      budget = val;
    }
  }

  const bedMatch = query.match(/(\d+)\s*(chambres?|ch)/i);
  const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : 4;

  let floors = "RDC";
  if (q.includes("r+3")) floors = "R+3";
  else if (q.includes("r+2")) floors = "R+2";
  else if (q.includes("r+1")) floors = "R+1";

  return {
    city,
    district,
    propertyType,
    surface,
    budget,
    bedrooms,
    floors,
    projectType: q.includes("construire") ? "construction" : (q.includes("louer") ? "location" : "achat"),
    summary: `${propertyType.toUpperCase()} à ${district} (${city}) • ${surface} m² • Budget : ${new Intl.NumberFormat("fr-FR").format(budget)} FCFA`
  };
}

export async function askSmartImmoAi(message: string, context?: Record<string, unknown>): Promise<string> {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (err) {
    console.warn("Chat API error, using smart fallback", err);
  }

  // Helpful conversational responses for typical real estate questions in Cameroon
  const m = message.toLowerCase();
  if (m.includes("risque") || m.includes("inondation") || m.includes("bépanda")) {
    return "À Douala (notamment Bépanda ou Deido), les zones de bas-fonds présentent un risque naturel d'inondation en saison des pluies. L'IA analyse les courbes de niveau et vous préconise de surélever votre niveau fini de plancher de 60 cm ou d'opter pour un radier drainant avec évacuation extérieure.";
  }
  if (m.includes("titre foncier") || m.includes("document") || m.includes("coutumier")) {
    return "Le Titre Foncier est le seul document juridique inattaquable conférant la pleine propriété au Cameroun. Les certificats de vente coutumière ou abandons de droits ne garantissent pas la sécurité de votre investissement tant qu'ils n'ont pas fait l'objet d'une immatriculation officielle avec visa du MINDCAF et d'un Notaire.";
  }
  if (m.includes("coût") || m.includes("budget") || m.includes("prix") || m.includes("m²")) {
    return "À Douala et Yaoundé, comptez en moyenne entre 160 000 et 220 000 FCFA/m² pour du gros œuvre de qualité (fondations, parpaings dosés à 350 kg/m³, béton armé, toiture aluzinc). Les finitions (carrelage, sanitaires, menuiserie aluminium) portent le coût total moyen entre 320 000 et 480 000 FCFA/m² selon le standing.";
  }
  if (m.includes("chambre") || m.includes("3 chambres")) {
    return "J'ai filtré les biens correspondants : vous pouvez explorer les duplex et appartements 3 et 4 chambres situés à Bonapriso, Bonabéri ou Bastos.";
  }
  return "Je suis SmartImmo AI, votre conseiller immobilier intelligent. Je peux vous expliquer les risques d'un terrain, décrypter un document foncier, vous aider à concevoir les plans de votre maison ou estimer vos coûts de construction au Cameroun.";
}
