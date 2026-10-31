export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4c2.6 5.2 2.7 9.4 1.2 13.1-1.3 3.2-.8 6.1 1.2 8.3 1.9 2.1 2.2 4.6.8 7.2-1.1 2-2.1 4.2-2.2 6.8l-.4 4.6h-1.2l-.4-4.6c-.1-2.6-1.1-4.8-2.2-6.8-1.4-2.6-1.1-5.1.8-7.2 2-2.2 2.5-5.1 1.2-8.3C21.3 13.4 21.4 9.2 24 4Z"
        fill="currentColor"
      />
      <path
        d="M16.5 22.5c2.6 1.1 4.4 2.8 5.5 5.1M31.5 22.5c-2.6 1.1-4.4 2.8-5.5 5.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 35.5c4.6-1.2 8.9-1.4 14-1.4s9.4.2 14 1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="41.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
