"use client";

import { motion } from "framer-motion";
import { useCalendarStore } from "@/store/useCalendarStore";
import { getWeekDates, getWeekdayNames } from "@/lib/calendar";
import { useEffect } from "react";

export default function WeekCalendar() {
  const { currentDate, calendarDates, setCalendarDates } = useCalendarStore();

  useEffect(() => {
    const dates = getWeekDates(currentDate);
    setCalendarDates(dates);
  }, [currentDate, setCalendarDates]);

  const weekdayNames = getWeekdayNames();

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          주
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 7);
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
              newDate.setDate(newDate.getDate() + 7);
              useCalendarStore.getState().setCurrentDate(newDate);
            }}
          >
            →
          </motion.button>
        </div>
      </div>

      {/* 주별 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-4">
        {calendarDates.map((dateInfo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            {/* 요일 헤더 */}
            <div
              className={`
              p-3 mb-2 rounded-lg font-medium
              ${
                index === 0
                  ? "bg-red-100 text-red-600"
                  : index === 6
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }
            `}
            >
              {weekdayNames[index]}
            </div>

            {/* 날짜 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-4 min-h-[120px] border rounded-lg cursor-pointer transition-all duration-200
                ${
                  dateInfo.isToday
                    ? "bg-indigo-100 border-indigo-300 shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
              `}
              onClick={() => {
                useCalendarStore.getState().setSelectedDate(dateInfo.date);
              }}
            >
              <div className="text-lg font-bold mb-2">
                {dateInfo.date.getDate()}
              </div>

              {/* 결석 학생 수 표시 */}
              {dateInfo.absenceCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full"
                >
                  결석 {dateInfo.absenceCount}명
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
