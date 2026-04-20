import Link from "next/link";
import type { Day } from "@/lib/types";

const sampleDay: Day = {
  dayNumber: 1,
  title: "Define your ICP in one sentence",
  objective:
    "Write a single sentence that names exactly who you sell to. If it takes two sentences, you do not have an ICP yet.",
  estimatedMinutes: 45,
  videos: [
    {
      title: "How to Pick a Niche in 2026",
      creator: "Nick Saraev",
      url: "https://www.youtube.com/@nicksaraev",
      durationMinutes: 22,
      keyTimestamps: [
        "2:10-6:40 why most beginners pick badly",
        "11:30-18:05 the one-sentence test",
      ],
    },
  ],
  tasks: [
    "List 10 types of companies you could sell to",
    "Cross out anything outside Western English B2B SaaS",
    "Score remaining options on pain, budget, and access",
    "Pick one and write the one-sentence ICP",
  ],
  reflectionPrompt:
    "If a stranger asked what you do in one sentence, would your ICP sentence be the answer?",
  artifact: "One sentence ICP, written in a plain text file or note",
};

export default async function DayDetailPage({
  params,
}: {
  params: Promise<{ weekSlug: string; dayNumber: string }>;
}) {
  const { weekSlug, dayNumber } = await params;
  const day = sampleDay;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/curriculum"
        className="text-sm text-muted transition-colors hover:text-text"
      >
        ← Curriculum
      </Link>

      {(day.phase || day.weekMission) && (
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {day.phase && (
            <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-muted">
              {day.phase}
            </span>
          )}
          {day.weekMission && (
            <p className="text-xs text-muted sm:text-sm">{day.weekMission}</p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted">
        Week {weekSlug} · Day {dayNumber}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        {day.title}
      </h1>
      <p className="mt-2 text-sm text-muted">~{day.estimatedMinutes} min</p>

      {day.hook && (
        <p className="mt-6 border-l-2 border-accent pl-4 text-base text-text sm:text-lg">
          {day.hook}
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
          Objective
        </h2>
        <p className="mt-2 text-sm text-text sm:text-base">{day.objective}</p>
      </section>

      {day.learningOutcome && day.learningOutcome.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            By end of day you can
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text sm:text-base">
            {day.learningOutcome.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>
        </section>
      )}

      {day.preWork && (
        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Pre-work · ~{day.preWork.estimatedMinutes} min
          </h2>
          <p className="mt-2 text-sm text-text sm:text-base">
            {day.preWork.instructions}
          </p>
          {day.preWork.prompts && day.preWork.prompts.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text">
              {day.preWork.prompts.map((prompt, i) => (
                <li key={i}>{prompt}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {day.videos.length > 0 && (
        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Videos
          </h2>
          <ul className="mt-3 space-y-4">
            {day.videos.map((video) => (
              <li
                key={video.url}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-text hover:text-accent"
                >
                  {video.title}
                </a>
                <p className="mt-1 text-xs text-muted">
                  {video.creator} · {video.durationMinutes} min
                </p>
                {video.keyTimestamps && video.keyTimestamps.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-muted">
                    {video.keyTimestamps.map((ts) => (
                      <li key={ts}>{ts}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {day.guidedPractice && (
        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Guided practice · ~{day.guidedPractice.estimatedMinutes} min
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text sm:text-base">
            {day.guidedPractice.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-8 border-t border-border pt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
          Minimum viable completion
        </h2>
        <ul className="mt-3 space-y-2">
          {day.tasks.map((task, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
            >
              {task}
            </li>
          ))}
        </ul>
      </section>

      {day.stretchGoals && day.stretchGoals.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Stretch goals
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text">
            {day.stretchGoals.map((goal, i) => (
              <li key={i}>{goal}</li>
            ))}
          </ul>
        </section>
      )}

      {day.completionCriteria && day.completionCriteria.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Today is done when
          </h2>
          <ul className="mt-3 space-y-2">
            {day.completionCriteria.map((criterion, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-block h-4 w-4 flex-shrink-0 rounded border border-border"
                />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {day.publicCommitment && (
        <section className="mt-8">
          <div className="rounded-xl border border-accent/40 bg-accent/5 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Public commitment
              {day.publicCommitment.optional && (
                <span className="ml-2 text-muted">(optional)</span>
              )}
            </p>
            <p className="mt-2 text-sm text-muted">
              Post on {day.publicCommitment.platform}
            </p>
            <p className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 text-sm text-text">
              {day.publicCommitment.template}
            </p>
          </div>
        </section>
      )}

      {day.reflectionPrompt && (
        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Reflection
          </h2>
          <p className="mt-2 rounded-xl border border-border bg-surface p-4 text-sm italic text-text">
            {day.reflectionPrompt}
          </p>
        </section>
      )}

      {day.artifact && (
        <section className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Ship
          </h2>
          <p className="mt-2 text-sm text-text sm:text-base">{day.artifact}</p>
        </section>
      )}
    </div>
  );
}
