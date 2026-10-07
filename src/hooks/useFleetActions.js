import { useCallback } from 'react';
import { useFleet } from '../context/FleetContext.jsx';

const now = () => new Date().toISOString().slice(0, 16).replace('T', ' ');

export function useFleetActions() {
  const { state, dispatch } = useFleet();

  const pushNotification = useCallback((n) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: 'NTF-' + Date.now(), timestamp: now(), read: false, severity: 'info', ...n },
    });
  }, [dispatch]);

  // ---------- VEHICLES ----------
  const createVehicle = useCallback((data) => {
    const id = 'VH-' + (1000 + state.vehicles.length + 1);
    const vehicle = {
      id, ...data,
      capacityKg: Number(data.capacityKg) || 0,
      mileageKmpl: Number(data.mileageKmpl) || 0,
      odometerKm: Number(data.odometerKm) || 0,
      rto: data.rto || { rtoCode: '—', rtoName: '—', state: '—', registrationDate: '—', validUpto: '—' },
      permit: data.permit || { permitNumber: '—', type: '—', issuedBy: '—', validFrom: '—', validUpto: '—', status: 'Active' },
      insurance: data.insurance || { policyNumber: '—', provider: '—', validFrom: '—', validUpto: '—', premium: 0, status: 'Active' },
      fuel: data.fuel || { fuelLevelPercent: 100, lastRefuelDate: '—', lastRefuelLiters: 0, avgMileage: 0, fuelCardNumber: '—' },
      maintenance: data.maintenance || { lastServiceDate: '—', nextServiceDue: '—', lastServiceCost: 0, lastServiceOdometer: 0, serviceCenter: '—', notes: '' },
      location: data.location || { lat: 18.5204, lng: 73.8567, city: 'Pune', address: '—' },
      history: data.history || [],
    };
    dispatch({ type: 'ADD_VEHICLE', payload: vehicle });
    pushNotification({ type: 'vehicle_maintenance', title: 'Vehicle Added', message: `${vehicle.name} (${vehicle.registrationNumber}) added.`, relatedId: id, relatedType: 'vehicle' });
    return vehicle;
  }, [state.vehicles, dispatch, pushNotification]);

  const updateVehicle = useCallback((id, data) => {
    const existing = state.vehicles.find(v => v.id === id);
    if (!existing) return null;
    const updated = { ...existing, ...data,
      capacityKg: Number(data.capacityKg ?? existing.capacityKg),
      mileageKmpl: Number(data.mileageKmpl ?? existing.mileageKmpl),
      odometerKm: Number(data.odometerKm ?? existing.odometerKm),
    };
    dispatch({ type: 'UPDATE_VEHICLE', payload: updated });
    return updated;
  }, [state.vehicles, dispatch]);

  const deleteVehicle = useCallback((id) => dispatch({ type: 'DELETE_VEHICLE', payload: id }), [dispatch]);

  // ---------- DRIVERS ----------
  const createDriver = useCallback((data) => {
    const id = 'DRV-' + (2000 + state.drivers.length + 1);
    const driver = {
      id, ...data,
      rating: Number(data.rating) || 4.0,
      experienceYears: Number(data.experienceYears) || 0,
      totalTrips: 0, completedTrips: 0, delayedTrips: 0,
      onTimeRate: 100, totalDistanceKm: 0,
      salary: Number(data.salary) || 0,
      performance: { onTimeDelivery: 100, customerRating: Number(data.rating) || 4.0, safetyScore: 90, fuelEfficiency: 85 },
      history: data.history || [],
    };
    dispatch({ type: 'ADD_DRIVER', payload: driver });
    pushNotification({ type: 'driver_status', title: 'Driver Added', message: `${driver.name} joined the fleet.`, relatedId: id, relatedType: 'driver' });
    return driver;
  }, [state.drivers, dispatch, pushNotification]);

  const updateDriver = useCallback((id, data) => {
    const existing = state.drivers.find(d => d.id === id);
    if (!existing) return null;
    const updated = { ...existing, ...data,
      rating: Number(data.rating ?? existing.rating),
      experienceYears: Number(data.experienceYears ?? existing.experienceYears),
      salary: Number(data.salary ?? existing.salary),
    };
    dispatch({ type: 'UPDATE_DRIVER', payload: updated });
    return updated;
  }, [state.drivers, dispatch]);

  const deleteDriver = useCallback((id) => dispatch({ type: 'DELETE_DRIVER', payload: id }), [dispatch]);

  // ---------- SHIPMENTS ----------
  const createShipment = useCallback((data) => {
    const id = 'SHP-' + (3000 + state.shipments.length + 1);
    const shipment = {
      id, ...data,
      freightAmount: Number(data.freightAmount) || 0,
      distanceKm: Number(data.distanceKm) || 0,
      createdDate: new Date().toISOString().slice(0, 10),
      actualDeliveryDate: null,
      deliveryHistory: [{
        id: id + '-D1', date: new Date().toISOString().slice(0, 10),
        time: new Date().toTimeString().slice(0, 5),
        status: 'Pending', location: data.pickup?.city || '—',
        note: 'Shipment created', updatedBy: 'System',
      }],
    };
    dispatch({ type: 'ADD_SHIPMENT', payload: shipment });
    pushNotification({ type: 'delivery_update', title: 'Shipment Created', message: `${id} created for ${data.customer?.name}.`, relatedId: id, relatedType: 'shipment' });
    return shipment;
  }, [state.shipments, dispatch, pushNotification]);

  const updateShipment = useCallback((id, data) => {
    const existing = state.shipments.find(s => s.id === id);
    if (!existing) return null;
    const updated = { ...existing, ...data,
      freightAmount: Number(data.freightAmount ?? existing.freightAmount),
      distanceKm: Number(data.distanceKm ?? existing.distanceKm),
    };
    if (data.assignedDriverId) {
      const d = state.drivers.find(x => x.id === data.assignedDriverId);
      if (d) {
        updated.assignedDriverName = d.name;
        if (d.assignedVehicleId) {
          const v = state.vehicles.find(x => x.id === d.assignedVehicleId);
          if (v) { updated.assignedVehicleId = v.id; updated.assignedVehicleNumber = v.registrationNumber; }
        }
      }
    }
    dispatch({ type: 'UPDATE_SHIPMENT', payload: updated });
    return updated;
  }, [state.shipments, state.drivers, state.vehicles, dispatch]);

  const deleteShipment = useCallback((id) => dispatch({ type: 'DELETE_SHIPMENT', payload: id }), [dispatch]);

  // ---------- NOTIFICATIONS ----------
  const markNotificationRead = useCallback((id) => dispatch({ type: 'MARK_NOTIF_READ', payload: id }), [dispatch]);
  const markAllRead = useCallback(() => dispatch({ type: 'MARK_ALL_READ' }), [dispatch]);

  return {
    createVehicle, updateVehicle, deleteVehicle,
    createDriver, updateDriver, deleteDriver,
    createShipment, updateShipment, deleteShipment,
    markNotificationRead, markAllRead,
  };
}