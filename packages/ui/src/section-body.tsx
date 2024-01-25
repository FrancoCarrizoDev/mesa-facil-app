import { type ReactNode } from "react";

export default function SectionBody({ children }: { children: ReactNode }) {
  return (
    <div className="ui-flex ui-items-center ui-gap-5 ui-mt-5 ui-text-yellow-900">
      {children}
    </div>
  );
}
