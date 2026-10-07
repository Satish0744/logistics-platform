import { cn } from '../../utils/helpers.js';

export default function Select({
  label,
  options = [],
  error,
  className = '',
  ...rest
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-medium mb-1.5">{label}</label>
      )}
      <select
        className={cn(
          'w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1',
          'bg-white dark:bg-slate-950',
          'text-black dark:text-white',
          error
            ? 'border border-red-400 focus:ring-red-400'
            : 'border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500'
        )}
        {...rest}
      >
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}