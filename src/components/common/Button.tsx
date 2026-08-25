import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "neutral" | "text";
  size?: "medium" | "small";
}

export default function Button({
  variant = "primary",
  size = "medium",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={styles.button} data-variant={variant} data-size={size} type={type} {...rest}>
      {children}
    </button>
  );
}
