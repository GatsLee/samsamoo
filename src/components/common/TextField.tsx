import styles from "./TextField.module.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function TextField({ label, error, id, ...rest }: TextFieldProps) {
  const inputId = id ?? rest.name;

  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input className={styles.input} id={inputId} aria-invalid={Boolean(error)} {...rest} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
