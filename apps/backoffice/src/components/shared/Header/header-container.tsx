import { type HeaderContainerProps } from "./models/header-container.model";

export default function HeaderContainer({
  children,
}: HeaderContainerProps): JSX.Element {
  return (
    <div className="border-b flex justify-between items-center p-3">
      {children}
    </div>
  );
}
