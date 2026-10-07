import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import NotificationsPanel from '../components/notifications/NotificationsPanel.jsx';
import Select from '../components/ui/Select.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';
import { useFleetActions } from '../hooks/useFleetActions.js';

export default function Notifications() {
  const { state } = useFleet();
  const actions = useFleetActions();
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = useMemo(() => {
    return state.notifications.filter((n) => typeFilter === 'All' || n.type === typeFilter);
  }, [state.notifications, typeFilter]);

  if (state.loading) return <Layout title="Notifications"><Loader /></Layout>;

  return (
    <Layout title="Notifications & Alerts">
      <div className="mb-4 max-w-xs">
        <Select label="Filter by Type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Types' },
            { value: 'delayed_shipment', label: 'Delayed Shipments' },
            { value: 'vehicle_maintenance', label: 'Vehicle Maintenance' },
            { value: 'delivery_update', label: 'Delivery Updates' },
            { value: 'driver_status', label: 'Driver Status' },
          ]}
        />
      </div>
      <NotificationsPanel
        notifications={filtered}
        onMarkRead={actions.markNotificationRead}
        onMarkAllRead={actions.markAllRead}
      />
    </Layout>
  );
}