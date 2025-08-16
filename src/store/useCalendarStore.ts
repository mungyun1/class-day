import { create } from "zustand";
import { CalendarView, CalendarDate } from "@/types";

interface CalendarState {
  currentView: CalendarView;
  currentDate: Date;
  selectedDate: Date | null;
  calendarDates: CalendarDate[];

  // Actions
  setCurrentView: (view: CalendarView) => void;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setCalendarDates: (dates: CalendarDate[]) => void;
  goToPreviousPeriod: () => void;
  goToNextPeriod: () => void;
  goToToday: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentView: "month",
  currentDate: new Date(),
  selectedDate: null,
  calendarDates: [],

  setCurrentView: (view) => set({ currentView: view }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCalendarDates: (dates) => set({ calendarDates: dates }),

  goToPreviousPeriod: () => {
    const { currentDate, currentView } = get();
    const newDate = new Date(currentDate);

    switch (currentView) {
      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() - 1);
        break;
    }

    set({ currentDate: newDate });
  },

  goToNextPeriod: () => {
    const { currentDate, currentView } = get();
    const newDate = new Date(currentDate);

    switch (currentView) {
      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() + 1);
        break;
    }

    set({ currentDate: newDate });
  },

  goToToday: () => set({ currentDate: new Date() }),
}));
