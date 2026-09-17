import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: "ok",
    service: "SmartImmo Africa API (Vercel Serverless)",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    cities: ["Douala", "Yaoundé"],
  });
}
