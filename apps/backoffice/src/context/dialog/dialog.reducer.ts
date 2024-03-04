import { OpenDialogProps } from "./dialog.context";
import { DialogStateProps } from "./dialog.provider";

type DialogActionType =
  | { type: "[Dialog] - Open"; payload: OpenDialogProps }
  | { type: "[Dialog] - Close" };

export const DialogReducer = (
  state: DialogStateProps,
  action: DialogActionType
): DialogStateProps => {
  switch (action.type) {
    case "[Dialog] - Open":
      const { content, description, title, handleSubmit, handleClose } =
        action.payload;
      return {
        ...state,
        open: true,
        content,
        description,
        title,
        handleSubmit,
        handleClose,
      };
    case "[Dialog] - Close":
      return {
        ...state,
        open: false,
        onOpenChange: () => {},
        title: "",
        description: "",
        content: null,
        handleSubmit: () => {},
        handleClose: () => {},
      };
    default:
      return state;
  }
};
