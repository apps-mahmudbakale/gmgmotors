import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuel_type: string;
  body_type: string;
  description: string;
  image_url: string;
  images: string[];
  features: string[];
  vin: string;
  status: 'available' | 'sold' | 'pending';
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  car_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_method: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  car_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
};
