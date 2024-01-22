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
