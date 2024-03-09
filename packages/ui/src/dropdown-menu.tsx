import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

export interface DropDownMenuItem {
  label: string | ReactNode;
  onClick: () => void;
  enabled?: boolean;
}

export interface DropdownMenuProps {
  children: ReactNode;
  items: DropDownMenuItem[];
}

export default function CustomDropdownMenu({
  children,
  items,
}: DropdownMenuProps): JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="ui-w-fit">{children}</div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="  ui-bg-gray-50 ui-rounded-md ui-p-[5px] ui-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] ui-will-change-[opacity,transform] data-[side=top]animate-slideDownAndFade data-[side=right]:ui-animate-slideLeftAndFade data-[side=bottom]:ui-animate-slideUpAndFade data-[side=left]:ui-animate-slideRightAndFade ui-min-w-[125px]"
          sideOffset={5}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              className="ui-group ui-min-h-[25px] ui-text-[13px] ui-leading-none ui-bg-gray-50 ui-text-gray-700 ui-rounded-[3px] ui-flex ui-items-center ui-h-[30px] ui-px-[15px] ui-relative ui-select-none ui-outline-none ui-transition-all data-[disabled]:ui-text-gray500 data-[disabled]:ui-pointer-events-none data-[highlighted]:ui-font-semibold data-[highlighted]:ui-scale-105 data-[highlighted]:ui-text-yellow-950 data-[highlighted]:ui-border-b data-[highlighted]:ui-border-t ui-cursor-pointer"
              disabled={!item.enabled}
              key={item.label?.toString()}
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Arrow className="ui-fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
