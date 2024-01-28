import { type ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "tertiary" | "danger";
  variant?: "contained" | "outlined" | "text";
  rounded?: "none" | "sm" | "md" | "lg" | "full" | "pill";
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "ui-py-1 ui-px-2 ui-text-sm",
  md: "ui-py-2 ui-px-4 ui-text-md",
  lg: "ui-py-3 ui-px-6 ui-text-lg",
};

const VARIANTS = {
  contained: "ui-bg-yellow-600",
  outlined: "ui-bg-transparent ui-border ui-border-yellow-600",
  text: "ui-bg-transparent",
};

const COLORS = {
  primary: "ui-text-white",
  secondary: "ui-text-white",
  tertiary: "ui-text-yellow-600",
  danger: "ui-text-red-600",
};

const ROUNDED = {
  none: "",
  sm: "ui-rounded-sm",
  md: "ui-rounded-md",
  lg: "ui-rounded-lg",
  full: "ui-rounded-full",
  pill: "ui-rounded-pill",
};

export default function Button({
  children,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  rounded = "md",
  size = "md",
}: ButtonProps): JSX.Element {
  const sizeClass = SIZES[size];
  const colorClass = COLORS[color];
  const variantClass = VARIANTS[variant];
  const roundedClass = ROUNDED[rounded];

  return (
    <button
      className={`ui-block ui-font-medium ${sizeClass} ${variantClass} ${colorClass}  ${roundedClass}  `}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
