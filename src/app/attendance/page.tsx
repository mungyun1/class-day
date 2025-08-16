"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudentStore } from "@/store/useStudentStore";
import { useCalendarStore } from "@/store/useCalendarStore";
import { Student } from "@/types";

const AttendancePage = () => {
  const { students } = useStudentStore();
  const { currentDate } = useCalendarStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [absenceReason, setAbsenceReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 임시 출결 데이터 (실제로는 데이터베이스에서 가져와야 함)
  const [attendanceData, setAttendanceData] = useState<{
    [date: string]: {
      [studentId: string]: {
        status: "present" | "absent" | "late";
        reason?: string;
      };
    };
  }>({});

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedStudents([]);
  };

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmitAttendance = () => {
    if (selectedStudents.length === 0) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    const newAttendanceData = { ...attendanceData };

    if (!newAttendanceData[dateKey]) {
      newAttendanceData[dateKey] = {};
    }

    selectedStudents.forEach((studentId) => {
      newAttendanceData[dateKey][studentId] = {
        status: "absent",
        reason: absenceReason || "개인 사정",
      };
    });

    setAttendanceData(newAttendanceData);
    setIsModalOpen(false);
    setSelectedStudents([]);
    setAbsenceReason("");
  };

  const getAttendanceStatus = (studentId: string, date: Date) => {
    const dateKey = date.toISOString().split("T")[0];
    return attendanceData[dateKey]?.[studentId]?.status || "present";
  };

  const getAttendanceCount = (status: "present" | "absent" | "late") => {
    let count = 0;
    Object.values(attendanceData).forEach((dayData) => {
      Object.values(dayData).forEach((record) => {
        if (record.status === status) count++;
      });
    });
    return count;
  };

  const getMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;

    Object.entries(attendanceData).forEach(([dateKey, dayData]) => {
      const date = new Date(dateKey);
      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        Object.values(dayData).forEach((record) => {
          if (record.status === "present") presentCount++;
          else if (record.status === "absent") absentCount++;
          else if (record.status === "late") lateCount++;
        });
      }
    });

    return { presentCount, absentCount, lateCount };
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            출결 기록
          </h1>
          <p className="text-xl text-gray-600">
            학생들의 출결 현황을 체계적으로 관리하고 통계를 확인하세요
          </p>
        </motion.div>

        {/* 통계 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  이번 달 출석
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {monthlyStats.presentCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  이번 달 결석
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {monthlyStats.absentCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  이번 달 지각
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {monthlyStats.lateCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 날짜 선택 및 출결 기록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">출결 기록</h2>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              📝 출결 기록 추가
            </motion.button>
          </div>

          {/* 날짜 선택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜 선택
            </label>
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => handleDateSelect(new Date(e.target.value))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* 학생 출결 현황 */}
          <div className="grid gap-4">
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {student.grade || "학년 미정"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getAttendanceStatus(student.id, selectedDate) ===
                      "present"
                        ? "bg-green-100 text-green-800"
                        : getAttendanceStatus(student.id, selectedDate) ===
                          "absent"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {getAttendanceStatus(student.id, selectedDate) ===
                      "present" && "출석"}
                    {getAttendanceStatus(student.id, selectedDate) ===
                      "absent" && "결석"}
                    {getAttendanceStatus(student.id, selectedDate) === "late" &&
                      "지각"}
                  </span>

                  {getAttendanceStatus(student.id, selectedDate) ===
                    "absent" && (
                    <span className="text-sm text-gray-500">
                      {
                        attendanceData[
                          selectedDate.toISOString().split("T")[0]
                        ]?.[student.id]?.reason
                      }
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 전체 출결 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            전체 출결 통계
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                월별 출결 현황
              </h3>
              <div className="space-y-3">
                {Array.from({ length: 12 }, (_, i) => {
                  const month = new Date(new Date().getFullYear(), i, 1);
                  const monthName = month.toLocaleDateString("ko-KR", {
                    month: "long",
                  });
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-700">
                        {monthName}
                      </span>
                      <span className="text-sm text-gray-500">데이터 없음</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                학생별 출결률
              </h3>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">
                      {student.name}
                    </span>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 출결 기록 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                출결 기록 추가
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    선택된 날짜
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                    {selectedDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학생 선택
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {students.map((student) => (
                      <label
                        key={student.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentToggle(student.id)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{student.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    결석 사유
                  </label>
                  <textarea
                    value={absenceReason}
                    onChange={(e) => setAbsenceReason(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="결석 사유를 입력하세요 (선택사항)"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitAttendance}
                    disabled={selectedStudents.length === 0}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    기록
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendancePage;
