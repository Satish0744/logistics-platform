import VehicleCard from './VehicleCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function VehicleList({ vehicles, drivers, onView, onEdit, onDelete }) {
  if (!vehicles.length) {
    return <EmptyState icon="🚚" title="No vehicles found" description="Try adjusting filters or add a new vehicle." />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vehicles.map((v) => (
        <VehicleCard
          key={v.id}
          vehicle={v}
          driver={drivers.find((d) => d.id === v.driverId)}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}