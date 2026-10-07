import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { statusColor, fuelColor, formatCurrency } from '../../utils/helpers.js';

export default function VehicleCard({ vehicle, driver, onView, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-40 bg-slate-800">
        <img src={vehicle.photo} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2">
          <Badge className={statusColor(vehicle.status)}>{vehicle.status}</Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <Badge className={`border-slate-700 bg-slate-900/80 ${fuelColor(vehicle.fuelType)}`}>{vehicle.fuelType}</Badge>
          <span className="text-xs text-white bg-slate-900/80 px-2 py-0.5 rounded">{vehicle.registrationNumber}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{vehicle.name}</h3>
            <p className="text-xs text-slate-500 truncate">{vehicle.model}</p>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{vehicle.id}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-slate-500">Owner</p>
            <p className="text-slate-200 truncate">{vehicle.ownerName}</p>
          </div>
          <div>
            <p className="text-slate-500">Driver</p>
            <p className="text-slate-200 truncate">{driver?.name || '—'}</p>
          </div>
          <div>
            <p className="text-slate-500">Capacity</p>
            <p className="text-slate-200">{vehicle.capacityKg} kg</p>
          </div>
          <div>
            <p className="text-slate-500">Odometer</p>
            <p className="text-slate-200">{vehicle.odometerKm.toLocaleString()} km</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => onView(vehicle)} className="flex-1">View</Button>
          <Button size="sm" variant="secondary" onClick={() => onEdit(vehicle)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(vehicle)}>Delete</Button>
        </div>
      </div>
    </Card>
  );
}