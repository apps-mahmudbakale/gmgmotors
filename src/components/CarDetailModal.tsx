import { Car } from '../lib/supabase';
import { X, Check, Fuel, Gauge, Calendar, Settings, Palette } from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onBuyNow: (car: Car) => void;
}

export default function CarDetailModal({ car, onClose, onBuyNow }: CarDetailModalProps) {
  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors z-10"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>

          <img
            src={car.image_url}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-72 object-cover rounded-t-xl"
          />
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {car.year} {car.make} {car.model}
              </h2>
              <p className="text-slate-600">{car.body_type}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                ₦{(car.price * 1000).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Mileage</p>
                <p className="font-semibold text-slate-900">{car.mileage.toLocaleString()} mi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Year</p>
                <p className="font-semibold text-slate-900">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Fuel className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Fuel Type</p>
                <p className="font-semibold text-slate-900">{car.fuel_type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Transmission</p>
                <p className="font-semibold text-slate-900">{car.transmission}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Color</p>
                <p className="font-semibold text-slate-900">{car.color}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center text-slate-400 font-mono text-xs">
                VIN
              </div>
              <div>
                <p className="text-xs text-slate-500">VIN</p>
                <p className="font-semibold text-slate-900 text-xs">{car.vin}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
            <p className="text-slate-600 leading-relaxed">{car.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onBuyNow(car)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
