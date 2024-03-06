"use client";
import { DialogContext } from "src/context/dialog/dialog.context";
import { ReservationStatusEnum } from "@/models/reservation.model";
import { updateReservationStatus } from "@/actions/reservation.actions";
import { useContext, useState } from "react";
import DialogButtons from "@repo/ui/dialog-buttons";
import DialogHeader from "@repo/ui/dialog-header";
import Input from "@repo/ui/input";

interface Props {
  reservationId: string;
  reservationStatusId: ReservationStatusEnum;
}

export default function ReservationConfigDialog({
  reservationId,
  reservationStatusId,
}: Props) {
  const [tableNumber, setTableNumber] = useState<string>("");
  const { closeDialog } = useContext(DialogContext);

  const handleConfirm = async () => {
    await updateReservationStatus({
      id: reservationId,
      status: reservationStatusId,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <DialogHeader onClose={closeDialog} title="Confirmación de reserva" />
      </div>
      <div className="mb-6">
        <p className="ui-text-gray-800 ui-mt-[10px] ui-mb-5 ui-text-[14px] ui-leading-normal">
          Ingrese el número de mesa para confirmar la reserva.
        </p>
      </div>
      <div className="mb-6">
        <Input
          label="Número de mesa"
          placeholder="Número de mesa"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
      </div>
      <div>
        <DialogButtons
          cancelText="Cancelar"
          confirmText="Confirmar"
          onCancel={closeDialog}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
