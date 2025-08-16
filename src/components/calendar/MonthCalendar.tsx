"use client";

import { motion } from "framer-motion";
import { useCalendarStore } from "@/store/useCalendarStore";
import { getMonthDates, getWeekdayNames, formatMonth } from "@/lib/calendar";
import { useEffect } from "react";

export default function MonthCalendar() {
  const { currentDate, calendarDates, setCalendarDates } = useCalendarStore();

  useEffect(() => {
    const dates = getMonthDates(currentDate);
    setCalendarDates(dates);
  }, [currentDate, setCalendarDates]);

  const weekdayNames = getWeekdayNames();

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {formatMonth(currentDate)}
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              useCalendarStore.getState().setCurrentDate(newDate);
            }}
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              useCalendarStore.getState().setCurrentDate(newDate);
            }}
          >
            →
          </motion.button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdayNames.map((day, index) => (
          <div
            key={day}
            className={`p-3 text-center font-medium text-sm ${
              index === 0
                ? "text-red-500"
                : index === 6
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDates.map((dateInfo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-3 min-h-[80px] border rounded-lg cursor-pointer transition-all duration-200
              ${
                dateInfo.isToday
                  ? "bg-indigo-100 border-indigo-300 shadow-md"
                  : dateInfo.isCurrentMonth
                  ? "bg-white border-gray-200 hover:bg-gray-50"
                  : "bg-gray-50 border-gray-100 text-gray-400"
              }
            `}
            onClick={() => {
              if (dateInfo.isCurrentMonth) {
                useCalendarStore.getState().setSelectedDate(dateInfo.date);
              }
            }}
          >
            <div className="text-right mb-1">
              <span
                className={`
                text-sm font-medium
                ${dateInfo.isToday ? "text-indigo-600" : "text-gray-700"}
              `}
              >
                {dateInfo.date.getDate()}
              </span>
            </div>

            {/* 결석 학생 수 표시 */}
            {dateInfo.absenceCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full text-center"
              >
                결석 {dateInfo.absenceCount}명
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
