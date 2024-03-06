import React from "react";
import CrossIcon from "./icons/cross-icon";

interface DialogTitleProps {
  title: string;
  onClose: () => void;
}

export default function DialogHeader({
  title,
  onClose,
}: DialogTitleProps): JSX.Element {
  return (
    <div className="ui-text-yellow-700 ui-m-0 ui-text-[17px] ui-font-semibold ui-flex ui-items-center ui-justify-between">
      {title}
      <CrossIcon
        className="ui-text-gray-800 ui-cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}
