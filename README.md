# Class Day

수학 강사를 위한 효율적인 출결 관리 웹 애플리케이션입니다.

## 🚀 주요 기능

- **캘린더 기능**: 월별, 주별, 일별 캘린더 뷰 제공
- **출결 관리**: 학생별 결석 사유 기록 및 관리
- **학생 관리**: 학생 정보 추가, 수정, 삭제
- **애니메이션**: Framer Motion을 활용한 부드러운 UI 애니메이션

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **상태 관리**: Zustand, React Query
- **애니메이션**: Framer Motion
- **데이터베이스**: Supabase
- **인증**: NextAuth.js
- **스타일링**: Tailwind CSS
- **배포**: Vercel

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database
DATABASE_URL=your_database_url
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🏗️ 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 라우트
│   │   └── auth/       # 인증 관련 API
│   ├── globals.css     # 전역 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── components/          # 재사용 가능한 컴포넌트
│   ├── calendar/       # 캘린더 관련 컴포넌트
│   ├── student/        # 학생 관리 컴포넌트
│   └── ui/             # 기본 UI 컴포넌트
├── hooks/               # 커스텀 훅
├── lib/                 # 유틸리티 함수 및 설정
├── store/               # Zustand 상태 관리
└── types/               # TypeScript 타입 정의
```

## 🎨 UI/UX 특징

- **미니멀리즘 디자인**: 깔끔하고 직관적인 인터페이스
- **부드러운 애니메이션**: Framer Motion을 활용한 사용자 경험 향상
- **반응형 디자인**: PC와 모바일 환경 모두 지원
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 📝 개발 가이드라인

- 컴포넌트는 작고 명확한 책임을 가지도록 분리
- 재사용 가능한 유틸 함수와 컴포넌트는 즉시 분리
- 인라인 CSS 지양, Tailwind CSS 활용
- ESLint 및 Prettier 규칙 준수
- `console.log`는 디버깅 시에만 사용하고 커밋 전 삭제

## 🚀 배포

Vercel을 통한 자동 배포를 지원합니다. GitHub 저장소와 연결하여 main 브랜치에 푸시하면 자동으로 배포됩니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
