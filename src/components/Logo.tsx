export function Leaf({ className = "h-6 w-6", stroke = 3 }: { className?: string; stroke?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={stroke} className={className} aria-hidden>
      <path d="M50 8C28 20 20 42 28 62c4 8 12 14 22 16 10-2 18-8 22-16 8-20 0-42-22-54z" />
      <path d="M50 20v70M50 38l-14-10M50 38l14-10M50 54l-17-11M50 54l17-11M50 70l-12-8M50 70l12-8" />
    </svg>
  );
}
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-wm font-bold tracking-[0.35em] ${className}`}>OAK</span>;
}
