export function LoadingSpinner({ className = "" }) {
  return (
    <div className={`h-5 w-5 animate-spin rounded-full border-2 border-ink/30 border-t-ink ${className}`} />
  );
}
