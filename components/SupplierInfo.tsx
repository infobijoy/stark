
import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, RefreshCw, FileSpreadsheet, ChevronDown, UserCheck } from 'lucide-react';

const SUPPLIER_MOCK_DATA = [
  {
    id: '202.02.01.0045',
    glHead: 'Local Supplier-Account Payable',
    name: 'Maxinary Tech International',
    address: 'Address Holding-1049, House-08, Block-E, Road-01, Chalantika Housing, West Joynabhar, Hamayetpur, Savar, Dhaka-1340.',
    mobile: '+880 1713619885',
    status: 'Inactive',
    preparedBy: 'Nasim Miah (Salman) - 28-Jan-2026 08:42',
    checkedBy: 'Md. Sariyet Alam Bhuiyan - 19-Jan-2026 10:52',
    recommendedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:51',
    authorizedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:51',
    approvedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:52'
  },
  {
    id: '202.02.02.0060',
    glHead: 'Foreign Supplier-Account Payable',
    name: 'FreightX Cargo Zone',
    address: 'Dhaka Office: Camellia, House# 9, (5th Floor) Road# 13, Sector# 4, Uttara, Dhaka-1230, Bangladesh',
    mobile: '-',
    status: 'Active',
    preparedBy: 'Md. Insanul Alam - 18-Jan-2026 12:38',
    checkedBy: 'Md. Sariyet Alam Bhuiyan - 19-Jan-2026 10:52',
    recommendedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:51',
    authorizedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:51',
    approvedBy: 'Nur Mohammad Uzzal - 19-Jan-2026 11:52'
  },
  {
    id: '202.02.02.0059',
    glHead: 'Foreign Supplier-Account Payable',
    name: 'Jiaxing Sibote Import And Export Trading Co.,Ltd',
    address: 'No.333, Guangzhong South Road,Guangchen Town,Pinghu City,Zhejiang Province.',
    mobile: '+86 18358365637',
    status: 'Active',
    preparedBy: 'Atikur Rahman - 13-Jan-2026 09:58',
    checkedBy: 'Md. Sariyet Alam Bhuiyan - 13-Jan-2026 18:02',
    recommendedBy: 'Md. Rajib Khan - 18-Jan-2026 10:47',
    authorizedBy: 'Nur Mohammad Uzzal - 18-Jan-2026 12:22',
    approvedBy: 'Nur Mohammad Uzzal - 18-Jan-2026 12:22'
  }
];

const GL_HEAD_FILTER_OPTIONS = [
  "All",
  "Service Supplier-Account Payable",
  "Local Supplier-Account Payable",
  "Foreign Supplier-Account Payable",
  "PR Inter Company-Accounts Payable",
  "Local RM Supplier-Account Payable"
];

interface SupplierInfoProps {
  onViewSupplier: (supplier: any) => void;
  onNewSupplier: () => void;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({ onViewSupplier, onNewSupplier }) => {
  const [glHeadFilter, setGlHeadFilter] = useState('All');
  const [searchName, setSearchName] = useState('');

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Search and Filters Strip */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-end gap-4">
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">GL Head</label>
          <div className="relative">
            <select 
              value={glHeadFilter}
              onChange={(e) => setGlHeadFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
            >
              {GL_HEAD_FILTER_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>

        <div className="space-y-1.5 flex-[2] min-w-[300px]">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Supplier Name</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, code or address..." 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-11 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
            <RefreshCw size={14} className="animate-spin-hover" />
            Load Data
          </button>
          <button 
            onClick={onNewSupplier}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
          >
            <Plus size={14} />
            New Supplier
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <FileSpreadsheet size={16} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Supplier Setup List</h3>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Rows: 1-50 of 161</span>
            <div className="flex items-center gap-1">
              <span>Page Size:</span>
              <select className="bg-white border border-gray-200 rounded px-1 py-0.5 outline-none">
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead>
              <tr className="bg-slate-100/50 border-b border-gray-100">
                <th className="sticky left-0 bg-slate-100 px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center z-10">View</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">GL Head</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Code</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest min-w-[300px]">Address</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mobile</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prepared By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Checked By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authorized By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Approved By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SUPPLIER_MOCK_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="sticky left-0 bg-white group-hover:bg-emerald-50/20 px-6 py-4 text-center z-10 border-r border-gray-50">
                    <button 
                      onClick={() => onViewSupplier(item)}
                      className="p-2 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all flex items-center gap-1 mx-auto text-[10px] font-bold uppercase"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 leading-tight block">{item.glHead}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-900 font-mono tracking-tight">{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-800 block whitespace-nowrap">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 leading-relaxed block">{item.address}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600 font-medium">{item.mobile}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-l border-gray-50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-700">{item.preparedBy.split(' - ')[0]}</span>
                      <span className="text-[9px] text-slate-400 font-medium italic">{item.preparedBy.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l border-gray-50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-700">{item.checkedBy.split(' - ')[0]}</span>
                      <span className="text-[9px] text-slate-400 font-medium italic">{item.checkedBy.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l border-gray-50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-700">{item.recommendedBy.split(' - ')[0]}</span>
                      <span className="text-[9px] text-slate-400 font-medium italic">{item.recommendedBy.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l border-gray-50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-700">{item.authorizedBy.split(' - ')[0]}</span>
                      <span className="text-[9px] text-slate-400 font-medium italic">{item.authorizedBy.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l border-gray-50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-700">{item.approvedBy.split(' - ')[0]}</span>
                      <span className="text-[9px] text-slate-400 font-medium italic">{item.approvedBy.split(' - ')[1]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
