"use client";
import { type ReactNode, createContext } from "react";

export interface OpenDialogProps {
  content: ReactNode;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: ReactNode;
  openDialog: (open: OpenDialogProps) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext({} as DialogProps);
