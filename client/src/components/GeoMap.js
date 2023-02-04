import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const GeoMap = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      console.log(position.coords.latitude)
    });
  }, []);

  return (
    
    <MapContainer center={[location.lat, location.lng]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default GeoMap;