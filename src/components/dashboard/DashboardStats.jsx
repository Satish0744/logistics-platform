import { useFleet } from '../../context/FleetContext.jsx';
import StatCard from '../ui/StatCard.jsx';

export default function DashboardStats() {
  const { state } = useFleet();
  const { vehicles, drivers, shipments } = state;

  const activeVehicles = vehicles.filter((v) => v.status === 'On Trip').length;
  const activeDrivers = drivers.filter((d) => d.available === 'On Trip').length;
  const activeShipments = shipments.filter((s) => !['Delivered', 'Cancelled'].includes(s.status)).length;
  const delivered = shipments.filter((s) => s.status === 'Delivered').length;
  const inTransit = shipments.filter((s) => s.status === 'In Transit').length;
  const delayed = shipments.filter((s) => s.status === 'Delayed').length;

  const deliveredList = shipments.filter((s) => s.status === 'Delivered' && s.actualDeliveryDate && s.expectedDeliveryDate);
  const onTime = deliveredList.filter((s) => new Date(s.actualDeliveryDate) <= new Date(s.expectedDeliveryDate)).length;
  const performance = deliveredList.length ? Math.round((onTime / deliveredList.length) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Vehicles" value={vehicles.length} sub={`${activeVehicles} on trip`} icon="🚚" accent="blue" />
      <StatCard label="Total Drivers" value={drivers.length} sub={`${activeDrivers} active`} icon="👤" accent="violet" />
      <StatCard label="Active Shipments" value={activeShipments} sub={`${inTransit} in transit`} icon="📦" accent="amber" />
      <StatCard label="Delivered" value={delivered} sub={`${delayed} delayed`} icon="✅" accent="emerald" />
      <StatCard label="Delayed" value={delayed} sub="Requires attention" icon="⏱️" accent="rose" />
      <StatCard label="On-Time Rate" value={`${performance}%`} sub="Last 30 days" icon="📈" accent="emerald" />
    </div>
  );
}