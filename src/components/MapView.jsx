import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
const coffeeShops = [
  {name:"starbucks",
  latitude:39.903324,
longitude:32.860427,
  },
  {name:"Arabica",
latitude:39.907067,
longitude:32.860157,

  },
];
function MapView () {
    return( <MapContainer zoom={13}
    center={[39.9334, 32.8597]}
    style={{ height: "600px", width: "100%" }} >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {coffeeShops.map((coffeeShop) => {
    return(
     <Marker
        position={[coffeeShop.latitude,coffeeShop.longitude]}>
            <Popup>
                {coffeeShop.name}
            </Popup>
    </Marker>)
})}
</MapContainer>

    );
}
export default MapView;