import type { Trip } from "@/types/trip";

/** "2026-08-24" -> "8월 24일" */
export function formatDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

/** "8월 24일 - 8월 27일 · 4명" */
export function formatTripMeta(trip: Trip): string {
  return `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)} · ${trip.memberCount}명`;
}

/** 확정 진행률(%) */
export function confirmRate(trip: Trip): number {
  if (trip.totalCount === 0) return 0;
  return Math.round((trip.confirmedCount / trip.totalCount) * 100);
}

/** 히어로 배지와 목록 우측에 쓰는 라벨 */
export function statusLabel(trip: Trip): string {
  if (trip.status === "DONE") return "완료";
  return trip.dDay === null ? "예정" : `D-${trip.dDay}`;
}
