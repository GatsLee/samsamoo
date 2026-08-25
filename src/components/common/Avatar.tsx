import styles from "./Avatar.module.css";

interface AvatarProps {
  initial: string;
  onClick?: () => void;
  label?: string;
}

export default function Avatar({ initial, onClick, label = "설정" }: AvatarProps) {
  return (
    <button type="button" className={styles.avatar} onClick={onClick} aria-label={label}>
      {initial}
    </button>
  );
}
