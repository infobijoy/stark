
import React, { useState, useEffect } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { db, AUTH_KEY, REMEMBER_KEY } from '../services/db';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onForgotPassword: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = db.get(REMEMBER_KEY);
    if (saved) {
      setEmail(saved.email);
      setPassword(saved.password);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulating API call
    setTimeout(() => {
      if (email === 'admin@stark.com' && password === 'admin123') {
        const user = { name: 'Masum Billah', email, role: 'Super Admin', avatar: 'https://picsum.photos/seed/user123/100/100' };
        
        db.set(AUTH_KEY, user);
        
        if (rememberMe) {
          db.set(REMEMBER_KEY, { email, password });
        } else {
          db.remove(REMEMBER_KEY);
        }

        onLoginSuccess(user);
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
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
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-emerald-500/20 mb-6">
                S
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">STARK BAG INDUSTRIES</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">Access your ERP Workspace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold flex items-center gap-3 animate-in shake duration-300">
                  <ShieldCheck size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-emerald-500 checked:border-emerald-500 transition-all shadow-sm" 
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white p-0.5 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors select-none">Remember for 30 days</span>
                </label>
                <button 
                  type="button" 
                  onClick={onForgotPassword}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 tracking-tight transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-emerald-500 text-white rounded-2xl py-4 font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 opacity-50">
               <ShieldCheck size={14} className="text-emerald-600" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TLS 1.3 SECURE</span>
             </div>
             <div className="w-px h-3 bg-slate-300" />
             <div className="flex items-center gap-2 opacity-50">
               <Lock size={14} className="text-blue-600" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AES-256 BANK GRADE</span>
             </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em]">
          © 2024 STARK BAG INDUSTRIES LTD. • ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
