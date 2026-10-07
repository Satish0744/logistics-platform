import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import ShipmentList from '../components/shipments/ShipmentList.jsx';
import ShipmentForm from '../components/shipments/ShipmentForm.jsx';
import ShipmentDetails from '../components/shipments/ShipmentDetails.jsx';
import Modal from '../components/ui/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import SearchFilterBar from '../components/ui/SearchFilterBar.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';
import { useFleetActions } from '../hooks/useFleetActions.js';
import { SHIPMENT_STATUSES } from '../utils/helpers.js';

export default function Shipments() {
  const { state } = useFleet();
  const actions = useFleetActions();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    return state.shipments.filter((s) => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      if (priorityFilter !== 'All' && s.priority !== priorityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return s.id.toLowerCase().includes(q) ||
          s.customer?.name.toLowerCase().includes(q) ||
          s.pickup?.city.toLowerCase().includes(q) ||
          s.drop?.city.toLowerCase().includes(q) ||
          (s.assignedDriverName || '').toLowerCase().includes(q);
      }
      return true;
    });
  }, [state.shipments, search, statusFilter, priorityFilter]);

  const handleSubmit = (payload) => {
    if (modal?.type === 'edit') actions.updateShipment(modal.shipment.id, payload);
    else actions.createShipment(payload);
    setModal(null);
  };

  return (
    <Layout title="Shipments">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{filtered.length} of {state.shipments.length} shipments</p>
        <Button onClick={() => setModal({ type: 'create' })}>+ Create Shipment</Button>
      </div>

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={[
          { label: 'Status', value: statusFilter, onChange: setStatusFilter, options: ['All', ...SHIPMENT_STATUSES] },
          { label: 'Priority', value: priorityFilter, onChange: setPriorityFilter, options: ['All', 'Low', 'Medium', 'High', 'Urgent'] },
        ]}
      />

      {state.loading ? <Loader /> : (
        <ShipmentList
          shipments={filtered}
          onView={(s) => setModal({ type: 'view', shipment: s })}
          onEdit={(s) => setModal({ type: 'edit', shipment: s })}
          onDelete={(s) => setConfirmDelete(s)}
        />
      )}

      <Modal
        open={modal?.type === 'create' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.type === 'edit' ? 'Edit Shipment' : 'Create New Shipment'}
        size="xl"
      >
        <ShipmentForm
          initial={modal?.shipment}
          drivers={state.drivers}
          onSubmit={handleSubmit}
          onCancel={() => setModal(null)}
        />
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title="Shipment Details" size="lg">
        <ShipmentDetails shipment={modal?.shipment} />
      </Modal>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { actions.deleteShipment(confirmDelete.id); setConfirmDelete(null); }}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">Delete shipment <span className="font-semibold">{confirmDelete?.id}</span>?</p>
      </Modal>
    </Layout>
  );
}