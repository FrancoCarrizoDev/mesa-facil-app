import { FC, useReducer } from "react";
import { DialogContext } from "./dialog.context";
import { DialogReducer } from "./dialog.reducer";

export interface DialogState {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
  triggerElement: string | React.ReactNode;
}

const DIALOG_INITIAL_STATE: DialogState = {
  open: false,
  onOpenChange: () => {},
  title: "",
  description: "",
  children: null,
  triggerElement: "",
  handleSubmit: () => {},
  handleClose: () => {},
};

type Props = { children: React.ReactNode };

export const DialogProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, DIALOG_INITIAL_STATE);
  return (
    <DialogContext.Provider value={{ ...state }}>
      {children}
    </DialogContext.Provider>
  );
};
