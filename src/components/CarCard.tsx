import { Car } from '../lib/supabase';
import { Fuel, Gauge, Calendar, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

export default function CarCard({ car, onViewDetails }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image_url}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
₦${(car.price * 1000).toLocaleString()}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="text-slate-600 text-sm mb-4">{car.body_type}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Gauge className="h-4 w-4 text-slate-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Fuel className="h-4 w-4 text-slate-400" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Settings className="h-4 w-4 text-slate-400" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(car)}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
