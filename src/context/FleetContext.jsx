import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import api from '../api/api.js';

const FleetContext = createContext(null);

const initialState = {
  vehicles: [], drivers: [], shipments: [], tracking: [], notifications: [], activities: [],
  loading: true, error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: true, error: null };
    case 'ERROR': return { ...state, loading: false, error: action.payload };
    case 'SET_ALL': return { ...state, ...action.payload, loading: false, error: null };

    case 'ADD_VEHICLE': return { ...state, vehicles: [action.payload, ...state.vehicles] };
    case 'UPDATE_VEHICLE': return { ...state, vehicles: state.vehicles.map(v => v.id === action.payload.id ? action.payload : v) };
    case 'DELETE_VEHICLE': return { ...state, vehicles: state.vehicles.filter(v => v.id !== action.payload) };

    case 'ADD_DRIVER': return { ...state, drivers: [action.payload, ...state.drivers] };
    case 'UPDATE_DRIVER': return { ...state, drivers: state.drivers.map(d => d.id === action.payload.id ? action.payload : d) };
    case 'DELETE_DRIVER': return { ...state, drivers: state.drivers.filter(d => d.id !== action.payload) };

    case 'ADD_SHIPMENT': return { ...state, shipments: [action.payload, ...state.shipments] };
    case 'UPDATE_SHIPMENT': return { ...state, shipments: state.shipments.map(s => s.id === action.payload.id ? action.payload : s) };
    case 'DELETE_SHIPMENT': return { ...state, shipments: state.shipments.filter(s => s.id !== action.payload) };

    case 'ADD_NOTIFICATION': return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIF_READ': return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case 'MARK_ALL_READ': return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };

    default: return state;
  }
}

export function FleetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;
    (async () => {
      dispatch({ type: 'LOADING' });
      try {
        const data = await api.getAll();
        if (mounted) dispatch({ type: 'SET_ALL', payload: data });
      } catch (e) {
        if (mounted) dispatch({ type: 'ERROR', payload: e.message || 'Failed to load data' });
      }
    })();
    return () => { mounted = false; };
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
}

export function useFleet() {
  const ctx = useContext(FleetContext);
  if (!ctx) throw new Error('useFleet must be used within FleetProvider');
  return ctx;
}