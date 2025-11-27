



// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// src/config/Gemini.ts
import { GoogleGenAI } from "@google/genai";

// Create Gemini client once
const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function runChat(prompt: string): Promise<string> {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error: Something went wrong communicating with Gemini.";
  }
}
