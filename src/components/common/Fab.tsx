import styles from "./Fab.module.css";

interface FabProps {
  onClick?: () => void;
  label: string;
}

export default function Fab({ onClick, label }: FabProps) {
  return (
    <button type="button" className={styles.fab} onClick={onClick} aria-label={label}>
      +
    </button>
  );
}
