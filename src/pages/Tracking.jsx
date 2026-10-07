import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import TrackingMap from '../components/tracking/TrackingMap.jsx';
import TrackingList from '../components/tracking/TrackingList.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useFleet } from '../context/FleetContext.jsx';
import { statusColor } from '../utils/helpers.js';

export default function Tracking() {
  const { state } = useFleet();
  const [selectedId, setSelectedId] = useState(
    state.tracking[0]?.vehicleId || null
  );

  const selected = useMemo(
    () => state.tracking.find((t) => t.vehicleId === selectedId),
    [state.tracking, selectedId]
  );

  if (state.loading) {
    return (
      <Layout title="Live Tracking">
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout title="Live Tracking">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MAP + DETAILS */}
        <div className="lg:col-span-2 space-y-4">
          <TrackingMap
            items={state.tracking}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {selected && (
            <Card className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-semibold">
                    {selected.vehicleNumber} • {selected.vehicleName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Driver: {selected.driverName} • Shipment:{' '}
                    {selected.shipmentId || '—'}
                  </p>
                </div>
                <Badge className={statusColor(selected.status)}>
                  {selected.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  {
                    label: 'Speed',
                    value: (
                      <>
                        {selected.speedKmph}{' '}
                        <span className="text-xs opacity-60">km/h</span>
                      </>
                    ),
                  },
                  {
                    label: 'ETA',
                    value: selected.etaMinutes
                      ? `${selected.etaMinutes} min`
                      : '—',
                  },
                  {
                    label: 'Remaining',
                    value: `${selected.distanceRemainingKm} km`,
                  },
                  {
                    label: 'Progress',
                    value: `${selected.progressPercent}%`,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700"
                  >
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {s.label}
                    </p>
                    <p className="text-lg font-semibold mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>

              {selected.route && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">●</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Origin
                      </p>
                      <p>{selected.route.origin.name}</p>
                    </div>
                  </div>

                  {selected.route.waypoints?.map((w, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-gray-400 mt-0.5">○</span>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          Waypoint
                        </p>
                        <p className="opacity-70">{w.name}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 mt-0.5">●</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Destination
                      </p>
                      <p>{selected.route.destination.name}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[10px] opacity-50 mt-4">
                Last updated: {selected.lastUpdated}
              </p>
            </Card>
          )}
        </div>

        {/* SIDEBAR LIST */}
        <div>
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-sm">
              Active Vehicles ({state.tracking.length})
            </h3>
            <TrackingList
              items={state.tracking}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}