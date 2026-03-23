import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Mentor", an elite psychological recovery coach for the "Freedom Protocol" app. 
Your mission is to help users break free from addiction (specifically PMO) using science-based protocols, 
stoic wisdom, and radical accountability. 

Tone: Professional, firm but deeply empathetic, authoritative, and motivating. 
Avoid generic "AI-speak". Speak like a high-level mentor who truly cares about the user's potential.

Key Strategies:
1. Urge Surfing: Teach users to observe urges without acting.
2. Dopamine Reset: Encourage activities like cold showers, exercise, and meditation.
3. Radical Honesty: Praise honesty about relapses but focus on immediate recovery.
4. Future Self: Remind users of the version of themselves they are building.

Keep responses concise (under 150 words) unless a deeper explanation is needed.`;

export const getAIResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  userContext: { name: string, streak: number, trigger?: string }
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    
    const contextPrompt = `
      User Context:
      - Name: ${userContext.name}
      - Current Streak: ${userContext.streak} days
      - Biggest Trigger: ${userContext.trigger || "Not specified yet"}
      
      Always address the user by name if appropriate. Use their streak as a point of pride or a baseline for recovery. 
      If they mention their trigger, provide specific strategies to avoid it.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: contextPrompt + "\n\nUser Message: " + message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return response.text || "I am here. Breathe. This urge is temporary, but your progress is permanent.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting, but my advice remains: Breathe, move your body, and remember why you started.";
  }
};

export const predictRelapseRisk = async (journalEntries: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    
    const prompt = `Analyze the following recent journal entries and predict the percentage risk (0-100) of a relapse in the next 48 hours. 
    Also provide a one-sentence piece of advice.
    
    Entries:
    ${journalEntries.map(e => `- Date: ${e.date}, Content: ${e.content}, Relapse: ${e.relapse}`).join('\n')}
    
    Return ONLY a JSON object with "riskScore" (number) and "advice" (string).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            advice: { type: Type.STRING }
          },
          required: ["riskScore", "advice"]
        }
      }
    });

    return JSON.parse(response.text || '{"riskScore": 15, "advice": "Stay vigilant and maintain your routine."}');
  } catch (error) {
    console.error("Prediction Error:", error);
    return { riskScore: 15, advice: "Stay vigilant and maintain your routine." };
  }
};

export const generateMonthlyReport = async (journalEntries: any[], dailyChecks: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    
    const prompt = `
      Analyze the following recovery data for the past month and generate a "Freedom Protocol Monthly Report".
      
      Journal Entries:
      ${journalEntries.map(e => `- Date: ${e.date}, Content: ${e.content}, Relapse: ${e.relapse}`).join('\n')}
      
      Daily Mood & Sleep Checks:
      ${dailyChecks.map(c => `- Date: ${c.date}, Mood: ${c.mood}/5, Sleep: ${c.sleep}h`).join('\n')}
      
      Please provide:
      1. Risky Patterns: Identify the most dangerous times or triggers based on the data.
      2. Mood-Streak Correlation: How did mood and sleep affect the user's ability to stay clean?
      3. Strategic Suggestion: One specific, actionable science-based goal for next month.
      
      Return ONLY a JSON object with "riskyPatterns" (string), "correlation" (string), and "suggestion" (string).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskyPatterns: { type: Type.STRING },
            correlation: { type: Type.STRING },
            suggestion: { type: Type.STRING }
          },
          required: ["riskyPatterns", "correlation", "suggestion"]
        }
      }
    });

    return JSON.parse(response.text || '{"riskyPatterns": "No data", "correlation": "No data", "suggestion": "No data"}');
  } catch (error) {
    console.error("Report Error:", error);
    return { riskyPatterns: "Error generating report", correlation: "Error generating report", suggestion: "Error generating report" };
  }
};
