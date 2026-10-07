import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import { FUEL_TYPES, VEHICLE_STATUSES } from '../../utils/helpers.js';

const empty = {
  name: '', model: '', registrationNumber: '', fuelType: 'Diesel', photo: '',
  ownerName: '', status: 'Available', capacityKg: '', mileageKmpl: '', odometerKm: '',
  driverId: '', rtoCode: '', rtoName: '', permitNumber: '', insuranceProvider: '',
  insurancePolicy: '', insuranceValidUpto: '', lastServiceDate: '', nextServiceDue: '',
};

export default function VehicleForm({ initial, drivers, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return empty;
    return {
      ...empty,
      ...initial,
      rtoCode: initial.rto?.rtoCode || '',
      rtoName: initial.rto?.rtoName || '',
      permitNumber: initial.permit?.permitNumber || '',
      insuranceProvider: initial.insurance?.provider || '',
      insurancePolicy: initial.insurance?.policyNumber || '',
      insuranceValidUpto: initial.insurance?.validUpto || '',
      lastServiceDate: initial.maintenance?.lastServiceDate || '',
      nextServiceDue: initial.maintenance?.nextServiceDue || '',
    };
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vehicle name required';
    if (!form.registrationNumber.trim()) e.registrationNumber = 'Registration required';
    if (!form.ownerName.trim()) e.ownerName = 'Owner name required';
    if (form.capacityKg && isNaN(Number(form.capacityKg))) e.capacityKg = 'Must be a number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      model: form.model.trim(),
      registrationNumber: form.registrationNumber.trim().toUpperCase(),
      fuelType: form.fuelType,
      photo: form.photo || `https://placehold.co/640x400/0f172a/38bdf8?text=${encodeURIComponent(form.name)}`,
      ownerName: form.ownerName.trim(),
      status: form.status,
      capacityKg: Number(form.capacityKg) || 0,
      mileageKmpl: Number(form.mileageKmpl) || 0,
      odometerKm: Number(form.odometerKm) || 0,
      driverId: form.driverId || null,
      rto: { rtoCode: form.rtoCode, rtoName: form.rtoName, state: initial?.rto?.state || 'Maharashtra', registrationDate: initial?.rto?.registrationDate || '—', validUpto: initial?.rto?.validUpto || '—' },
      permit: { ...(initial?.permit || {}), permitNumber: form.permitNumber, status: initial?.permit?.status || 'Active' },
      insurance: { ...(initial?.insurance || {}), provider: form.insuranceProvider, policyNumber: form.insurancePolicy, validUpto: form.insuranceValidUpto, status: initial?.insurance?.status || 'Active' },
      maintenance: { ...(initial?.maintenance || {}), lastServiceDate: form.lastServiceDate, nextServiceDue: form.nextServiceDue },
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Vehicle Name *" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        <Input label="Model" value={form.model} onChange={(e) => set('model', e.target.value)} />
        <Input label="Registration Number *" value={form.registrationNumber} onChange={(e) => set('registrationNumber', e.target.value)} error={errors.registrationNumber} />
        <Select label="Fuel Type" value={form.fuelType} onChange={(e) => set('fuelType', e.target.value)} options={FUEL_TYPES} />
        <Input label="Owner Name *" value={form.ownerName} onChange={(e) => set('ownerName', e.target.value)} error={errors.ownerName} />
        <Select label="Status" value={form.status} onChange={(e) => set('status', e.target.value)} options={VEHICLE_STATUSES} />
        <Input label="Capacity (kg)" type="number" value={form.capacityKg} onChange={(e) => set('capacityKg', e.target.value)} error={errors.capacityKg} />
        <Input label="Mileage (kmpl)" type="number" value={form.mileageKmpl} onChange={(e) => set('mileageKmpl', e.target.value)} />
        <Input label="Odometer (km)" type="number" value={form.odometerKm} onChange={(e) => set('odometerKm', e.target.value)} />
        <Select label="Assign Driver" value={form.driverId || ''} onChange={(e) => set('driverId', e.target.value)}
          options={[{ value: '', label: '— Unassigned —' }, ...drivers.map((d) => ({ value: d.id, label: `${d.name} (${d.id})` }))]} />
        <Input label="Photo URL" value={form.photo} onChange={(e) => set('photo', e.target.value)} />
        <Input label="RTO Code" value={form.rtoCode} onChange={(e) => set('rtoCode', e.target.value)} />
        <Input label="RTO Name" value={form.rtoName} onChange={(e) => set('rtoName', e.target.value)} />
        <Input label="Permit Number" value={form.permitNumber} onChange={(e) => set('permitNumber', e.target.value)} />
        <Input label="Insurance Provider" value={form.insuranceProvider} onChange={(e) => set('insuranceProvider', e.target.value)} />
        <Input label="Insurance Policy No." value={form.insurancePolicy} onChange={(e) => set('insurancePolicy', e.target.value)} />
        <Input label="Insurance Valid Upto" type="date" value={form.insuranceValidUpto} onChange={(e) => set('insuranceValidUpto', e.target.value)} />
        <Input label="Last Service Date" type="date" value={form.lastServiceDate} onChange={(e) => set('lastServiceDate', e.target.value)} />
        <Input label="Next Service Due" type="date" value={form.nextServiceDue} onChange={(e) => set('nextServiceDue', e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Vehicle' : 'Add Vehicle'}</Button>
      </div>
    </form>
  );
}