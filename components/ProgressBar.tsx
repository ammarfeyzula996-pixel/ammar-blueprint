type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
};

export default function ProgressBar({ value, max, label }: ProgressBarProps) {
  const safeMax = Math.max(max, 0);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percent = safeMax === 0 ? 0 : Math.round((safeValue / safeMax) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label ?? "Progress"}
      className="h-1.5 w-full overflow-hidden rounded-full bg-border"
    >
      <div
        className="h-full bg-accent transition-[width] duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
