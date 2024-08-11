import React, { useEffect, useState } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import axios from 'axios';
import { MapPin, Navigation, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import Heading from '@/components/Heading';

type Poi = {
  _id: string;
  key: string;
  location: {
    lat: number;
    lng: number;
  };
};

function NearestSafeLocs() {
  const [location, setLocation] = useState<Poi[]>([]);
  const [safeLocs, setSafeLocs] = useState<Poi[]>([]);
  const [selectedLoc, setSelectedLoc] = useState<Poi | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const getPosition = () =>
          new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error)
            )
          );

        const position = await getPosition();
        setLocation([{ 
          _id: "user",
          key: "user_location", 
          location: { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          }
        }]);

        const res = await axios.get("http://localhost:3217/api/safe-locs");
        setSafeLocs(res.data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    getLocations();
  }, []);

  const handleMarkerClick = (poi: Poi) => {
    setSelectedLoc(poi);
    setIsOpen(true);
  };

  const handleNavigate = (poi: Poi) => {
    if (location[0] && poi) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${location[0].location.lat},${location[0].location.lng}&destination=${poi.location.lat},${poi.location.lng}&travelmode=walking`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="p-4 bg-white shadow-md">
        <Heading />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Transition
          show={isSidebarOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="w-64 bg-white shadow-md overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Safe Locations</h2>
              {safeLocs.map((loc) => (
                <div key={loc._id} className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <h3 className="font-medium">Safe Location {loc.key}</h3>
                  <p className="text-sm text-gray-600">Lat: {loc.location.lat.toFixed(6)}</p>
                  <p className="text-sm text-gray-600">Lng: {loc.location.lng.toFixed(6)}</p>
                  <button
                    onClick={() => handleNavigate(loc)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Navigation className="mr-1" size={16} />
                    Navigate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Transition>
        <div className="flex-1 relative">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-2 left-2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
          {(location.length !== 0 && safeLocs.length !== 0) ? (
            <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <Map
                mapId='DEMO_MAP_ID'
                className="w-full h-full"
                defaultZoom={13}
                defaultCenter={{ lat: location[0].location.lat, lng: location[0].location.lng }}
              >
                <PoiMarkers pois={location} type="user" onClick={handleMarkerClick} />
                <PoiMarkers pois={safeLocs} type="safe" onClick={handleMarkerClick} />
              </Map>
            </APIProvider>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-xl text-gray-600">Loading map...</p>
            </div>
          )}
        </div>
      </div>

      <LocationDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} selectedLoc={selectedLoc} handleNavigate={handleNavigate} />
    </div>
  );
}

const PoiMarkers = (props: { pois: Poi[], type: string, onClick: (poi: Poi) => void }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi._id}
          position={poi.location}
          onClick={() => props.onClick(poi)}
        >
          {props.type === "user" ? <UserPin /> : <SafeLocPin />}
        </AdvancedMarker>
      ))}
    </>
  );
};

function UserPin() {
  return (
    <div className="bg-blue-500 rounded-full p-2">
      <User className="text-white" size={24} />
    </div>
  );
}

function SafeLocPin() {
  return (
    <div className="bg-green-500 rounded-full p-2">
      <MapPin className="text-white" size={24} />
    </div>
  );
}

interface LocationDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedLoc: any;
  handleNavigate: (loc: any) => void;
}

function LocationDetailsModal({ isOpen, setIsOpen, selectedLoc, handleNavigate }: LocationDetailsModalProps) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                >
                  <MapPin className="mr-2" />
                  {selectedLoc?.key === "user_location" ? "Your Location" : `Safe Location ${selectedLoc?.key}`}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Latitude: {selectedLoc?.location.lat.toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Longitude: {selectedLoc?.location.lng.toFixed(6)}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => selectedLoc && handleNavigate(selectedLoc)}
                  >
                    <Navigation className="mr-2" />
                    Navigate to this location
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default NearestSafeLocs;