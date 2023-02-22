import React, { useState, useEffect } from 'react';
import MainUIBtn from './MainUIBtn'
import L from 'leaflet';
import { MapContainer, useMap, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MainUIInfo from './MainUIInfo';
import { Container, Row, Col } from 'react-bootstrap';



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
  var circle = L.circle([0.1, 0.1], {radius: 0.1});
  circle.addTo(map);

  useEffect(() => {
    const updatePosition = () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.panTo(e.latlng);
        circle.setRadius(e.accuracy);
        circle.setLatLng(e.latlng);
      });
    }
    // Find initial position
    updatePosition()
    // Update position every 5 seconds
    const interval = setInterval(() => {
      updatePosition()
    }, 5*1000);
    return () => clearInterval(interval);
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon}/>
  );
}

const GeoMap = () => {
  return (
    <MapContainer center={[42.955649464967046, -81.22525549094281]} zoom={17} zoomControl={false} dragging={false} scrollWheelZoom={false} minZoom={16} maxZoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position='bottomright'/>
      <LocationMarker/>
      <MainUIBtn></MainUIBtn>
      <MainUIInfo></MainUIInfo>
    </MapContainer>
  );
}

export default GeoMap;