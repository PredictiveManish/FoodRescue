// components/MapPicker.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center on India
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Add click event to map
      mapInstance.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Remove existing marker
        if (markerRef.current) {
          mapInstance.current.removeLayer(markerRef.current);
        }
        
        // Add new marker
        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current);
        
        // Call parent callback
        onLocationSelect({ lat, lng });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [onLocationSelect]);

  return <div ref={mapRef} style={{ height: '300px', width: '100%' }} />;
};

export default MapPicker;