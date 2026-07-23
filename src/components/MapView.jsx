import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
function MapView () {
    return( <MapContainer zoom={13}
    center={[39.9334, 32.8597]}
    style={{ height: "600px", width: "100%" }} >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  

<Marker position={[39.9334, 32.8597]}
position={[39.9048, 32.8573]}> 
    <Popup> "it's center here"

    </Popup>
    </Marker>
   
    </MapContainer>

    );
}
export default MapView;