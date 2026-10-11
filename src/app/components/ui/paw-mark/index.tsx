type PawMarkProps = {
  className?: string;
};

export default function PawMark({ className = "size-4" }: PawMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <ellipse cx="5.3" cy="8.1" rx="2.35" ry="3.25" transform="rotate(-28 5.3 8.1)" />
      <ellipse cx="9.8" cy="4.7" rx="2.25" ry="3.2" transform="rotate(-8 9.8 4.7)" />
      <ellipse cx="14.8" cy="4.9" rx="2.25" ry="3.2" transform="rotate(10 14.8 4.9)" />
      <ellipse cx="19" cy="8.5" rx="2.35" ry="3.25" transform="rotate(28 19 8.5)" />
      <path d="M12.1 9.1c-3.85 0-7.2 3.1-7.2 6.6 0 2.25 1.55 3.65 3.55 3.65 1.3 0 2.3-.55 3.65-.55 1.3 0 2.35.55 3.65.55 2 0 3.55-1.4 3.55-3.65 0-3.5-3.35-6.6-7.2-6.6Z" />
    </svg>
  );
}
