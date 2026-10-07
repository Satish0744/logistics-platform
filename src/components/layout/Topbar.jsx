import { useFleet } from '../../context/FleetContext.jsx';

export default function Topbar({ title, onMenuClick }) {
  const { state } = useFleet();
  const unread = state.notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-2xl"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-xl">🔔</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 min-w-[16px] text-center font-medium">
                {unread}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium">Admin</p>
              <p className="text-[10px] opacity-60">Dispatcher</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}