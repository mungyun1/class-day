"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudentStore } from "@/store/useStudentStore";
import { Student } from "@/types";

const StudentsPage = () => {
  const { students, addStudent, updateStudent, deleteStudent } =
    useStudentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    grade: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent({
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      });
    }

    handleCloseModal();
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      phone: student.phone,
      email: student.email,
      grade: student.grade,
      note: student.note,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말로 이 학생을 삭제하시겠습니까?")) {
      deleteStudent(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      grade: "",
      note: "",
    });
  };

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
            학생 관리
          </h1>
          <p className="text-xl text-gray-600">
            학생 정보를 효율적으로 관리하고 출결 현황을 추적하세요
          </p>
        </motion.div>

        {/* 학생 추가 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-2xl transition-all duration-300"
          >
            ✨ 새 학생 추가
          </motion.button>
        </motion.div>

        {/* 학생 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {students.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                아직 등록된 학생이 없습니다
              </h3>
              <p className="text-gray-500">
                새 학생을 추가하여 출결 관리를 시작해보세요
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(student)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        ✏️
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(student.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {student.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📱</span>
                      {student.phone || "연락처 없음"}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📧</span>
                      {student.email || "이메일 없음"}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📚</span>
                      {student.grade || "학년 미정"}
                    </div>
                    {student.note && (
                      <div className="flex items-start">
                        <span className="mr-2 mt-1">📝</span>
                        <span className="text-gray-500">{student.note}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                    등록일:{" "}
                    {new Date(student.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* 학생 추가/수정 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
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
                {editingStudent ? "학생 정보 수정" : "새 학생 추가"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="학생 이름을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학년
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">학년 선택</option>
                    <option value="초등 1학년">초등 1학년</option>
                    <option value="초등 2학년">초등 2학년</option>
                    <option value="초등 3학년">초등 3학년</option>
                    <option value="초등 4학년">초등 4학년</option>
                    <option value="초등 5학년">초등 5학년</option>
                    <option value="초등 6학년">초등 6학년</option>
                    <option value="중등 1학년">중등 1학년</option>
                    <option value="중등 2학년">중등 2학년</option>
                    <option value="중등 3학년">중등 3학년</option>
                    <option value="고등 1학년">고등 1학년</option>
                    <option value="고등 2학년">고등 2학년</option>
                    <option value="고등 3학년">고등 3학년</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메모
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="학생에 대한 추가 정보나 메모를 입력하세요"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    {editingStudent ? "수정" : "추가"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsPage;
