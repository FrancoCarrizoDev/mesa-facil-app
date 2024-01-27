export interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: "primary" | "secondary";
  underline?: "hover" | "none" | "always";
}