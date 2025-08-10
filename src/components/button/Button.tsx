import { useId } from "react";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}
export function Button({
  label,
  disabled,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const id = useId();
  return (
    <button
      id={id}
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center rounded-lg px-4 py-2 font-medium border
        ${variant === "primary" ? "bg-black text-white" : ""}
        ${variant === "secondary" ? "bg-white text-black border-black" : ""}
        ${variant === "ghost" ? "bg-transparent text-black border-transparent underline" : ""}
      `}
      aria-label={label}
    >
      {label}
    </button>
  );
}
export default Button;
