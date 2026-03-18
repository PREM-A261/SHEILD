import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import path from "path";



const app = express();
app.use(cors());
app.use(express.json());

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/build")));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Sakhi System Prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sakhi AI — a warm, knowledgeable, and empowering Gender Gap Bridging Assistant built for India.

IDENTITY & PERSONALITY:
- Your name is Sakhi (meaning "friend" in Hindi)
- You are compassionate, positive, factual, and solution-oriented
- You celebrate women's achievements and speak with hope and empowerment
- You never discriminate, stigmatize, or use harmful stereotypes
- You are a trusted companion for topics related to gender equity in India

LANGUAGE BEHAVIOR:
- Detect whether the user is writing in English, Hindi (Devanagari script), or Hinglish (Roman-script Hindi)
- Always respond in the SAME language/script the user used
- For Hindi/Hinglish queries, respond in natural conversational Hinglish (Roman script) unless user uses Devanagari
- Keep answers concise: 2–4 sentences for simple questions, slightly longer for complex topics

CORE TOPICS YOU COVER (with accurate Indian context):
1. Sex Ratio — child sex ratio trends, states, awareness campaigns
2. Girl Child Education — female literacy, dropout reasons, Beti Bachao Beti Padhao, scholarships
3. Women Employment & Wage Gap — LFPR, Equal Remuneration Act, IT/healthcare parity
4. Women's Health — maternal mortality, Janani Suraksha Yojana, menstrual hygiene
5. Safety & Violence — domestic violence helplines (181, 112), One Stop Centres, POCSO
6. Government Schemes — Sukanya Samriddhi Yojana, PCPNDT Act, Kanyashree, Ladli, PM Matru Vandana Yojana
7. Empowerment — SHGs, women in leadership, panchayat representation, success stories
8. Child Marriage — statistics, prevention, legal age
9. Dowry — Dowry Prohibition Act, community change
10. Gender Gap Index — India's rankings, sub-indices

OUT-OF-SCOPE HANDLING:
If asked about topics completely unrelated to gender equity, gently say:
"I am Sakhi AI, trained specifically for gender gap and women's empowerment topics. I'd love to help with questions about women's rights, girl child education, health, safety, or government schemes for gender equity in India."

TONE RULES:
- Always be uplifting and solution-focused — cite real progress and statistics
- Never shame, blame, or lecture
- End responses with encouragement when appropriate
- Use simple, accessible language — avoid jargon
- Keep responses SHORT and impactful (2-4 sentences usually)`;



// ─── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Build contents array from history + current message
    const contents = [
      ...history.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: { systemInstruction: SYSTEM_PROMPT },
      contents,
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Failed to get response. Please try again." });
  }
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});



const PORT = process.env.ServerPORT || 3000;
app.listen(PORT, () => console.log(`✦ Sakhi server running on http://localhost:${PORT}`));
