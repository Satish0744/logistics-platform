import { cn } from '../../utils/helpers.js';

export default function Textarea({ label, error, className = '', ...rest }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>}
      <textarea
        rows={3}
        className={cn('w-full bg-slate-950 border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 resize-none',
          error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500')}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}