import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ data, selectedId, setSelectedId }) {
  const mapRef = useRef(null);

  const selectedItem = data.find(d => d.id === selectedId);

  useEffect(() => {
    if (selectedItem && mapRef.current) {
      mapRef.current.flyTo(
        [selectedItem.latitude, selectedItem.longitude],
        7,
        { duration: 1 }
      );
    }
  }, [selectedItem]);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "500px", width: "100%" ,borderRadius : "10px"}}
      whenCreated={map => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* CLUSTERED MARKERS */}
      <MarkerClusterGroup chunkedLoading>
        {data
          .filter(item => item.id !== selectedId)
          .map(item => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              eventHandlers={{
                click: () => setSelectedId(item.id)
              }}
            >
              <Popup>{item.projectName}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>

      {/* SELECTED MARKER (OUTSIDE CLUSTER) */}
      {selectedItem && (
        <Marker
          position={[selectedItem.latitude, selectedItem.longitude]}
          zIndexOffset={1000}
        >
          <Popup autoOpen>
            <strong>{selectedItem.projectName}</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
