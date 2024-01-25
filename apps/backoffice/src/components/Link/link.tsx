import NextLink from "next/link";
import { type LinkProps } from "./link.model";

export default function Link({
  href,
  children,
  color = "primary",
}: LinkProps): JSX.Element {
  const colors = {
    primary: "text-gray-700 hover:text-primary-800",
    secondary: "text-gray-100 hover:text-gray-50",
  };

  return (
    <NextLink className={`text-sm font-semibold ${colors[color]}`} href={href}>
      {children}
    </NextLink>
  );
}
