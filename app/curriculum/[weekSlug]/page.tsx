"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCompletedCount,
  isDayComplete,
} from "@/lib/storage";
import curriculum from "@/data/curriculum.json";
import type { Curriculum } from "@/lib/types";

const data = curriculum as Curriculum;

type Status = "done" | "current" | "locked";

function statusLabel(status: Status): string {
  if (status === "done") return "Done";
  if (status === "current") return "Current";
  return "Locked";
}

function statusClasses(status: Status): string {
  if (status === "done") {
    return "border-accent/60 bg-accent/10 text-accent";
  }
  if (status === "current") {
    return "border-accent bg-accent text-bg";
  }
  return "border-border bg-surface text-muted";
}

export default function WeekDetailPage() {
  const params = useParams<{ weekSlug: string }>();
  const weekSlug = params?.weekSlug;
  const week = data.weeks.find((w) => w.slug === weekSlug);

  const [mounted, setMounted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [completions, setCompletions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!week) return;
    const completed = getCompletedCount();
    setCurrentDay(Math.min(completed + 1, data.totalDays));
    const map: Record<number, boolean> = {};
    for (const d of week.days) {
      map[d.dayNumber] = isDayComplete(d.dayNumber);
    }
    setCompletions(map);
    setMounted(true);
  }, [week]);

  if (!week) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/curriculum"
        className="text-sm text-muted transition-colors hover:text-text"
      >
        ← Curriculum
      </Link>

      <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted">
        Week {week.number} · {week.theme}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        {week.title}
      </h1>
      <p className="mt-3 text-sm text-muted sm:text-base">{week.summary}</p>

      {week.days.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center sm:p-12">
          <p className="text-sm font-medium text-text sm:text-base">
            Coming soon
          </p>
          <p className="mt-2 text-sm text-muted">
            The curriculum consultant will deliver this week&apos;s content
            before you need it.
          </p>
        </div>
      ) : (
        <ul className="mt-10 space-y-3">
          {week.days.map((day) => {
            const isDone = mounted && completions[day.dayNumber];
            const isCurrent =
              mounted && !isDone && day.dayNumber === currentDay;
            const status: Status = isDone
              ? "done"
              : isCurrent
                ? "current"
                : "locked";

            return (
              <li key={day.dayNumber}>
                <Link
                  href={`/curriculum/${week.slug}/${day.dayNumber}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-muted"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-bg text-sm font-semibold text-text">
                    {day.dayNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text sm:text-base">
                      {day.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      ~{day.estimatedMinutes} min
                    </p>
                  </div>
                  <span
                    className={
                      "flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium " +
                      statusClasses(status)
                    }
                  >
                    {statusLabel(status)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
