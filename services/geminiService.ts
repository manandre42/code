import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, never expose API keys on the client side.
// This should be proxied through a backend. 
// For this demo, we assume process.env.API_KEY is set or user provides it.

export const getAICoachHint = async (missionTitle: string, missionContext: string, userQuery: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "ERRO: Módulo de IA desconectado. Chave de API não encontrada.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Você é "O Oráculo", uma IA misteriosa e auxiliar em um jogo de Alternate Reality Game (ARG) sobre programação.
      O usuário é um "Engenheiro" tentando resolver um desafio.
      
      Missão: ${missionTitle}
      Contexto do desafio: ${missionContext}
      Pergunta do usuário: ${userQuery}
      
      Instruções:
      1. Responda com uma "persona" cyberpunk/misteriosa.
      2. NÃO dê a resposta direta.
      3. Dê uma dica conceitual ou sintática que ajude o usuário a pensar.
      4. Seja breve (máximo 2 frases).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "O sinal está fraco... tente novamente.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERRO DE CONEXÃO: Não foi possível estabelecer link neural com o Oráculo.";
  }
};