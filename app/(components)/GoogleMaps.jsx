"use client";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapComponent = ({ onLocationChange }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState({ lat: 59.921, lng: 10.7512 }); // Default position
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (map) {
      // Initialize the map click event listener
      map.addListener("click", handleMapClick);
    }
  }, [map]);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setPosition({ lat, lng });
    onLocationChange({ latitude: lat, longitude: lng });
  };

  const handleAddressChange = () => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setPosition({ lat, lng });
        onLocationChange({ latitude: lat, longitude: lng });
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>

      {/* Allow user to input an address */}
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

export default GoogleMapComponent;
