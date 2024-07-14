import { type ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="ui-text-2xl ui-font-semibold ui-text-gray-950">
      {children}
    </h1>
  );
}
