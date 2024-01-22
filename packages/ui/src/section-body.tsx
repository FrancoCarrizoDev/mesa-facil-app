import { type ReactNode } from "react";

export default function SectionBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-5 mt-5 text-yellow-900">
      {children}
    </div>
  );
}
