import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, useMap, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Creating marker
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    // Update marker location every 5 seconds
    const interval = setInterval(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon}/>
  );
}

const GeoMap = () => {
  return (
    <MapContainer center={[42.984268, -81.247528]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker/>
    </MapContainer>
  );
}

export default GeoMap;