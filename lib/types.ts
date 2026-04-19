export type Curriculum = {
  title: string;
  totalDays: number;
  weeks: Week[];
};

export type Week = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  theme: string;
  days: Day[];
};

export type Day = {
  dayNumber: number;
  title: string;
  objective: string;
  estimatedMinutes: number;
  videos: Video[];
  tasks: string[];
  artifact?: string;
  reflectionPrompt?: string;
};

export type Video = {
  title: string;
  creator: string;
  url: string;
  durationMinutes: number;
  keyTimestamps?: string[];
};
