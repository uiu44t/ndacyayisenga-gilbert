import { useState, useEffect } from 'react';
import { Smartphone, Send, Copy, Check, Lock, MessageSquare, Sparkles, HelpCircle, PhoneCall, X } from 'lucide-react';

interface SMSConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function SMSConciergeModal({ isOpen, onClose, userEmail = 'ndacyayisengagilbert820@gmail.com' }: SMSConciergeModalProps) {
  const targetNumber = '+250795591037';
  
  // State for interactive simulation
  const [copiedText, setCopiedText] = useState<'number' | 'login' | 'status' | 'support' | null>(null);
  const [smsInput, setSmsInput] = useState(`LOGIN ${userEmail}`);
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'system'; text: string; time: string }>>([
    {
      sender: 'system',
      text: 'Welcome to the Bruce Rii SMS Liaison Core. Send an SMS to +250795591037 to authenticate, track portfolios, or speak to a personal concierge.',
      time: 'Just now'
    }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => setCopiedText(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'number' | 'login' | 'status' | 'support') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
  };

  const handleSendSimulatedSMS = () => {
    if (!smsInput.trim() || isSimulating) return;

    const userMsg = smsInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setSmsInput('');
    setIsSimulating(true);

    // Simulated network delay
    setTimeout(() => {
      let reply = '';
      const upperMsg = userMsg.toUpperCase();

      if (upperMsg.startsWith('LOGIN')) {
        const email = userMsg.substring(5).trim() || userEmail;
        reply = `🔑 [Bruce Rii Auth] Secure login token authorized for ${email}. Access cleared. Welcome to the Inner Circle.`;
      } else if (upperMsg.startsWith('STATUS')) {
        const orderId = userMsg.substring(6).trim() || 'BR-859421';
        reply = `📦 [Bruce Rii Logistics] Portfolio order ${orderId} is currently prepared. Transport: climate-controlled vehicle flatbed routing to your destination.`;
      } else if (upperMsg.startsWith('SUPPORT')) {
        reply = `🤝 [Bruce Rii Support] Your liaison ticket has been filed. Our executive support office will dial +250 795 591 037 to assist you.`;
      } else {
        reply = `👋 [Bruce Rii Concierge] Command not recognized. Use "LOGIN <email>", "STATUS <id>", or "SUPPORT <your inquiry>". Our manual liaison agent is reviewing your message.`;
      }

      setChatLog(prev => [...prev, { sender: 'system', text: reply, time: now }]);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left">
        
        {/* Left Panel: Directives & Actions */}
        <div className="p-6 md:p-8 flex-1 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-widest uppercase font-mono">
              <Sparkles className="w-3 h-3" />
              <span>OFFICIAL TELEPHONY INTEGRATION</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">SMS Concierge System</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              We leverage direct encrypted telecommunication lines for physical verification and account authorization. Settle, track, and log in securely.
            </p>
          </div>

          {/* Core Target Details */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">LIAISON PHONE NUMBER</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">● ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono font-bold text-white tracking-wider">{targetNumber}</span>
              <button
                onClick={() => handleCopy(targetNumber, 'number')}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-xs font-mono transition-all cursor-pointer"
              >
                {copiedText === 'number' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy No.</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Structured Message Formats */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">Available SMS Templates</h4>
            <div className="space-y-2.5">
              
              {/* Template 1: Login */}
              <div className="p-3 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl border border-slate-850/60 transition-all flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">1. SECURE PORTAL LOGIN</span>
                  <span className="font-mono text-amber-400">LOGIN {userEmail}</span>
                </div>
                <button
                  onClick={() => handleCopy(`LOGIN ${userEmail}`, 'login')}
                  className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
                  title="Copy Template"
                >
                  {copiedText === 'login' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Template 2: Status */}
              <div className="p-3 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl border border-slate-850/60 transition-all flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">2. TRACK DEPLOYED ASSETS</span>
                  <span className="font-mono text-slate-300">STATUS BR-859421</span>
                </div>
                <button
                  onClick={() => handleCopy('STATUS BR-859421', 'status')}
                  className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
                  title="Copy Template"
                >
                  {copiedText === 'status' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Template 3: Support */}
              <div className="p-3 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl border border-slate-850/60 transition-all flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">3. CONTACT PRIVATE LIAISON</span>
                  <span className="font-mono text-slate-300">SUPPORT Requesting test flight schedule</span>
                </div>
                <button
                  onClick={() => handleCopy('SUPPORT Requesting test flight schedule', 'support')}
                  className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
                  title="Copy Template"
                >
                  {copiedText === 'support' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Panel: Simulated Interactive Mobile Screen */}
        <div className="w-full md:w-80 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 p-6 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-400 tracking-wider">SMS SIMULATOR</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat log wrapper */}
          <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto space-y-3.5 pr-1 py-1 text-xs">
            {chatLog.map((chat, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl ${
                    chat.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-850 rounded-tl-none'
                  }`}
                >
                  {chat.text}
                </div>
                <span className="text-[9px] text-slate-600 mt-1 font-mono">{chat.time}</span>
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] pl-2">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
                <span>Dispatching payload to {targetNumber}</span>
              </div>
            )}
          </div>

          {/* Chat input form */}
          <div className="space-y-2">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={smsInput}
                onChange={(e) => setSmsInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendSimulatedSMS()}
                placeholder="Type SMS command..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500 placeholder-slate-700"
              />
              <button
                onClick={handleSendSimulatedSMS}
                disabled={!smsInput.trim() || isSimulating}
                className="p-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-slate-500 font-mono leading-tight text-center">
              Type commands above to simulate on-chain SMS routing to +250795591037.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
