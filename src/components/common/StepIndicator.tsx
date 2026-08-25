import styles from "./StepIndicator.module.css";

interface StepIndicatorProps {
  current: number;
  total: number;
}

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bars}>
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className={styles.bar} data-on={index < current} />
        ))}
      </div>
      <span className={styles.count}>
        {current} / {total}
      </span>
    </div>
  );
}
