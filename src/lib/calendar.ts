import { CalendarDate } from "@/types";

export const getMonthDates = (date: Date): CalendarDate[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // 해당 월의 첫 번째 날
  const firstDay = new Date(year, month, 1);
  // 해당 월의 마지막 날
  const lastDay = new Date(year, month + 1, 0);

  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDay.getDay();

  // 이전 달의 마지막 날들
  const prevMonthLastDay = new Date(year, month, 0);
  const prevMonthDates: CalendarDate[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay.getDate() - i);
    prevMonthDates.push({
      date,
      absenceCount: 0,
      isToday: isToday(date),
      isCurrentMonth: false,
    });
  }

  // 현재 월의 날들
  const currentMonthDates: CalendarDate[] = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    currentMonthDates.push({
      date,
      absenceCount: 0,
      isToday: isToday(date),
      isCurrentMonth: true,
    });
  }

  // 다음 달의 첫 번째 날들
  const nextMonthDates: CalendarDate[] = [];
  const totalCells = 42; // 6주 * 7일
  const remainingCells =
    totalCells - (prevMonthDates.length + currentMonthDates.length);

  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    nextMonthDates.push({
      date,
      absenceCount: 0,
      isToday: isToday(date),
      isCurrentMonth: false,
    });
  }

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const getWeekDates = (date: Date): CalendarDate[] => {
  const current = new Date(date);
  const week = [];

  // 해당 주의 일요일을 찾기
  const day = current.getDay();
  const diff = current.getDate() - day;
  const sunday = new Date(current.getFullYear(), current.getMonth(), diff);

  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);

    week.push({
      date,
      absenceCount: 0,
      isToday: isToday(date),
      isCurrentMonth: true,
    });
  }

  return week;
};

export const getDayDates = (date: Date): CalendarDate[] => {
  return [
    {
      date,
      absenceCount: 0,
      isToday: isToday(date),
      isCurrentMonth: true,
    },
  ];
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMonth = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });
};

export const getWeekdayNames = (): string[] => {
  return ["일", "월", "화", "수", "목", "금", "토"];
};
