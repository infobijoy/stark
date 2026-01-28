
import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, next: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setStatus('error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
      setPasswords({ current: '', next: '', confirm: '' });
    }, 1500);
  };

  const toggleVisibility = (field: keyof typeof showPass) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Security Credentials</h2>
              <p className="text-sm text-gray-500">Update your account password to maintain security.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {status === 'success' && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 animate-in zoom-in duration-300">
              <CheckCircle2 size={20} />
              <div className="text-sm font-bold">Password updated successfully! Next login will require the new credentials.</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type={showPass.current ? 'text' : 'password'}
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
                  placeholder="Enter your current password"
                />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type={showPass.next ? 'text' : 'password'}
                    required
                    value={passwords.next}
                    onChange={(e) => setPasswords({...passwords, next: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="New password"
                  />
                  <button 
                    type="button"
                    onClick={() => toggleVisibility('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass.next ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type={showPass.confirm ? 'text' : 'password'}
                    required
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-12 text-sm font-medium outline-none transition-all ${
                      passwords.confirm && passwords.next !== passwords.confirm 
                      ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500' 
                      : 'border-gray-200 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white'
                    }`}
                    placeholder="Repeat new password"
                  />
                  <button 
                    type="button"
                    onClick={() => toggleVisibility('confirm')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Password Requirements</h4>
                <ul className="text-[10px] text-gray-500 space-y-1 font-medium">
                  <li className="flex items-center gap-1.5"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Minimum 8 characters</li>
                  <li className="flex items-center gap-1.5"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> One uppercase letter & one number</li>
                  <li className="flex items-center gap-1.5"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> One special character (@, #, $)</li>
                </ul>
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
