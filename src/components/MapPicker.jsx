// src/components/MapPicker.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onLocationSelect({ lat, lng });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

const MapPicker = ({ onLocationSelect }) => {
  // Jalandhar coordinates
  const jalandharPosition = [31.3260, 75.5762];

  return (
    <div className="map-picker" style={{ margin: '10px 0' }}>
      <h4>🗺️ Select Location on Map</h4>
      <p>Click anywhere on the map to select your location</p>
      
      <div style={{ height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer 
          center={jalandharPosition} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationSelect={onLocationSelect} />
        </MapContainer>
      </div>
      
      <div className="popular-locations" style={{ marginTop: '10px' }}>
        <p><strong>Popular locations in Jalandhar:</strong></p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {[
            { name: "City Center", coords: [31.3260, 75.5762] },
            { name: "LPU", coords: [31.2550, 75.7050] },
            { name: "Model Town", coords: [31.3320, 75.5700] },
            { name: "Rama Mandi", coords: [31.3180, 75.5820] },
            { name: "CT Group of Institutes", coords: [31.237393393609, 75.55444115926022]}
          ].map((location, index) => (
            <button
              key={index}
              type="button"
              className="location-btn"
              onClick={() => onLocationSelect({ 
                lat: location.coords[0], 
                lng: location.coords[1] 
              })}
              style={{
                padding: '8px 12px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              📍 {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPicker;