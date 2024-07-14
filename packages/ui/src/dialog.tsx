import * as Dialog from "@radix-ui/react-dialog";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: React.ReactNode;
}

const DialogDemo = ({ content, onOpenChange, open }: DialogProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="ui-bg-[rgba(0,0,0,.75)] data-[state=open]:ui-animate-overlayShow ui-fixed ui-inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow ui-fixed ui-top-[50%] ui-left-[50%] ui-max-h-[85vh] ui-w-[90vw] ui-max-w-[450px] ui-trangray-x-[-50%] ui-trangray-y-[-50%] ui-rounded-[6px] ui-bg-white ui-p-[25px] ui-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:ui-outline-none ">
        {content}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
