import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import VehicleList from '../components/vehicles/VehicleList.jsx';
import VehicleForm from '../components/vehicles/VehicleForm.jsx';
import VehicleDetails from '../components/vehicles/VehicleDetails.jsx';
import Modal from '../components/ui/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import SearchFilterBar from '../components/ui/SearchFilterBar.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';
import { useFleetActions } from '../hooks/useFleetActions.js';
import { VEHICLE_STATUSES, FUEL_TYPES } from '../utils/helpers.js';

export default function Vehicles() {
  const { state } = useFleet();
  const actions = useFleetActions();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [modal, setModal] = useState(null); // { type: 'create'|'edit'|'view'|'delete', vehicle }
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    return state.vehicles.filter((v) => {
      if (statusFilter !== 'All' && v.status !== statusFilter) return false;
      if (fuelFilter !== 'All' && v.fuelType !== fuelFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return v.name.toLowerCase().includes(q) ||
          v.registrationNumber.toLowerCase().includes(q) ||
          v.ownerName.toLowerCase().includes(q) ||
          v.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [state.vehicles, search, statusFilter, fuelFilter]);

  const handleSubmit = (payload) => {
    if (modal?.type === 'edit') actions.updateVehicle(modal.vehicle.id, payload);
    else actions.createVehicle(payload);
    setModal(null);
  };

  return (
    <Layout title="Vehicles">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{filtered.length} of {state.vehicles.length} vehicles</p>
        <Button onClick={() => setModal({ type: 'create' })}>+ Add Vehicle</Button>
      </div>

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={[
          { label: 'Status', value: statusFilter, onChange: setStatusFilter, options: ['All', ...VEHICLE_STATUSES] },
          { label: 'Fuel', value: fuelFilter, onChange: setFuelFilter, options: ['All', ...FUEL_TYPES] },
        ]}
      />

      {state.loading ? <Loader /> : (
        <VehicleList
          vehicles={filtered}
          drivers={state.drivers}
          onView={(v) => setModal({ type: 'view', vehicle: v })}
          onEdit={(v) => setModal({ type: 'edit', vehicle: v })}
          onDelete={(v) => setConfirmDelete(v)}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modal?.type === 'create' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.type === 'edit' ? 'Edit Vehicle' : 'Add New Vehicle'}
        size="lg"
      >
        <VehicleForm
          initial={modal?.vehicle}
          drivers={state.drivers}
          onSubmit={handleSubmit}
          onCancel={() => setModal(null)}
        />
      </Modal>

      {/* View Modal */}
      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title="Vehicle Details" size="xl">
        <VehicleDetails vehicle={modal?.vehicle} driver={state.drivers.find((d) => d.id === modal?.vehicle?.driverId)} />
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { actions.deleteVehicle(confirmDelete.id); setConfirmDelete(null); }}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">Delete <span className="font-semibold">{confirmDelete?.name}</span> ({confirmDelete?.registrationNumber})? This cannot be undone.</p>
      </Modal>
    </Layout>
  );
}