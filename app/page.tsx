const stats = [
  { label: "Current day", value: "0", suffix: "/ 90" },
  { label: "Streak", value: "0", suffix: "days" },
  { label: "Progress", value: "0", suffix: "%" },
];

export default function Home() {
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
