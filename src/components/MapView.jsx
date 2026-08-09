{/*import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { Polygon } from "react-leaflet";
import "./MapView.css";
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

      if (drawingType === "POLYGON") {
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
async function handleSaveLine() {
  if (selectedPositions.length < 2) {
    alert("Çizgi için en az iki nokta seçiniz.");
    return;
  }

  const lineCoordinates = selectedPositions.map((position) => [
    position.lat,
    position.lng,
  ]);

  const mapFeatureRequest = {
    name: "LINE",
    coordinates: JSON.stringify(lineCoordinates),
    type: "LINE",
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
    alert("Çizgi kaydedildi.");
    setSelectedPositions([]);
    loadSavedFeatures();
  } else {
    alert("Çizgi kaydedilemedi.");
  }
}
async function handleSavePolygon() {
  if (selectedPositions.length < 3) {
    alert("Bölge için en az üç nokta seçiniz.");
    return;
  }

  const lineCoordinates = selectedPositions.map((position) => [
    position.lat,
    position.lng,
  ]);

  const mapFeatureRequest = {
    name: "POLYGON",
    coordinates: JSON.stringify(lineCoordinates),
    type: "POLYGON",
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
    alert("Bölge kaydedildi.");
    setSelectedPositions([]);
    loadSavedFeatures();
  } else {
    alert("Bölge kaydedilemedi.");
  }
}
    return( 
    <div>{/*} <select
  value={drawingType}
  onChange={(event) => setDrawingType(event.target.value)}
>
  <option value="POINT">Point</option>
  <option value="LINE">Line</option>
  <option value="POLYGON">Polygon</option>
</select>
{drawingType === "LINE" && (
  <button onClick={handleSaveLine}>
    Çizgiyi Kaydet
  </button>
)}
{drawingType === "POLYGON" && (
  <button onClick={handleSavePolygon}>
    Bölgeyi Kaydet
  </button>
)}

    <div className="toolbar">
      <select
        value={drawingType}
        onChange={(event) => {
          setDrawingType(event.target.value);
          setSelectedPosition(null);
          setSelectedPositions([]);
        }}
      >
        <option value="POINT">Point</option>
        <option value="LINE">Line</option>
        <option value="POLYGON">Polygon</option>
      </select>

      {drawingType === "LINE" && (
        <button className="save-btn" onClick={handleSaveLine}>
          Çizgiyi Kaydet
        </button>
      )}

      {drawingType === "POLYGON" && (
        <button className="save-btn" onClick={handleSavePolygon}>
          Bölgeyi Kaydet
        </button>
      )}
    </div>
<MapContainer
 zoom={13}
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
{drawingType === "POLYGON" &&
  selectedPositions.length >= 3 && (
    <Polygon
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

     {/* <button onClick={handleSaveFeature}>
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
  {savedFeatures
  .filter((feature) => feature.type === "LINE")
  .map((feature) => {
    const coordinates = JSON.parse(feature.coordinates);

    return (
      <Polyline
        key={feature.id}
        positions={coordinates}
      />
    );
  })}
  {savedFeatures
  .filter((feature) => feature.type === "POLYGON")
  .map((feature) => {
    const coordinates = JSON.parse(feature.coordinates);

    return (
      <Polygon
        key={feature.id}
        positions={coordinates}
      />
    );
  })}
</MapContainer>
</div>

    );
}
export default MapView;*/}
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";

import { useEffect, useState } from "react";
import "./MapView.css";

function MapClick({
  onMapClick,
  drawingType,
  onMultiplePointAdd,
}) {
  useMapEvents({
    click(event) {
      if (drawingType === "POINT") {
        onMapClick(event.latlng);
      }

      if (
        drawingType === "LINE" ||
        drawingType === "POLYGON"
      ) {
        onMultiplePointAdd(event.latlng);
      }
    },
  });

  return null;
}

