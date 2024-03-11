export interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: "primary" | "secondary";
  underline?: "hover" | "none" | "always";
  disabled?: boolean;
  weight?: "normal" | "bold" | "semibold" | "extrabold";
}
