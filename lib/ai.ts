"use server";

import { GoogleGenAI } from "@google/genai";
import { AiPrompt } from "./prompt";
import { products } from "./products";

export interface Message {
  role: "system" | "model" | "user";
  parts: { text: string }[];
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  config: {
    responseMimeType: "application/json",
    systemInstruction:
      AiPrompt + "\n\n Product List" + JSON.stringify(products),
  },
  history: [],
});

export async function generateResponse(message: string) {
  const response = await chat.sendMessage({
    message,
  });
  return response.text;
}
