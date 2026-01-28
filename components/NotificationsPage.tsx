
import React, { useState } from 'react';
import { Bell, Search, Filter, CheckCircle2, AlertCircle, Clock, ShoppingBag, Settings, Trash2, CheckSquare } from 'lucide-react';

const EXTENDED_NOTIFICATIONS = [
  { id: 1, title: 'New PO Received', description: 'Purchase order #PO-2024-089 has been submitted by Global Apparel. Requires immediate review for inventory allocation.', type: 'info', time: '2 mins ago', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50', read: false },
  { id: 2, title: 'Low Stock Alert', description: 'Raw material Indigo Dye is below safety threshold (Current: 45kg, Min: 100kg). Supplier re-order suggested.', type: 'warning', time: '1 hour ago', icon: AlertCircle, color: 'text-rose-500 bg-rose-50', read: false },
  { id: 3, title: 'Inspection Completed', description: 'Shipment #S-9920 passed quality inspection with 98% pass rate. Ready for warehouse intake.', type: 'success', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50', read: true },
  { id: 4, title: 'System Update', description: 'Stark ERP v2.6.5 has been deployed. New features include improved search and persistent database logic.', type: 'system', time: '5 hours ago', icon: Settings, color: 'text-gray-500 bg-gray-50', read: true },
  { id: 5, title: 'New Supplier', description: 'H&K Trimmings has been registered as a verified vendor in the textiles category.', type: 'info', time: '1 day ago', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50', read: true },
  { id: 6, title: 'Delayed Shipment', description: 'Container #CONT-7718 is delayed by 48 hours due to port congestion in Singapore.', type: 'error', time: '2 days ago', icon: AlertCircle, color: 'text-rose-500 bg-rose-50', read: true },
];

const NotificationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'system'>('all');
  const [search, setSearch] = useState('');

  const filtered = EXTENDED_NOTIFICATIONS.filter(n => {
    if (activeFilter === 'unread' && n.read) return false;
    if (activeFilter === 'system' && n.type !== 'system') return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Alerts</h2>
          <p className="text-sm text-gray-500">Manage your notifications and system updates.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <CheckSquare size={14} /> Mark all read
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors">
            <Trash2 size={14} /> Clear all
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-200 w-fit">
            {(['all', 'unread', 'system'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-medium focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length > 0 ? (
            filtered.map((notif) => (
              <div key={notif.id} className={`p-6 flex gap-6 hover:bg-gray-50/50 transition-all group relative cursor-pointer ${!notif.read ? 'bg-emerald-50/10' : ''}`}>
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${notif.color}`}>
                  <notif.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-base font-bold transition-colors ${!notif.read ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <Clock size={12} />
                      {notif.time}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
                    {notif.description}
                  </p>
                  {!notif.read && (
                    <div className="mt-3 flex items-center gap-3">
                      <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Mark Read</button>
                      <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Archive</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
              <p className="text-sm text-gray-500 mt-1">No new notifications matching your filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
