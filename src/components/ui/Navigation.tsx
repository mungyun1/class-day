"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈", icon: "🏠" },
    { href: "/students", label: "학생 관리", icon: "👥" },
    { href: "/attendance", label: "출결 기록", icon: "📊" },
    { href: "/settings", label: "설정", icon: "⚙️" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Class Day
            </motion.div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
            </motion.button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-gray-200/50"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
