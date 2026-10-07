import RAW_DATA from '../data/data.js';

// Simulated network delay
const delay = (ms = 350) => new Promise((res) => setTimeout(res, ms));

/**
 * This is the ONLY file that touches mock data.
 * When you plug in a real backend, replace the bodies with fetch() calls
 * but keep the same function names + return shapes.
 */
export const api = {
  async getVehicles() { await delay(); return [...RAW_DATA.vehicles]; },
  async getDrivers() { await delay(); return [...RAW_DATA.drivers]; },
  async getShipments() { await delay(); return [...RAW_DATA.shipments]; },
  async getTracking() { await delay(); return [...RAW_DATA.tracking]; },
  async getNotifications() { await delay(); return [...RAW_DATA.notifications]; },
  async getActivities() { await delay(); return [...RAW_DATA.activities]; },

  async getAll() {
    await delay(400);
    return {
      vehicles: [...RAW_DATA.vehicles],
      drivers: [...RAW_DATA.drivers],
      shipments: [...RAW_DATA.shipments],
      tracking: [...RAW_DATA.tracking],
      notifications: [...RAW_DATA.notifications],
      activities: [...RAW_DATA.activities],
    };
  },
};

export default api;