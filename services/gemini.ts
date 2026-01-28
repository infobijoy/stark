
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getGeminiResponse = async (prompt: string, history: any[] = []) => {
  try {
    const model = 'gemini-3-flash-preview';
    const chat = ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: `You are Stark Bag Industries AI Assistant. You help users navigate their Enterprise Resource Planning system. 
        The system includes modules for Purchase, Sales, Registration, Supply Chain, and Manufacturing. 
        Answer queries about typical ERP workflows, data analysis, and general business intelligence. 
        Be professional, concise, and helpful.`,
      },
    });

    const result = await chat;
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
