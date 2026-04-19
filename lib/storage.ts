const STORAGE_KEY = "ammar-blueprint-v1";

type DayEntry = {
  completedAt?: string;
  note?: string;
};

type BlueprintState = {
  days: Record<number, DayEntry>;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function localDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayString(): string {
  return localDateString(new Date());
}

function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + n);
  return localDateString(date);
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am - 1, ad);
  const db = new Date(by, bm - 1, bd);
  return Math.round((da.getTime() - db.getTime()) / 86_400_000);
}

function readState(): BlueprintState {
  if (!isBrowser()) return { days: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { days: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.days) {
      return { days: {} };
    }
    return parsed as BlueprintState;
  } catch {
    return { days: {} };
  }
}

function writeState(state: BlueprintState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or storage disabled — silent no-op
  }
}

export function isDayComplete(dayNumber: number): boolean {
  return Boolean(readState().days[dayNumber]?.completedAt);
}

export function markDayComplete(dayNumber: number): void {
  const state = readState();
  const existing = state.days[dayNumber] ?? {};
  state.days[dayNumber] = { ...existing, completedAt: todayString() };
  writeState(state);
}

export function markDayIncomplete(dayNumber: number): void {
  const state = readState();
  const existing = state.days[dayNumber];
  if (!existing) return;
  if (existing.note) {
    state.days[dayNumber] = { note: existing.note };
  } else {
    delete state.days[dayNumber];
  }
  writeState(state);
}

export function getCompletedCount(): number {
  let count = 0;
  for (const entry of Object.values(readState().days)) {
    if (entry.completedAt) count++;
  }
  return count;
}

export function getDayNote(dayNumber: number): string {
  return readState().days[dayNumber]?.note ?? "";
}

export function setDayNote(dayNumber: number, note: string): void {
  const state = readState();
  const existing = state.days[dayNumber] ?? {};
  const trimmed = note.trim();
  if (trimmed) {
    state.days[dayNumber] = { ...existing, note: trimmed };
  } else if (existing.completedAt) {
    state.days[dayNumber] = { completedAt: existing.completedAt };
  } else {
    delete state.days[dayNumber];
  }
  writeState(state);
}

export function getLastActivityDate(): string | null {
  let latest: string | null = null;
  for (const entry of Object.values(readState().days)) {
    if (entry.completedAt && (!latest || entry.completedAt > latest)) {
      latest = entry.completedAt;
    }
  }
  return latest;
}

export function exportProgress(): string {
  return JSON.stringify(readState(), null, 2);
}

// Walks back calendar days from the most recent completion. A missing day
// within the last 30 days is bridged by a grace day (max 2). Gaps older
// than 30 days, or a third gap, end the streak.
function computeStreakAndGraces(): { streak: number; gracesUsed: number } {
  const activityDates = new Set<string>();
  for (const entry of Object.values(readState().days)) {
    if (entry.completedAt) activityDates.add(entry.completedAt);
  }
  if (activityDates.size === 0) return { streak: 0, gracesUsed: 0 };

  const sorted = [...activityDates].sort().reverse();
  const today = todayString();
  let streak = 1;
  let cursor = addDays(sorted[0], -1);
  let gracesUsed = 0;

  for (let i = 1; i < sorted.length; ) {
    const date = sorted[i];
    if (date === cursor) {
      streak++;
      cursor = addDays(cursor, -1);
      i++;
      continue;
    }
    const cursorAgeDays = daysBetween(today, cursor);
    if (cursorAgeDays <= 30 && gracesUsed < 2) {
      gracesUsed++;
      cursor = addDays(cursor, -1);
      continue;
    }
    break;
  }

  return { streak, gracesUsed };
}

export function getCurrentStreak(): number {
  return computeStreakAndGraces().streak;
}

export function getAvailableGraceDays(): number {
  return Math.max(0, 2 - computeStreakAndGraces().gracesUsed);
}
