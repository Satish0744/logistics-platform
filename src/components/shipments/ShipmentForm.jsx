import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Textarea from '../ui/Textarea.jsx';
import Button from '../ui/Button.jsx';
import { SHIPMENT_STATUSES, PRIORITIES } from '../../utils/helpers.js';

const empty = {
  customerName: '', customerPhone: '', customerEmail: '', customerAddress: '', customerCity: '', customerState: '', customerPincode: '',
  pickupLocation: '', pickupAddress: '', pickupCity: '', pickupState: '', pickupPincode: '', pickupDate: '', pickupTime: '', pickupContact: '', pickupContactPhone: '',
  dropLocation: '', dropAddress: '', dropCity: '', dropState: '', dropPincode: '', dropDate: '', dropTime: '', dropContact: '', dropContactPhone: '',
  goodsDescription: '', goodsWeight: '', goodsQty: '', goodsPackaging: '', goodsValue: '',
  assignedDriverId: '', status: 'Pending', priority: 'Medium', paymentMode: 'Prepaid',
  freightAmount: '', distanceKm: '', expectedDeliveryDate: '', notes: '',
};

export default function ShipmentForm({ initial, drivers, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return empty;
    return {
      ...empty,
      customerName: initial.customer?.name || '', customerPhone: initial.customer?.phone || '',
      customerEmail: initial.customer?.email || '', customerAddress: initial.customer?.address?.line1 || '',
      customerCity: initial.customer?.address?.city || '', customerState: initial.customer?.address?.state || '',
      customerPincode: initial.customer?.address?.pincode || '',
      pickupLocation: initial.pickup?.location || '', pickupAddress: initial.pickup?.address || '',
      pickupCity: initial.pickup?.city || '', pickupState: initial.pickup?.state || '', pickupPincode: initial.pickup?.pincode || '',
      pickupDate: initial.pickup?.date || '', pickupTime: initial.pickup?.time || '',
      pickupContact: initial.pickup?.contactPerson || '', pickupContactPhone: initial.pickup?.contactPhone || '',
      dropLocation: initial.drop?.location || '', dropAddress: initial.drop?.address || '',
      dropCity: initial.drop?.city || '', dropState: initial.drop?.state || '', dropPincode: initial.drop?.pincode || '',
      dropDate: initial.drop?.date || '', dropTime: initial.drop?.time || '',
      dropContact: initial.drop?.contactPerson || '', dropContactPhone: initial.drop?.contactPhone || '',
      goodsDescription: initial.goods?.description || '', goodsWeight: initial.goods?.weightKg || '',
      goodsQty: initial.goods?.quantity || '', goodsPackaging: initial.goods?.packaging || '',
      goodsValue: initial.goods?.value || '',
      assignedDriverId: initial.assignedDriverId || '', status: initial.status || 'Pending',
      priority: initial.priority || 'Medium', paymentMode: initial.paymentMode || 'Prepaid',
      freightAmount: initial.freightAmount || '', distanceKm: initial.distanceKm || '',
      expectedDeliveryDate: initial.expectedDeliveryDate || '', notes: initial.notes || '',
    };
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Required';
    if (!form.pickupCity.trim()) e.pickupCity = 'Required';
    if (!form.dropCity.trim()) e.dropCity = 'Required';
    if (!form.goodsDescription.trim()) e.goodsDescription = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      customer: { name: form.customerName, phone: form.customerPhone, email: form.customerEmail, address: { line1: form.customerAddress, city: form.customerCity, state: form.customerState, pincode: form.customerPincode } },
      pickup: { location: form.pickupLocation, address: form.pickupAddress, city: form.pickupCity, state: form.pickupState, pincode: form.pickupPincode, date: form.pickupDate, time: form.pickupTime, contactPerson: form.pickupContact, contactPhone: form.pickupContactPhone, lat: initial?.pickup?.lat || 18.5, lng: initial?.pickup?.lng || 73.8 },
      drop: { location: form.dropLocation, address: form.dropAddress, city: form.dropCity, state: form.dropState, pincode: form.dropPincode, date: form.dropDate, time: form.dropTime, contactPerson: form.dropContact, contactPhone: form.dropContactPhone, lat: initial?.drop?.lat || 19.0, lng: initial?.drop?.lng || 73.0 },
      goods: { description: form.goodsDescription, weightKg: Number(form.goodsWeight) || 0, quantity: Number(form.goodsQty) || 0, packaging: form.goodsPackaging, value: Number(form.goodsValue) || 0 },
      assignedDriverId: form.assignedDriverId || null,
      status: form.status, priority: form.priority, paymentMode: form.paymentMode,
      freightAmount: Number(form.freightAmount) || 0,
      distanceKm: Number(form.distanceKm) || 0,
      expectedDeliveryDate: form.expectedDeliveryDate,
      notes: form.notes,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <section>
        <h4 className="text-sm font-semibold text-blue-400 mb-3">Customer Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Name *" value={form.customerName} onChange={(e) => set('customerName', e.target.value)} error={errors.customerName} />
          <Input label="Phone" value={form.customerPhone} onChange={(e) => set('customerPhone', e.target.value)} />
          <Input label="Email" value={form.customerEmail} onChange={(e) => set('customerEmail', e.target.value)} />
          <Input label="Address" value={form.customerAddress} onChange={(e) => set('customerAddress', e.target.value)} />
          <Input label="City" value={form.customerCity} onChange={(e) => set('customerCity', e.target.value)} />
          <Input label="State" value={form.customerState} onChange={(e) => set('customerState', e.target.value)} />
          <Input label="Pincode" value={form.customerPincode} onChange={(e) => set('customerPincode', e.target.value)} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-semibold text-emerald-400 mb-3">Pickup Location</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Location" value={form.pickupLocation} onChange={(e) => set('pickupLocation', e.target.value)} />
          <Input label="Address" value={form.pickupAddress} onChange={(e) => set('pickupAddress', e.target.value)} />
          <Input label="City *" value={form.pickupCity} onChange={(e) => set('pickupCity', e.target.value)} error={errors.pickupCity} />
          <Input label="State" value={form.pickupState} onChange={(e) => set('pickupState', e.target.value)} />
          <Input label="Date" type="date" value={form.pickupDate} onChange={(e) => set('pickupDate', e.target.value)} />
          <Input label="Time" type="time" value={form.pickupTime} onChange={(e) => set('pickupTime', e.target.value)} />
          <Input label="Contact Person" value={form.pickupContact} onChange={(e) => set('pickupContact', e.target.value)} />
          <Input label="Contact Phone" value={form.pickupContactPhone} onChange={(e) => set('pickupContactPhone', e.target.value)} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-semibold text-rose-400 mb-3">Drop Location</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Location" value={form.dropLocation} onChange={(e) => set('dropLocation', e.target.value)} />
          <Input label="Address" value={form.dropAddress} onChange={(e) => set('dropAddress', e.target.value)} />
          <Input label="City *" value={form.dropCity} onChange={(e) => set('dropCity', e.target.value)} error={errors.dropCity} />
          <Input label="State" value={form.dropState} onChange={(e) => set('dropState', e.target.value)} />
          <Input label="Date" type="date" value={form.dropDate} onChange={(e) => set('dropDate', e.target.value)} />
          <Input label="Time" type="time" value={form.dropTime} onChange={(e) => set('dropTime', e.target.value)} />
          <Input label="Contact Person" value={form.dropContact} onChange={(e) => set('dropContact', e.target.value)} />
          <Input label="Contact Phone" value={form.dropContactPhone} onChange={(e) => set('dropContactPhone', e.target.value)} />
        </div>
      </section>

      <section>
        <h4 className="text-sm font-semibold text-amber-400 mb-3">Goods & Assignment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Description *" value={form.goodsDescription} onChange={(e) => set('goodsDescription', e.target.value)} error={errors.goodsDescription} />
          <Input label="Weight (kg)" type="number" value={form.goodsWeight} onChange={(e) => set('goodsWeight', e.target.value)} />
          <Input label="Quantity" type="number" value={form.goodsQty} onChange={(e) => set('goodsQty', e.target.value)} />
          <Input label="Packaging" value={form.goodsPackaging} onChange={(e) => set('goodsPackaging', e.target.value)} />
          <Input label="Goods Value" type="number" value={form.goodsValue} onChange={(e) => set('goodsValue', e.target.value)} />
          <Select label="Assign Driver" value={form.assignedDriverId || ''} onChange={(e) => set('assignedDriverId', e.target.value)}
            options={[{ value: '', label: '— Unassigned —' }, ...drivers.map((d) => ({ value: d.id, label: `${d.name} (${d.id})` }))]} />
          <Select label="Status" value={form.status} onChange={(e) => set('status', e.target.value)} options={SHIPMENT_STATUSES} />
          <Select label="Priority" value={form.priority} onChange={(e) => set('priority', e.target.value)} options={PRIORITIES} />
          <Select label="Payment Mode" value={form.paymentMode} onChange={(e) => set('paymentMode', e.target.value)} options={['Prepaid', 'COD', 'Credit']} />
          <Input label="Freight Amount" type="number" value={form.freightAmount} onChange={(e) => set('freightAmount', e.target.value)} />
          <Input label="Distance (km)" type="number" value={form.distanceKm} onChange={(e) => set('distanceKm', e.target.value)} />
          <Input label="Expected Delivery Date" type="date" value={form.expectedDeliveryDate} onChange={(e) => set('expectedDeliveryDate', e.target.value)} />
        </div>
        <Textarea label="Notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} className="mt-3" />
      </section>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update Shipment' : 'Create Shipment'}</Button>
      </div>
    </form>
  );
}