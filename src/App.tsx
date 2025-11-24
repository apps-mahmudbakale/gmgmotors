import { useState, useEffect } from 'react';
import { Car } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CarCard from './components/CarCard';
import CarDetailModal from './components/CarDetailModal';
import CheckoutModal, { OrderFormData } from './components/CheckoutModal';
import SuccessModal from './components/SuccessModal';
import { Loader2 } from 'lucide-react';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [checkoutCar, setCheckoutCar] = useState<Car | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const [filters, setFilters] = useState({
    make: '',
    bodyType: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuelType: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, filters]);

  const localCars: Car[] = [
    // Sedans
    { id: '1', make: 'Toyota', model: 'Camry', year: 2022, price: 24999, mileage: 15000, color: 'Pearl White', transmission: 'Automatic', fuel_type: 'Gasoline', body_type: 'Sedan', description: 'Like new condition with premium package', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Heated Seats'], vin: '4T1B11HK2NU123456', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', make: 'Honda', model: 'Accord', year: 2021, price: 26999, mileage: 18000, color: 'Modern Steel', transmission: 'Automatic', fuel_type: 'Hybrid', body_type: 'Sedan', description: 'Excellent fuel efficiency with premium sound system', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Leather Seats', 'Sunroof', 'Navigation', 'Blind Spot Monitoring'], vin: '1HGCV1F13MA123456', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    
    // SUVs
    { id: '3', make: 'Honda', model: 'CR-V', year: 2021, price: 28999, mileage: 12500, color: 'Modern Steel Metallic', transmission: 'Automatic', fuel_type: 'Hybrid', body_type: 'SUV', description: 'Excellent condition with all-wheel drive', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Sunroof', 'Leather Seats', 'Navigation', 'Blind Spot Monitoring'], vin: '5J6RE4H43BL123457', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', make: 'Toyota', model: 'RAV4', year: 2023, price: 31999, mileage: 8000, color: 'Ruby Flare Pearl', transmission: 'Automatic', fuel_type: 'Hybrid', body_type: 'SUV', description: 'Like new with advanced safety features', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['AWD', 'Leather Interior', 'Panoramic Sunroof', 'Android Auto'], vin: 'JTMFB3FV9MD123458', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '5', make: 'Mazda', model: 'CX-5', year: 2022, price: 27999, mileage: 14500, color: 'Soul Red Crystal', transmission: 'Automatic', fuel_type: 'Gasoline', body_type: 'SUV', description: 'Luxury interior with turbo engine option', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Bose Sound System', 'Heated Seats', 'Heads-up Display', 'Power Liftgate'], vin: 'JM3KFBCM5R0601234', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    
    // Trucks
    { id: '6', make: 'Ford', model: 'F-150', year: 2023, price: 42999, mileage: 5000, color: 'Velocity Blue', transmission: 'Automatic', fuel_type: 'Gasoline', body_type: 'Truck', description: 'Brand new with EcoBoost engine', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['4x4', 'Towing Package', 'Apple CarPlay', 'Heated Seats'], vin: '1FTFW1E52MFA12345', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '7', make: 'Chevrolet', model: 'Silverado 1500', year: 2022, price: 38999, mileage: 12000, color: 'Northsky Blue', transmission: 'Automatic', fuel_type: 'Diesel', body_type: 'Truck', description: 'Duramax Turbo-Diesel with excellent towing capacity', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['4WD', 'Trailering Package', 'Leather Interior', 'Bose Audio'], vin: '3GCUYEED0NG123456', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    
    // Luxury
    { id: '8', make: 'BMW', model: '3 Series', year: 2022, price: 42999, mileage: 9500, color: 'Mineral White', transmission: 'Automatic', fuel_type: 'Gasoline', body_type: 'Sedan', description: 'M Sport package with premium sound system', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Heated Seats', 'Navigation', 'Parking Sensors', 'Sunroof'], vin: '3MW5SJTN0NM812345', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '9', make: 'Mercedes-Benz', model: 'C-Class', year: 2023, price: 45999, mileage: 3500, color: 'Obsidian Black', transmission: 'Automatic', fuel_type: 'Hybrid', body_type: 'Sedan', description: 'Luxury interior with latest tech features', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Leather Seats', 'Panoramic Sunroof', 'Burmester Sound', '360 Camera'], vin: 'W1KZF8GB6PB123456', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '10', make: 'Audi', model: 'Q5', year: 2022, price: 41999, mileage: 12500, color: 'Daytona Gray', transmission: 'Automatic', fuel_type: 'Gasoline', body_type: 'SUV', description: 'Prestige trim with all available options', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Heated Seats', 'Heated Steering Wheel'], vin: 'WA1BNAFY4P2112345', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    
    // Electric
    { id: '11', make: 'Tesla', model: 'Model 3', year: 2023, price: 44999, mileage: 2500, color: 'Midnight Silver', transmission: 'Automatic', fuel_type: 'Electric', body_type: 'Sedan', description: 'Long Range AWD with Full Self-Driving', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Full Self-Driving', 'Premium Interior', 'Glass Roof', 'Premium Audio'], vin: '5YJ3E1EA1PF123456', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '12', make: 'Ford', model: 'Mustang Mach-E', year: 2023, price: 47999, mileage: 3200, color: 'Grabber Blue', transmission: 'Automatic', fuel_type: 'Electric', body_type: 'SUV', description: 'Premium AWD with extended range battery', image_url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', images: [], features: ['Glass Roof', 'B&O Sound System', 'BlueCruise', 'Wireless Charging'], vin: '3FMTK4SX2PMA12345', status: 'available', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  const fetchCars = async () => {
    try {
      setLoading(true);
      // Use local cars data instead of API call
      setCars(localCars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...localCars];

    if (filters.make) {
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.bodyType) {
      filtered = filtered.filter(car => 
        car.body_type.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseFloat(filters.maxPrice));
    }
    
    // Reset to first page when filters change
    setCurrentPage(1);

    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuel_type === filters.fuelType);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      make: '',
      bodyType: '',
      minPrice: '',
      maxPrice: '',
      transmission: '',
      fuelType: ''
    });
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
  };

  const handleBuyNow = (car: Car) => {
    setSelectedCar(null);
    setCheckoutCar(car);
  };

  const handleCheckoutSubmit = async (orderData: OrderFormData) => {
    if (!checkoutCar) return;

    try {
      setSubmitting(true);

      const { error } = await supabase.from('orders').insert({
        car_id: checkoutCar.id,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        total_amount: checkoutCar.price,
        payment_method: orderData.payment_method,
        notes: orderData.notes,
        status: 'pending'
      });

      if (error) throw error;

      setCheckoutCar(null);
      setShowSuccess(true);
      fetchCars();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Hero />

      <main id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Pagination Controls - Top */}
        {!loading && filteredCars.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCars.length)}-
              {Math.min(currentPage * itemsPerPage, filteredCars.length)} of {filteredCars.length} cars
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => 
                  Math.min(prev + 1, Math.ceil(filteredCars.length / itemsPerPage))
                )}
                disabled={currentPage * itemsPerPage >= filteredCars.length}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-600">No cars found matching your filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-600">
                Showing <span className="font-semibold">{filteredCars.length}</span> vehicle{filteredCars.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={handleViewDetails}
                  />
              ))}
            </div>
            
            {/* Pagination Controls - Bottom */}
            {filteredCars.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    « First
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    ‹ Prev
                  </button>
                  
                  {Array.from({ length: Math.min(5, Math.ceil(filteredCars.length / itemsPerPage)) }, (_, i) => {
                    // Show page numbers with current page in the middle when possible
                    let pageNum;
                    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
                    
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === pageNum ? 'bg-blue-600 text-white' : ''
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => 
                      Math.min(prev + 1, Math.ceil(filteredCars.length / itemsPerPage))
                    )}
                    disabled={currentPage * itemsPerPage >= filteredCars.length}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Next ›
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.ceil(filteredCars.length / itemsPerPage))}
                    disabled={currentPage * itemsPerPage >= filteredCars.length}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Last »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            &copy; 2024 GMG Motors. All rights reserved.
          </p>
        </div>
      </footer>

      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onBuyNow={handleBuyNow}
      />

      <CheckoutModal
        car={checkoutCar}
        onClose={() => setCheckoutCar(null)}
        onSubmit={handleCheckoutSubmit}
        isSubmitting={submitting}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}

export default App;
