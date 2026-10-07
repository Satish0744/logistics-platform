import { useEffect, Fragment } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../../context/ThemeContext.jsx';

/* ============================================================
   Custom icon factory — circle badge + directional arrow
   ============================================================ */
const colorFor = (status, isSelected) => {
  if (isSelected) return '#2563eb';
  if (status === 'Delayed') return '#dc2626';
  if (status === 'Idle') return '#6b7280';
  if (status === 'Out for Delivery') return '#8b5cf6';
  return '#10b981';
};

const createVehicleIcon = (status, headingDeg = 0, isSelected = false) => {
  const color = colorFor(status, isSelected);
  const size = isSelected ? 48 : 40;
  const anchor = size / 2;

  const html = `
    <div style="position: relative; width: ${size}px; height: ${size}px;">
      <div style="position: absolute; inset: 0; transform: rotate(${headingDeg}deg); transition: transform 0.4s ease;">
        <div style="position:absolute; top:-9px; left:50%; margin-left:-6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2 L20 22 L12 18 L4 22 Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div style="position: absolute; inset: 0; border-radius: 50%; background: ${color}; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(0,0,0,0.35);">
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M3 6h11v9H3z M14 9h4l3 3v3h-7z M6 19.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z M17 19.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z"/>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: `vehicle-marker ${isSelected ? 'selected' : ''}`,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor],
    popupAnchor: [0, -anchor],
  });
};

const createPinIcon = (color) =>
  L.divIcon({
    html: `<div style="width: 14px; height: 14px; border-radius: 50%; background: ${color}; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

/* ============================================================
   Auto-fit bounds
   ============================================================ */
function FitBounds({ items }) {
  const map = useMap();
  useEffect(() => {
    if (!items?.length) return;
    const points = [];
    items.forEach((t) => {
      if (typeof t.lat === 'number' && typeof t.lng === 'number') {
        points.push([t.lat, t.lng]);
      }
      if (t.route) {
        points.push([t.route.origin.lat, t.route.origin.lng]);
        points.push([t.route.destination.lat, t.route.destination.lng]);
      }
    });
    if (points.length) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
    }
  }, [items, map]);
  return null;
}

/* ============================================================
   Main component
   ============================================================ */
export default function TrackingMap({ items = [], selectedId, onSelect }) {
  const { theme } = useTheme();

  const tileUrl =
    theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <MapContainer
        center={[18.75, 73.5]}
        zoom={8}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          key={theme}
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        <FitBounds items={items} />

        {items.map((t) => {
          const isSelected = t.vehicleId === selectedId;
          const routePoints = t.route
            ? [
                [t.route.origin.lat, t.route.origin.lng],
                ...(t.route.waypoints || []).map((w) => [w.lat, w.lng]),
                [t.route.destination.lat, t.route.destination.lng],
              ]
            : null;

          return (
            <Fragment key={t.vehicleId}>
              {routePoints && (
                <Polyline
                  positions={routePoints}
                  pathOptions={{
                    color: isSelected ? '#2563eb' : '#94a3b8',
                    weight: isSelected ? 5 : 3,
                    opacity: isSelected ? 0.9 : 0.55,
                    dashArray: isSelected ? undefined : '8,10',
                    lineCap: 'round',
                  }}
                />
              )}

              {t.route && (
                <Marker
                  position={[t.route.origin.lat, t.route.origin.lng]}
                  icon={createPinIcon('#10b981')}
                >
                  <Popup>
                    <strong>🟢 Origin</strong>
                    <br />
                    {t.route.origin.name}
                  </Popup>
                </Marker>
              )}

              {t.route?.waypoints?.map((w, i) => (
                <Marker
                  key={`wp-${t.vehicleId}-${i}`}
                  position={[w.lat, w.lng]}
                  icon={createPinIcon('#94a3b8')}
                >
                  <Popup>
                    <strong>Waypoint</strong>
                    <br />
                    {w.name}
                  </Popup>
                </Marker>
              ))}

              {t.route && (
                <Marker
                  position={[t.route.destination.lat, t.route.destination.lng]}
                  icon={createPinIcon('#ef4444')}
                >
                  <Popup>
                    <strong>🔴 Destination</strong>
                    <br />
                    {t.route.destination.name}
                  </Popup>
                </Marker>
              )}

              <Marker
                position={[t.lat, t.lng]}
                icon={createVehicleIcon(t.status, t.headingDeg, isSelected)}
                eventHandlers={{
                  click: () => onSelect?.(t.vehicleId),
                }}
                zIndexOffset={isSelected ? 1000 : 0}
              >
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong>{t.vehicleNumber}</strong>
                    <br />
                    {t.vehicleName}
                    <br />
                    <span style={{ opacity: 0.7 }}>Driver: {t.driverName}</span>
                    <br />
                    <span style={{ opacity: 0.7 }}>Status: {t.status}</span>
                    <br />
                    <span style={{ opacity: 0.7 }}>Speed: {t.speedKmph} km/h</span>
                    {t.shipmentId && (
                      <>
                        <br />
                        <span style={{ opacity: 0.7 }}>
                          Shipment: {t.shipmentId}
                        </span>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-gray-200 dark:border-slate-700 rounded-lg p-3 text-xs shadow-lg">
        <p className="font-semibold mb-2">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span>Moving</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
            <span>Out for Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span>Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6b7280]" />
            <span>Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}