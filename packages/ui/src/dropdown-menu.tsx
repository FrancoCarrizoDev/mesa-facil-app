import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

interface DropdownMenuProps {
  children: ReactNode;
  items: {
    label: string;
    onClick: () => void;
  }[];
}

export default function CustomDropdownMenu({
  children,
  items,
}: DropdownMenuProps): JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="w-fit">{children}</div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" ui-bg-white ui-rounded-md ui-p-[5px] ui-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] ui-will-change-[opacity,transform] data-[side=top]animate-slideDownAndFade data-[side=right]:ui-animate-slideLeftAndFade data-[side=bottom]:ui-animate-slideUpAndFade data-[side=left]:ui-animate-slideRightAndFade"
          sideOffset={5}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              className="ui-group ui-text-[13px] ui-leading-none ui-text-yellow-900 ui-rounded-[3px] ui-flex ui-items-center ui-h-[25px] ui-px-[20px] ui-relative ui-select-none ui-outline-none data-[disabled]:ui-text-mauve8 data-[disabled]:ui-pointer-events-none data-[highlighted]:ui-bg-yellow-100 data-[highlighted]:ui-text-yellow-950 ui-cursor-pointer"
              key={item.label}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
