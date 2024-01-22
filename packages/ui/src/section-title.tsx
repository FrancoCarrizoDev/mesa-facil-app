import { type ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="ui-text-4xl ui-font-bold ui-text-yellow-950">{children}!</h1>
  );
}
