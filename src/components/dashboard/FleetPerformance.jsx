import { useFleet } from '../../context/FleetContext.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { statusColor } from '../../utils/helpers.js';

export default function FleetPerformance() {
  const { state } = useFleet();
  const vehicles = state.vehicles;

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Fleet Performance Overview</h3>
      <div className="space-y-3">
        {vehicles.slice(0, 6).map((v) => {
          const util = v.status === 'On Trip' ? 100 : v.status === 'Available' ? 60 : 20;
          return (
            <div key={v.id} className="flex items-center gap-3">
              <img src={v.photo} alt={v.name} className="w-10 h-10 rounded-lg object-cover border border-slate-800" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium truncate">{v.name}</p>
                  <Badge className={statusColor(v.status)}>{v.status}</Badge>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${util > 70 ? 'bg-emerald-500' : util > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${util}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}