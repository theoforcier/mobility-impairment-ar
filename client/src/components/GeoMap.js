import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

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
      {/*<Marker position={[42.984268, -81.247528]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>*/}
    </MapContainer>
  );
}

export default GeoMap;