export const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric'];
export const VEHICLE_STATUSES = ['Available', 'On Trip', 'Maintenance', 'Inactive'];
export const DRIVER_STATUSES = ['Available', 'On Trip', 'Off Duty', 'On Leave'];
export const SHIPMENT_STATUSES = ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Cancelled'];
export const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export const cn = (...args) => args.filter(Boolean).join(' ');

export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
export const formatCurrency = (n) => n != null && !isNaN(n) ? '₹' + Number(n).toLocaleString('en-IN') : '—';

export const statusColor = (status) => {
  const map = {
    Available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'On Trip': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    Maintenance: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Inactive: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    'On Leave': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'Off Duty': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    Pending: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    Assigned: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    'Picked Up': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    'In Transit': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'Out for Delivery': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    Delivered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Delayed: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    Cancelled: 'bg-slate-600/20 text-slate-400 border-slate-600/40',
    Active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Expiring Soon': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Expired: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };
  return map[status] || 'bg-slate-500/15 text-slate-400 border-slate-500/30';
};

export const severityColor = (sev) => ({
  critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
}[sev] || 'bg-slate-500/15 text-slate-400 border-slate-500/30');

export const fuelColor = (fuel) => ({
  Petrol: 'text-amber-400',
  Diesel: 'text-blue-400',
  CNG: 'text-emerald-400',
  Electric: 'text-cyan-400',
}[fuel] || 'text-slate-400');