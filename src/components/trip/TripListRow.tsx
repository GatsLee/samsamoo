import type { Trip } from "@/types/trip";
import styles from "./TripListRow.module.css";
import { formatTripMeta, statusLabel } from "./tripFormat";

interface TripListRowProps {
  trip: Trip;
  onOpen: (tripId: string) => void;
}

/** 히어로가 아닌 나머지 여행. 한 줄씩 쌓인다. */
export default function TripListRow({ trip, onOpen }: TripListRowProps) {
  return (
    <button
      type="button"
      className={styles.row}
      data-done={trip.status === "DONE"}
      onClick={() => onOpen(trip.id)}
    >
      <span className={styles.info}>
        <span className={styles.name}>{trip.name}</span>
        <span className={styles.meta}>{formatTripMeta(trip)}</span>
      </span>
      <span className={styles.status}>{statusLabel(trip)}</span>
      <span className={styles.arrow}>›</span>
    </button>
  );
}
