import { type ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="ui-w-full ui-border ui-rounded-md ui-p-5 ui-bg-yellow-50 ui-border-yellow-200">
      {children}
    </section>
  );
}
