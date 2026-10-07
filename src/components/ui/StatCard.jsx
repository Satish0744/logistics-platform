import Card from './Card.jsx';

export default function StatCard({ label, value, icon, sub, accent = 'blue' }) {
  const accents = {
    blue: 'from-blue-500/20 to-blue-500/0 text-blue-400',
    emerald: 'from-emerald-500/20 to-emerald-500/0 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/0 text-amber-400',
    rose: 'from-rose-500/20 to-rose-500/0 text-rose-400',
    violet: 'from-violet-500/20 to-violet-500/0 text-violet-400',
  };
  return (
    <Card className="p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[accent]} opacity-40 pointer-events-none`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
        {icon && <div className={`text-2xl ${accents[accent].split(' ').pop()}`}>{icon}</div>}
      </div>
    </Card>
  );
}