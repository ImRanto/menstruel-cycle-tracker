import React from "react";
import { CalendarDay, CycleResults } from "../types/cycle.types";
import { generateCalendar } from "../utils/cycleCalculations";

interface CycleCalendarProps {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  results: CycleResults | null; // Accepte null
}

const CycleCalendar: React.FC<CycleCalendarProps> = ({
  startDate,
  cycleLength,
  periodLength,
  results,
}) => {
  // Vérification complète des données
  if (!results || !startDate || !cycleLength || !periodLength) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📅 Calendrier du cycle
        </h3>
        <div className="text-center text-gray-500 py-8">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  // Générer les jours du calendrier avec vérification
  let calendarDays: CalendarDay[] = [];
  try {
    calendarDays = generateCalendar(
      startDate,
      cycleLength,
      periodLength,
      results
    );
  } catch (error) {
    console.error("Erreur lors de la génération du calendrier:", error);
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center text-red-500 py-8">
          <p>Erreur lors du chargement du calendrier</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Recharger
          </button>
        </div>
      </div>
    );
  }

  // Vérifier si calendarDays est un tableau valide
  if (!Array.isArray(calendarDays) || calendarDays.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center text-gray-500 py-8">
          Aucune donnée de calendrier disponible
        </div>
      </div>
    );
  }

  const getDayColor = (day: CalendarDay): string => {
    if (day.isOvulation) return "bg-pink-500 text-white shadow-md";
    if (day.isFertile)
      return "bg-green-100 text-green-800 border border-green-200";
    if (day.isPeriod) return "bg-red-100 text-red-800 border border-red-200";
    if (day.isToday)
      return "bg-purple-100 text-purple-800 border-2 border-purple-500 shadow-sm";
    return "bg-gray-50 text-gray-700 border border-gray-100";
  };

  const getDayLabel = (day: CalendarDay): string => {
    if (day.isOvulation) return "Ovulation";
    if (day.isPeriod) return "Règles";
    return "";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          📅 Calendrier du cycle
        </h3>
        <div className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
          {cycleLength} jours
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-500 py-1 text-sm md:text-base"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day) => {
          const date = new Date(day.date);
          const dayOfMonth = date.getDate();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={day.date}
              className={`
                relative p-2 rounded-lg text-center transition-all duration-200
                hover:scale-105 hover:shadow-md
                ${getDayColor(day)}
                ${isWeekend ? "opacity-90" : ""}
              `}
            >
              <div className="font-semibold text-sm md:text-base">
                {dayOfMonth}
              </div>
              <div className="text-xs text-gray-500 mt-1">J{day.day}</div>
              {getDayLabel(day) && (
                <div className="text-xs font-medium mt-1 truncate">
                  {getDayLabel(day)}
                </div>
              )}
              {day.isToday && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Légende améliorée */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
          <span className="text-gray-600">Règles</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
          <span className="text-gray-600">Fertile</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-pink-500 rounded mr-2"></div>
          <span className="text-gray-600">Ovulation</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded mr-2"></div>
          <span className="text-gray-600">Aujourd'hui</span>
        </div>
      </div>
    </div>
  );
};

export default CycleCalendar;
