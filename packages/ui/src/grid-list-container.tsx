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
      className={`grid grid-cols-[repeat(auto-fill,minmax(${minValue},${maxValue}))] gap-4`}
    >
      {children}
    </ul>
  );
}
