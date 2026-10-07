import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import { DRIVER_STATUSES } from '../../utils/helpers.js';

const empty = {
  name: '', phone: '', altPhone: '', line1: '', city: '', state: 'Maharashtra', pincode: '',
  licenseNumber: '', licenseExpiry: '', experienceYears: '', available: 'Available',
  assignedVehicleId: '', photo: '', rating: 4, salary: '',
};

export default function DriverForm({ initial, vehicles, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return empty;
    return {
      ...empty,
      ...initial,
      line1: initial.address?.line1 || '',
      city: initial.address?.city || '',
      state: initial.address?.state || '',
      pincode: initial.address?.pincode || '',
    };
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.phone.trim()) e.phone = 'Phone required';
    if (!form.licenseNumber.trim()) e.licenseNumber = 'License required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      altPhone: form.altPhone,
      address: { line1: form.line1, city: form.city, state: form.state, pincode: form.pincode },
      licenseNumber: form.licenseNumber,
      licenseExpiry: form.licenseExpiry,
      experienceYears: Number(form.experienceYears) || 0,
      available: form.available,
      assignedVehicleId: form.assignedVehicleId || null,
      photo: form.photo || `https://placehold.co/200x200/1e293b/38bdf8?text=${encodeURIComponent(form.name.split(' ').map(n => n[0]).join(''))}`,
      rating: Number(form.rating) || 4,
      salary: Number(form.salary) || 0,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name *" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        <Input label="Phone *" value={form.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
        <Input label="Alternate Phone" value={form.altPhone} onChange={(e) => set('altPhone', e.target.value)} />
        <Input label="License Number *" value={form.licenseNumber} onChange={(e) => set('licenseNumber', e.target.value)} error={errors.licenseNumber} />
        <Input label="License Expiry" type="date" value={form.licenseExpiry} onChange={(e) => set('licenseExpiry', e.target.value)} />
        <Input label="Experience (years)" type="number" value={form.experienceYears} onChange={(e) => set('experienceYears', e.target.value)} />
        <Select label="Status" value={form.available} onChange={(e) => set('available', e.target.value)} options={DRIVER_STATUSES} />
        <Select label="Assigned Vehicle" value={form.assignedVehicleId || ''} onChange={(e) => set('assignedVehicleId', e.target.value)}
          options={[{ value: '', label: '— Unassigned —' }, ...vehicles.map((v) => ({ value: v.id, label: `${v.name} (${v.registrationNumber})` }))]} />
        <Input label="Rating (0-5)" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
        <Input label="Monthly Salary" type="number" value={form.salary} onChange={(e) => set('salary', e.target.value)} />
        <Input label="Photo URL" value={form.photo} onChange={(e) => set('photo', e.target.value)} />
        <Input label="Address Line" value={form.line1} onChange={(e) => set('line1', e.target.value)} />
        <Input label="City" value={form.city} onChange={(e) => set('city', e.target.value)} />
        <Input label="State" value={form.state} onChange={(e) => set('state', e.target.value)} />
        <Input label="Pincode" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Driver' : 'Add Driver'}</Button>
      </div>
    </form>
  );
}