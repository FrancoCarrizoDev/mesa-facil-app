import { type ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "disabled"
    | "white";
  variant?: "contained" | "outlined" | "text";
  rounded?: "none" | "sm" | "md" | "lg" | "full" | "pill";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const SIZES = {
  sm: "ui-py-1 ui-px-2 ui-text-sm",
  md: "ui-py-2 ui-px-4 ui-text-md",
  lg: "ui-py-3 ui-px-6 ui-text-lg",
};

const VARIANTS = {
  contained:
    "ui-bg-gray-800 ui-border-gray-800 ui-text-white hover:ui-bg-gray-700 ui-transition-all hover:ui-border-gray-700 active:ui-bg-gray-900 active:ui-border-gray-900",
  outlined: "ui-bg-transparent ui-border ui-border-gray-600",
  text: "ui-bg-transparent",
};

const COLORS = {
  primary: "ui-text-white",
  secondary: "ui-text-white",
  tertiary: "ui-text-gray-900 hover:ui-text-gray-800",
  danger: "ui-text-red-600",
  disabled: "ui-text-gray-300",
  white: "ui-text-white",
};

const ROUNDED = {
  none: "",
  sm: "ui-rounded-sm",
  md: "ui-rounded-md",
  lg: "ui-rounded-lg",
  full: "ui-rounded-full",
  pill: "ui-rounded-pill",
};

const DISABLED = "ui-cursor-not-allowed ui-opacity-50";

export default function Button({
  children,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  rounded = "md",
  size = "md",
  disabled = false,
}: ButtonProps): JSX.Element {
  const sizeClass = SIZES[size];
  const colorClass = COLORS[color];
  const variantClass = VARIANTS[variant];
  const roundedClass = ROUNDED[rounded];

  return (
    <button
      className={`ui-block ui-font-medium ${sizeClass} ${variantClass} ${colorClass}  ${roundedClass} ${
        disabled ? DISABLED : null
      } `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
