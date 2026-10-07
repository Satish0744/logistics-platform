import Button from './Button.jsx';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-3">⚠️</div>
      <h3 className="font-semibold text-rose-400">{message}</h3>
      {onRetry && <Button className="mt-4" onClick={onRetry}>Retry</Button>}
    </div>
  );
}