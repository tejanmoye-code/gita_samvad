
export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  MARATHI = 'Marathi',
  TAMIL = 'Tamil',
  TELUGU = 'Telugu',
  KANNADA = 'Kannada',
  MALAYALAM = 'Malayalam',
  BENGALI = 'Bengali',
  GUJARATI = 'Gujarati',
  PUNJABI = 'Punjabi',
  ODIA = 'Odia',
  URDU = 'Urdu',
  SANSKRIT = 'Sanskrit'
}

export interface User {
  name: string;
  email: string;
  birthday: string;
}

export interface Message {
  id: string;
  role: 'user' | 'krishna';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  startTime: number;
  lastMessage: string;
}

export type ViewState = 'auth' | 'home' | 'chat';
