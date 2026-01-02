export interface CycleData {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
}

export interface CycleResults {
  ovulationDate: string;
  fertileWindow: {
    start: string;
    end: string;
  };
  nextPeriod: string;
  cycleDay: number;
  periodEndDate: string;
  currentPhase: "menstrual" | "follicular" | "ovulation" | "luteal";
  phaseProgress: number;
  lutealPhaseLength: number;
}

export interface CalendarDay {
  date: string;
  day: number;
  dayOfMonth: number;
  isOvulation: boolean;
  isFertile: boolean;
  isPeriod: boolean;
  isToday: boolean;
  isWeekend: boolean;
  phase: string;
}

export interface PhaseInfo {
  name: string;
  description: string;
  color: string;
  icon: string;
  duration: number;
}
