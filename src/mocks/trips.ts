import type { Trip } from "@/types/trip";

export const MOCK_TRIPS: Trip[] = [
  {
    id: "t_001",
    name: "도쿄 가족 여행",
    startDate: "2026-08-24",
    endDate: "2026-08-27",
    status: "ACTIVE",
    dDay: 18,
    memberCount: 4,
    confirmedCount: 5,
    totalCount: 8,
  },
  {
    id: "t_002",
    name: "부산 2박 3일",
    startDate: "2026-09-12",
    endDate: "2026-09-14",
    status: "UPCOMING",
    dDay: 37,
    memberCount: 3,
    confirmedCount: 0,
    totalCount: 4,
  },
  {
    id: "t_003",
    name: "제주 3박 4일",
    startDate: "2026-06-10",
    endDate: "2026-06-13",
    status: "DONE",
    dDay: null,
    memberCount: 4,
    confirmedCount: 8,
    totalCount: 8,
  },
];

/** 홈의 '데이터 없음' 상태를 확인할 때 쓴다. */
export const MOCK_TRIPS_EMPTY: Trip[] = [];
