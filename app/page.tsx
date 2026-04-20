"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCompletedCount,
  getCurrentStreak,
  isDayComplete,
} from "@/lib/storage";
import curriculum from "@/data/curriculum.json";
import type { Curriculum, Day, Week } from "@/lib/types";

const data = curriculum as Curriculum;

type NextEntry = { day: Day; week: Week };

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [next, setNext] = useState<NextEntry | null>(null);

  useEffect(() => {
    setCompleted(getCompletedCount());
    setStreak(getCurrentStreak());

    let found: NextEntry | null = null;
    for (const week of data.weeks) {
      for (const day of week.days) {
        if (!isDayComplete(day.dayNumber)) {
          found = { day, week };
          break;
        }
      }
      if (found) break;
    }
    setNext(found);
    setMounted(true);
  }, []);

  const totalDays = data.totalDays;
  const currentDayNumber = next ? next.day.dayNumber : completed + 1;
  const progressPercent =
    totalDays === 0 ? 0 : Math.round((completed / totalDays) * 100);
  const allComplete = mounted && completed >= totalDays;
  const waitingForContent = mounted && !next && !allComplete;

  const stats = [
    {
      label: "Current day",
      value: mounted ? String(Math.min(currentDayNumber, totalDays)) : "—",
      suffix: `/ ${totalDays}`,
    },
    {
      label: "Streak",
      value: mounted ? String(streak) : "—",
      suffix: streak === 1 ? "day" : "days",
    },
    {
      label: "Progress",
      value: mounted ? String(progressPercent) : "—",
      suffix: "%",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          Welcome back, Ammar
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          90 days to first paying AI automation client.
        </p>
      </header>

      <section aria-label="Today" className="mb-6 sm:mb-8">
        {!mounted ? (
          <div
            aria-hidden
            className="h-14 w-full rounded-xl border border-border bg-surface sm:h-16"
          />
        ) : allComplete ? (
          <div className="flex h-14 w-full items-center justify-center rounded-xl border border-accent/60 bg-accent/10 px-4 text-sm font-medium text-accent sm:h-16 sm:text-base">
            All 90 days complete
          </div>
        ) : waitingForContent ? (
          <div className="flex h-14 w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface px-4 text-sm text-muted sm:h-16 sm:text-base">
            More curriculum coming soon
          </div>
        ) : next ? (
          <Link
            href={`/curriculum/${next.week.slug}/${next.day.dayNumber}`}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover sm:h-16 sm:text-base"
          >
            <span className="truncate">
              Continue Day {next.day.dayNumber}: {next.day.title}
            </span>
          </Link>
        ) : null}
      </section>

      <section
        aria-label="Progress overview"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold text-text sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
