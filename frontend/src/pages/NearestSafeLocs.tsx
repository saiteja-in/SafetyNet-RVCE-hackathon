import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';


function NearestSafeLocs() {
  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY} onLoad={() => console.log("Google maps loaded")}>
        <Map
          defaultZoom={13}
          defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }>
        </Map>
      </APIProvider>
    </div>
  )
}

export default NearestSafeLocs;
