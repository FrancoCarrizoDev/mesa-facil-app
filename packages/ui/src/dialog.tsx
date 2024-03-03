import * as Dialog from "@radix-ui/react-dialog";
import CrossIcon from "./icons/cross-icon";
import Button from "./button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  handleSubmit?: () => void;
  handleClose?: () => void;
  triggerElement: string | React.ReactNode;
}

const DialogDemo = ({
  children,
  onOpenChange,
  open,
  title,
  description,
  triggerElement,
  handleClose,
  handleSubmit,
}: DialogProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger>{triggerElement}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="ui-bg-[rgba(0,0,0,.75)] data-[state=open]:ui-animate-overlayShow ui-fixed ui-inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow ui-fixed ui-top-[50%] ui-left-[50%] ui-max-h-[85vh] ui-w-[90vw] ui-max-w-[450px] ui-translate-x-[-50%] ui-translate-y-[-50%] ui-rounded-[6px] ui-bg-white ui-p-[25px] ui-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:ui-outline-none ">
        <Dialog.Title className="ui-text-yellow-700 ui-m-0 ui-text-[17px] ui-font-semibold ui-flex ui-items-center ui-justify-between">
          {title}
          <CrossIcon
            className="ui-text-gray-800 ui-cursor-pointer"
            onClick={handleClose}
          />
        </Dialog.Title>
        <Dialog.Description className="ui-text-gray-800 ui-mt-[10px] ui-mb-5 ui-text-[14px] ui-leading-normal">
          {description}
        </Dialog.Description>
        {children}
        <div className="ui-mt-[25px] ui-flex ui-justify-end ui-gap-3">
          <Button
            size="sm"
            variant="outlined"
            color="tertiary"
            onClick={handleClose}
          >
            Cerrar
          </Button>

          <Button size="sm" color="secondary" onClick={handleSubmit}>
            Aceptar
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
