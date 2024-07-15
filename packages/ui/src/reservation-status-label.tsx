type StatusType = "pending" | "confirm" | "reject" | "cancel";

export default function ReservationStatusLabel({
  status,
  label,
}: {
  status: StatusType;
  label: string;
}): JSX.Element {
  const statusColor = {
    pending: "ui-text-yellow-600",
    confirm: "ui-text-green-600",
    reject: "ui-text-red-600",
    cancel: "ui-text-orange-600",
  };

  return <p className={`${statusColor[status]} ui-font-semibold`}>{label}</p>;
}
