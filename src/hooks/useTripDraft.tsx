"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { TripCreateDraft } from "@/types/trip";

const EMPTY_DRAFT: TripCreateDraft = {
  name: "",
  startDate: null,
  endDate: null,
  roleCodes: [],
};

interface TripDraftValue {
  draft: TripCreateDraft;
  setName: (name: string) => void;
  selectDate: (iso: string) => void;
  toggleRole: (code: string) => void;
  addCustomRole: (label: string) => void;
  customRoles: string[];
  reset: () => void;
}

const TripDraftContext = createContext<TripDraftValue | null>(null);

/**
 * 여행 만들기 3단계가 공유하는 임시 상태.
 * 서버 저장은 마지막 단계에서 tripService.createTrip 한 번으로 끝난다.
 */
export function TripDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<TripCreateDraft>(EMPTY_DRAFT);
  const [customRoles, setCustomRoles] = useState<string[]>([]);

  const setName = useCallback((name: string) => {
    setDraft((prev) => ({ ...prev, name }));
  }, []);

  const selectDate = useCallback((iso: string) => {
    setDraft((prev) => {
      // 시작일이 없거나 이미 범위가 잡혀 있으면 새 시작일로 다시 잡는다.
      if (!prev.startDate || prev.endDate) {
        return { ...prev, startDate: iso, endDate: null };
      }
      if (iso < prev.startDate) {
        return { ...prev, startDate: iso, endDate: null };
      }
      return { ...prev, endDate: iso };
    });
  }, []);

  const toggleRole = useCallback((code: string) => {
    setDraft((prev) => ({
      ...prev,
      roleCodes: prev.roleCodes.includes(code)
        ? prev.roleCodes.filter((item) => item !== code)
        : [...prev.roleCodes, code],
    }));
  }, []);

  const addCustomRole = useCallback((label: string) => {
    setCustomRoles((prev) => (prev.includes(label) ? prev : [...prev, label]));
    setDraft((prev) => ({ ...prev, roleCodes: [...prev.roleCodes, label] }));
  }, []);

  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    setCustomRoles([]);
  }, []);

  const value = useMemo(
    () => ({ draft, setName, selectDate, toggleRole, addCustomRole, customRoles, reset }),
    [draft, setName, selectDate, toggleRole, addCustomRole, customRoles, reset],
  );

  return <TripDraftContext.Provider value={value}>{children}</TripDraftContext.Provider>;
}

export function useTripDraft(): TripDraftValue {
  const context = useContext(TripDraftContext);
  if (!context) {
    throw new Error("useTripDraft 는 TripDraftProvider 안에서만 쓸 수 있어요.");
  }
  return context;
}
