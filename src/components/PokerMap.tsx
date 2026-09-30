"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { casinos } from '@/lib/casinos';
import 'leaflet/dist/leaflet.css';

const marker = divIcon({
  className: 'casino-pin', html: '<span></span>',
  iconSize: [22, 28], iconAnchor: [11, 28], popupAnchor: [0, -28],
});
const bounds = casinos.map(casino => casino.position);

export function MapResizeObserver() {
  const map = useMap();
  useEffect(() => {
    // The sidebar changes the container width without resizing the browser.
    const observer = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export default function PokerMap() {
  const [tileError, setTileError] = useState(false);
  return <div className="casino-map">
    <MapContainer bounds={bounds} boundsOptions={{ padding: [30, 30] }} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <MapResizeObserver />
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        eventHandlers={{ tileerror: () => setTileError(true), tileload: () => setTileError(false) }}
      />
      {casinos.map(casino => <Marker key={casino.name} position={casino.position} icon={marker} title={casino.name} alt={casino.name}>
        <Popup>{casino.name}<br />{casino.region}</Popup>
      </Marker>)}
    </MapContainer>
    {tileError && <p className="map-status" role="status">map tiles couldn’t load. the casino list is available above.</p>}
  </div>;
}
