import Link from "next/link";
import ProgressBar from "./ProgressBar";

type WeekCardProps = {
  slug: string;
  number: number;
  title: string;
  theme: string;
  totalDays: number;
  completedDays: number;
};

export default function WeekCard({
  slug,
  number,
  title,
  theme,
  totalDays,
  completedDays,
}: WeekCardProps) {
  const isComplete = totalDays > 0 && completedDays >= totalDays;

  return (
    <Link
      href={`/curriculum/${slug}`}
      className={
        "relative block rounded-xl border p-5 transition-colors " +
        (isComplete
          ? "border-accent/60 bg-surface hover:border-accent"
          : "border-border bg-surface hover:border-muted")
      }
    >
      {isComplete && (
        <span
          aria-label="Week complete"
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-bg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.086l6.79-6.795a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}

      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        Week {number}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-text">{title}</h3>
      <p className="mt-1 text-sm text-muted">{theme}</p>

      <div className="mt-4">
        <p className="mb-2 text-xs text-muted">
          {completedDays} of {totalDays} days
        </p>
        <ProgressBar
          value={completedDays}
          max={totalDays}
          label={`Week ${number} progress`}
        />
      </div>
    </Link>
  );
}
