"use client";

import { useRouter } from "next/navigation";
import AppBar from "@/components/layout/AppBar";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Button from "@/components/common/Button";
import StepIndicator from "@/components/common/StepIndicator";
import DateRangePicker from "@/components/trip/DateRangePicker";
import { useTripDraft } from "@/hooks/useTripDraft";
import styles from "./TripCreatePage.module.css";

/** 여행 만들기 2단계 — 기간 */
export default function TripCreateDatesPage() {
  const router = useRouter();
  const { draft, selectDate } = useTripDraft();

  return (
    <MobileFrame>
      <StatusBar />
      <AppBar title="여행 만들기" />

      <div className={styles.content}>
        <div className={styles.flowHeader}>
          <StepIndicator current={2} total={3} />
          <div className={styles.titleBlock}>
            <span className={styles.title}>언제 떠나세요?</span>
            <span className={styles.description}>달력에서 시작일과 종료일을 고르세요</span>
          </div>
        </div>

        <DateRangePicker
          year={2026}
          month={9}
          startDate={draft.startDate}
          endDate={draft.endDate}
          onSelect={selectDate}
        />
      </div>

      <div className={styles.footer}>
        <Button
          disabled={!draft.startDate || !draft.endDate}
          onClick={() => router.push("/trips/new/companions")}
        >
          다음
        </Button>
      </div>
    </MobileFrame>
  );
}
