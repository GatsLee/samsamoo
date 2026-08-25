"use client";

import { useRouter } from "next/navigation";
import AppBar from "@/components/layout/AppBar";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Button from "@/components/common/Button";
import StepIndicator from "@/components/common/StepIndicator";
import TextField from "@/components/common/TextField";
import { useTripDraft } from "@/hooks/useTripDraft";
import styles from "./TripCreatePage.module.css";

/** B-01 여행 만들기 1단계 — 이름 */
export default function TripCreateNamePage() {
  const router = useRouter();
  const { draft, setName } = useTripDraft();

  return (
    <MobileFrame>
      <StatusBar />
      <AppBar title="여행 만들기" />

      <div className={styles.content}>
        <div className={styles.flowHeader}>
          <StepIndicator current={1} total={3} />
          <div className={styles.titleBlock}>
            <span className={styles.title}>어디로 떠나세요?</span>
            <span className={styles.description}>우리 여행의 이름을 입력해주세요.</span>
          </div>
        </div>

        <div className={styles.form}>
          <TextField
            name="tripName"
            placeholder="예: 도쿄 가족여행"
            value={draft.name}
            onChange={(event) => setName(event.target.value)}
          />
          <span className={styles.hint}>이름은 나중에 언제든 바꿀 수 있어요</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Button disabled={draft.name.trim().length === 0} onClick={() => router.push("/trips/new/dates")}>
          다음
        </Button>
      </div>
    </MobileFrame>
  );
}
