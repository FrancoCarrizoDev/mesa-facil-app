"use client";
import { type ReactNode, createContext } from "react";

export interface OpenDialogProps {
  title: string;
  description: string;
  content: ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  content: ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
  openDialog: (open: OpenDialogProps) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext({} as DialogProps);
