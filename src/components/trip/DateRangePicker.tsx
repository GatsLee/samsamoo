"use client";

import styles from "./DateRangePicker.module.css";
import { formatDate } from "./tripFormat";

interface DateRangePickerProps {
  year: number;
  month: number; // 1-12
  startDate: string | null;
  endDate: string | null;
  onSelect: (iso: string) => void;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toIso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function DateRangePicker({
  year,
  month,
  startDate,
  endDate,
  onSelect,
}: DateRangePickerProps) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const dayCount = new Date(year, month, 0).getDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: dayCount }, (_, index) => index + 1),
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        <div className={styles.slot} data-filled={Boolean(startDate)}>
          <span className={styles.slotLabel}>시작일</span>
          <span className={styles.slotValue}>{startDate ? formatDate(startDate) : "선택하세요"}</span>
        </div>
        <div className={styles.slot} data-filled={Boolean(endDate)}>
          <span className={styles.slotLabel}>종료일</span>
          <span className={styles.slotValue}>{endDate ? formatDate(endDate) : "선택하세요"}</span>
        </div>
      </div>

      <div className={styles.calendar}>
        <div className={styles.calendarHead}>
          <span>
            {year}년 {month}월
          </span>
        </div>
        <div className={styles.weekdays}>
          {WEEKDAYS.map((label) => (
            <span key={label} className={styles.weekday}>
              {label}
            </span>
          ))}
        </div>
        <div className={styles.days}>
          {cells.map((day, index) => {
            if (day === null) return <span key={`empty-${index}`} />;
            const iso = toIso(year, month, day);
            const isEdge = iso === startDate || iso === endDate;
            const inRange =
              Boolean(startDate) && Boolean(endDate) && iso > startDate! && iso < endDate!;

            return (
              <button
                key={iso}
                type="button"
                className={styles.day}
                data-edge={isEdge}
                data-inrange={inRange}
                onClick={() => onSelect(iso)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <span className={styles.hint}>기간을 변경하면 일차가 다시 계산돼요</span>
    </div>
  );
}
