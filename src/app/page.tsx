"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "@/store/useCalendarStore";
import { CalendarView } from "@/types";
import Providers from "@/components/Providers";
import MonthCalendar from "@/components/calendar/MonthCalendar";
import WeekCalendar from "@/components/calendar/WeekCalendar";
import DayCalendar from "@/components/calendar/DayCalendar";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentView, setCurrentView } = useCalendarStore();

  const handleViewChange = (view: CalendarView) => {
    setIsLoading(true);
    setCurrentView(view);

    // 로딩 상태를 시뮬레이션
    setTimeout(() => setIsLoading(false), 300);
  };

  const renderCalendar = () => {
    switch (currentView) {
      case "month":
        return <MonthCalendar />;
      case "week":
        return <WeekCalendar />;
      case "day":
        return <DayCalendar />;
      default:
        return <MonthCalendar />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* 메인 타이틀 */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-6"
          >
            <h1 className="text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Class Day
            </h1>

            {/* 장식 요소 */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto max-w-md"
            />
          </motion.div>

          {/* 서브타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <p className="text-2xl text-gray-600 font-medium mb-4">
              수학 강사를 위한 효율적인 출결 관리 시스템
            </p>
          </motion.div>

          {/* 아이콘 장식 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center gap-6 mt-8"
          >
            {["📚", "📊", "🎯", "✨"].map((icon, index) => (
              <motion.div
                key={icon}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  transition: { duration: 0.2 },
                }}
                className="text-3xl bg-white/60 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/20"
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 뷰 선택 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {(["month", "week", "day"] as CalendarView[]).map((view) => (
            <motion.button
              key={view}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange(view)}
              disabled={isLoading}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-lg ${
                currentView === view
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg border border-white/20 hover:shadow-xl"
              }`}
            >
              {view === "month" && "📅 월별 보기"}
              {view === "week" && "📊 주별 보기"}
              {view === "day" && "🎯 일별 보기"}
            </motion.button>
          ))}
        </motion.div>

        {/* 메인 콘텐츠 영역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {isLoading ? (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4 text-4xl"
              >
                ⏳
              </motion.div>
              <p className="text-gray-600">로딩 중...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCalendar()}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Providers>
      <HomePage />
    </Providers>
  );
}
