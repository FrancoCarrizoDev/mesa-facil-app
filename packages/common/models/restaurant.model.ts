export interface RestaurantDTO {
  readonly address: string;
  readonly attentionSchedule: AttentionScheduleDTO[];
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly slug: string | null;
}

export interface RestaurantDTOValidateFields {
  address: string;
  attentionSchedule: AttentionScheduleDTO[];
  name: string;
  phone: string;
}

export interface AttentionScheduleDTO {
  readonly id?: string;
  readonly dayName: string;
  readonly dayNumber: number;
  readonly openingHours: string;
  readonly endingHours: string;
  readonly restaurantId?: string;
}
