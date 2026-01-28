
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000, production: 2400 },
  { name: 'Feb', sales: 3000, production: 1398 },
  { name: 'Mar', sales: 2000, production: 9800 },
  { name: 'Apr', sales: 2780, production: 3908 },
  { name: 'May', sales: 1890, production: 4800 },
  { name: 'Jun', sales: 2390, production: 3800 },
  { name: 'Jul', sales: 3490, production: 4300 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
        {change}
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Executive Overview</h2>
          <p className="text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            Create Order
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$128,430" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Active Orders" 
          value="452" 
          change="+5.2%" 
          trend="up" 
          icon={ShoppingCart} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Customers" 
          value="2,845" 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Inventory Items" 
          value="15,204" 
          change="+0.8%" 
          trend="up" 
          icon={Package} 
          color="bg-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Revenue vs Production</h3>
            <select className="bg-gray-50 border-none rounded-lg text-xs font-semibold px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Last 7 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="production" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.05} fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-6 flex-1">
            {[
              { text: 'New supplier registered: Apex Fabrics', time: '2 mins ago', icon: UserPlus, color: 'text-emerald-500 bg-emerald-50' },
              { text: 'Order #48293 shipped to New York', time: '1 hour ago', icon: Truck, color: 'text-blue-500 bg-blue-50' },
              { text: 'Critical: Stock level low for Polyester Thread', time: '3 hours ago', icon: AlertCircle, color: 'text-rose-500 bg-rose-50' },
              { text: 'New requisition request from Manufacturing', time: '5 hours ago', icon: ClipboardCheck, color: 'text-amber-500 bg-amber-50' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

const UserPlus = (props: any) => <Users {...props} />;
const Truck = (props: any) => <ShoppingCart {...props} />;
const ClipboardCheck = (props: any) => <AlertCircle {...props} />;

export default Dashboard;
