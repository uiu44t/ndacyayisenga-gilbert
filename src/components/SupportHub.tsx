import React, { useState } from 'react';
import { MessageSquare, HelpCircle, Phone, Mail, Send, CheckCircle2, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface Faq {
  question: string;
  answer: string;
  category: 'shipping' | 'repairs' | 'payments';
}

export default function SupportHub() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'shipping' | 'repairs' | 'payments'>('shipping');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Live Chat state
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    { sender: 'ai', text: 'Muraho! Welcome to Bruce Rii client liaison helpdesk. How can we optimize your engineering assets today?', time: 'Just now' }
  ]);
  const [userMsg, setUserMsg] = useState('');

  const faqs: Faq[] = [
    {
      category: 'shipping',
      question: 'Do you offer vehicle and electronics shipping to Kigali and outer provinces?',
      answer: 'Yes! We coordinate secure flatbed delivery for vehicles (cars, motorcycles, pickup trucks) and armored courier box shipping for enterprise laptops, monitors, and screens to all provinces across Rwanda. Standard local transport drops are fully tracked in real-time.'
    },
    {
      category: 'shipping',
      question: 'How is pickup scheduling handled for vehicle diagnostic servicing?',
      answer: 'Once you book a repair service or diagnostic appointment, you can select "Home Pickup". Our flatbed transporter will arrive at your logged coordinate, issue a digital custody certificate, and deliver the vehicle safely to our high-tech lab.'
    },
    {
      category: 'repairs',
      question: 'What is the average turnaround time for screen replacements?',
      answer: 'Standard screen/OLED fittings and computer diagnostic setups are completed within 24 to 48 hours inside our static-free laboratory. Extreme board-level repairs involving micro-soldering might require up to 4 days.'
    },
    {
      category: 'repairs',
      question: 'Are there warranties on repaired electronics or replacement spares?',
      answer: 'Absolutely. Every screen replacement, logic board soldering, or physical spare part fitted comes with an official 180-day micro-diagnostics warranty covering both labor and components.'
    },
    {
      category: 'payments',
      question: 'What payment options are accepted at Bruce Rii checkout?',
      answer: 'We accept MTN Mobile Money (MoMo), Airtel Money, Bank Transfers (I&M, BK), and Visa/Mastercard credit accounts. Cash-on-delivery is also authorized for certified small items under $150.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => faq.category === activeFaqCategory);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { sender: 'user' as const, text: userMsg, time: timeStr };
    setChatMessages(prev => [...prev, userMessage]);
    setUserMsg('');

    // Trigger dynamic automated reply
    setTimeout(() => {
      let reply = "Your log has been queued on telemetry port 3000. Our diagnostics agent will message you back shortly.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('repair') || lower.includes('broken') || lower.includes('screen')) {
        reply = "Understood. For screen replacements and device micro-soldering, you can use our interactive Repairs Booking tab to log a lab ticket.";
      } else if (lower.includes('momo') || lower.includes('payment') || lower.includes('buy')) {
        reply = "We support MTN MoMo, bank wire, and credit processing. Our systems are verified under SSL protocol.";
      } else if (lower.includes('delivery') || lower.includes('shipping')) {
        reply = "Standard courier transit takes 1-2 days storewide. Vehicles are carried via flatbed tow trucks.";
      }

      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <section id="support-hub" className="py-12 space-y-12 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-secondary" />
            <span>Customer Concierge & Support Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            How Can We Assist Your Operations?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            Access secure telemetry chat, review logistics FAQs, or dispatch an encrypted helpdesk ticket.
          </p>
        </div>

        {/* Support channels quick buttons */}
        <div className="flex gap-2 shrink-0 self-start md:self-auto">
          <a
            href="https://wa.me/250795591037?text=Hello%20Bruce%20Rii%20Support,%20I%20need%20assistance%20with%25"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Liaison</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FAQS AND CONTACT FORM */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* FAQ Category Selection & Accordion */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-850 pb-4">
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                Frequently Answered Queries
              </h3>

              <div className="flex gap-1 text-[10px] font-mono">
                {(['shipping', 'repairs', 'payments'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFaqCategory(cat);
                      setActiveFaq(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg uppercase cursor-pointer transition-all ${
                      activeFaqCategory === cat
                        ? 'bg-primary text-white font-bold'
                        : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors bg-white dark:bg-slate-950/40"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold text-slate-900 dark:text-slate-200 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-2.5 bg-slate-50/50 dark:bg-slate-950/25">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <div>
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Dispatch Helpdesk inquiry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                Need details regarding wholesale options or custom vehicle restomods? Transmit a secure encrypted inquiry below.
              </p>
            </div>

            <form onSubmit={handleSendQuery} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Gilbert Ndacyayisenga"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Email Coordinates</label>
                  <input
                    type="email"
                    required
                    placeholder="ndacyayisengagilbert820@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Subject / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Bulk laptop inquiry, custom cruiser tuning"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Detailed Message</label>
                <textarea
                  required
                  placeholder="Please specify exactly what components or custom options you are seeking..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-850 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-xl cursor-pointer uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Ticket</span>
              </button>

              {isSent && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>INQUIRY DELIVERED! CONCIERGE WILL CONTACT YOU SHORTLY.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: AI SECURE TELEMETRY CHAT */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 flex flex-col h-[550px] justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm flex items-center gap-2 uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-primary animate-pulse" />
                  Live AI Helpdesk
                </h3>
                <span className="text-[9px] text-slate-500 font-mono uppercase">SECURE PORT 3000 CONV</span>
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
            </div>

            {/* Chat message box */}
            <div className="space-y-3 overflow-y-auto h-[350px] pr-1 scrollbar-thin text-xs text-left">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] space-y-1 ${msg.sender === 'user' ? 'ml-auto items-end' : ''}`}
                >
                  <div
                    className={`p-3 rounded-2xl leading-relaxed font-light ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendChatMsg} className="flex gap-2 border-t border-slate-200 dark:border-slate-850 pt-4 mt-auto">
            <input
              type="text"
              required
              placeholder="Ask about repairs, stock, MoMo transfers..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer text-xs uppercase font-mono transition-all flex items-center justify-center"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
