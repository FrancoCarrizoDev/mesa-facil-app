"use client";
import { FC, useReducer } from "react";
import { DialogContext, OpenDialogProps } from "./dialog.context";
import { DialogReducer } from "./dialog.reducer";

export interface DialogStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  content: React.ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
}

const DIALOG_INITIAL_STATE: DialogStateProps = {
  open: false,
  onOpenChange: () => {},
  title: "",
  description: "",
  content: null,
  handleSubmit: () => {},
  handleClose: () => {},
};

type Props = { children: React.ReactNode };

export const DialogProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, DIALOG_INITIAL_STATE);

  const openDialog = (payload: OpenDialogProps) => {
    dispatch({ type: "[Dialog] - Open", payload });
  };

  const closeDialog = () => {
    dispatch({ type: "[Dialog] - Close" });
  };

  return (
    <DialogContext.Provider value={{ ...state, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
