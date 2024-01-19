import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "tertiary";
  variant?: "contained" | "outlined" | "text";
  rounded?: "none" | "sm" | "md" | "lg" | "full" | "pill";
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "ui-py-1 ui-px-2 ui-text-sm",
  md: "ui-py-2 ui-px-4 ui-text-md",
  lg: "ui-py-3 ui-px-6 ui-text-lg",
};

const COLORS = {
  primary: "ui-bg-blue-600 ui-text-white",
  secondary: "ui-bg-gray-600 ui-text-white",
  tertiary: "ui-bg-transparent ui-text-blue-600",
};

const VARIANTS = {
  contained: "ui-bg-blue-600 ui-text-white",
  outlined: "ui-border ui-border-blue-600 ui-text-blue-600",
  text: "ui-text-blue-600",
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
      type={type}
      onClick={onClick}
      className={`ui-block  ui-font-medium ${sizeClass} ${colorClass} ${variantClass} ${roundedClass}  `}
    >
      {children}
    </button>
  );
}