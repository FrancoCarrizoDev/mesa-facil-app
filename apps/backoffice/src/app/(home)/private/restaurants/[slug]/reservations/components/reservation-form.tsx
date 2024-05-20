"use client";
import { createDiner } from "@/actions/diner.actions";
import { createReserve } from "@/actions/reservation.actions";
import type {
  CreateReservationDTO,
  ReservationDTO,
  RestaurantDTO,
  DinerDTO,
} from "@repo/common/models";
import { toast } from "react-toastify";
import Autocomplete from "@repo/ui/autocomplete";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import InputDatePicker from "@repo/ui/input-date-picker";
import useDinerReservation from "@/hooks/useDinerReservation";
import useForm from "@/hooks/use-form";
import useSearchDiner from "@/hooks/useSearchDiner";
import { subYears } from "@repo/common/date";
import Select from "@repo/ui/select";
import { useRouter } from "next/navigation";

interface ReservationFormProps {
  restaurantData: RestaurantDTO;
  reservationData?: ReservationDTO;
}

export default function ReservationForm({
  restaurantData,
  reservationData,
}: ReservationFormProps): JSX.Element {
  const { filterTimes, hashClosedDays, restaurant, minDate, maxDate } =
    useDinerReservation({
      restaurant: restaurantData,
    });
  const router = useRouter();

  const goToBack = (): void => {
    router.push(`/private/restaurants/${restaurantData.slug}`);
  };

  const { values, errors, handleChange, handleSubmit, handleReset } = useForm<{
    date: Date | null;
    attentionScheduleId: string | null;
    dinerId: string | null;
    peopleQuantity: string;
    message?: string;
    email: string;
    firstName: string;
    lastName: string | null;
    phone: string | null;
    birthday: Date | null;
    reservationStatusId: number;
  }>({
    initialValues: {
      date: reservationData ? new Date(reservationData.date) : null,
      attentionScheduleId: null,
      email: reservationData ? reservationData.diner.email : "",
      dinerId: reservationData ? reservationData.diner.id : null,
      peopleQuantity: reservationData
        ? reservationData.peopleQuantity.toString()
        : "",
      message: reservationData?.message ?? "",
      firstName: reservationData ? reservationData.diner.firstName : "",
      lastName: reservationData ? reservationData.diner.lastName : "",
      phone: reservationData ? reservationData.diner.phone : "",
      birthday: reservationData?.diner.birthday
        ? new Date(reservationData.diner.birthday)
        : null,
      reservationStatusId: reservationData ? reservationData.statusId : 1,
    },
    onSubmit: async (values) => {
      let dinnerID: string | null = values.dinerId;
      if (!values.dinerId) {
        const newDiner: DinerDTO = {
          id: "",
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName || "",
          phone: values.phone || "",
          birthday: values.birthday?.toISOString() || null,
          reservations: [],
        };

        const diner = await createDiner(newDiner);

        dinnerID = diner.id;
      }

      if (dinnerID && values.date && values.attentionScheduleId) {
        const reserve: CreateReservationDTO = {
          attentionScheduleId: values.attentionScheduleId,
          date: values.date?.toISOString() || "",
          dinerId: dinnerID,
          peopleQuantity: parseInt(values.peopleQuantity),
          message: values.message || null,
          reservationStatusId: values.reservationStatusId,
        };

        await createReserve(reserve);
        handleReset();
        setDinerTerm("");
        toast.success("Reserva creada con éxito, se ha enviado un email");
      }
    },
  });

  const { dinerTerm, setDinerTerm, dinerData } = useSearchDiner(
    reservationData?.diner.email || ""
  );

  const onDinerSelect = (val: DinerDTO | undefined) => {
    if (!val) {
      if (values.dinerId) {
        return handleChange({
          dinerId: null,
          email: dinerTerm,
          birthday: null,
          firstName: "",
          lastName: "",
          phone: "",
        });
      }
      handleChange({
        email: dinerTerm,
      });
      return;
    }

    const diner = dinerData.find((diner) => diner.id === val.id);
    if (diner) {
      const getBirthday = diner.birthday ? new Date(diner.birthday) : null;
      handleChange({
        dinerId: diner.id,
        email: diner.email,
        firstName: diner.firstName,
        lastName: diner.lastName,
        phone: diner.phone,
        birthday: getBirthday,
      });
      setDinerTerm(diner.email);
    } else {
      setDinerTerm("");
      handleChange({
        dinerId: null,
        email: "",
      });
    }
  };

  const mapDinerItems = dinerData.map((diner) => ({
    ...diner,
    label: `${diner.firstName} ${diner.lastName}`,
  }));

  const onDinerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDinerTerm(e.target.value);
  };

  const findAttendSchedule = (date: Date | null): string | null | undefined => {
    if (!date) return null;

    const attentionSchedule = restaurant.attentionSchedule.find((schedule) => {
      if (schedule.dayNumber === date.getDay()) {
        const [openingHours, openingMinutes] = schedule.openingHours.split(":");
        const [endingHours, endingMinutes] = schedule.endingHours.split(":");

        const hoursDate = date.getHours();
        const minutesDate = date.getMinutes();

        if (
          hoursDate > parseInt(openingHours) &&
          hoursDate < parseInt(endingHours)
        ) {
          return true;
        }

        if (
          hoursDate === parseInt(openingHours) &&
          minutesDate >= parseInt(openingMinutes)
        ) {
          return true;
        }

        if (
          hoursDate === parseInt(endingHours) &&
          minutesDate <= parseInt(endingMinutes)
        ) {
          return true;
        }

        return false;
      }
      return false;
    });

    if (!attentionSchedule) {
      return null;
    }

    return attentionSchedule.id;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col">
            <div className="mb-6">
              <InputDatePicker
                error={Boolean(errors.date)}
                filterDate={(date) => !hashClosedDays[date.getDay()]}
                filterTime={filterTimes}
                label="Fecha"
                maxDate={maxDate}
                minDate={minDate}
                onChange={(date) => {
                  handleChange({
                    date,
                    attentionScheduleId: findAttendSchedule(date),
                  });
                }}
                placeholderText="Fecha de la reserva"
                required
                selectedDate={values.date}
                showTimeSelect
              />
            </div>
            <div className="mb-6">
              <Autocomplete
                displayProperty="email"
                items={mapDinerItems}
                label="Email"
                onChange={onDinerChange}
                onSelect={onDinerSelect}
                placeholder="Buscar por email"
                required
                selectKey="email"
                value={dinerTerm}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Cantidad de personas"
                onChange={(e) => {
                  handleChange({
                    peopleQuantity: e.target.value,
                  });
                }}
                placeholder="Ingrese la cantidad de personas"
                required
                type="text"
                value={values.peopleQuantity || ""}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Mensaje adicional"
                onChange={(e) => {
                  handleChange({
                    message: e.target.value,
                  });
                }}
                placeholder="Algo que debamos tener en cuenta?"
                required
                type="text"
                value={values.message || ""}
              />
            </div>
            <div className="mb-6">
              <Select
                label="Estado de reserva"
                onChange={(e) => {
                  handleChange({
                    reservationStatusId: parseInt(e.target.value),
                  });
                }}
                options={[
                  { value: "1", label: "Pendiente" },
                  { value: "2", label: "Confirmado" },
                  { value: "3", label: "Cancelado" },
                  { value: "4", label: "Rechazado" },
                ]}
                required
                size="small"
                value={values.reservationStatusId}
              />
            </div>
          </div>
          <div className="w-full  flex flex-col">
            <div className="mb-6">
              <Input
                disabled={Boolean(values.dinerId)}
                label="Nombre"
                onChange={(e) => {
                  handleChange({
                    firstName: e.target.value,
                  });
                }}
                placeholder="Ingrese el nombre"
                required
                type="text"
                value={values.firstName}
              />
            </div>
            <div className="mb-6">
              <Input
                disabled={Boolean(values.dinerId)}
                label="Apellido"
                onChange={(e) => {
                  handleChange({
                    lastName: e.target.value,
                  });
                }}
                placeholder="Ingrese el apellido"
                required
                type="text"
                value={values.lastName!}
              />
            </div>
            <div className="mb-6">
              <Input
                disabled={Boolean(values.dinerId)}
                label="Teléfono"
                onChange={(e) => {
                  handleChange({
                    phone: e.target.value,
                  });
                }}
                placeholder="Ingrese el número de teléfono"
                required
                type="text"
                value={values.phone!}
              />
            </div>
            <div className="mb-6">
              <InputDatePicker
                dateFormat="dd/MM/yyyy"
                disabled={Boolean(values.dinerId)}
                dropdownMode="select"
                error={Boolean(errors.birthday)}
                label="Fecha de cumpleaños"
                maxDate={subYears(new Date(), 18)}
                onChange={(date) => {
                  handleChange({
                    birthday: date,
                  });
                }}
                peekNextMonth
                placeholderText="Fecha de cumpleaños"
                required
                selectedDate={values.birthday}
                showMonthDropdown
                showYearDropdown
              />
            </div>
          </div>
        </div>
        <div className="mb-6 flex gap-3 justify-center items-center">
          <Button
            color="tertiary"
            onClick={goToBack}
            size="md"
            variant="outlined"
          >
            Volver
          </Button>
          <Button size="md" type="submit">
            Reservar
          </Button>
        </div>
      </form>
    </div>
  );
}
