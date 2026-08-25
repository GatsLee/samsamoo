import styles from "./StatusBar.module.css";

interface StatusBarProps {
  /** 브랜드색 배경 위에 얹을 때 light */
  tone?: "dark" | "light";
}

export default function StatusBar({ tone = "dark" }: StatusBarProps) {
  return (
    <div className={styles.bar} data-tone={tone}>
      <span>9:41</span>
      <span className={styles.indicators}>●●● ▮</span>
    </div>
  );
}
