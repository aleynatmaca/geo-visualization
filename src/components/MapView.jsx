import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
function MapClick({
  onMapClick,
  drawingType,
  onLinePointAdd,
}) {
  useMapEvents({
    click(event) {
      if (drawingType === "POINT") {
        onMapClick(event.latlng);
      }
      if (drawingType === "LINE") {
        onLinePointAdd(event.latlng);
      }
    },
  });

  return null;
}
function MapView ({userId}) {
  const [selectedPosition, setSelectedPosition] = useState(null);
    const [featureName, setFeatureName] = useState("");
    const [savedFeatures, setSavedFeatures] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [drawingType, setDrawingType] = useState("POINT");
async function loadSavedFeatures() {
  const response = await fetch(
    `http://localhost:8080/map-features/${userId}`
  );

  const features = await response.json();

  setSavedFeatures(features);
}
useEffect(() => {
  if (userId) {
    loadSavedFeatures();
  }
}, [userId]);


 async function handleSaveFeature() {
  if (!selectedPosition || !featureName.trim()) {
    alert("Lütfen bir konum seçip isim yazınız.");
    return;
  }

  const mapFeatureRequest = {
    name: featureName,
    coordinates: JSON.stringify([
      selectedPosition.lat,
      selectedPosition.lng,
    ]),
    type: "POINT",
    userId: userId,
  };

  const response = await fetch("http://localhost:8080/map-features", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapFeatureRequest),
  });

  const saveSuccess = await response.json();

  if (saveSuccess) {
  alert("İşaret kaydedildi.");
  setFeatureName("");
  setSelectedPosition(null);
  loadSavedFeatures();
} else {
  alert("İşaret kaydedilemedi.");
}
}
    return( 
    <div> <select
  value={drawingType}
  onChange={(event) => setDrawingType(event.target.value)}
>
  <option value="POINT">Point</option>
  <option value="LINE">Line</option>
  <option value="POLYGON">Polygon</option>
</select>
<MapContainer zoom={13}
    center={[39.9334, 32.8597]}
    style={{ height: "600px", width: "100%" }} >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClick
  onMapClick={setSelectedPosition}
  drawingType={drawingType}
  onLinePointAdd={(newPosition) =>
    setSelectedPositions((oldPositions) => [
      ...oldPositions,
      newPosition,
    ])
  }
/>
{drawingType === "LINE" && selectedPositions.length >= 2 && (
  <Polyline
    positions={selectedPositions.map((position) => [
      position.lat,
      position.lng,
    ])}
  />
)}

{selectedPosition && (
  <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
    <Popup>
      <input
        type="text"
        placeholder="İşaret adı"
        value={featureName}
        onChange={(event) => setFeatureName(event.target.value)}
      />

      <button onClick={handleSaveFeature}>
        Kaydet
      </button>
    </Popup>
  </Marker>
)}

{savedFeatures
  .filter((feature) => feature.type === "POINT")
  .map((feature) => {
    const coordinates = JSON.parse(feature.coordinates);

    return (
      <Marker
        key={feature.id}
        position={[coordinates[0], coordinates[1]]}
      >
        <Popup>{feature.name}</Popup>
      </Marker>
    );
  })}
</MapContainer>
</div>

    );
}
export default MapView;