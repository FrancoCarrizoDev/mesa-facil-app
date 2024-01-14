import NextLink from "next/link";
import { type LinkProps } from "./link.model";

export default function Link({ href, children }: LinkProps): JSX.Element {
  return (
    <NextLink className="text-sm  font-medium" href={href}>
      {children}
    </NextLink>
  );
}
