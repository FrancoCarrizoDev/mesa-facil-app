import { type ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="ui-w-full ui-border ui-rounded-md ui-p-5 ui-bg-gray-50 ui-border-gray-200">
      {children}
    </section>
  );
}
