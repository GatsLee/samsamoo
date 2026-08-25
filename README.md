# 삼삼오오 — 자녀(호스트) 웹

가족이 함께 정하는 여행. 자녀 사이드 화면 중 **계정·접근**과 **홈/여행 만들기**를 먼저 구현한 핸드아웃 코드다.

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

http://localhost:3000 으로 접속하면 스플래시부터 시작한다.

## 구현 범위

| 라우트 | 화면 | Figma |
|--------|------|-------|
| `/` | 스플래시 | `IA_SY_001_스플래시_자녀` |
| `/login` | 로그인 | `A-01 로그인` |
| `/signup` | 회원가입 | `A-02 회원가입` |
| `/home` | 홈 (히어로 + 여행 목록) | `IA_HM_001_홈` |
| `/trips/new` | 여행 만들기 1 · 이름 | `B-01 여행 생성` |
| `/trips/new/dates` | 여행 만들기 2 · 기간 | `IA_HM_00201` |
| `/trips/new/companions` | 여행 만들기 3 · 동행 | `IA_HM_00202` |

홈의 **데이터 없음** 상태가 `A-01 여행 생성 완료 · 빈 타임라인` 화면을 대신한다. 별도 라우트가 아니라 홈의 한 상태다.

## 디렉토리

```
src/
  app/          Next.js App Router 라우트. 화면을 import 하는 얇은 껍데기만 둔다.
  screens/      화면 컴포넌트 본체
  components/
    layout/     MobileFrame · StatusBar · AppBar
    common/     Button · TextField · StepIndicator · Avatar · Fab · StateView
    trip/       TripHeroCard · TripListRow · RoleChipGroup · DateRangePicker
  services/     API 호출 계층
  mocks/        목데이터
  types/        공통 타입
  hooks/        여행 만들기 3단계 공유 상태
```

`src/pages/` 가 아니라 `src/screens/` 인 이유: Next.js App Router에서 `src/pages/` 는 구버전 Pages Router 디렉토리로 자동 인식돼 라우트가 중복 생성된다. 역할은 같다.

## 목데이터 → 실제 API 교체

`.env.local` 한 줄만 바꾸면 된다.

```
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE_URL=https://실제-서버/api
```

각 서비스 함수가 이렇게 갈린다.

```ts
export async function getTrips(): Promise<Trip[]> {
  if (USE_MOCK) return mockDelay(MOCK_TRIPS);
  return request<Trip[]>("/trips");
}
```

`USE_MOCK` 분기만 걷어내면 목데이터 코드가 남지 않는다.

## 서버가 맞춰야 할 응답

`src/types/` 의 타입이 곧 API 계약이다. 화면과 서버가 같은 필드명·상태값을 쓴다.

```ts
type TripStatus = "ACTIVE" | "UPCOMING" | "DONE";

interface Trip {
  id: string;
  name: string;
  startDate: string;   // "2026-08-24"
  endDate: string;
  status: TripStatus;
  dDay: number | null; // DONE 이면 null
  memberCount: number;
  confirmedCount: number;
  totalCount: number;
}
```

필요한 엔드포인트.

| 메서드 | 경로 | 용도 |
|--------|------|------|
| POST | `/auth/login` | 로그인 |
| POST | `/auth/signup` | 회원가입 |
| GET | `/auth/me` | 로그인 사용자 |
| GET | `/trips` | 내 여행 목록 |
| GET | `/roles` | 역할 칩 목록 |
| POST | `/trips` | 여행 생성 |

## 화면 상태

핵심 흐름에 필요한 상태만 구현했다. 홈과 동행 단계가 로딩·데이터없음·오류·성공을 모두 탄다. `StateView` 하나로 처리한다.

## 디자인 토큰

`src/app/globals.css` 의 CSS 변수. 값 변경은 여기서만 한다.

| 토큰 | 값 | 쓰임 |
|------|-----|------|
| `--color-brand` | `#00a6a6` | 주요 버튼·강조 |
| `--color-brand-tint` | `#e6f6f6` | 브랜드 배경 |
| `--color-ink` | `#1a1a1a` | 본문 |
| `--color-sub` | `#8a9090` | 보조 |
| `--color-faint` | `#c4c9c9` | 흐림 |
| `--color-line` | `#e8eaea` | 구분선·테두리 |

화면 규격은 402x874, 콘텐츠 좌우 패딩 24px다. `MobileFrame` 이 이 틀을 잡는다.

## 화면 크기 대응

`MobileFrame` 이 세 가지 경우를 나눠 처리한다.

| 환경 | 동작 |
|------|------|
| 데스크톱, 창 높이 충분 | 402x874 기기 틀로 가운데 배치 |
| 데스크톱, 창 높이 부족 | 높이를 `100dvh - 48px` 로 줄이고 본문이 내부 스크롤 |
| 480px 이하 | 기기 틀을 걷어내고 `100vw x 100dvh` 전체 화면 |

어느 경우든 하단 버튼은 잘리지 않는다. 버튼 영역은 `MobileFrame` 직속 자식이라 고정되고, 줄어든 높이는 본문(`.content`)이 스크롤로 흡수한다. 본문이 스크롤되려면 `flex: 1` 과 함께 `min-height: 0` 이 필요하다 — 새 화면을 만들 때 빠뜨리기 쉽다.

## 남은 작업

- `/trips/[id]` 일정 보드 (홈 카드 탭 시 목적지)
- `/settings` 설정 (홈 아바타 탭 시 목적지)
- 역할 직접 입력이 지금은 `window.prompt` 다. 바텀시트로 교체해야 한다.
- 기간 선택 달력이 2026년 9월 고정이다. 월 이동이 필요하다.
- 인증 토큰 저장·갱신 미구현. `apiClient` 의 `request` 에 헤더를 붙이면 된다.
