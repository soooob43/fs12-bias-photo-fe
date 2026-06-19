# 🖼️ Bias Photo FE

> 디지털 포토카드를 생성하고, 마켓에서 구매/판매/교환할 수 있는 포토카드 거래 서비스입니다. <br>
> 프로젝트 기간: 2026.06.01 ~ 2026.06.24

## 🔗 구현 홈페이지

https://fs12-bias-photo-fe.vercel.app/

## 👥 팀원 구성

팀장 : 최혜성

- 김남진
- 신영미
- 윤소정
- 이지연
- 한희나

## 🛠️ Tech Stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules
- Tailwind CSS
- TanStack Query
- Zod

## 📌 프로젝트 소개

최애의 포토는 사용자가 자신만의 포토카드를 생성하고, 마켓플레이스에서 다른 사용자와 포토카드를 거래할 수 있는 서비스입니다.

- 포토카드 생성 및 내 갤러리 관리
- 포토카드 판매 등록, 수정, 삭제
- 마켓플레이스 목록 조회 및 상세 페이지
- 포토카드 구매 및 교환 제시
- 로그인/회원가입 및 Google 소셜 로그인
- 실시간 알림 및 읽지 않은 알림 표시

### 공통 Tool

- Git & GitHub
- Vercel
- Discord / Notion
- Slack

## ✨ 주요 기능

###  인증

- 이메일 로그인 및 회원가입
- Google 소셜 로그인
- 로그인 사용자 정보 조회
- 보호 라우트 접근 제어
- 로그아웃 처리

###  마켓플레이스

- 판매 중인 포토카드 목록 조회
- 등급, 장르, 판매 상태, 정렬 필터링
- 키워드 검색
- 반응형 필터 UI
- 포토카드 상세 페이지 이동

###  포토카드 상세

- 판매자/구매자 상태에 따른 UI 분기
- 포토카드 구매
- 교환 제시
- 판매글 수정
- 판매글 삭제

### 내 갤러리

- 보유 포토카드 목록 조회
- 등급/장르/키워드 필터
- 포토카드 생성
- 생성 성공/실패 결과 페이지
- 생성 가능 횟수 표시

###  나의 판매 포토카드

- 내가 등록한 판매글 목록 조회
- 판매 상태 및 수량 확인
- 판매글 수정/삭제 플로우 연결

###  알림

- SSE 기반 실시간 알림 수신
- 최근 알림 목록 조회
- 읽지 않은 알림 뱃지 표시
- 알림 읽음 처리

## 📁 프로젝트 구조

```
src
 ┣ api
 ┃ ┣ core
 ┃ ┃ ┗ fetchClient.js
 ┃ ┣ authApi.js
 ┃ ┣ cardApi.js
 ┃ ┣ detailApi.js
 ┃ ┣ galleryApi.js
 ┃ ┣ marketApi.js
 ┃ ┣ mySaleApi.js
 ┃ ┣ notificationApi.js
 ┃ ┗ transactionApi.js
 ┣ app
 ┃ ┣ (guest)
 ┃ ┃ ┣ (auth)
 ┃ ┃ ┃ ┣ login
 ┃ ┃ ┃ ┗ signup
 ┃ ┃ ┗ (landing)
 ┃ ┣ (protected)
 ┃ ┃ ┣ my-gallery
 ┃ ┃ ┣ my-photo-card-sell
 ┃ ┃ ┗ my-sales
 ┃ ┣ (public)
 ┃ ┃ ┗ market
 ┃ ┃ ┃ ┗ [transactionId]
 ┃ ┣ globals.css
 ┃ ┣ layout.js
 ┃ ┗ not-found.jsx
 ┣ assets
 ┃ ┣ icons
 ┃ ┗ images
 ┣ components
 ┃ ┣ auth
 ┃ ┣ icons
 ┃ ┣ layout
 ┃ ┣ Modal
 ┃ ┣ Notification
 ┃ ┗ ui
 ┣ constants
 ┣ fonts
 ┣ hooks
 ┣ providers
 ┣ schemas
 ┗ utils
```

## ⚙️ 시스템 이미지

추가될 예정

## 실행 방법

```bash
패키지 설치
npm install

환경 변수 설정
프로젝트 루트에 .env.local 파일을 생성하고 아래 값을 설정합니다.
NEXT_PUBLIC_API_URL=https://fs12-bias-photo-be.onrender.com

개발 서버 실행
npm run dev

빌드
npm run build

프로덕션 실행
npm run start
