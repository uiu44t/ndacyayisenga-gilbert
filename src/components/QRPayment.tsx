import React, { useState, useEffect } from 'react';
import { 
  QrCode, Smartphone, RefreshCw, CheckCircle2, ShieldCheck, 
  Hourglass, Copy, Check, Radio, Landmark, AlertCircle 
} from 'lucide-react';

interface QRPaymentProps {
  amount: number;
  onPaymentConfirmed: () => void;
}

export default function QRPayment({ amount, onPaymentConfirmed }: QRPaymentProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'received' | 'verified'>('pending');
  const [isSimulatingScan, setIsSimulatingScan] = useState(false);

  // Formatting timer helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Countdown clock effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Simulate payment status changes automatically after a scan simulation
  const simulatePaymentVerification = () => {
    setIsSimulatingScan(true);
    setPaymentStatus('pending');
    
    // Step 1: Simulating code scanning detected
    setTimeout(() => {
      setPaymentStatus('received');
      
      // Step 2: Simulating bank / ledger verification
      setTimeout(() => {
        setPaymentStatus('verified');
        setIsSimulatingScan(false);
        
        // Step 3: Trigger actual checkout success callback
        setTimeout(() => {
          onPaymentConfirmed();
        }, 1500);

      }, 2000);
    }, 1500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleResetTimer = () => {
    setTimeLeft(300);
    setPaymentStatus('pending');
  };

  return (
    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4 text-left">
      {/* Header and secure branding */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <QrCode className="w-4.5 h-4.5 text-amber-500" />
          </div>
          <div>
            <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-amber-500">Contact-Free Payment</span>
            <h4 className="text-xs font-semibold text-white">Dynamic Escrow QR Gateway</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[8px] font-mono text-slate-500 uppercase">Code Expires</span>
          <span className={`text-xs font-mono font-bold flex items-center gap-1 ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
            <Hourglass className="w-3 h-3" />
            {timeLeft > 0 ? formatTime(timeLeft) : 'EXPIRED'}
          </span>
        </div>
      </div>

      {/* Main Interactive visual QR Canvas */}
      <div className="flex flex-col items-center justify-center py-4 bg-slate-900/60 rounded-xl border border-slate-900/80 relative overflow-hidden group">
        {/* Dynamic decorative radar line */}
        {paymentStatus === 'pending' && !isSimulatingScan && (
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-[bounce_3s_infinite] opacity-60" />
        )}

        {/* Dynamic payment status screen overlays */}
        {isSimulatingScan && paymentStatus === 'pending' && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-2 z-10 p-4 text-center">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">Awaiting Scanner Response</span>
            <p className="text-[9px] text-slate-400 font-mono">Mobile App Connection handshake initiated...</p>
          </div>
        )}

        {paymentStatus === 'received' && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center space-y-2 z-10 p-4 text-center">
            <Radio className="w-8 h-8 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">Funds Received</span>
            <p className="text-[9px] text-slate-300 font-mono">Verifying network node blockchain / bank receipt...</p>
          </div>
        )}

        {paymentStatus === 'verified' && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center space-y-2 z-10 p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Transaction Authorized</span>
            <p className="text-[9px] text-slate-400 font-mono">Proceeding with secure logistics dispatch...</p>
          </div>
        )}

        {/* Premium SVG QR Vector */}
        <div className="relative p-3 bg-white rounded-xl shadow-lg transition-transform group-hover:scale-[1.02]">
          <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top-Left Finder */}
            <rect x="2" y="2" width="22" height="22" rx="4" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
            <rect x="7" y="7" width="12" height="12" rx="2" fill="#ffffff" />
            <rect x="10" y="10" width="6" height="6" fill="#f59e0b" />

            {/* Top-Right Finder */}
            <rect x="76" y="2" width="22" height="22" rx="4" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
            <rect x="81" y="7" width="12" height="12" rx="2" fill="#ffffff" />
            <rect x="84" y="10" width="6" height="6" fill="#f59e0b" />

            {/* Bottom-Left Finder */}
            <rect x="2" y="76" width="22" height="22" rx="4" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
            <rect x="7" y="81" width="12" height="12" rx="2" fill="#ffffff" />
            <rect x="10" y="84" width="6" height="6" fill="#f59e0b" />

            {/* Random Matrix Dots */}
            {/* Row 1 */}
            <rect x="30" y="4" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="42" y="2" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="54" y="5" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="66" y="3" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 2 */}
            <rect x="32" y="14" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="44" y="12" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="56" y="15" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="68" y="11" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 3 */}
            <rect x="2" y="32" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="14" y="30" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="26" y="34" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="38" y="31" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="50" y="33" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="62" y="29" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="74" y="32" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="86" y="30" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 4 */}
            <rect x="4" y="44" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="16" y="42" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="28" y="45" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="40" y="41" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="52" y="43" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="64" y="46" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="76" y="42" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="88" y="44" width="6" height="6" fill="#f59e0b" rx="1" />
            {/* Row 5 */}
            <rect x="6" y="56" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="18" y="54" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="30" y="58" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="42" y="52" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="54" y="55" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="66" y="51" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="78" y="57" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="90" y="53" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 6 */}
            <rect x="30" y="68" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="42" y="66" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="54" y="69" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="66" y="65" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 7 */}
            <rect x="32" y="80" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="44" y="78" width="6" height="6" fill="#f59e0b" rx="1" />
            <rect x="56" y="81" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="68" y="77" width="6" height="6" fill="#0f172a" rx="1" />
            {/* Row 8 */}
            <rect x="34" y="90" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="46" y="88" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="58" y="91" width="6" height="6" fill="#0f172a" rx="1" />
            <rect x="70" y="89" width="6" height="6" fill="#f59e0b" rx="1" />
          </svg>
          
          {/* Small centered secure logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-[8px] font-bold text-amber-500 font-mono px-1 py-0.5 rounded shadow">
            RII
          </div>
        </div>

        {/* Interactive simulation action button */}
        {paymentStatus === 'pending' && !isSimulatingScan && (
          <button
            onClick={simulatePaymentVerification}
            className="mt-3.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-mono text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/10 flex items-center gap-1"
          >
            <Smartphone className="w-3 h-3" />
            Simulate App Scan & Pay
          </button>
        )}
      </div>

      {/* Payment coordinates details */}
      <div className="space-y-2.5">
        <div className="p-3 bg-slate-900/50 border border-slate-900 rounded-xl space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono">Invoice Amount:</span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-white font-bold">${amount.toLocaleString()}</span>
              <button 
                onClick={handleCopyAmount}
                className="text-slate-500 hover:text-white p-0.5 transition-colors cursor-pointer"
                title="Copy precise amount"
              >
                {copiedAmount ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 font-mono">Supported Services:</span>
            <span className="text-amber-500 font-mono font-semibold">MTN MoMo, BK, Airtel, Apple Pay</span>
          </div>
        </div>

        <div className="flex gap-2 text-[10px] text-slate-500 leading-normal font-light">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
          <p>
            This secure escrow QR code is unique to this invoice checkout session. Scan with your mobile device or banking wallet to execute contact-free payment settlement instantly.
          </p>
        </div>

        {timeLeft <= 0 && (
          <button
            onClick={handleResetTimer}
            className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-amber-500 font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate QR Token
          </button>
        )}
      </div>
    </div>
  );
}
