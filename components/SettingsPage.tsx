
import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Monitor, Save, Loader2, CheckCircle2, Camera } from 'lucide-react';

const SettingsPage: React.FC<{ user: any }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'system' | 'security'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-sm text-gray-500">Manage your workspace preferences and security.</p>
        </div>
        <div className="flex items-center gap-3">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-right-2">
              <CheckCircle2 size={16} /> Changes Saved
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-50 bg-gray-50/30 p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-white text-emerald-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-white/50'}`}
            >
              <User size={18} /> Profile Info
            </button>
            <button 
              onClick={() => setActiveTab('system')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'system' ? 'bg-white text-emerald-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-white/50'}`}
            >
              <Monitor size={18} /> System Preferences
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-white text-emerald-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-white/50'}`}
            >
              <Shield size={18} /> Security & Privacy
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <img 
                    src={user?.avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-3xl object-cover ring-4 ring-gray-50 shadow-md group-hover:opacity-80 transition-opacity" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/80 backdrop-blur p-2 rounded-full text-slate-900 shadow-xl">
                      <Camera size={20} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-500 mt-1">Update your photo and personal details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Professional Role</label>
                  <input 
                    type="text" 
                    defaultValue={user?.role}
                    readOnly
                    className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Department</label>
                  <input 
                    type="text" 
                    defaultValue="Administration"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Platform Preferences</h3>
                <p className="text-sm text-gray-500 mt-1">Customize your ERP experience.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">System Language</p>
                      <p className="text-xs text-gray-500">The language used across the dashboard.</p>
                    </div>
                  </div>
                  <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>German</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Desktop Notifications</p>
                      <p className="text-xs text-gray-500">Receive alerts when orders are updated.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Privacy & Security</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your account security features.</p>
              </div>

              <div className="space-y-6">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                   <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0">
                     <Shield size={20} />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-emerald-900">Two-Factor Authentication</p>
                     <p className="text-xs text-emerald-700/70 mt-1 mb-4 leading-relaxed">
                       Highly recommended for accounts with administrative access. This adds an extra layer of security to your Stark ERP account.
                     </p>
                     <button className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-700 transition-all shadow-md">
                       Enable 2FA
                     </button>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                       <Shield size={20} />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900">Session Visibility</p>
                       <p className="text-xs text-gray-500">Share your online status with colleagues.</p>
                     </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" defaultChecked className="sr-only peer" />
                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                   </label>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
