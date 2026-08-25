import Button from "@/components/common/Button";
import type { Trip } from "@/types/trip";
import styles from "./TripHeroCard.module.css";
import { confirmRate, formatTripMeta, statusLabel } from "./tripFormat";

interface TripHeroCardProps {
  trip: Trip;
  onOpen: (tripId: string) => void;
}

/** 홈 최상단. 가장 임박한 여행 하나를 크게 보여준다. */
export default function TripHeroCard({ trip, onOpen }: TripHeroCardProps) {
  const rate = confirmRate(trip);

  return (
    <section className={styles.card}>
      <div className={styles.badgeRow}>
        <span className={styles.dday}>{statusLabel(trip)}</span>
        <span className={styles.status}>진행 중</span>
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{trip.name}</span>
        <span className={styles.meta}>{formatTripMeta(trip)}</span>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressLabel}>
          <span>
            일정 {trip.totalCount}개 중 {trip.confirmedCount}개 확정
          </span>
          <span className={styles.rate}>{rate}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${rate}%` }} />
        </div>
      </div>

      <Button size="small" onClick={() => onOpen(trip.id)}>
        일정 보러가기
      </Button>
    </section>
  );
}
