import Badge from '../ui/Badge.jsx';
import { statusColor, formatDate, formatCurrency } from '../../utils/helpers.js';

const Row = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm text-slate-200">{value || '—'}</p>
  </div>
);

export default function ShipmentDetails({ shipment }) {
  if (!shipment) return null;
  const s = shipment;
  const steps = ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
  const currentStep = steps.indexOf(s.status);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold">{s.id}</h3>
          <p className="text-xs text-slate-500">Created: {formatDate(s.createdDate)}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={statusColor(s.status)}>{s.status}</Badge>
          <Badge className={statusColor(s.priority === 'Urgent' ? 'Delayed' : 'Assigned')}>{s.priority}</Badge>
        </div>
      </div>

      {s.status !== 'Cancelled' && (
        <div className="flex items-center justify-between gap-1">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i <= currentStep ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStep ? 'bg-blue-500' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>
      )}
      {s.status !== 'Cancelled' && (
        <div className="flex justify-between text-[9px] text-slate-500">
          {steps.map((step) => <span key={step} className="flex-1 text-center">{step}</span>)}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="text-sm font-semibold text-blue-400 mb-1">👤 Customer</h4>
          <Row label="Name" value={s.customer?.name} />
          <Row label="Phone" value={s.customer?.phone} />
          <Row label="Email" value={s.customer?.email} />
          <Row label="City" value={s.customer?.address?.city} />
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="text-sm font-semibold text-violet-400 mb-1">🚚 Assignment</h4>
          <Row label="Driver" value={s.assignedDriverName} />
          <Row label="Vehicle" value={s.assignedVehicleNumber} />
          <Row label="Payment" value={s.paymentMode} />
          <Row label="Freight" value={formatCurrency(s.freightAmount)} />
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="text-sm font-semibold text-emerald-400 mb-1">📍 Pickup</h4>
          <Row label="Location" value={s.pickup?.location} />
          <Row label="Address" value={`${s.pickup?.address || ''}, ${s.pickup?.city || ''}`} />
          <Row label="Date & Time" value={`${formatDate(s.pickup?.date)} ${s.pickup?.time || ''}`} />
          <Row label="Contact" value={`${s.pickup?.contactPerson || ''} • ${s.pickup?.contactPhone || ''}`} />
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
          <h4 className="text-sm font-semibold text-rose-400 mb-1">🎯 Drop</h4>
          <Row label="Location" value={s.drop?.location} />
          <Row label="Address" value={`${s.drop?.address || ''}, ${s.drop?.city || ''}`} />
          <Row label="Date & Time" value={`${formatDate(s.drop?.date)} ${s.drop?.time || ''}`} />
          <Row label="Contact" value={`${s.drop?.contactPerson || ''} • ${s.drop?.contactPhone || ''}`} />
        </div>
      </div>

      <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
        <h4 className="text-sm font-semibold text-amber-400 mb-3">📦 Goods</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Row label="Description" value={s.goods?.description} />
          <Row label="Weight" value={`${s.goods?.weightKg} kg`} />
          <Row label="Quantity" value={s.goods?.quantity} />
          <Row label="Value" value={formatCurrency(s.goods?.value)} />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Delivery History</h4>
        <div className="space-y-2">
          {(s.deliveryHistory || []).map((h) => (
            <div key={h.id} className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${statusColor(h.status).includes('emerald') ? 'bg-emerald-500' : statusColor(h.status).includes('rose') ? 'bg-rose-500' : 'bg-blue-500'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{h.status}</p>
                  <span className="text-xs text-slate-500">{formatDate(h.date)} {h.time}</span>
                </div>
                <p className="text-xs text-slate-500">{h.note} — {h.location}</p>
                <p className="text-[10px] text-slate-600">by {h.updatedBy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {s.notes && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
          <p className="text-xs font-medium text-amber-400 mb-1">📝 Notes</p>
          <p className="text-sm text-slate-300">{s.notes}</p>
        </div>
      )}
    </div>
  );
}