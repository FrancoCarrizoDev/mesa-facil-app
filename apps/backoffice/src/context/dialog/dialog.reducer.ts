import { DialogState } from "./dialog.provider";

type DialogActionType = { type: "[Dialog] - ActionName" };

export const DialogReducer = (
  state: DialogState,
  action: DialogActionType
): DialogState => {
  switch (action.type) {
    case "[Dialog] - ActionName":
      return {
        ...state,
      };
    default:
      return state;
  }
};
