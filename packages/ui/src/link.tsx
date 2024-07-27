import { type LinkProps } from "@repo/common/models";
import NextLink from "next/link";

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
    primary: "ui-text-gray-700 hover:ui-text-primary-800",
    secondary: "ui-text-gray-100 hover:ui-text-gray-50",
    white: "ui-text-white hover:ui-text-gray-50",
    disabled: "ui-text-gray-100",
  };

  const underlineClasses = {
    none: "ui-no-underline",
    hover: "hover:ui-underline",
    always: "ui-underline",
  };

  const weights = {
    normal: "ui-font-normal",
    bold: "ui-font-bold",
    semibold: "ui-font-semibold",
    extrabold: "ui-font-extrabold",
  };

  const sizes = {
    sm: "ui-text-sm",
    md: "ui-text-md",
    lg: "ui-text-lg",
  };

  return (
    <NextLink
      className={`${weights[weight]} ${colors[color]} ${
        underlineClasses[underline]
      } ${disabled ? "ui-pointer-events-none ui-text-gray-300" : ""} ${
        sizes[size]
      } `}
      href={href}
    >
      {children}
    </NextLink>
  );
}
