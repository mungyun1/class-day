"use client";

import { motion } from "framer-motion";
import { useCalendarStore } from "@/store/useCalendarStore";
import { getDayDates } from "@/lib/calendar";
import { useEffect } from "react";

export default function DayCalendar() {
  const { currentDate, calendarDates, setCalendarDates } = useCalendarStore();

  useEffect(() => {
    const dates = getDayDates(currentDate);
    setCalendarDates(dates);
  }, [currentDate, setCalendarDates]);

  const dateInfo = calendarDates[0];

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 1);
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
              newDate.setDate(newDate.getDate() + 1);
              useCalendarStore.getState().setCurrentDate(newDate);
            }}
          >
            →
          </motion.button>
        </div>
      </div>

      {/* 일별 상세 뷰 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border rounded-xl p-6 shadow-lg"
      >
        {/* 날짜 정보 */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-indigo-600 mb-2">
            {currentDate.getDate()}
          </div>
          <div className="text-xl text-gray-600">
            {currentDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              weekday: "long",
            })}
          </div>
        </div>

        {/* 결석 현황 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            출결 현황
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-green-600">
                {Math.max(0, 20 - (dateInfo?.absenceCount || 0))}
              </div>
              <div className="text-sm text-green-600">출석</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-red-600">
                {dateInfo?.absenceCount || 0}
              </div>
              <div className="text-sm text-red-600">결석</div>
            </motion.div>
          </div>
        </div>

        {/* 결석 학생 목록 (예시) */}
        {dateInfo?.absenceCount > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              결석 학생
            </h3>
            <div className="space-y-2">
              {Array.from({ length: Math.min(dateInfo.absenceCount, 5) }).map(
                (_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <span className="text-red-700">학생 {index + 1}</span>
                    <span className="text-sm text-red-600">개인 사정</span>
                  </motion.div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎉</div>
            <div>오늘은 모든 학생이 출석했습니다!</div>
          </div>
        )}

        {/* 날짜 선택 버튼 */}
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => {
              useCalendarStore.getState().setSelectedDate(currentDate);
            }}
          >
            출결 기록하기
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
