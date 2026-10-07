import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { severityColor } from '../../utils/helpers.js';

const ICONS = { delayed_shipment: '🚨', vehicle_maintenance: '🔧', delivery_update: '📦', driver_status: '👤' };
const LABELS = { delayed_shipment: 'Delayed Shipment', vehicle_maintenance: 'Vehicle Maintenance', delivery_update: 'Delivery Update', driver_status: 'Driver Status' };

export default function NotificationsPanel({ notifications, onMarkRead, onMarkAllRead }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {unread > 0 ? <><span className="text-rose-400 font-semibold">{unread}</span> unread notification{unread > 1 ? 's' : ''}</> : 'All caught up 🎉'}
        </p>
        {unread > 0 && <Button size="sm" variant="secondary" onClick={onMarkAllRead}>Mark all as read</Button>}
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <Card key={n.id} className={`p-4 flex items-start gap-3 ${!n.read ? 'border-l-4 border-l-blue-500' : ''}`}>
            <div className="text-2xl shrink-0">{ICONS[n.type] || '📌'}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className={`text-sm font-medium ${!n.read ? 'text-white' : 'text-slate-300'}`}>{n.title}</p>
                <Badge className={severityColor(n.severity)}>{n.severity}</Badge>
                <span className="text-[10px] text-slate-500 uppercase tracking-wide">{LABELS[n.type]}</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{n.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-600">{n.timestamp}</span>
                {!n.read && (
                  <button onClick={() => onMarkRead(n.id)} className="text-xs text-blue-400 hover:text-blue-300">
                    Mark read
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}