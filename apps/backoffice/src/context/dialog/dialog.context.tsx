import { createContext } from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
  triggerElement: string | React.ReactNode;
}

export const DialogContext = createContext({} as DialogProps);
