import { type HeaderContainerProps } from "./models/header-container.model";

export default function HeaderContainer({
  children,
}: HeaderContainerProps): JSX.Element {
  return (
    <div className="bg-yellow-100 border-b border-b-yellow-200 flex justify-between items-center p-3">
      {children}
    </div>
  );
}
