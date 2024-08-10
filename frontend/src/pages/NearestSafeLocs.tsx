import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

type Poi = { key: string, location: google.maps.LatLngLiteral };

function NearestSafeLocs() {
  // Use state to manage locations
  const [locations, setLocations] = useState<Poi[]>([]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const getPosition = () =>
          new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error)
            )
          );

        const position = await getPosition();
        // Update the locations state with the fetched position
        setLocations([{ key: "lgi", location: { lat: position.coords.latitude, lng: position.coords.longitude } }]);
        console.log('User location:', position.coords.latitude, position.coords.longitude);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    getWeather();
  }, []);

  // Only render the map if we have at least one location
  return (
    locations.length !== 0 ? (
      <div className='w-[70vw] h-[70vh] mx-auto mt-16'>
        <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY} onLoad={() => console.log("Google maps loaded")}>
          <Map
            mapId='DEMO_MAP_ID'
            defaultZoom={13}
            defaultCenter={{ lat: locations[0].location.lat, lng: locations[0].location.lng }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
            <PoiMarkers pois={locations} />
          </Map>
        </APIProvider>
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default NearestSafeLocs;

const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          <Pin />
        </AdvancedMarker>
      ))}
    </>
  );
};
