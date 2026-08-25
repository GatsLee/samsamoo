"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Avatar from "@/components/common/Avatar";
import Fab from "@/components/common/Fab";
import StateView from "@/components/common/StateView";
import TripHeroCard from "@/components/trip/TripHeroCard";
import TripListRow from "@/components/trip/TripListRow";
import { getMe } from "@/services/authService";
import { getTrips } from "@/services/tripService";
import type { AsyncState } from "@/types/common";
import type { Trip } from "@/types/trip";
import type { User } from "@/types/user";
import styles from "./HomePage.module.css";

/**
 * IA_HM_001 홈.
 * 가장 임박한 여행을 히어로로 올리고 나머지는 목록으로 내린다.
 */
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<AsyncState<Trip[]>>({ status: "loading", data: null });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const [me, list] = await Promise.all([getMe(), getTrips()]);
        if (!alive) return;
        setUser(me);
        setTrips({ status: list.length === 0 ? "empty" : "success", data: list });
      } catch {
        if (!alive) return;
        setTrips({
          status: "error",
          data: null,
          message: "여행 목록을 불러오지 못했어요.",
        });
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const list = trips.data ?? [];
  const hero = list.find((trip) => trip.status === "ACTIVE") ?? list[0] ?? null;
  const others = list.filter((trip) => trip.id !== hero?.id);
  const preparingCount = list.filter((trip) => trip.status !== "DONE").length;

  function openTrip(tripId: string) {
    // TODO(개발): 일정 보드 라우트가 생기면 연결한다.
    router.push(`/trips/${tripId}`);
  }

  return (
    <MobileFrame>
      <StatusBar />

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.greeting}>
            <span className={styles.name}>{user ? `${user.name}님의 여행` : "내 여행"}</span>
            <span className={styles.summary}>
              {trips.status === "success" ? `준비 중인 여행 ${preparingCount}개` : " "}
            </span>
          </div>
          <Avatar initial={user?.initial ?? "·"} onClick={() => router.push("/settings")} />
        </header>

        {trips.status === "loading" ? <StateView title="여행을 불러오는 중이에요" /> : null}

        {trips.status === "error" ? (
          <StateView
            icon="📡"
            title="문제가 발생했어요"
            description={trips.message}
            actionLabel="다시 시도"
            onAction={() => window.location.reload()}
          />
        ) : null}

        {trips.status === "empty" ? (
          <StateView
            icon="🧳"
            title="아직 만든 여행이 없어요"
            description={"여행을 만들면 일차가 자동으로 생기고,\n부모님을 초대할 링크가 발급돼요."}
            actionLabel="여행 만들기"
            onAction={() => router.push("/trips/new")}
          />
        ) : null}

        {trips.status === "success" && hero ? (
          <>
            <TripHeroCard trip={hero} onOpen={openTrip} />

            {others.length > 0 ? (
              <section className={styles.others}>
                <span className={styles.othersLabel}>다른 여행</span>
                {others.map((trip) => (
                  <TripListRow key={trip.id} trip={trip} onOpen={openTrip} />
                ))}
              </section>
            ) : null}
          </>
        ) : null}
      </div>

      {trips.status === "success" ? (
        <Fab label="여행 만들기" onClick={() => router.push("/trips/new")} />
      ) : null}
    </MobileFrame>
  );
}
