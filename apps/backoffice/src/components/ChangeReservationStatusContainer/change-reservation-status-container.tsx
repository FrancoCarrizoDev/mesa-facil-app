"use client";
import { DialogContext } from "src/context/dialog/dialog.context";
import { ReservationStatusEnum } from "@repo/common/models";
import { updateReservationStatus } from "@/actions/reservation.actions";
import { useContext, useState } from "react";
import DialogButtons from "@repo/ui/dialog-buttons";
import DialogHeader from "@repo/ui/dialog-header";
import Input from "@repo/ui/input";
import { toast } from "react-toastify";

export interface ReservationDialogProps {
  reservationId: string;
  reservationStatusId: ReservationStatusEnum;
  description?: string;
  title: string;
  message?: string;
}

export default function ChangeReservationStatusContainer({
  reservationId,
  reservationStatusId,
  title,
  message,
  description,
}: ReservationDialogProps) {
  const [tableNumber, setTableNumber] = useState<string>("");
  const { closeDialog } = useContext(DialogContext);
  const handleConfirm = async () => {
    await updateReservationStatus({
      id: reservationId,
      status: reservationStatusId,
      tableNumber: parseInt(tableNumber),
    });
    closeDialog();
    toast("Reserva actualizada correctamente", { type: "success" });
  };

  return (
    <div>
      <div className="mb-6">
        <DialogHeader onClose={closeDialog} title={title} />
      </div>
      {description && (
        <div className="mb-6">
          <p className="text-gray-800 mt-[10px] mb-5 text-[14px] leading-normal">
            {description}
          </p>
        </div>
      )}
      {reservationStatusId === ReservationStatusEnum.CONFIRMED && (
        <div className="mb-6">
          <Input
            label="Número de mesa"
            placeholder="Número de mesa"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
      )}
      {message && (
        <div className="mb-6">
          <p className="text-gray-800 mt-[10px] mb-5 text-[14px] leading-normal">
            {message}
          </p>
        </div>
      )}
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
