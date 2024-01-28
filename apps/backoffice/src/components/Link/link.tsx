import NextLink from "next/link";
import { type LinkProps } from "./link.model";

export default function Link({
  href,
  children,
  color = "primary",
  underline = "none",
  disabled = false,
}: LinkProps): JSX.Element {
  const colors = {
    primary: "text-gray-700 hover:text-primary-800",
    secondary: "text-gray-100 hover:text-gray-50",
  };

  const underlineClasses = {
    none: "no-underline",
    hover: "hover:underline",
    always: "underline",
  };

  return (
    <NextLink
      className={`text-sm font-semibold ${colors[color]} ${
        underlineClasses[underline]
      } ${disabled ? "pointer-events-none text-gray-300" : ""} `}
      href={href}
    >
      {children}
    </NextLink>
  );
}
