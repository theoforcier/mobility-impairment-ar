import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import MainUIBtn from './MainUIBtn'

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
    <MapContainer center={[42.984268, -81.247528]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MainUIBtn></MainUIBtn>
      <Marker position={[42.984268, -81.247528]}>
        
    </Marker>
    </MapContainer>
    // <div style={{ position: 'relative', height: '100vh' }}>
    // <MapContainer center={position} zoom={50} style={{ height: '100vh' }}>
    //   <TileLayer />
    //   <MainUIBtn></MainUIBtn>
    //   <Marker position={position}>
    //   </Marker>
    // </MapContainer>
    // </div>
  );
}

export default GeoMap;