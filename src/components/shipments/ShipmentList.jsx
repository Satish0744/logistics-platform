import ShipmentCard from './ShipmentCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function ShipmentList({ shipments, onView, onEdit, onDelete }) {
  if (!shipments.length) {
    return <EmptyState icon="📦" title="No shipments found" description="Create a shipment to get started." />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {shipments.map((s) => (
        <ShipmentCard key={s.id} shipment={s} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}