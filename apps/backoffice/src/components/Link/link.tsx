import NextLink from "next/link";
import { type LinkProps } from "./link.model";

export default function Link({
  href,
  children,
  color = "primary",
  underline = "none",
  disabled = false,
  weight = "semibold",
  size = "sm",
}: LinkProps): JSX.Element {
  const colors = {
    primary: "text-gray-700 hover:text-primary-800",
    secondary: "text-gray-100 hover:text-gray-50",
    white: "text-white hover:text-gray-50",
  };

  const underlineClasses = {
    none: "no-underline",
    hover: "hover:underline",
    always: "underline",
  };

  const weights = {
    normal: "font-normal",
    bold: "font-bold",
    semibold: "font-semibold",
    extrabold: "font-extrabold",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  return (
    <NextLink
      className={`text-sm ${weights[weight]} ${colors[color]} ${
        underlineClasses[underline]
      } ${disabled ? "pointer-events-none text-gray-300" : ""} ${sizes[size]} `}
      href={href}
    >
      {children}
    </NextLink>
  );
}
