import DriverCard from './DriverCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function DriverList({ drivers, vehicles, onView, onEdit, onDelete }) {
  if (!drivers.length) {
    return <EmptyState icon="👤" title="No drivers found" description="Try adjusting your filters." />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drivers.map((d) => (
        <DriverCard
          key={d.id}
          driver={d}
          vehicle={vehicles.find((v) => v.id === d.assignedVehicleId)}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}