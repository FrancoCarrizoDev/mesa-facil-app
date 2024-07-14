type StatusType = "pending" | "confirm" | "reject" | "cancel";

export default function ReservationStatusLabel({
  status,
  label,
}: {
  status: StatusType;
  label: string;
}): JSX.Element {
  const statusColor = {
    pending: "ui-text-gray-500",
    confirm: "ui-text-green-500",
    reject: "ui-text-red-500",
    cancel: "ui-text-orange-500",
  };

  return <p className={`${statusColor[status]} font-semibold`}>{label}</p>;
}
