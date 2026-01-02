import {
  CycleData,
  CycleResults,
  CalendarDay,
  PhaseInfo,
} from "../types/cycle.types";

export const calculateCycle = (data: CycleData): CycleResults => {
  const startDate = new Date(data.startDate);
  const cycleLength = data.cycleLength;
  const periodLength = data.periodLength || 5;
  const lutealPhaseLength = data.lutealPhaseLength || 14;

  // Calcul de la date de fin des règles
  const periodEndDate = new Date(startDate);
  periodEndDate.setDate(periodEndDate.getDate() + periodLength - 1);

  // Date d'ovulation = Date de début + (cycleLength - lutealPhaseLength)
  const ovulationDate = new Date(startDate);
  ovulationDate.setDate(
    ovulationDate.getDate() + (cycleLength - lutealPhaseLength)
  );

  // Fenêtre fertile = 5 jours avant l'ovulation + jour de l'ovulation
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);

  // Prochaine période = Date de début + cycleLength
  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  // Jour actuel du cycle
  const today = new Date();
  const cycleDay =
    Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  // Déterminer la phase actuelle
  let currentPhase: CycleResults["currentPhase"] = "menstrual";
  let phaseProgress = 0;

  if (cycleDay <= periodLength) {
    currentPhase = "menstrual";
    phaseProgress = (cycleDay / periodLength) * 100;
  } else if (cycleDay <= cycleLength - lutealPhaseLength - 1) {
    currentPhase = "follicular";
    const follicularDays = cycleLength - lutealPhaseLength - periodLength;
    phaseProgress = ((cycleDay - periodLength) / follicularDays) * 100;
  } else if (cycleDay === cycleLength - lutealPhaseLength) {
    currentPhase = "ovulation";
    phaseProgress = 100;
  } else {
    currentPhase = "luteal";
    const lutealStartDay = cycleLength - lutealPhaseLength + 1;
    phaseProgress = ((cycleDay - lutealStartDay) / lutealPhaseLength) * 100;
  }

  return {
    ovulationDate: ovulationDate.toISOString().split("T")[0],
    fertileWindow: {
      start: fertileStart.toISOString().split("T")[0],
      end: fertileEnd.toISOString().split("T")[0],
    },
    nextPeriod: nextPeriod.toISOString().split("T")[0],
    cycleDay: cycleDay > 0 && cycleDay <= cycleLength ? cycleDay : 0,
    periodEndDate: periodEndDate.toISOString().split("T")[0],
    currentPhase,
    phaseProgress: Math.min(Math.max(phaseProgress, 0), 100),
    lutealPhaseLength,
  };
};

export const generateCalendar = (
  startDate: string,
  cycleLength: number,
  periodLength: number,
  results: CycleResults
): CalendarDay[] => {
  // Toujours retourner un tableau, même en cas d'erreur
  try {
    const calendarDays: CalendarDay[] = [];
    const start = new Date(startDate);
    const today = new Date().toISOString().split("T")[0];

    // Validation des données
    if (!startDate || isNaN(start.getTime())) {
      return []; // Retourne tableau vide si date invalide
    }

    // Vérifier si les nombres sont valides
    const validCycleLength = Math.max(1, Math.min(cycleLength, 45)); // Limite raisonnable
    const validPeriodLength = Math.max(1, Math.min(periodLength, 10)); // Limite raisonnable
    const lutealPhaseLength = results.lutealPhaseLength || 14;

    for (let i = 0; i < validCycleLength; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      const dateStr = currentDate.toISOString().split("T")[0];
      const dayOfWeek = currentDate.getDay();

      // Déterminer la phase
      let phase = "luteal";
      if (i < validPeriodLength) {
        phase = "menstrual";
      } else if (i < validCycleLength - lutealPhaseLength) {
        phase = "follicular";
      } else if (i === validCycleLength - lutealPhaseLength) {
        phase = "ovulation";
      }

      calendarDays.push({
        date: dateStr,
        day: i + 1,
        dayOfMonth: currentDate.getDate(),
        isOvulation: dateStr === results.ovulationDate,
        isFertile:
          dateStr >= results.fertileWindow.start &&
          dateStr <= results.fertileWindow.end,
        isPeriod: i < validPeriodLength,
        isToday: dateStr === today,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        phase,
      });
    }

    return calendarDays; // ⬅️ TOUJOURS retourner un tableau
  } catch (error) {
    console.error("Erreur dans generateCalendar:", error);
    return []; // ⬅️ IMPORTANT: Retourner un tableau vide en cas d'erreur
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

export const getPhaseInfo = (phase: string): PhaseInfo => {
  const phases: Record<string, PhaseInfo> = {
    menstrual: {
      name: "Menstruelle",
      description: "Phase des règles",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: "🩸",
      duration: 5,
    },
    follicular: {
      name: "Folliculaire",
      description: "Préparation à l'ovulation",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "🌱",
      duration: 10,
    },
    ovulation: {
      name: "Ovulation",
      description: "Libération de l'ovule",
      color: "bg-pink-100 text-pink-800 border-pink-200",
      icon: "🥚",
      duration: 1,
    },
    luteal: {
      name: "Lutéale",
      description: "Après l'ovulation",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "🌕",
      duration: 14,
    },
  };

  return phases[phase] || phases.follicular;
};
