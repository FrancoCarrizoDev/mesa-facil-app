import { CheckIcon } from "@radix-ui/react-icons";
import type { IIconProps } from "./icons.model";

// React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>

export default function CustomCheckIcon(props: IIconProps): JSX.Element {
  return <CheckIcon {...props} />;
}
