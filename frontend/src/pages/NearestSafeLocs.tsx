import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin } from '@vis.gl/react-google-maps';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Poi = { key: string, location: google.maps.LatLngLiteral };

function NearestSafeLocs() {
  const [location, setLocation] = useState<Poi[]>([]);
  const [safeLocs, setSafeLocs] = useState<Poi[]>([]);

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
        setLocation([{ key: "lgi", location: { lat: position.coords.latitude, lng: position.coords.longitude } }]);
        // console.log('User location:', position.coords.latitude, position.coords.longitude);

        const res=await axios.get("http://localhost:3217/api/safe-locs");
        setSafeLocs(res.data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    getWeather();
  }, []);


  return (
    (location.length !== 0 && safeLocs.length !== 0) ? (
      <div className='w-[70vw] h-[70vh] mx-auto mt-16'>
        <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY} onLoad={() => console.log("Google maps loaded")}>
          <Map
            mapId='DEMO_MAP_ID'
            defaultZoom={13}
            defaultCenter={{ lat: location[0].location.lat, lng: location[0].location.lng }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
            <PoiMarkers pois={location} type="user" />
            <PoiMarkers pois={safeLocs} type="safe" />
          </Map>
        </APIProvider>
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default NearestSafeLocs;

const PoiMarkers = (props: { pois: Poi[],type:string }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          {
            props.type==="user" ? <Pin/> : <SafeLocPin/>
          }
        </AdvancedMarker>
      ))}
    </>
  );
};


function SafeLocPin() {
  return <Pin background={'#0cfb04'} glyphColor={'#1b421a'} borderColor={'#1b421a'} />
}
