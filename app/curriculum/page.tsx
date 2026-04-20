"use client";

import { useEffect, useState } from "react";
import WeekCard from "@/components/WeekCard";
import { isDayComplete } from "@/lib/storage";
import curriculum from "@/data/curriculum.json";
import type { Curriculum } from "@/lib/types";

const data = curriculum as Curriculum;

export default function CurriculumPage() {
  const [mounted, setMounted] = useState(false);
  const [completedByWeek, setCompletedByWeek] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const counts: Record<string, number> = {};
    for (const week of data.weeks) {
      counts[week.slug] = week.days.filter((d) => isDayComplete(d.dayNumber))
        .length;
    }
    setCompletedByWeek(counts);
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          Curriculum
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {data.title}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {data.weeks.map((week) => (
          <WeekCard
            key={week.slug}
            slug={week.slug}
            number={week.number}
            title={week.title}
            theme={week.theme}
            totalDays={week.days.length}
            completedDays={mounted ? completedByWeek[week.slug] ?? 0 : 0}
          />
        ))}
      </div>
    </div>
  );
}
