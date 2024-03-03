type StatusType = "pending" | "confirm" | "reject" | "cancel";

export default function ReservationStatusLabel({
  status,
  label,
}: {
  status: StatusType;
  label: string;
}): JSX.Element {
  const statusColor = {
    pending: "ui-text-yellow-500",
    confirm: "ui-text-green-500",
    reject: "ui-text-red-500",
    cancel: "ui-text-red-500",
  };

  return <p className={`${statusColor[status]} font-semibold`}>{label}</p>;
}
