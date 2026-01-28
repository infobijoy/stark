
import React, { useState } from 'react';
import { Save, Printer, X, Plus, Edit3, Globe, Landmark, Users, Briefcase, FileText, Ban, CheckCircle2 } from 'lucide-react';

interface SupplierSetupProps {
  onClose: () => void;
  supplierData?: any;
  mode?: 'view' | 'new';
}

const GL_HEAD_OPTIONS = [
  "Service Supplier-Account Payable",
  "Local Supplier-Account Payable",
  "Foreign Supplier-Account Payable",
  "PR Inter Company-Accounts Payable",
  "Local RM Supplier-Account Payable"
];

const SupplierSetup: React.FC<SupplierSetupProps> = ({ onClose, supplierData, mode = 'view' }) => {
  const isNew = mode === 'new' || !supplierData;
  
  const [formData, setFormData] = useState(supplierData || {
    id: isNew ? '202.02.04.0027' : supplierData?.id,
    glHead: isNew ? 'Service Supplier-Account Payable' : supplierData?.glHead,
    supplierType: 'Local',
    name: '',
    shortName: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    website: '',
    country: 'BANGLADESH',
    province: '',
    city: '',
    postCode: '',
    busRegNo: '',
    vatRegNo: '',
    tinNo: '',
    certifications: '',
    listSupplied: '',
    materials: '',
    paymentTerms: '',
    contactName: '',
    contactIdNo: '',
    contactPosition: '',
    contactMobile: '',
    contactIdType: '',
    contactEmail: '',
    companyType: '',
    yearEst: '',
    ownerName: '',
    businessType: '',
    accName: '',
    accType: '',
    accNo: '',
    currency: '',
    iban: '',
    bankName: '',
    routingNo: '',
    branchName: '',
    swiftCode: '',
    branchAddress: '',
    refCompany: '',
    refPurchaser: '',
    refClient: '',
    refComment: '',
    refTestimonial: ''
  });

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex flex-col items-center mb-6 mt-8 first:mt-0">
      <h3 className="text-sm font-bold text-slate-800 border-b-2 border-slate-200 px-8 pb-1">{title}:</h3>
    </div>
  );

  const FormField = ({ label, value, type = 'text', readOnly = !isNew, onChange, isSelect = false, options = [] }: any) => (
    <div className="flex items-center gap-2">
      <label className="text-[11px] font-bold text-slate-600 w-32 text-right shrink-0">{label}:</label>
      {isSelect ? (
        <select 
          disabled={readOnly}
          className="flex-1 bg-white border border-blue-200 rounded py-1 px-2 text-[11px] outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
        >
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          defaultValue={value} 
          readOnly={readOnly}
          className="flex-1 bg-white border border-blue-200 rounded py-1 px-2 text-[11px] outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="bg-[#f0f4f8] rounded-md shadow-2xl border border-blue-300 overflow-hidden flex flex-col animate-in zoom-in duration-300 min-h-[90vh]">
      {/* Blue Header Bar */}
      <div className="bg-[#2a5a9e] px-4 py-2 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1 rounded">
            <Users size={14} className="text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider">Supplier Information</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold italic opacity-80">Supplier Entry : {isNew ? 'New' : 'View'}</span>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-white m-2 border border-blue-200 rounded shadow-inner custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-2">
          
          {/* General Info */}
          <SectionHeader icon={FileText} title="General Info" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <FormField label="GL Head" value={formData.glHead} isSelect={true} options={GL_HEAD_OPTIONS} />
            <FormField label="Supplier Code" value={formData.id} />
            <FormField label="Supplier Type" value={formData.supplierType} />
          </div>

          {/* Supplier Details */}
          <SectionHeader icon={Briefcase} title="Supplier Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <FormField label="Name" value={formData.name} />
            <FormField label="Country" value={formData.country} isSelect={true} options={['BANGLADESH', 'CHINA', 'USA', 'UK', 'INDIA']} />
            <FormField label="Short Name" value={formData.shortName} />
            <FormField label="Province/State" value={formData.province} />
            <div className="flex items-start gap-2">
              <label className="text-[11px] font-bold text-slate-600 w-32 text-right mt-1 shrink-0">Address:</label>
              <textarea 
                readOnly={!isNew}
                className="flex-1 bg-white border border-blue-200 rounded py-1 px-2 text-[11px] h-20 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                defaultValue={formData.address}
              />
            </div>
            <div className="space-y-2">
               <FormField label="City" value={formData.city} />
               <FormField label="Post Code" value={formData.postCode} />
            </div>
            <FormField label="Phone" value={formData.phone} />
            <FormField label="Business Registration No" value={formData.busRegNo} />
            <FormField label="Mobile No" value={formData.mobile} />
            <FormField label="VAT Registration No" value={formData.vatRegNo} />
            <FormField label="Email" value={formData.email} />
            <FormField label="TIN No" value={formData.tinNo} />
            <FormField label="Website" value={formData.website} />
            <FormField label="List of Supplied" value={formData.listSupplied} />
            <FormField label="Certifications" value={formData.certifications} />
            <FormField label="Materials" value={formData.materials} />
            <FormField label="Payment Terms" value={formData.paymentTerms} />
          </div>

          {/* Contact Person */}
          <SectionHeader icon={Users} title="Contact Person" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <FormField label="Name" value={formData.contactName} />
            <FormField label="ID No" value={formData.contactIdNo} />
            <FormField label="Position" value={formData.contactPosition} />
            <FormField label="Mobile" value={formData.contactMobile} />
            <FormField label="ID Type" value={formData.contactIdType} />
            <FormField label="Email" value={formData.contactEmail} />
          </div>

          {/* Business Type */}
          <SectionHeader icon={Landmark} title="Business Type" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <FormField label="Company Type" value={formData.companyType} />
            <FormField label="Year of Establishment" value={formData.yearEst} />
            <FormField label="Owner Name" value={formData.ownerName} />
            <FormField label="Type of Business" value={formData.businessType} />
          </div>

          {/* Bank Information */}
          <SectionHeader icon={Landmark} title="Bank Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <FormField label="Account Name" value={formData.accName} />
            <FormField label="Account Type" value={formData.accType} />
            <FormField label="Account No" value={formData.accNo} />
            <FormField label="Currency" value={formData.currency} isSelect={true} options={['--Currency--', 'BDT', 'USD', 'EUR']} />
            <FormField label="IBAN" value={formData.iban} />
            <FormField label="Bank Name" value={formData.bankName} />
            <FormField label="Routing No" value={formData.routingNo} />
            <FormField label="Branch Name" value={formData.branchName} />
            <FormField label="Swift Code" value={formData.swiftCode} />
            <div className="flex items-start gap-2">
              <label className="text-[11px] font-bold text-slate-600 w-32 text-right mt-1 shrink-0">Branch Address:</label>
              <textarea 
                readOnly={!isNew}
                className="flex-1 bg-white border border-blue-200 rounded py-1 px-2 text-[11px] h-16 outline-none"
                defaultValue={formData.branchAddress}
              />
            </div>
          </div>

          {/* References */}
          <SectionHeader icon={Plus} title="References" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 pb-10">
            <div className="space-y-2">
               <FormField label="Company Name" value={formData.refCompany} />
               <FormField label="Client Name" value={formData.refClient} />
               <FormField label="Client Testimonial" value={formData.refTestimonial} />
            </div>
            <div className="space-y-2">
               <FormField label="Purchaser Name" value={formData.refPurchaser} />
               <div className="flex items-start gap-2">
                <label className="text-[11px] font-bold text-slate-600 w-32 text-right mt-1 shrink-0">Comment:</label>
                <textarea 
                  readOnly={!isNew}
                  className="flex-1 bg-white border border-blue-200 rounded py-1 px-2 text-[11px] h-16 outline-none"
                  defaultValue={formData.refComment}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="bg-[#f0f4f8] border-t border-blue-200 px-4 py-2 shrink-0 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {isNew ? (
            <>
              <button onClick={onClose} className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">
                <Ban size={14} className="text-rose-500" /> Cancel
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Save size={14} className="text-blue-500" /> Save
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-blue-50 hover:text-blue-600 transition-all">
                <CheckCircle2 size={14} className="text-emerald-500" /> Approve
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-gray-50 transition-all">
                <Plus size={14} className="text-emerald-500" /> New
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-gray-50 transition-all">
                <Edit3 size={14} className="text-blue-500" /> Edit
              </button>
            </>
          )}
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-gray-50 transition-all">
            <Printer size={14} className="text-slate-500" /> Supplier Print
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-[11px] font-bold hover:bg-gray-50 transition-all">
            <X size={14} className="text-rose-500" /> Close
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500">Report View:</span>
            <select className="bg-white border border-slate-300 rounded px-1 py-1 text-[10px] font-bold outline-none">
              <option>In New Window</option>
              <option>Same Window</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500">Type:</span>
            <select className="bg-white border border-slate-300 rounded px-1 py-1 text-[10px] font-bold outline-none">
              <option>PDF</option>
              <option>Excel</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierSetup;
