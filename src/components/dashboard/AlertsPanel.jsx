import { useFleet } from '../../context/FleetContext.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { severityColor } from '../../utils/helpers.js';

export default function AlertsPanel() {
  const { state } = useFleet();
  const alerts = state.notifications.filter((n) => !n.read).slice(0, 5);

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Active Alerts</h3>
      {alerts.length === 0 ? (
        <p className="text-sm text-slate-500">No active alerts 🎉</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
              <span className="text-lg mt-0.5">
                {a.type === 'delayed_shipment' ? '🚨' : a.type === 'vehicle_maintenance' ? '🔧' : a.type === 'driver_status' ? '👤' : '📦'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <Badge className={severityColor(a.severity)}>{a.severity}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{a.message}</p>
                <p className="text-[10px] text-slate-600 mt-1">{a.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}