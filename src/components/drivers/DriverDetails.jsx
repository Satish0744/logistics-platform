import Badge from '../ui/Badge.jsx';
import { statusColor, formatDate, formatCurrency } from '../../utils/helpers.js';

const Row = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm text-slate-200">{value || '—'}</p>
  </div>
);

export default function DriverDetails({ driver, vehicle }) {
  if (!driver) return null;
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={driver.photo} alt={driver.name} className="w-32 h-32 rounded-full object-cover border-2 border-slate-800 mx-auto md:mx-0" />
        <div className="flex-1 grid grid-cols-2 gap-3">
          <Row label="Driver ID" value={driver.id} />
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <Badge className={statusColor(driver.available)}>{driver.available}</Badge>
          </div>
          <Row label="Phone" value={driver.phone} />
          <Row label="Alt Phone" value={driver.altPhone} />
          <Row label="License No" value={driver.licenseNumber} />
          <Row label="License Expiry" value={formatDate(driver.licenseExpiry)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="font-semibold text-sm mb-2 text-blue-400">📍 Address</h4>
          <Row label="Line 1" value={driver.address?.line1} />
          <Row label="City" value={driver.address?.city} />
          <Row label="State" value={driver.address?.state} />
          <Row label="Pincode" value={driver.address?.pincode} />
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="font-semibold text-sm mb-2 text-violet-400">🚚 Assigned Vehicle</h4>
          {vehicle ? (
            <>
              <Row label="Vehicle" value={`${vehicle.name} (${vehicle.registrationNumber})`} />
              <Row label="Model" value={vehicle.model} />
              <Row label="Fuel Type" value={vehicle.fuelType} />
            </>
          ) : <p className="text-sm text-slate-500">No vehicle assigned</p>}
          <Row label="Joined" value={formatDate(driver.joinedDate)} />
          <Row label="Salary" value={formatCurrency(driver.salary)} />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Performance Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'On-Time Delivery', value: `${driver.performance?.onTimeDelivery}%`, color: 'emerald' },
            { label: 'Customer Rating', value: driver.performance?.customerRating, color: 'amber' },
            { label: 'Safety Score', value: driver.performance?.safetyScore, color: 'blue' },
            { label: 'Fuel Efficiency', value: driver.performance?.fuelEfficiency, color: 'violet' },
          ].map((m) => (
            <div key={m.label} className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <p className="text-xs text-slate-500">{m.label}</p>
              <p className={`text-xl font-semibold text-${m.color}-400`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Delivery History</h4>
        {(driver.history || []).length === 0 ? (
          <p className="text-sm text-slate-500">No trips recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {driver.history.map((h) => (
              <div key={h.id} className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{h.shipmentId} • {h.from} → {h.to}</p>
                    <Badge className={statusColor(h.status)}>{h.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{formatDate(h.date)} • {h.distanceKm} km • {h.durationHours}h • ⭐ {h.rating}</p>
                </div>
                <p className="text-sm font-semibold text-emerald-400">{formatCurrency(h.earnings)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}