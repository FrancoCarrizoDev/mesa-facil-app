import { type User } from "./user.model";

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  address: string;
  attention_schedule: AttentionSchedule[];
  user: User;
  userId: string;
  slug?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AttentionSchedule {
  id: string;
  restaurant: Restaurant;
  restaurant_id: string;
  day_name: string;
  day_number: number;
  opening_hours: string;
  ending_hours: string;
  created_at: string;
  updated_at: string;
}

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