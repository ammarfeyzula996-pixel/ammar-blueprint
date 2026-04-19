import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum — Ammar Blueprint",
};

export default function CurriculumPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          Curriculum
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          12 weeks, 90 days, one paying client at the end.
        </p>
      </header>

      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center sm:p-12">
        <p className="text-sm font-medium text-text sm:text-base">
          Curriculum content coming in Session 2.
        </p>
        <p className="mt-2 text-sm text-muted">
          The 12-week structure will load from a JSON file. No database needed.
        </p>
      </div>
    </div>
  );
}
