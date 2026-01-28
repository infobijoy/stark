
import React from 'react';
import { 
  Home, UserPlus, ShoppingCart, TrendingUp, Box, Truck, 
  Settings, Users, ClipboardCheck, Package, Factory, BarChart3,
  CreditCard, FileText, LayoutDashboard, Search, Bell, HelpCircle,
  Key, Tag, FlaskConical, Warehouse, Calendar, ShieldCheck, 
  FileCheck, Wallet, Landmark, Navigation, HardHat, FileSignature,
  Layers, RefreshCcw, Briefcase, Lock, Plus, DollarSign, ClipboardList,
  Scale, History, UserCog, CheckCircle2, AlertCircle
} from 'lucide-react';
import { MenuGroup } from './types';

export const ERP_MENU: MenuGroup[] = [
  {
    title: "Application",
    items: [
      { id: 'home', label: 'Home', icon: 'Home' },
      { id: 'settings', label: 'Settings', icon: 'Settings' },
      { id: 'change-password', label: 'Change Password', icon: 'Lock' },
    ]
  },
  {
    title: "Notification",
    items: [
      { id: 'notifications', label: 'System Alerts', icon: 'Bell' },
    ]
  },
  {
    title: "Registration",
    items: [
      { id: 'supplier-info', label: 'Supplier Info', icon: 'UserPlus' },
      { id: 'customer-info', label: 'Customer Info', icon: 'Users' },
    ]
  },
  {
    title: "Purchase",
    items: [
      { id: 'requisition', label: 'Requisition', icon: 'ClipboardList' },
      { id: 'order', label: 'Order', icon: 'ShoppingCart' },
      { id: 'invoice', label: 'Invoice', icon: 'CreditCard' },
      { id: 'purchase-report', label: 'Purchase Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Sales",
    items: [
      { id: 'sales-order', label: 'Order Receive', icon: 'TrendingUp' },
      { id: 'order-instruction', label: 'Order Instruction', icon: 'FileText' },
      { id: 'order-rack-config', label: 'Order Rack Config', icon: 'Layers' },
      { id: 'delivery-order', label: 'Delivery Order', icon: 'Truck' },
      { id: 'sales-invoice', label: 'Invoice', icon: 'CreditCard' },
      { id: 'sales-return', label: 'Sales Return', icon: 'RefreshCcw' },
      { id: 'sales-report', label: 'Sales Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Merchandising",
    items: [
      { id: 'quotation', label: 'Quotation', icon: 'Tag' },
      { id: 'receive-inquire', label: 'Receive Inquire', icon: 'Search' },
      { id: 'costing-bom', label: 'Costing BOM', icon: 'FileText' },
      { id: 'purchase-bom', label: 'Purchase BOM', icon: 'ShoppingCart' },
      { id: 'assembly-bom', label: 'Assembly BOM', icon: 'Box' },
      { id: 'trade-bom', label: 'Trade BOM', icon: 'TrendingUp' },
      { id: 'merch-requisition', label: 'Purchase Requisition', icon: 'ClipboardList' },
      { id: 'material-plan', label: 'Material Plan', icon: 'Calendar' },
      { id: 'currency-rate', label: 'Currency Rate', icon: 'DollarSign' },
      { id: 'merch-report', label: 'Merchandising Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Supply Chain",
    items: [
      { id: 'scm-po', label: 'Purchase Order', icon: 'ShoppingCart' },
      { id: 'scm-invoice', label: 'Purchase Invoice', icon: 'CreditCard' },
      { id: 'material-inspection', label: 'Material Inspection', icon: 'ClipboardCheck' },
      { id: 'shipment-plan', label: 'Shipment Plan', icon: 'Package' },
      { id: 'packing-list', label: 'Packing List', icon: 'Layers' },
      { id: 'tracking', label: 'Purchase Tracking', icon: 'Search' },
      { id: 'scm-report', label: 'Supply Chain Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Sample Development",
    items: [
      { id: 'dv-requisition', label: 'Purchase Requisition (DV)', icon: 'ClipboardList' },
      { id: 'dv-po', label: 'Purchase Order (DV)', icon: 'ShoppingCart' },
      { id: 'dv-invoice', label: 'Purchase Invoice (DV)', icon: 'CreditCard' },
      { id: 'dv-rm-received', label: 'RM Received (DV)', icon: 'Box' },
      { id: 'dv-production-sr', label: 'Production SR (DV)', icon: 'Factory' },
      { id: 'dv-psr-issue', label: 'PSR Issue (DV)', icon: 'FileCheck' },
      { id: 'sample-receive', label: 'Sample Receive', icon: 'Package' },
      { id: 'sample-delivery', label: 'Sample Delivery', icon: 'Truck' },
      { id: 'sample-report', label: 'Sample Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Store",
    items: [
      { id: 'rm-plan', label: 'RM Plan', icon: 'Calendar' },
      { id: 'rm-received', label: 'RM Received', icon: 'Box' },
      { id: 'purchase-return', label: 'Purchase Return', icon: 'RefreshCcw' },
      { id: 'store-requisition', label: 'Store Requisition', icon: 'ClipboardList' },
      { id: 'store-issue', label: 'Store Issue', icon: 'Package' },
      { id: 'psr-issue', label: 'PSR Issue', icon: 'FileCheck' },
      { id: 'fg-receive', label: 'Finished Goods Receive', icon: 'CheckCircle2' },
      { id: 'stock-transfer', label: 'Stock Transfer', icon: 'RefreshCcw' },
      { id: 'gate-pass', label: 'Key' },
      { id: 'stock-adjustment', label: 'Stock Adjustment', icon: 'Settings' },
      { id: 'store-report', label: 'Store Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Manufacturing",
    items: [
      { id: 'production-sr', label: 'Production SR', icon: 'Factory' },
      { id: 'hourly-production', label: 'Hourly Production', icon: 'History' },
      { id: 'rm-consumption', label: 'RM Consumption', icon: 'Box' },
      { id: 'mfg-report', label: 'Manufacturing Report', icon: 'BarChart3' },
    ]
  },
  { title: "IE", items: [{ id: 'ie-main', label: 'IE Settings', icon: 'UserCog' }] },
  { title: "Planning", items: [{ id: 'planning-main', label: 'Operations Plan', icon: 'Calendar' }] },
  {
    title: "Quality",
    items: [
      { id: 'rm-inspection', label: 'RM Inspection', icon: 'ClipboardCheck' },
      { id: 'fg-inspection', label: 'FG Inspection', icon: 'ShieldCheck' },
      { id: 'quality-report', label: 'Quality Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Packing",
    items: [
      { id: 'receive-qty', label: 'Receive Qty', icon: 'Package' },
      { id: 'packing-qty', label: 'Packing Qty', icon: 'Layers' },
      { id: 'packing-report', label: 'Packing Report', icon: 'BarChart3' },
    ]
  },
  {
    title: "Reports",
    items: [
      { id: 'item-costing-rep', label: 'Item Costing', icon: 'DollarSign' },
      { id: 'inventory-rep', label: 'Inventory', icon: 'Warehouse' },
    ]
  },
  {
    title: "Approval Form",
    items: [
      { id: 'signature-procedure', label: 'Signature Procedure', icon: 'FileSignature' },
    ]
  },
  {
    title: "HR, Admin & Compliance",
    items: [
      { id: 'recruitment-form', label: 'Recruitment Form', icon: 'Briefcase' },
      { id: 'excess-duty-form', label: 'Excess Duty Form', icon: 'FileText' },
      { id: 'emp-transfer', label: 'Employee Transfer', icon: 'RefreshCcw' },
      { id: 'emp-promotion', label: 'Employee Promotion', icon: 'TrendingUp' },
      { id: 'emp-increment', label: 'Employee Increment', icon: 'TrendingUp' },
      { id: 'labour-costing', label: 'Daily Labour Costing Sheet', icon: 'BarChart3' },
    ]
  },
  {
    title: "Accounts",
    items: [
      { id: 'ledger-opening', label: 'Ledger Opening Form', icon: 'FileText' },
    ]
  },
  {
    title: "Commercial",
    items: [
      { id: 'lc-opening', label: 'LC Opening Form', icon: 'Landmark' },
      { id: 'freight-rate', label: 'Container Freight Rate Form', icon: 'Truck' },
    ]
  },
  {
    title: "Logistic",
    items: [
      { id: 'truck-rent', label: 'Truck Rent Form', icon: 'Navigation' },
    ]
  },
  {
    title: "Production (Forms)",
    items: [
      { id: 'rework-form', label: 'Re-Work Form', icon: 'RefreshCcw' },
      { id: 'additional-work-form', label: 'Additional Work Form', icon: 'Plus' },
    ]
  }
];

export const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Home, UserPlus, ShoppingCart, TrendingUp, Box, Truck, 
    Settings, Users, ClipboardCheck, Package, Factory, BarChart3,
    CreditCard, FileText, LayoutDashboard, Search, Bell, HelpCircle,
    Key, Tag, FlaskConical, Warehouse, Calendar, ShieldCheck, 
    FileCheck, Wallet, Landmark, Navigation, HardHat, FileSignature,
    Layers, RefreshCcw, Briefcase, Lock, Plus, DollarSign, ClipboardList,
    Scale, History, UserCog, CheckCircle2, AlertCircle
  };
  const IconComponent = icons[iconName] || HelpCircle;
  return <IconComponent size={18} />;
};
