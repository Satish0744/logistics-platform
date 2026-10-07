import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/helpers.js';
import { useTheme } from '../../context/ThemeContext.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/vehicles', label: 'Vehicles', icon: '🚚' },
  { to: '/drivers', label: 'Drivers', icon: '👤' },
  { to: '/shipments', label: 'Shipments', icon: '📦' },
  { to: '/tracking', label: 'Tracking', icon: '🗺️' },
  { to: '/notifications', label: 'Notifications', icon: '🔔' },
];

export default function Sidebar({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 z-40 h-screen w-64 flex flex-col transition-transform',
          'bg-white dark:bg-slate-900',
          'border-r border-gray-200 dark:border-slate-800',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="font-bold text-sm">FleetOps</p>
              <p className="text-[10px] uppercase tracking-wider opacity-70">
                Logistics Platform
              </p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-500/15 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                )
              }
            >
              <span className="text-base">{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* =====================================================
            THEME TOGGLE BUTTON — bottom of sidebar
            ===================================================== */}
        <div className="p-3 border-t border-gray-200 dark:border-slate-800">
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              'border border-gray-200 dark:border-slate-700',
              'bg-gray-50 dark:bg-slate-800',
              'hover:bg-gray-100 dark:hover:bg-slate-700'
            )}
          >
            <span className="flex items-center gap-3">
              <span className="text-base">{isDark ? '🌙' : '☀️'}</span>
              <span className="font-medium">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </span>

            {/* Pill switch */}
            <span
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors',
                isDark ? 'bg-blue-600' : 'bg-gray-300'
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                  isDark ? 'translate-x-4' : 'translate-x-0'
                )}
              />
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 text-xs opacity-60">© 2026 FleetOps Inc.</div>
      </aside>
    </>
  );
}