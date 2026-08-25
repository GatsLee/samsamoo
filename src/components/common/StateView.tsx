import Button from "./Button";
import styles from "./StateView.module.css";

interface StateViewProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** 로딩·데이터 없음·오류를 한 컴포넌트로 처리한다. */
export default function StateView({ icon, title, description, actionLabel, onAction }: StateViewProps) {
  return (
    <div className={styles.wrap}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.title}>{title}</span>
      {description ? <span className={styles.description}>{description}</span> : null}
      {actionLabel && onAction ? (
        <div className={styles.action}>
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
