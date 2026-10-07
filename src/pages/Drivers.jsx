import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import DriverList from '../components/drivers/DriverList.jsx';
import DriverForm from '../components/drivers/DriverForm.jsx';
import DriverDetails from '../components/drivers/DriverDetails.jsx';
import Modal from '../components/ui/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import SearchFilterBar from '../components/ui/SearchFilterBar.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';
import { useFleetActions } from '../hooks/useFleetActions.js';
import { DRIVER_STATUSES } from '../utils/helpers.js';

export default function Drivers() {
  const { state } = useFleet();
  const actions = useFleetActions();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    return state.drivers.filter((d) => {
      if (statusFilter !== 'All' && d.available !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return d.name.toLowerCase().includes(q) ||
          d.phone.includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.licenseNumber.toLowerCase().includes(q);
      }
      return true;
    });
  }, [state.drivers, search, statusFilter]);

  const handleSubmit = (payload) => {
    if (modal?.type === 'edit') actions.updateDriver(modal.driver.id, payload);
    else actions.createDriver(payload);
    setModal(null);
  };

  return (
    <Layout title="Drivers">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{filtered.length} of {state.drivers.length} drivers</p>
        <Button onClick={() => setModal({ type: 'create' })}>+ Add Driver</Button>
      </div>

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={[{ label: 'Status', value: statusFilter, onChange: setStatusFilter, options: ['All', ...DRIVER_STATUSES] }]}
      />

      {state.loading ? <Loader /> : (
        <DriverList
          drivers={filtered}
          vehicles={state.vehicles}
          onView={(d) => setModal({ type: 'view', driver: d })}
          onEdit={(d) => setModal({ type: 'edit', driver: d })}
          onDelete={(d) => setConfirmDelete(d)}
        />
      )}

      <Modal
        open={modal?.type === 'create' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.type === 'edit' ? 'Edit Driver' : 'Add New Driver'}
        size="lg"
      >
        <DriverForm
          initial={modal?.driver}
          vehicles={state.vehicles}
          onSubmit={handleSubmit}
          onCancel={() => setModal(null)}
        />
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title="Driver Details" size="xl">
        <DriverDetails driver={modal?.driver} vehicle={state.vehicles.find((v) => v.id === modal?.driver?.assignedVehicleId)} />
      </Modal>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { actions.deleteDriver(confirmDelete.id); setConfirmDelete(null); }}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">Delete <span className="font-semibold">{confirmDelete?.name}</span> ({confirmDelete?.id})?</p>
      </Modal>
    </Layout>
  );
}