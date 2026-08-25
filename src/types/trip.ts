import type { Role } from "./role";

/** 여행 진행 상태. 화면 배지와 API 응답이 같은 값을 쓴다. */
export type TripStatus = "ACTIVE" | "UPCOMING" | "DONE";

export interface Trip {
  id: string;
  name: string;
  /** ISO 8601 (YYYY-MM-DD) */
  startDate: string;
  endDate: string;
  status: TripStatus;
  /** 출발까지 남은 일수. DONE 이면 null */
  dDay: number | null;
  memberCount: number;
  /** 확정된 일정 항목 수 */
  confirmedCount: number;
  /** 전체 일정 항목 수 */
  totalCount: number;
}

export interface TripCreateDraft {
  name: string;
  startDate: string | null;
  endDate: string | null;
  roleCodes: string[];
}

export interface TripCreateRequest {
  name: string;
  startDate: string;
  endDate: string;
  roleCodes: string[];
}

export type { Role };
