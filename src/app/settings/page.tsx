"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: "ko",
    timezone: "Asia/Seoul",
    autoSave: true,
    backupFrequency: "weekly",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "general", label: "일반", icon: "⚙️" },
    { id: "notifications", label: "알림", icon: "🔔" },
    { id: "appearance", label: "외관", icon: "🎨" },
    { id: "data", label: "데이터", icon: "💾" },
    { id: "about", label: "정보", icon: "ℹ️" },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">기본 설정</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">언어</h4>
              <p className="text-sm text-gray-500">
                애플리케이션 언어를 선택하세요
              </p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">시간대</h4>
              <p className="text-sm text-gray-500">
                현재 위치의 시간대를 설정하세요
              </p>
            </div>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange("timezone", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Asia/Seoul">서울 (UTC+9)</option>
              <option value="Asia/Tokyo">도쿄 (UTC+9)</option>
              <option value="America/New_York">뉴욕 (UTC-5)</option>
              <option value="Europe/London">런던 (UTC+0)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">자동 저장</h4>
              <p className="text-sm text-gray-500">
                변경사항을 자동으로 저장합니다
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) =>
                  handleSettingChange("autoSave", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">알림 설정</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">푸시 알림</h4>
              <p className="text-sm text-gray-500">
                중요한 업데이트에 대한 푸시 알림을 받습니다
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  handleSettingChange("notifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">이메일 알림</h4>
              <p className="text-sm text-gray-500">
                주간 리포트 및 중요 알림을 이메일로 받습니다
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) =>
                  handleSettingChange("emailAlerts", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">외관 설정</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">다크 모드</h4>
              <p className="text-sm text-gray-500">어두운 테마를 사용합니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  handleSettingChange("darkMode", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          데이터 관리
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">백업 빈도</h4>
              <p className="text-sm text-gray-500">
                데이터 자동 백업 주기를 설정하세요
              </p>
            </div>
            <select
              value={settings.backupFrequency}
              onChange={(e) =>
                handleSettingChange("backupFrequency", e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="daily">매일</option>
              <option value="weekly">매주</option>
              <option value="monthly">매월</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">데이터 내보내기</h4>
              <p className="text-sm text-gray-500">
                모든 데이터를 CSV 파일로 내보냅니다
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              내보내기
            </motion.button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">데이터 초기화</h4>
              <p className="text-sm text-gray-500 text-red-600">
                ⚠️ 모든 데이터가 삭제됩니다
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              초기화
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          애플리케이션 정보
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Class Day
              </h2>
              <p className="text-gray-600 mb-4">
                수학 강사를 위한 효율적인 출결 관리 시스템
              </p>
              <p className="text-sm text-gray-500">버전 1.0.0</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-100">
            <h4 className="font-medium text-gray-800 mb-3">개발팀</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 기획 및 디자인: Class Day Team</p>
              <p>• 개발: Frontend Developer</p>
              <p>• 기술 스택: Next.js, TypeScript, Tailwind CSS</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-100">
            <h4 className="font-medium text-gray-800 mb-3">연락처</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 이메일: support@classday.com</p>
              <p>• 웹사이트: www.classday.com</p>
              <p>• 문의: 1588-0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "notifications":
        return renderNotificationSettings();
      case "appearance":
        return renderAppearanceSettings();
      case "data":
        return renderDataSettings();
      case "about":
        return renderAboutSettings();
      default:
        return renderGeneralSettings();
    }
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
            설정
          </h1>
          <p className="text-xl text-gray-600">
            애플리케이션을 사용자 맞춤형으로 설정하세요
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* 탭 네비게이션 */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
