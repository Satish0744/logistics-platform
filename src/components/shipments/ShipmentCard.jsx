import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { statusColor, formatDate, formatCurrency } from '../../utils/helpers.js';

export default function ShipmentCard({ shipment, onView, onEdit, onDelete }) {
  const s = shipment;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{s.id}</h3>
            <Badge className={statusColor(s.priority === 'Urgent' ? 'Delayed' : 'Assigned')}>{s.priority}</Badge>
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">👤 {s.customer?.name}</p>
        </div>
        <Badge className={statusColor(s.status)}>{s.status}</Badge>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5">●</span>
          <div className="min-w-0">
            <p className="text-slate-500">Pickup</p>
            <p className="text-slate-200 truncate">{s.pickup?.location}, {s.pickup?.city}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-rose-400 mt-0.5">●</span>
          <div className="min-w-0">
            <p className="text-slate-500">Drop</p>
            <p className="text-slate-200 truncate">{s.drop?.location}, {s.drop?.city}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-3">
        <div>
          <p className="text-slate-500">Driver</p>
          <p className="text-slate-200 truncate">{s.assignedDriverName || 'Unassigned'}</p>
        </div>
        <div>
          <p className="text-slate-500">Vehicle</p>
          <p className="text-slate-200 truncate">{s.assignedVehicleNumber || '—'}</p>
        </div>
        <div>
          <p className="text-slate-500">Distance</p>
          <p className="text-slate-200">{s.distanceKm} km</p>
        </div>
        <div>
          <p className="text-slate-500">Freight</p>
          <p className="text-slate-200">{formatCurrency(s.freightAmount)}</p>
        </div>
        <div>
          <p className="text-slate-500">Expected</p>
          <p className="text-slate-200">{formatDate(s.expectedDeliveryDate)}</p>
        </div>
        <div>
          <p className="text-slate-500">Delivered</p>
          <p className="text-slate-200">{s.actualDeliveryDate ? formatDate(s.actualDeliveryDate) : '—'}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onView(s)} className="flex-1">View</Button>
        <Button size="sm" variant="secondary" onClick={() => onEdit(s)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(s)}>Delete</Button>
      </div>
    </Card>
  );
}