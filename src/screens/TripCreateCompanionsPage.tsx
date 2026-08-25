"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/layout/AppBar";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Button from "@/components/common/Button";
import StateView from "@/components/common/StateView";
import StepIndicator from "@/components/common/StepIndicator";
import RoleChipGroup from "@/components/trip/RoleChipGroup";
import { useTripDraft } from "@/hooks/useTripDraft";
import { createTrip, getRoleGroups } from "@/services/tripService";
import type { AsyncState } from "@/types/common";
import type { RoleGroup } from "@/types/role";
import styles from "./TripCreatePage.module.css";

/** 여행 만들기 3단계 — 동행. 고른 역할 수가 곧 인원이다. */
export default function TripCreateCompanionsPage() {
  const router = useRouter();
  const { draft, toggleRole, addCustomRole, customRoles, reset } = useTripDraft();
  const [groups, setGroups] = useState<AsyncState<RoleGroup[]>>({ status: "loading", data: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getRoleGroups()
      .then((list) => alive && setGroups({ status: "success", data: list }))
      .catch(() => alive && setGroups({ status: "error", data: null, message: "역할을 불러오지 못했어요." }));
    return () => {
      alive = false;
    };
  }, []);

  function handleAddCustom() {
    // TODO(개발): 바텀시트 입력으로 교체한다. 지금은 흐름 확인용.
    const label = window.prompt("역할 이름을 입력해주세요 (예: 이모)");
    if (label && label.trim()) addCustomRole(label.trim());
  }

  async function handleSubmit() {
    if (!draft.startDate || !draft.endDate) return;
    setSubmitting(true);
    setError(null);
    try {
      await createTrip({
        name: draft.name,
        startDate: draft.startDate,
        endDate: draft.endDate,
        roleCodes: draft.roleCodes,
      });
      reset();
      router.push("/home");
    } catch {
      setError("여행을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileFrame>
      <StatusBar />
      <AppBar title="여행 만들기" />

      <div className={styles.content}>
        <div className={styles.flowHeader}>
          <StepIndicator current={3} total={3} />
          <div className={styles.titleBlock}>
            <span className={styles.title}>누구와 함께 가세요?</span>
            <span className={styles.description}>함께 갈 가족을 골라주세요</span>
          </div>
        </div>

        {groups.status === "loading" ? <StateView title="역할을 불러오는 중이에요" /> : null}
        {groups.status === "error" ? (
          <StateView icon="📡" title="문제가 발생했어요" description={groups.message} />
        ) : null}

        {groups.status === "success" && groups.data ? (
          <div className={styles.form}>
            <div className={styles.countRow}>
              <span className={styles.countLabel}>가족 구성</span>
              <span className={styles.counter}>{draft.roleCodes.length}명 선택됨</span>
            </div>
            <span className={styles.hint}>탭하면 초대 목록에 들어가요</span>
            <RoleChipGroup
              groups={groups.data}
              selectedCodes={draft.roleCodes}
              onToggle={toggleRole}
              onAddCustom={handleAddCustom}
              customRoles={customRoles}
            />
          </div>
        ) : null}

        {error ? <span className={styles.hint}>{error}</span> : null}
      </div>

      <div className={styles.footer}>
        <Button disabled={draft.roleCodes.length === 0 || submitting} onClick={handleSubmit}>
          {submitting ? "만드는 중..." : "여행 만들기"}
        </Button>
      </div>
    </MobileFrame>
  );
}
