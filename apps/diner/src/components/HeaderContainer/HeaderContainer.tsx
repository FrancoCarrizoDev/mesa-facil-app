import { ChildrenFCProps } from "@repo/common/models";

export default function HeaderContainer({
  children,
}: ChildrenFCProps): JSX.Element {
  return (
    <div className="bg-gray-900 border-b border-b-gray-200 flex justify-between items-center py-3 px-5">
      {children}
    </div>
  );
}
