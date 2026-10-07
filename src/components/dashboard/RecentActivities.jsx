import { useFleet } from '../../context/FleetContext.jsx';
import Card from '../ui/Card.jsx';

const iconMap = { truck: '🚚', alert: '🚨', wrench: '🔧', user: '👤', check: '✅' };

export default function RecentActivities() {
  const { state } = useFleet();
  const activities = state.activities.slice(0, 6);

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-3">
        {activities.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">
              {iconMap[a.icon] || '📌'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{a.title}</p>
              <p className="text-xs text-slate-500">{a.description}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{a.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}