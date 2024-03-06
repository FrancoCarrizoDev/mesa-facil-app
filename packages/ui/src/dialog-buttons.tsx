import React from "react";
import Button from "./button";

interface DialogButtonsProps {
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DialogButtons({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: DialogButtonsProps): JSX.Element {
  return (
    <div className="ui-mt-[25px] ui-flex ui-justify-end ui-gap-3">
      <Button color="tertiary" onClick={onCancel} size="sm" variant="outlined">
        {cancelText}
      </Button>

      <Button color="secondary" onClick={onConfirm} size="sm">
        {confirmText}
      </Button>
    </div>
  );
}
