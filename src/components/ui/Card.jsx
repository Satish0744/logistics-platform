import { cn } from '../../utils/helpers.js';

export default function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900',
        'border border-gray-200 dark:border-slate-800',
        'rounded-xl shadow-card dark:shadow-none',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}