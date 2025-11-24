import { Car, Mail, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">GOLDEN MAK GLOBAL MOTORS LIMITED</h1>
              <p className="text-xs text-slate-400">Premium Car Dealership</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm">(123) 456-7890</span>
            </a>
            <a href="mailto:sales@autoelite.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span className="text-sm">sales@autoelite.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
