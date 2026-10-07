import Badge from '../ui/Badge.jsx';
import { statusColor, formatDate, formatCurrency, fuelColor } from '../../utils/helpers.js';

const Row = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm text-slate-200">{value || '—'}</p>
  </div>
);

export default function VehicleDetails({ vehicle, driver }) {
  if (!vehicle) return null;
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={vehicle.photo} alt={vehicle.name} className="w-full md:w-64 h-40 object-cover rounded-lg border border-slate-800" />
        <div className="flex-1 grid grid-cols-2 gap-3">
          <Row label="Vehicle ID" value={vehicle.id} />
          <Row label="Registration" value={vehicle.registrationNumber} />
          <Row label="Model" value={vehicle.model} />
          <div>
            <p className="text-xs text-slate-500">Fuel Type</p>
            <p className={`text-sm font-medium ${fuelColor(vehicle.fuelType)}`}>{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <Badge className={statusColor(vehicle.status)}>{vehicle.status}</Badge>
          </div>
          <Row label="Owner" value={vehicle.ownerName} />
          <Row label="Driver" value={driver?.name || '—'} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Capacity</p>
          <p className="text-lg font-semibold">{vehicle.capacityKg} kg</p>
        </div>
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Mileage</p>
          <p className="text-lg font-semibold">{vehicle.mileageKmpl} kmpl</p>
        </div>
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Odometer</p>
          <p className="text-lg font-semibold">{vehicle.odometerKm.toLocaleString()} km</p>
        </div>
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Fuel Level</p>
          <p className="text-lg font-semibold">{vehicle.fuel?.fuelLevelPercent ?? 0}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="font-semibold text-sm mb-2 text-blue-400">🛡️ RTO</h4>
          <Row label="RTO Code" value={vehicle.rto?.rtoCode} />
          <Row label="RTO Name" value={vehicle.rto?.rtoName} />
          <Row label="Valid Upto" value={formatDate(vehicle.rto?.validUpto)} />
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="font-semibold text-sm mb-2 text-emerald-400">📄 Permit</h4>
          <Row label="Permit No" value={vehicle.permit?.permitNumber} />
          <Row label="Type" value={vehicle.permit?.type} />
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <Badge className={statusColor(vehicle.permit?.status)}>{vehicle.permit?.status}</Badge>
          </div>
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="font-semibold text-sm mb-2 text-amber-400">💳 Insurance</h4>
          <Row label="Provider" value={vehicle.insurance?.provider} />
          <Row label="Policy" value={vehicle.insurance?.policyNumber} />
          <Row label="Valid Upto" value={formatDate(vehicle.insurance?.validUpto)} />
          <Row label="Premium" value={formatCurrency(vehicle.insurance?.premium)} />
        </div>
      </div>

      <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
        <h4 className="font-semibold text-sm mb-3 text-violet-400">🔧 Maintenance</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Row label="Last Service" value={formatDate(vehicle.maintenance?.lastServiceDate)} />
          <Row label="Next Due" value={formatDate(vehicle.maintenance?.nextServiceDue)} />
          <Row label="Last Cost" value={formatCurrency(vehicle.maintenance?.lastServiceCost)} />
          <Row label="Service Center" value={vehicle.maintenance?.serviceCenter} />
        </div>
        {vehicle.maintenance?.notes && (
          <p className="text-xs text-slate-500 mt-3">📝 {vehicle.maintenance.notes}</p>
        )}
      </div>

      <div>
        <h4 className="font-semibold mb-3">Activity History</h4>
        {(vehicle.history || []).length === 0 ? (
          <p className="text-sm text-slate-500">No activity recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {vehicle.history.map((h) => (
              <div key={h.id} className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                  h.type === 'Trip' ? 'bg-blue-500/15 text-blue-400' :
                  h.type === 'Maintenance' ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {h.type === 'Trip' ? '🚚' : h.type === 'Maintenance' ? '🔧' : '⛽'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{h.title}</p>
                    <span className="text-xs text-slate-500 shrink-0">{formatDate(h.date)}</span>
                  </div>
                  <p className="text-xs text-slate-500">{h.description}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    {h.driverName && h.driverName !== '—' && `Driver: ${h.driverName} • `}
                    Odometer: {h.odometerKm?.toLocaleString()} km
                    {h.cost > 0 && ` • Cost: ${formatCurrency(h.cost)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}