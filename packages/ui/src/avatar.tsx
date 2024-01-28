export default function AvatarDropdown({ label }: { label: string }) {
  return (
    <div
      id="userDropdown"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      className="ui-relative ui-inline-flex ui-items-center ui-justify-center ui-w-10 ui-h-10 ui-overflow-hidden ui-bg-gray-100 ui-rounded-full border "
    >
      <span className="font-medium text-gray-600 ">{label}</span>
    </div>
  );
}
