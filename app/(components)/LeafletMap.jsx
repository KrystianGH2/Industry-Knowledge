"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import greenIconUrl from "../img/marker-icon-green.png";

const LeafletMap = ({ onLocationChange }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState({ lat: 59.921, lng: 10.7512 });
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null);

  const mapRef = useRef(null);
  var greenIcon = new L.Icon({
    iconUrl: greenIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (!mapRef.current) {
      const leafletMap = L.map("leaflet-map", {}).setView(
        [position.lat, position.lng],
        16
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMap);

      const marker = L.marker([position.lat, position.lng], {
        icon: greenIcon,
        draggable: true,
      })
        .addTo(leafletMap)
        .bindPopup("You are here.")
        .openPopup();

      var circle = L.circle([position.lat, position.lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 8,
      }).addTo(leafletMap);

      // Listen for dragend event on the marker
      marker.on("dragend", (event) => {
        const newLatLng = event.target.getLatLng();
        console.log("New Marker Location:", newLatLng);
        setPosition({ lat: newLatLng.lat, lng: newLatLng.lng });
        onLocationChange({ latitude: newLatLng.lat, longitude: newLatLng.lng });
        circle.setLatLng([newLatLng.lat, newLatLng.lng]);
      });

      setMap(leafletMap);
      setMarker(marker);
      mapRef.current = true;
    } else if (
      map &&
      position.lat !== undefined &&
      position.lng !== undefined
    ) {
      map.setView([position.lat, position.lng], 18);
      marker.setLatLng([position.lat, position.lng]);
    }
  }, [map, position]);

  const handleMapClick = (event) => {
    const { latlng } = event;
    if (latlng) {
      const lat = latlng.lat;
      const lng = latlng.lng;
      console.log("New Position:", { lat, lng });
      setPosition({ lat, lng });
      setMarker({ lat, lng });
      onLocationChange({ latitude: lat, longitude: lng });
    }
  };

  const handleAddressChange = () => {
    console.log("New Address:", address);
    const geocoder = L.Control.Geocoder.nominatim({});
    geocoder.geocode(address, (results) => {
      console.log("Geocoding Results:", results);
      const center = results[0]?.center;
      if (center) {
        const lat = center.lat;
        const lng = center.lng;
        console.log("Geocoded Position:", { lat, lng });
        setPosition({ lat, lng });
        onLocationChange({ latitude: lat, longitude: lng });
      } else {
        console.error("Geocode was not successful");
      }
    });
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div data-theme="dark">
      <div id="leaflet-map" style={containerStyle} onClick={handleMapClick} />
      <div className="flex flex-col mt-2 py-2">
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-gray-600 mb-2 pl-1"
        >
          Or Enter a location
        </label>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter an address"
          onChange={(e) => setAddress(e.target.value)}
          onBlur={handleAddressChange}
        />
      </div>
    </div>
  );
};

export default LeafletMap;
