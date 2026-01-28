
import React, { useState, useMemo } from 'react';
import { ERP_MENU, getIcon } from '../constants';
import { ChevronDown, ChevronRight, X, Search as SearchIcon, LogOut } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user?: any;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, setIsOpen, user, onLogout }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // Flattened items for search
  const allItems = useMemo(() => {
    return ERP_MENU.flatMap(group => 
      group.items.map(item => ({
        ...item,
        groupTitle: group.title
      }))
    );
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allItems.filter(item => 
      item.label.toLowerCase().includes(query) || 
      item.groupTitle.toLowerCase().includes(query)
    );
  }, [searchQuery, allItems]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 flex flex-col h-full shadow-2xl
      `}>
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
              S
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-tight tracking-tight whitespace-nowrap">STARK BAG</h1>
              <p className="text-slate-500 text-[10px] font-bold tracking-[0.1em] uppercase">Industries Ltd.</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick Navigation..." 
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2.5 pl-9 pr-10 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 transition-all outline-none text-slate-200"
            />
            <div className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
              <SearchIcon size={16} />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 p-1 text-slate-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-3 pb-10 custom-scrollbar">
          {searchQuery.trim() ? (
            <div className="space-y-1 mt-2">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Search Results</p>
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={`${item.groupTitle}-${item.id}`}
                    onClick={() => {
                      setActiveModule(item.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                      ${activeModule === item.id 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
                    `}
                  >
                    <span className={`${activeModule === item.id ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`}>
                      {getIcon(item.icon || 'Box')}
                    </span>
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="truncate">{item.label}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-tighter ${activeModule === item.id ? 'text-emerald-100' : 'text-slate-600'}`}>
                        {item.groupTitle}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-8 text-center">
                  <p className="text-slate-500 text-sm">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {ERP_MENU.map((group) => (
                <div key={group.title} className="space-y-1">
                  <button 
                    onClick={() => toggleGroup(group.title)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg
                      ${expandedGroups.includes(group.title) ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
                    `}
                  >
                    {group.title}
                    <div className={`transition-transform duration-200 ${expandedGroups.includes(group.title) ? 'rotate-180' : ''}`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>
                  
                  <div className={`
                    space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out
                    ${expandedGroups.includes(group.title) ? 'max-h-[800px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveModule(item.id);
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                          ${activeModule === item.id 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                            : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
                        `}
                      >
                        <span className={`${activeModule === item.id ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`}>
                          {getIcon(item.icon || 'Box')}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 transition-all group">
            <div className="relative">
              <img 
                src={user?.avatar || "https://picsum.photos/seed/user123/100/100"} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-slate-700 group-hover:border-emerald-500 transition-colors"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate">{user?.role || 'User'}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
