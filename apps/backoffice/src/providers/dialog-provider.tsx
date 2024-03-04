"use client";

import Dialog from "@repo/ui/dialog";
import { useContext } from "react";
import { DialogContext } from "src/context/dialog/dialog.context";

export default function DialogProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    open,
    content,
    description,
    onOpenChange,
    title,
    handleClose,
    handleSubmit,
  } = useContext(DialogContext);
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        description={description}
        title={title}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        content={content}
      />
      {children}
    </div>
  );
}
