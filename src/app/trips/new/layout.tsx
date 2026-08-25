import { TripDraftProvider } from "@/hooks/useTripDraft";

/** 여행 만들기 3단계가 입력값을 공유하도록 감싼다. */
export default function TripCreateLayout({ children }: { children: React.ReactNode }) {
  return <TripDraftProvider>{children}</TripDraftProvider>;
}