function MapView({ userId }) {
  const [selectedPosition, setSelectedPosition] =
    useState(null);

  const [featureName, setFeatureName] = useState("");

  const [savedFeatures, setSavedFeatures] = useState([]);

  const [selectedPositions, setSelectedPositions] =
    useState([]);

  const [drawingType, setDrawingType] =
    useState("POINT");

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

    const response = await fetch(
      "http://localhost:8080/map-features",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mapFeatureRequest),
      }
    );

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

  async function handleSaveLine() {
    if (selectedPositions.length < 2) {
      alert("Çizgi için en az iki nokta seçiniz.");
      return;
    }

    const lineCoordinates = selectedPositions.map(
      (position) => [position.lat, position.lng]
    );

    const mapFeatureRequest = {
      name: "LINE",
      coordinates: JSON.stringify(lineCoordinates),
      type: "LINE",
      userId: userId,
    };

    const response = await fetch(
      "http://localhost:8080/map-features",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mapFeatureRequest),
      }
    );

    const saveSuccess = await response.json();

    if (saveSuccess) {
      alert("Çizgi kaydedildi.");
      setSelectedPositions([]);
      loadSavedFeatures();
    } else {
      alert("Çizgi kaydedilemedi.");
    }
  }

  async function handleSavePolygon() {
    if (selectedPositions.length < 3) {
      alert("Bölge için en az üç nokta seçiniz.");
      return;
    }

    const polygonCoordinates = selectedPositions.map(
      (position) => [position.lat, position.lng]
    );

    const mapFeatureRequest = {
      name: "POLYGON",
      coordinates: JSON.stringify(polygonCoordinates),
      type: "POLYGON",
      userId: userId,
    };

    const response = await fetch(
      "http://localhost:8080/map-features",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mapFeatureRequest),
      }
    );

    const saveSuccess = await response.json();

    if (saveSuccess) {
      alert("Bölge kaydedildi.");
      setSelectedPositions([]);
      loadSavedFeatures();
    } else {
      alert("Bölge kaydedilemedi.");
    }
  }

  function handleDrawingTypeChange(event) {
    setDrawingType(event.target.value);

    // Tür değişince yarım kalan geçici çizimleri temizler.
    setSelectedPosition(null);
    setSelectedPositions([]);
    setFeatureName("");
  }

  return (
    <div className="map-page">
      <div className="map-toolbar">
        <label htmlFor="drawing-type">
          Çizim türü
        </label>

        <select
          id="drawing-type"
          value={drawingType}
          onChange={handleDrawingTypeChange}
        >
          <option value="POINT">Nokta</option>
          <option value="LINE">Çizgi</option>
          <option value="POLYGON">Bölge</option>
        </select>

        {drawingType === "LINE" && (
          <button
            className="map-save-button"
            onClick={handleSaveLine}
          >
            Çizgiyi Kaydet
          </button>
        )}

        {drawingType === "POLYGON" && (
          <button
            className="map-save-button"
            onClick={handleSavePolygon}
          >
            Bölgeyi Kaydet
          </button>
        )}
      </div>

      <MapContainer
        zoom={13}
        center={[39.9334, 32.8597]}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClick
          onMapClick={setSelectedPosition}
          drawingType={drawingType}
          onMultiplePointAdd={(newPosition) =>
            setSelectedPositions((oldPositions) => [
              ...oldPositions,
              newPosition,
            ])
          }
        />

        {drawingType === "LINE" &&
          selectedPositions.length >= 2 && (
            <Polyline
              positions={selectedPositions.map(
                (position) => [
                  position.lat,
                  position.lng,
                ]
              )}
            />
          )}

        {drawingType === "POLYGON" &&
          selectedPositions.length >= 3 && (
            <Polygon
              positions={selectedPositions.map(
                (position) => [
                  position.lat,
                  position.lng,
                ]
              )}
            />
          )}

        {drawingType === "POINT" &&
          selectedPosition && (
            <Marker
              position={[
                selectedPosition.lat,
                selectedPosition.lng,
              ]}
            >
              <Popup>
                <div className="point-popup">
                  <input
                    type="text"
                    placeholder="İşaret adı"
                    value={featureName}
                    onChange={(event) =>
                      setFeatureName(event.target.value)
                    }
                  />

                  <button
                    className="map-save-button"
                    onClick={handleSaveFeature}
                  >
                    Noktayı Kaydet
                  </button>
                </div>
              </Popup>
            </Marker>
          )}

        {savedFeatures
          .filter(
            (feature) => feature.type === "POINT"
          )
          .map((feature) => {
            const coordinates = JSON.parse(
              feature.coordinates
            );

            return (
              <Marker
                key={feature.id}
                position={[
                  coordinates[0],
                  coordinates[1],
                ]}
              >
                <Popup>{feature.name}</Popup>
              </Marker>
            );
          })}

        {savedFeatures
          .filter(
            (feature) => feature.type === "LINE"
          )
          .map((feature) => {
            const coordinates = JSON.parse(
              feature.coordinates
            );

            return (
              <Polyline
                key={feature.id}
                positions={coordinates}
              />
            );
          })}

        {savedFeatures
          .filter(
            (feature) => feature.type === "POLYGON"
          )
          .map((feature) => {
            const coordinates = JSON.parse(
              feature.coordinates
            );

            return (
              <Polygon
                key={feature.id}
                positions={coordinates}
              />
            );
          })}
      </MapContainer>
    </div>
  );
}

export default MapView;