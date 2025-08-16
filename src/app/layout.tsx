import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Class Day - 수학 강사를 위한 출결 관리 시스템",
  description:
    "효율적인 학생 출결 관리와 결석 사유 기록을 위한 캘린더 기반 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
