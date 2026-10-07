import { cn } from '../../utils/helpers.js';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary:
    'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-black dark:text-white border border-gray-300 dark:border-slate-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-black dark:text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
};
const sizes = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}