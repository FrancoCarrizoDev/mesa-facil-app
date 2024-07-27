export interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "white" | "disabled";
  underline?: "hover" | "none" | "always";
  disabled?: boolean;
  weight?: "normal" | "bold" | "semibold" | "extrabold";
  size?: "sm" | "md" | "lg";
}
