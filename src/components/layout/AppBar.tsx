"use client";

import { useRouter } from "next/navigation";
import styles from "./AppBar.module.css";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function AppBar({ title, showBack = true, onBack }: AppBarProps) {
  const router = useRouter();

  return (
    <div className={styles.bar}>
      {showBack ? (
        <button type="button" className={styles.back} onClick={onBack ?? (() => router.back())} aria-label="뒤로">
          ←
        </button>
      ) : (
        <span />
      )}
      <span className={styles.title}>{title}</span>
      <span />
    </div>
  );
}
