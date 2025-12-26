
import { GoogleGenAI, Modality } from "@google/genai";
import { Language } from "../types";
import { SYSTEM_INSTRUCTIONS } from "../constants";

// Fixed: Correct initialization with exact named parameter per guideline
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateKrishnaResponse = async (
  prompt: string, 
  language: Language, 
  userName: string
): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS(language, userName),
    },
  });

  return response.text || "Krishna remains silent...";
};

export const generateTTS = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      // Explicitly prompting for a divine male voice to ensure the male persona
      contents: [{ parts: [{ text: `Read this with a deep, calm, and divine male voice: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Fenrir is a deep male voice
            prebuiltVoiceConfig: { voiceName: 'Fenrir' },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS failed:", error);
    return undefined;
  }
};

export const startLiveConversation = async (
  language: Language,
  userName: string,
  callbacks: {
    onMessage: (audioData: string) => void;
    onInterrupted: () => void;
    onError: (e: any) => void;
  }
) => {
  const ai = getAI();
  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks: {
      onopen: () => console.log("Live session opened"),
      onmessage: async (message) => {
        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audioData) {
          callbacks.onMessage(audioData);
        }
        if (message.serverContent?.interrupted) {
          callbacks.onInterrupted();
        }
      },
      onerror: callbacks.onError,
      onclose: () => console.log("Live session closed"),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } },
      },
      systemInstruction: SYSTEM_INSTRUCTIONS(language, userName) + " KEEP RESPONSES SHORT AND CONVERSATIONAL FOR VOICE.",
    },
  });

  return sessionPromise;
};
