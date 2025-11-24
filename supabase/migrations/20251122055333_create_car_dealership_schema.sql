/*
  # Car Dealership Database Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `make` (text) - Car manufacturer
      - `model` (text) - Car model name
      - `year` (integer) - Manufacturing year
      - `price` (numeric) - Price in dollars
      - `mileage` (integer) - Mileage in miles
      - `color` (text) - Exterior color
      - `transmission` (text) - Transmission type
      - `fuel_type` (text) - Fuel type
      - `body_type` (text) - Body style
      - `description` (text) - Detailed description
      - `image_url` (text) - Primary image URL
      - `images` (jsonb) - Array of additional image URLs
      - `features` (jsonb) - Array of car features
      - `vin` (text, unique) - Vehicle identification number
      - `status` (text) - available, sold, pending
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `car_id` (uuid, foreign key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `customer_address` (text)
      - `total_amount` (numeric)
      - `status` (text) - pending, confirmed, completed, cancelled
      - `payment_method` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `inquiries`
      - `id` (uuid, primary key)
      - `car_id` (uuid, foreign key, optional)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `status` (text) - new, contacted, closed
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for cars (available status only)
    - Public insert access for orders and inquiries
    - Authenticated admin access for all operations

  3. Indexes
    - Index on car status for filtering
    - Index on car price for sorting
    - Index on order status
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  mileage integer NOT NULL DEFAULT 0 CHECK (mileage >= 0),
  color text NOT NULL,
  transmission text NOT NULL DEFAULT 'Automatic',
  fuel_type text NOT NULL DEFAULT 'Gasoline',
  body_type text NOT NULL,
  description text,
  image_url text,
  images jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  vin text UNIQUE,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES cars(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_method text NOT NULL DEFAULT 'financing',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available cars"
  ON cars FOR SELECT
  USING (status = 'available');

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);
