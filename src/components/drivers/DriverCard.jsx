import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { statusColor } from '../../utils/helpers.js';

export default function DriverCard({ driver, vehicle, onView, onEdit, onDelete }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <img src={driver.photo} alt={driver.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-800" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{driver.name}</h3>
            <Badge className={statusColor(driver.available)}>{driver.available}</Badge>
          </div>
          <p className="text-xs text-slate-500 truncate">{driver.id} • {driver.phone}</p>
          <p className="text-xs text-slate-500 mt-0.5">⭐ {driver.rating} • {driver.experienceYears} yrs exp</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-950 rounded-lg py-2 border border-slate-800">
          <p className="text-lg font-semibold text-blue-400">{driver.totalTrips}</p>
          <p className="text-[10px] text-slate-500 uppercase">Trips</p>
        </div>
        <div className="bg-slate-950 rounded-lg py-2 border border-slate-800">
          <p className="text-lg font-semibold text-emerald-400">{driver.onTimeRate}%</p>
          <p className="text-[10px] text-slate-500 uppercase">On-Time</p>
        </div>
        <div className="bg-slate-950 rounded-lg py-2 border border-slate-800">
          <p className="text-lg font-semibold text-amber-400">{driver.delayedTrips}</p>
          <p className="text-[10px] text-slate-500 uppercase">Delayed</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3 truncate">
        🚚 {vehicle?.name || 'Unassigned'}
      </p>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onView(driver)} className="flex-1">View</Button>
        <Button size="sm" variant="secondary" onClick={() => onEdit(driver)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(driver)}>Delete</Button>
      </div>
    </Card>
  );
}