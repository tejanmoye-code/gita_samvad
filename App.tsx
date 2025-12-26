
import React, { useState, useEffect, useRef } from 'react';
import { Language, Message, User, ViewState, ChatSession } from './types';
import { PeacockFeatherIcon, LANGUAGES, UI_TRANSLATIONS } from './constants';
import { generateKrishnaResponse, generateTTS, startLiveConversation } from './services/gemini';
import { decode, decodeAudioData, createBlob } from './services/audio';

// Sub-components outside to prevent focus reset on re-render
const AuthView: React.FC<{
  onAuth: (user: User) => void;
  onHome: () => void;
  t: (key: string) => string;
}> = ({ onAuth, onHome, t }) => {
  const [formData, setFormData] = useState({ name: '', email: '', birthday: '', password: '' });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      onAuth({ name: formData.name, email: formData.email, birthday: formData.birthday });
    }
  };

  const socialLogin = () => {
    onAuth({ name: 'Seeker', email: 'seeker@gita.com', birthday: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3F2FD] p-4">
      <div className="bg-white p-6 rounded-[2rem] shadow-[0_15px_40px_rgba(3,4,94,0.1)] w-full max-w-sm border border-blue-50 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shadow-inner overflow-hidden border-2 border-blue-100">
             <PeacockFeatherIcon className="w-14 h-14" />
          </div>
        </div>
        <h2 className="cinzel text-3xl font-black text-center text-[#03045E] mb-1 leading-tight">{t('app_name')}</h2>
        <p className="text-center text-[10px] text-[#0077B6] mb-6 font-bold uppercase tracking-widest opacity-80">{t('subtitle')}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex space-x-3">
            <button onClick={socialLogin} className="flex-1 py-3 border-2 border-blue-50 rounded-xl flex items-center justify-center bg-white hover:bg-blue-50 transition-all font-black text-blue-800 text-[10px] uppercase tracking-wider shadow-sm active:scale-95">
              GOOGLE
            </button>
            <button onClick={socialLogin} className="flex-1 py-3 border-2 border-blue-50 rounded-xl flex items-center justify-center bg-white hover:bg-blue-50 transition-all font-black text-blue-800 text-[10px] uppercase tracking-wider shadow-sm active:scale-95">
              FACEBOOK
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-blue-50"></div>
            <p className="text-[9px] text-blue-200 uppercase tracking-widest font-black">Or Sign Up</p>
            <div className="flex-1 h-px bg-blue-50"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            required 
            className="w-full px-5 py-3 rounded-xl bg-blue-50/30 border border-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all text-[#03045E] text-xs font-medium" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            required 
            type="email" 
            className="w-full px-5 py-3 rounded-xl bg-blue-50/30 border border-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all text-[#03045E] text-xs font-medium" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-blue-400 font-black ml-2">Birthday</label>
            <input 
              required 
              type="text" 
              className="w-full px-5 py-3 rounded-xl bg-blue-50/30 border border-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all text-[#03045E] text-xs font-medium" 
              placeholder="YYYY-MM-DD" 
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={formData.birthday} 
              onChange={e => setFormData({...formData, birthday: e.target.value})}
            />
          </div>
          <input 
            required 
            type="password" 
            className="w-full px-5 py-3 rounded-xl bg-blue-50/30 border border-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all text-[#03045E] text-xs font-medium" 
            placeholder="Password" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="w-full py-3.5 bg-[#023E8A] text-white rounded-xl font-black text-xs hover:bg-[#03045E] transition-all shadow-lg active:scale-95 mt-2 uppercase tracking-widest">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

const HomeView: React.FC<{
  language: Language;
  setLanguage: (l: Language) => void;
  onLogout: () => void;
  onStartChat: () => void;
  onOpenChat: (s: ChatSession) => void;
  onDeleteChat: (id: string) => void;
  history: ChatSession[];
  t: (key: string) => string;
}> = ({ language, setLanguage, onLogout, onStartChat, onOpenChat, onDeleteChat, history, t }) => (
  <div className="flex flex-col h-screen bg-[#CAF0F8] overflow-hidden">
    <header className="p-4 flex justify-between items-center bg-white/40 backdrop-blur-sm">
      <button onClick={onLogout} className="p-2 text-[#03045E] hover:bg-blue-100 rounded-full transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
      <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="text-[10px] bg-white/80 border border-blue-50 rounded-full px-3 py-1.5 font-black text-[#03045E] shadow-sm appearance-none outline-none">
        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 overflow-y-auto">
      <div className="animate-fade-in space-y-6 w-full max-sm:max-w-xs max-w-sm">
        <div className="relative mx-auto w-36 h-36">
          <div className="absolute inset-0 bg-blue-600/5 blur-[60px] rounded-full"></div>
          <div className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white/60 overflow-hidden relative z-10 mx-auto">
             <PeacockFeatherIcon className="w-24 h-24 transform -rotate-12" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="cinzel text-3xl font-black text-[#03045E] tracking-[0.2em]">{t('app_name')}</h1>
          <p className="text-[#0077B6] italic text-xs tracking-widest font-bold opacity-80">{t('subtitle')}</p>
        </div>

        <button onClick={onStartChat} className="px-8 py-3 bg-[#03045E] text-white rounded-full font-black text-[11px] hover:bg-[#000814] transition-all transform hover:scale-105 shadow-xl active:scale-95 tracking-[0.2em] uppercase">
          {t('press_to_chat')}
        </button>

        <div className="mt-8 text-left w-full">
          <h3 className="cinzel text-[10px] font-black text-[#03045E] mb-3 border-b border-blue-100 pb-1.5 flex items-center space-x-2 tracking-widest uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <span>{t('library')}</span>
          </h3>
          {history.length === 0 ? (
            <p className="text-[10px] text-[#0077B6] italic text-center py-6 opacity-60">{t('no_chats')}</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
              {history.map(session => (
                <div key={session.id} className="group relative flex items-center bg-white/40 rounded-xl border border-blue-50/50 hover:bg-white transition-all shadow-sm">
                  <button onClick={() => onOpenChat(session)} className="flex-1 p-3 text-left overflow-hidden">
                    <span className="text-[8px] font-black text-[#03045E] opacity-40">{new Date(session.startTime).toLocaleDateString()}</span>
                    <p className="text-[10px] text-[#0077B6] font-bold truncate group-hover:text-[#03045E]">{session.lastMessage}</p>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteChat(session.id); }}
                    className="p-3 text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
);

const ChatView: React.FC<{
  user: User;
  language: Language;
  setLanguage: (l: Language) => void;
  messages: Message[];
  input: string;
  setInput: (i: string) => void;
  isLoading: boolean;
  isLiveActive: boolean;
  isReadingId: string | null;
  onBack: () => void;
  onSend: () => void;
  onToggleLive: () => void;
  onPlayAudio: (id: string, text: string) => void;
  t: (key: string) => string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}> = ({ user, language, setLanguage, messages, input, setInput, isLoading, isLiveActive, isReadingId, onBack, onSend, onToggleLive, onPlayAudio, t, chatEndRef }) => (
  <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#F0F9FF] shadow-2xl border-x border-blue-100 relative overflow-hidden">
    <header className="flex items-center justify-between p-3 bg-white/90 backdrop-blur-xl border-b border-blue-50 z-20">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center border border-blue-100 overflow-hidden shadow-sm">
           <PeacockFeatherIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="cinzel text-sm font-black text-[#03045E] tracking-tight">{t('app_name')}</h1>
          <p className="text-[8px] uppercase tracking-[0.2em] text-blue-400 font-black">{t('subtitle')}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="text-[9px] bg-blue-50 border border-blue-100 rounded-full px-2 py-1 font-black text-[#03045E] outline-none appearance-none">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
        <button onClick={onBack} className="p-2 text-[#03045E] hover:bg-blue-50 rounded-full transition-all bg-white border border-blue-50 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <main className="flex-1 overflow-y-auto p-4 space-y-5 bg-blue-50/10 custom-scrollbar">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
          <div className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm border ${
            msg.role === 'user' 
              ? 'bg-[#0077B6] border-blue-400 text-white rounded-br-none' 
              : 'bg-white border-blue-50 text-[#03045E] rounded-bl-none'
          }`}>
            {msg.role === 'krishna' && (
              <div className="flex items-center space-x-2 mb-2">
                <PeacockFeatherIcon className="w-3.5 h-3.5 text-[#0077B6]" />
                <span className="text-[8px] uppercase tracking-[0.2em] font-black text-[#0077B6]">{t('shri_krishna')}</span>
              </div>
            )}
            <div className="whitespace-pre-wrap leading-relaxed text-[11px] md:text-xs font-medium">
              {msg.text.split('\n').map((line, i) => {
                if (line.startsWith('Bhagavad Gita')) return <div key={i} className="cinzel font-black text-[#023E8A] mb-2 text-[10px] border-b border-blue-50 pb-1">{line}</div>;
                if (line.match(/[\u0900-\u097F]/)) return <div key={i} className="noto-devanagari text-base text-[#03045E] my-3 italic leading-[1.6] text-center bg-[#F0F9FF]/50 rounded-xl p-3 border border-blue-100/50">{line}</div>;
                return <p key={i} className="mb-1.5 opacity-90">{line}</p>;
              })}
            </div>
            
            {msg.role === 'krishna' && (
              <button onClick={() => onPlayAudio(msg.id, msg.text)} className={`mt-3 flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all shadow-xs ${isReadingId === msg.id ? 'bg-[#03045E] text-white animate-pulse' : 'bg-blue-50 hover:bg-blue-100 text-[#0077B6] hover:text-[#03045E]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                <span className="text-[8px] font-black uppercase tracking-widest">{isReadingId === msg.id ? t('speaking') : t('listen')}</span>
              </button>
            )}

            <div className={`text-[8px] mt-1.5 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-blue-300'} opacity-60`}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-full px-5 py-2.5 flex items-center space-x-3 shadow-md border border-blue-50 animate-pulse">
            <div className="flex space-x-1.5"><div className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div><div className="w-1.5 h-1.5 bg-[#0077B6] rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div></div>
            <span className="text-[9px] font-black text-[#0077B6] uppercase tracking-[0.2em]">{t('contemplating')}</span>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </main>

    <footer className="p-3 bg-white/90 backdrop-blur-md border-t border-blue-50 sticky bottom-0">
      <div className="flex items-center space-x-2">
        <button onClick={onToggleLive} className={`p-3 rounded-xl transition-all shadow-md active:scale-95 ${isLiveActive ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-100' : 'bg-[#E1F5FE] text-[#03045E] hover:bg-blue-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
        </button>
        <div className="flex-1 relative">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSend()} placeholder={t('seek_guidance')} className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-blue-300 focus:bg-white transition-all text-[#03045E] text-xs font-bold placeholder-blue-300"/>
          <button onClick={onSend} disabled={!input.trim() || isLoading} className="absolute right-2 top-2 p-1.5 rounded-lg text-[#0077B6] hover:bg-blue-50 disabled:opacity-10 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
        </div>
      </div>
    </footer>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<ChatSession[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isReadingId, setIsReadingId] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const t = (key: string) => {
    return UI_TRANSLATIONS[key]?.[language] || UI_TRANSLATIONS[key]?.[Language.ENGLISH] || key;
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('gita_chat_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gita_chat_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (view === 'chat' && messages.length === 0 && user) {
      const initialMsg: Message = {
        id: '1',
        role: 'krishna',
        text: t('initial_greeting').replace('{name}', user.name),
        timestamp: Date.now(),
      };
      setMessages([initialMsg]);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [view, messages, user, language]);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    return audioContextRef.current;
  };

  const playAudio = async (messageId: string, text: string) => {
    if (isReadingId === messageId) return;
    setIsReadingId(messageId);
    try {
      const audioData = await generateTTS(text);
      if (audioData) {
        const ctx = initAudioContext();
        const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsReadingId(null);
        source.start();
      } else {
        setIsReadingId(null);
      }
    } catch (e) {
      console.error(e);
      setIsReadingId(null);
    }
  };

  const startNewChat = () => {
    const newId = Date.now().toString();
    setCurrentChatId(newId);
    setMessages([]);
    setView('chat');
  };

  const openExistingChat = (session: ChatSession) => {
    setCurrentChatId(session.id);
    setMessages(session.messages);
    setView('chat');
  };

  const deleteSession = (id: string) => {
    setHistory(prev => prev.filter(s => s.id !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !user) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateKrishnaResponse(userInput, language, user.name);
      const krishnaMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'krishna',
        text: response,
        timestamp: Date.now(),
      };
      const finalMessages = [...updatedMessages, krishnaMsg];
      setMessages(finalMessages);

      if (currentChatId) {
        setHistory(prev => {
          const existingIndex = prev.findIndex(s => s.id === currentChatId);
          const lastUserMsg = [...finalMessages].reverse().find(m => m.role === 'user');
          const sessionTitle = lastUserMsg 
            ? lastUserMsg.text.substring(0, 60) + (lastUserMsg.text.length > 60 ? '...' : '') 
            : 'Divine Dialogue';

          const updatedSession: ChatSession = {
            id: currentChatId,
            messages: finalMessages,
            startTime: existingIndex >= 0 ? prev[existingIndex].startTime : Date.now(),
            lastMessage: sessionTitle
          };
          if (existingIndex >= 0) {
            const newHistory = [...prev];
            newHistory[existingIndex] = updatedSession;
            return newHistory;
          }
          return [updatedSession, ...prev];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLive = async () => {
    if (isLiveActive) {
      setIsLiveActive(false);
      return;
    }
    if (!user) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = initAudioContext();
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      // Fixed: Strictly follow the sessionPromise pattern to prevent race conditions during input streaming
      const sessionPromise = startLiveConversation(language, user.name, {
        onMessage: async (audioData) => {
          const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
          source.start(nextStartTimeRef.current);
          nextStartTimeRef.current += buffer.duration;
          sourcesRef.current.add(source);
        },
        onInterrupted: () => {
          sourcesRef.current.forEach(s => s.stop());
          sourcesRef.current.clear();
          nextStartTimeRef.current = 0;
        },
        onError: (e) => {
          console.error(e);
          setIsLiveActive(false);
        }
      });

      setIsLiveActive(true);
      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        // Fixed: Solely rely on sessionPromise resolution
        sessionPromise.then((session) => {
          session.sendRealtimeInput({ media: pcmBlob });
        });
      };
      source.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);
    } catch (err) {
      alert("Microphone access is needed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] font-['Lora']">
      {view === 'auth' && <AuthView 
        onAuth={(u) => { setUser(u); setView('home'); }} 
        onHome={() => setView('home')} 
        t={t} 
      />}
      {view === 'home' && <HomeView 
        language={language} 
        setLanguage={setLanguage} 
        onLogout={() => { setUser(null); setView('auth'); }} 
        onStartChat={startNewChat} 
        onOpenChat={openExistingChat} 
        onDeleteChat={deleteSession}
        history={history} 
        t={t} 
      />}
      {view === 'chat' && user && <ChatView 
        user={user} 
        language={language} 
        setLanguage={setLanguage}
        messages={messages} 
        input={input} 
        setInput={setInput} 
        isLoading={isLoading} 
        isLiveActive={isLiveActive} 
        isReadingId={isReadingId} 
        onBack={() => setView('home')} 
        onSend={handleSend} 
        onToggleLive={toggleLive} 
        onPlayAudio={playAudio} 
        t={t} 
        chatEndRef={chatEndRef} 
      />}
    </div>
  );
};

export default App;
