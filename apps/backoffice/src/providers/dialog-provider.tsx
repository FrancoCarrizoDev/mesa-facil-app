"use client";

import Dialog from "@repo/ui/dialog";
import { useContext } from "react";
import { DialogContext } from "src/context/dialog/dialog.context";

export default function DialogProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, content, onOpenChange } = useContext(DialogContext);
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange} content={content} />
      {children}
    </div>
  );
}
