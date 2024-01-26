import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  minValue?: string;
  maxValue?: string;
}

export default function GridListContainer({
  children,
  minValue = "250px",
  maxValue = "1fr",
}: Props): JSX.Element {
  return (
    <ul
      className={`w-full ui-grid ui-gap-4`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minValue}, ${maxValue}))`,
      }}
    >
      {children}
    </ul>
  );
}
