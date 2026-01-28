
import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldQuestion, Send } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 sm:p-12">
            {!isSent ? (
              <>
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                    <ShieldQuestion size={32} />
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">RECOVER ACCESS</h1>
                  <p className="text-slate-500 text-sm mt-2 font-medium">Enter your email to receive a secure reset link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@stark.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
                  >
                    {isLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        Send Reset Link
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={onBackToLogin}
                    className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    Return to Login
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">EMAIL SENT</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-10">
                  We've sent a recovery link to <span className="text-slate-900 font-bold">{email}</span>. Please check your inbox and follow the instructions.
                </p>
                <button 
                  onClick={onBackToLogin}
                  className="w-full bg-emerald-500 text-white rounded-2xl py-4 font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-[0.98]"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
