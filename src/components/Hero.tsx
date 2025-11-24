import { Search } from 'lucide-react';

export default function Hero() {
  const scrollToInventory = () => {
    const inventory = document.getElementById('inventory');
    if (inventory) {
      inventory.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg')] bg-cover bg-center" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Car
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Premium selection of luxury and performance vehicles. Quality, reliability, and exceptional service guaranteed.
          </p>
          <button
            onClick={scrollToInventory}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Search className="h-5 w-5" />
            Browse Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
            <p className="text-4xl font-bold mb-2">150+</p>
            <p className="text-slate-300">Premium Vehicles</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
            <p className="text-4xl font-bold mb-2">10+</p>
            <p className="text-slate-300">Years Experience</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
            <p className="text-4xl font-bold mb-2">5000+</p>
            <p className="text-slate-300">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
