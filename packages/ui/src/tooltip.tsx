import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  label: string | ReactNode;
}

export default function CustomTooltip({
  children,
  label,
}: TooltipProps): JSX.Element {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="ui-w-fit">{children}</div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:ui-animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:ui-animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:ui-animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:ui-animate-slideUpAndFade ui-text-gray-500 ui-select-none ui-rounded-[4px] ui-bg-white ui-px-[15px] ui-py-[10px] ui-text-[14px] ui-leading-none ui-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ui-will-change-[transform,opacity]"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="ui-fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
