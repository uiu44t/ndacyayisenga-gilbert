import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, PhoneCall, Mail, ExternalLink, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface LiveChatProps {
  products: Product[];
  userEmail?: string;
  lang: 'en' | 'rw' | 'fr';
}

const CHAT_INTROS = {
  en: "Greetings from the Bruce Rii AI Concierge office! How can I assist you with your premium acquisitions today?",
  rw: "Muraho neza! Ndi umufasha wa Bruce Rii mu gutoranya ibikoresho byiza. Wagize ikihe kibazo cyangwa gushidikanya?",
  fr: "Bonjour ! Je suis l'assistant IA de Bruce Rii. Comment puis-je vous guider dans vos acquisitions aujourd'hui ?"
};

export default function LiveChat({ products, userEmail = 'ndacyayisengagilbert820@gmail.com', lang }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string; products?: Product[] }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        sender: 'bot',
        text: CHAT_INTROS[lang],
        time: now
      }
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setInput('');
    setIsTyping(true);

    // AI Keyword Matching and Dynamic Response Logic
    setTimeout(() => {
      let replyText = '';
      let matchedProducts: Product[] = [];
      const query = userText.toLowerCase();

      if (query.includes('hello') || query.includes('hi') || query.includes('muraho') || query.includes('bonjour')) {
        replyText = "Hello! I can recommend smartphones, laptops, smartwatches, or headphones. Ask me about brands like Apple, Samsung, Dell, HP, Lenovo, or Sony!";
      } else if (query.includes('phone') || query.includes('samsung') || query.includes('apple') || query.includes('iphone') || query.includes('galaxy')) {
        matchedProducts = products.filter(p => p.category === 'smartphone' || p.brand.toLowerCase().includes('apple') || p.brand.toLowerCase().includes('samsung')).slice(0, 3);
        replyText = "Here are some of our top smartphones and premium hardware currently in stock:";
      } else if (query.includes('laptop') || query.includes('dell') || query.includes('hp') || query.includes('lenovo') || query.includes('macbook')) {
        matchedProducts = products.filter(p => p.category === 'laptop').slice(0, 3);
        replyText = "I found these top-tier development and engineering laptops with military-grade durability and high-performance screens:";
      } else if (query.includes('watch') || query.includes('smartwatch') || query.includes('fitness')) {
        matchedProducts = products.filter(p => p.category === 'smartwatch').slice(0, 3);
        replyText = "Check out these high-durability smartwatches from Apple and Samsung equipped with advanced heart, ECG, and sleep tracking:";
      } else if (query.includes('headphone') || query.includes('earbud') || query.includes('sony') || query.includes('sound') || query.includes('speaker')) {
        matchedProducts = products.filter(p => p.category === 'headphone' || p.category === 'speaker').slice(0, 3);
        replyText = "For pristine high-resolution acoustics, here are our best noise-cancelling headphones and spatial audio speakers:";
      } else if (query.includes('momo') || query.includes('pay') || query.includes('checkout') || query.includes('mobile money')) {
        replyText = "We accept secure Mobile Money (MTN MoMo / Airtel Money), Credit/Debit Cards (Visa/Mastercard), and Cash on Delivery with full security tracking.";
      } else if (query.includes('contact') || query.includes('support') || query.includes('whatsapp') || query.includes('help')) {
        replyText = "You can instantly dial or message our official WhatsApp support line at +250795591037 or reach out via email at ndacyayisengagilbert820@gmail.com. We are online 24/7!";
      } else {
        // Fallback search
        matchedProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)).slice(0, 2);
        if (matchedProducts.length > 0) {
          replyText = `Based on your request, I found some outstanding matches in our catalog:`;
        } else {
          replyText = "I understand you are searching for high-performance hardware. Use keywords like 'phone', 'laptop', 'watch', or 'contact' so I can narrow down our verified stock list.";
        }
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        time: now,
        products: matchedProducts.length > 0 ? matchedProducts : undefined
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans text-left">
      {/* Floating Chat Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer relative group border-2 border-slate-900"
          aria-label="Open AI support chat"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
          </span>
          {/* Label tooltip */}
          <div className="absolute right-16 bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono">
            💬 AI Concierge Live
          </div>
        </button>
      )}

      {/* Slide-out Chat Drawer */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] bg-slate-900 border border-slate-850 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs tracking-wide">Bruce Rii AI Assistant</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] text-slate-500 font-mono uppercase">Online • Active</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Quick Contact Bar */}
          <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-850/80 flex justify-between text-[10px] font-mono text-slate-400">
            <a
              href="https://wa.me/250795591037"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp +250795591037</span>
            </a>
            <a
              href={`mailto:${userEmail}`}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email Support</span>
            </a>
          </div>

          {/* Messages Logs Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 text-slate-200 border border-slate-850 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                
                {/* Embedded Recommendations */}
                {msg.products && (
                  <div className="mt-2.5 space-y-2 w-full text-left">
                    {msg.products.map(p => (
                      <div key={p.id} className="p-2 bg-slate-950 border border-slate-850 rounded-xl flex items-center gap-2.5 hover:border-amber-500/40 transition-colors">
                        <img src={p.image} className="w-10 h-10 object-cover rounded-lg border border-slate-800" alt={p.name} />
                        <div className="text-[10px] flex-1 overflow-hidden">
                          <span className="block font-bold text-white truncate">{p.name}</span>
                          <span className="block font-mono text-amber-400 font-bold">${p.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <span className="text-[8.5px] text-slate-600 font-mono mt-1">{msg.time}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[9px] pl-1">
                <span className="animate-bounce font-bold">.</span>
                <span className="animate-bounce delay-100 font-bold">.</span>
                <span className="animate-bounce delay-200 font-bold">.</span>
                <span>AI agent is consulting inventories</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions block */}
          <div className="px-3 py-1.5 bg-slate-950/30 overflow-x-auto flex gap-1.5 text-[9px] font-mono no-scrollbar select-none shrink-0 border-t border-slate-850/50">
            <button onClick={() => setInput("Show best smartphones")} className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors cursor-pointer shrink-0">
              📱 Smartphones
            </button>
            <button onClick={() => setInput("Show elite laptops")} className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors cursor-pointer shrink-0">
              💻 Laptops
            </button>
            <button onClick={() => setInput("How do I pay with MoMo?")} className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors cursor-pointer shrink-0">
              💵 MoMo Payment
            </button>
            <button onClick={() => setInput("Contact live human agent")} className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors cursor-pointer shrink-0">
              ☎ WhatsApp Line
            </button>
          </div>

          {/* Input Panel */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-850 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Rii Assistant..."
              className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="p-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
