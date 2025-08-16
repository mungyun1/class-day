export interface Student {
  id: string;
  name: string;
  contact?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AbsenceRecord {
  id: string;
  studentId: string;
  date: Date;
  reason: string;
  customReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AbsenceReason {
  id: string;
  name: string;
  description?: string;
}

export type CalendarView = "month" | "week" | "day";

export interface CalendarDate {
  date: Date;
  absenceCount: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}
