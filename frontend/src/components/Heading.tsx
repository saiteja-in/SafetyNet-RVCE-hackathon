import { Shield, MapPin } from 'lucide-react';

function Heading() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full">
          <Shield className="text-blue-600 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Find a safe place near you</h1>
          <p className="text-sm text-blue-200">Find your nearest secure spots</p>
        </div>
      </div>
      <div className="hidden md:flex items-center text-white space-x-2">
        <MapPin className="w-5 h-5" />
        <span className="text-sm font-medium">Pinpointing Safety</span>
      </div>
    </div>
  );
}

export default Heading;