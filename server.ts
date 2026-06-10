import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with named parameter
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Real-time Chat agent with Google Search Grounding
app.post("/api/agent/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please set it in Settings > Secrets.",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    // Map messages history to @google/genai acceptable format: { role: string, parts: [{ text: string }] }
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini with Google Search tool enabled
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are TitanAI, the elite athletic AI entity at Titan Fitness Premium Training Lab. 
You possess deep scientific knowledge on human biomechanics, compound weight lifting, metabolic cardio, hypertrophy, and advanced physical optimization.
Additionally, you are connected to Google Search Grounding in real-time. Use this capability to discuss current developments, cite recent sports/fitness news, live athletic events, fact-check rumors, and cite real-time information.
Keep your answers professional, direct, encouraging, and highly detailed. Always cite your external sources elegantly.`,
        tools: [{ googleSearch: {} }],
      },
    });

    const replyText = response.text || "";
    
    // Extract grounding URLs and chunks to cite recent news and search results
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.map((chunk: any) => {
      if (chunk.web) {
        return {
          title: chunk.web.title || "Web Source",
          uri: chunk.web.uri,
        };
      }
      return null;
    }).filter(Boolean);

    return res.json({
      reply: replyText,
      sources,
    });
  } catch (error: any) {
    console.error("Error in Gemini chat completion:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
