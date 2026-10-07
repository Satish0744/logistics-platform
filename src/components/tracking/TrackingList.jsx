import Badge from '../ui/Badge.jsx';
import { statusColor, cn } from '../../utils/helpers.js';

export default function TrackingList({ items, selectedId, onSelect }) {
  return (
    <div className="space-y-2 max-h-[520px] overflow-y-auto scrollbar-thin pr-1">
      {items.map((t) => (
        <button
          key={t.vehicleId}
          onClick={() => onSelect(t.vehicleId)}
          className={cn(
            'w-full text-left p-3 rounded-lg border transition-colors',
            t.vehicleId === selectedId
              ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/40'
              : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800'
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">{t.vehicleNumber}</p>
            <Badge className={statusColor(t.status)}>{t.status}</Badge>
          </div>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            {t.vehicleName} • {t.driverName}
          </p>

          <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-500 dark:text-slate-400">
            <span>🚀 {t.speedKmph} km/h</span>
            {t.etaMinutes != null && <span>⏱️ ETA {t.etaMinutes}m</span>}
            {t.distanceRemainingKm > 0 && (
              <span>📏 {t.distanceRemainingKm} km left</span>
            )}
          </div>

          {t.progressPercent > 0 && (
            <div className="mt-2 h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${t.progressPercent}%` }}
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}