import { type HeaderContainerProps } from "./models/header-container.model";

export default function HeaderContainer({
  children,
}: HeaderContainerProps): JSX.Element {
  return (
    <div className="bg-gray-900 border-b border-b-gray-200 flex justify-between items-center py-3 px-5">
      {children}
    </div>
  );
}
