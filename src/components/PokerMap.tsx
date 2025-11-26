"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Icon } from "leaflet";

const locations: { name: string; position: [number, number] }[] = [
  { name: "Encore Boston Harbor", position: [42.4070, -71.0536] },
  { name: "Parx Casino", position: [40.0871, -74.9083] },
  { name: "Chasers Poker Room", position: [42.7855, -71.2690] },
  { name: "Metro Casino", position: [18.4657, -66.1057] },
  { name: "Caesars New Orleans", position: [29.9511, -90.0715] },
  { name: "Playground Card Room", position: [45.4947, -73.7109] },
];

export default function PokerMap() {
  const [redIcon, setRedIcon] = useState<Icon | null>(null);

  useEffect(() => {
    import("leaflet").then(L => {
      const icon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setRedIcon(icon);
    });
  }, []);

  if (!redIcon) {
    return null;
  }

  return (
    <MapContainer center={[32, -78]} zoom={4} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={loc.position} icon={redIcon}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 