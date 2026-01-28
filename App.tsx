
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import GeminiAssistant from './components/GeminiAssistant';
import LoginPage from './components/LoginPage';
import ChangePassword from './components/ChangePassword';
import NotificationsPage from './components/NotificationsPage';
import ForgotPassword from './components/ForgotPassword';
import SettingsPage from './components/SettingsPage';
import SupplierInfo from './components/SupplierInfo';
import SupplierSetup from './components/SupplierSetup';
import { db, AUTH_KEY } from './services/db';
import { Menu as MenuIcon, Bell, Search, Settings, HelpCircle, LogOut, X, CheckCircle2, AlertCircle, Clock, ShoppingBag, Maximize2, Monitor } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New PO Received', description: 'Purchase order #PO-2024-089 has been submitted.', type: 'info', time: '2 mins ago', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50' },
  { id: 2, title: 'Low Stock Alert', description: 'Raw material Indigo Dye is below safety threshold.', type: 'warning', time: '1 hour ago', icon: AlertCircle, color: 'text-rose-500 bg-rose-50' },
  { id: 3, title: 'Inspection Completed', description: 'Shipment #S-9920 passed quality inspection.', type: 'success', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  { id: 4, title: 'System Update', description: 'Stark ERP v2.6.5 will be deployed at 12:00 AM.', type: 'system', time: '5 hours ago', icon: Settings, color: 'text-gray-500 bg-gray-50' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [openTabs, setOpenTabs] = useState<string[]>(['dashboard']);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [supplierMode, setSupplierMode] = useState<'view' | 'new'>('view');
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = db.get(AUTH_KEY);
    if (session) {
      setCurrentUser(session);
    }
    setIsInitialLoading(false);

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    db.remove(AUTH_KEY);
    setCurrentUser(null);
    setOpenTabs(['dashboard']);
    setActiveTab('dashboard');
    setIsForgotPassword(false);
  };

  const handleOpenModule = (id: string) => {
    if (!openTabs.includes(id)) {
      setOpenTabs([...openTabs, id]);
    }
    setActiveTab(id);
  };

  const closeTab = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (id === 'dashboard') return;
    
    const newTabs = openTabs.filter(t => t !== id);
    setOpenTabs(newTabs);
    
    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
    if (id === 'supplier-setup') {
      setSelectedSupplier(null);
    }
  };

  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSupplierMode('view');
    handleOpenModule('supplier-setup');
  };

  const handleNewSupplier = () => {
    setSelectedSupplier(null);
    setSupplierMode('new');
    handleOpenModule('supplier-setup');
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em]">Loading System</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (isForgotPassword) {
      return <ForgotPassword onBackToLogin={() => setIsForgotPassword(false)} />;
    }
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} onForgotPassword={() => setIsForgotPassword(true)} />;
  }

  const renderContent = (moduleId: string) => {
    switch (moduleId) {
      case 'home':
      case 'dashboard':
        return <Dashboard />;
      case 'change-password':
        return <ChangePassword />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage user={currentUser} />;
      case 'supplier-info':
        return <SupplierInfo onViewSupplier={handleViewSupplier} onNewSupplier={handleNewSupplier} />;
      case 'supplier-setup':
        return <SupplierSetup supplierData={selectedSupplier} mode={supplierMode} onClose={() => closeTab('supplier-setup')} />;
      case 'customer-info':
        return (
          <DataTable 
            title="Customer Information" 
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Customer Name' },
              { key: 'country', label: 'Country' },
              { key: 'status', label: 'Status' }
            ]}
            data={[
              { id: 'C-901', name: 'Global Apparel Group', country: 'United Kingdom', status: 'Active' },
              { id: 'C-902', name: 'Fashion Hub', country: 'Germany', status: 'Active' },
            ]}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <Settings size={48} className="animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Module Workspace</h2>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              The <strong>{moduleId.replace(/-/g, ' ')}</strong> module is under construction. Stark Dev Team is working on high-performance logic.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
      <Sidebar 
        activeModule={activeTab} 
        setActiveModule={handleOpenModule} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Management Bar */}
        <div className="h-10 bg-slate-900 flex items-center justify-between px-4 shrink-0 text-white z-40">
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <Monitor size={14} className="text-emerald-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Stark Bag Industries Ltd.</span>
             </div>
             <div className="hidden sm:block text-[10px] text-slate-400 font-bold italic">
               Kuttapara, Sarail, Brahmanbaria-3430, Bangladesh.
             </div>
           </div>
           <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
             <button className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
               <Maximize2 size={12} /> Full Screen
             </button>
             <div className="flex items-center gap-2 text-emerald-400">
               <Clock size={12} />
               <span>Today: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'long' })}</span>
             </div>
             <div className="w-px h-3 bg-slate-700" />
             <div className="flex items-center gap-1">
               <span className="text-slate-500">User ID:</span>
               <span className="text-white">{currentUser?.name?.split(' ')[0]}</span>
             </div>
             <button onClick={handleLogout} className="bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded-md text-white transition-all shadow-sm">LOGOUT</button>
           </div>
        </div>

        {/* Tab Header Strip */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-2 gap-1 overflow-x-auto no-scrollbar shrink-0 z-30 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors mr-2"
          >
            <MenuIcon size={20} />
          </button>
          
          {openTabs.map((tabId) => (
            <div 
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`
                group relative h-9 min-w-[120px] max-w-[200px] flex items-center px-4 rounded-t-xl cursor-pointer transition-all border-x border-t
                ${activeTab === tabId 
                  ? 'bg-white border-gray-200 text-emerald-600 font-bold z-10 -mb-[1px] shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)]' 
                  : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100 mt-1'}
              `}
            >
              <span className="text-[11px] truncate uppercase tracking-wider">{tabId.replace(/-/g, ' ')}</span>
              {tabId !== 'dashboard' && (
                <button 
                  onClick={(e) => closeTab(tabId, e)}
                  className={`ml-3 p-0.5 rounded-full transition-all ${activeTab === tabId ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-300 hover:text-rose-500 hover:bg-rose-50'}`}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Action Header (Breadcrumb Style) */}
        <header className="h-14 bg-white/60 backdrop-blur-md border-b border-gray-200/40 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
             <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <span className="hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => handleOpenModule('dashboard')}>STARK BAG</span>
               <span className="text-gray-200">/</span>
               <span className="text-slate-900 font-black tracking-tight">{activeTab.replace(/-/g, ' ')}</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-gray-100/30 rounded-xl px-3 py-2 border border-gray-200/50 focus-within:border-emerald-500 focus-within:bg-white transition-all w-64 group">
              <Search size={14} className="text-gray-400 group-focus-within:text-emerald-500" />
              <input type="text" placeholder="Global Search..." className="bg-transparent border-none outline-none text-[11px] ml-2 w-full font-medium" />
            </div>

            <div className="relative" ref={notificationRef}>
              <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-[70]">
                   <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                     <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                     <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider">Mark all</button>
                   </div>
                   <div className="max-h-[300px] overflow-y-auto">
                     {MOCK_NOTIFICATIONS.map(n => (
                       <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                         <div className="flex gap-3">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}><n.icon size={16} /></div>
                           <div className="flex-1">
                             <p className="text-xs font-bold text-gray-900 leading-none mb-1">{n.title}</p>
                             <p className="text-[10px] text-gray-500 line-clamp-1">{n.description}</p>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

            <button onClick={() => handleOpenModule('settings')} className={`p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-gray-100'}`}>
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#fbfcfd] scroll-smooth">
          <div className="max-w-[1600px] mx-auto pb-10">
            {renderContent(activeTab)}
          </div>
        </div>

        {/* Status Bar */}
        <footer className="h-8 bg-white border-t border-gray-100 flex items-center justify-between px-6 text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500" /> SYSTEM ACTIVE</div>
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> DB: LOCALSTORAGE (Persistent)</div>
          </div>
          <div className="flex items-center gap-6">
            <span>Server Latency: 12ms</span>
            <span>v2.8.0-STARK-PRO</span>
          </div>
        </footer>
      </main>

      <GeminiAssistant />
    </div>
  );
};

export default App;
