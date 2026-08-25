import styles from "./MobileFrame.module.css";

/**
 * 402x874 모바일 화면 틀.
 * 실제 앱에 이식할 때는 이 컴포넌트만 걷어내면 된다.
 */
export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
