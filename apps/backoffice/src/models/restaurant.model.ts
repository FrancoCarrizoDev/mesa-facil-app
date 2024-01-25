import { User } from "./user.model";

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
  readonly name: string;
  readonly address: string;
  readonly id: string;
  readonly slug: string | null;
  readonly phone: string;
  readonly attentionSchedule: AttentionScheduleDTO[];
}

export interface AttentionScheduleDTO {
  readonly id: string;
  readonly day_name: string;
  readonly day_number: number;
  readonly opening_hours: string;
  readonly ending_hours: string;
  readonly restaurant_id: string;
}
