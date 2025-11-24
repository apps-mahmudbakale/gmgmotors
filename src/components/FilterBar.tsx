interface FilterBarProps {
  filters: {
    make: string;
    bodyType: string;
    minPrice: string;
    maxPrice: string;
    transmission: string;
    fuelType: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  onReset: () => void;
}

export default function FilterBar({ filters, onFilterChange, onReset }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Filter Cars</h2>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
          <select
            value={filters.make}
            onChange={(e) => onFilterChange('make', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Makes</option>
            <option value="Tesla">Tesla</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Porsche">Porsche</option>
            <option value="Audi">Audi</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Body Type</label>
          <select
            value={filters.bodyType}
            onChange={(e) => onFilterChange('bodyType', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Truck">Truck</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Min Price</label>
          <select
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No Min</option>
            <option value="5000000">₦5,000,000</option>
            <option value="10000000">₦10,000,000</option>
            <option value="15000000">₦15,000,000</option>
            <option value="20000000">₦20,000,000</option>
            <option value="30000000">₦30,000,000</option>
            <option value="50000000">₦50,000,000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Max Price</label>
          <select
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No Max</option>
            <option value="10000000">₦10,000,000</option>
            <option value="20000000">₦20,000,000</option>
            <option value="30000000">₦30,000,000</option>
            <option value="50000000">₦50,000,000</option>
            <option value="75000000">₦75,000,000</option>
            <option value="100000000">₦100,000,000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
          <select
            value={filters.transmission}
            onChange={(e) => onFilterChange('transmission', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFilterChange('fuelType', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
      </div>
    </div>
  );
}
