import { create } from "zustand";
import { Student, AbsenceRecord } from "@/types";

interface StudentState {
  students: Student[];
  absenceRecords: AbsenceRecord[];
  selectedStudent: Student | null;

  // Actions
  setStudents: (students: Student[]) => void;
  addStudent: (
    student: Omit<Student, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  setAbsenceRecords: (records: AbsenceRecord[]) => void;
  addAbsenceRecord: (
    record: Omit<AbsenceRecord, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateAbsenceRecord: (id: string, updates: Partial<AbsenceRecord>) => void;
  deleteAbsenceRecord: (id: string) => void;
  setSelectedStudent: (student: Student | null) => void;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  absenceRecords: [],
  selectedStudent: null,

  setStudents: (students) => set({ students }),

  addStudent: (studentData) => {
    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ students: [...state.students, newStudent] }));
  },

  updateStudent: (id, updates) => {
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id
          ? { ...student, ...updates, updatedAt: new Date() }
          : student
      ),
    }));
  },

  deleteStudent: (id) => {
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    }));
  },

  setAbsenceRecords: (records) => set({ absenceRecords: records }),

  addAbsenceRecord: (recordData) => {
    const newRecord: AbsenceRecord = {
      ...recordData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ absenceRecords: [...state.absenceRecords, newRecord] }));
  },

  updateAbsenceRecord: (id, updates) => {
    set((state) => ({
      absenceRecords: state.absenceRecords.map((record) =>
        record.id === id
          ? { ...record, ...updates, updatedAt: new Date() }
          : record
      ),
    }));
  },

  deleteAbsenceRecord: (id) => {
    set((state) => ({
      absenceRecords: state.absenceRecords.filter((record) => record.id !== id),
    }));
  },

  setSelectedStudent: (student) => set({ selectedStudent: student }),
}));
