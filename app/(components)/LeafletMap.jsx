"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
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
  const [location, setLocation] = useState("");

  const mapRef = useRef(null);

  const greenIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: greenIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

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

      marker.on("dragend", (event) => {
        const newLatLng = event.target.getLatLng();
        setPosition({ lat: newLatLng.lat, lng: newLatLng.lng });
        onLocationChange({ latitude: newLatLng.lat, longitude: newLatLng.lng });
        circle.setLatLng([newLatLng.lat, newLatLng.lng]);
        setLocation([newLatLng.lat, newLatLng.lng]);

        // Reverse geocoding to get the address
        const geocoder = L.Control.Geocoder.nominatim({});
        geocoder.reverse(
          newLatLng,
          leafletMap.options.crs.scale(leafletMap.getZoom()),
          (results) => {
            const address = results[0]?.name || "";
            setAddress(address);
          }
        );
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
  }, [map, position, greenIcon, marker, onLocationChange]);

  const handleMapClick = (event) => {
    const { latlng } = event;
    if (latlng) {
      const lat = latlng.lat;
      const lng = latlng.lng;
      setPosition({ lat, lng });
      setMarker({ lat, lng });
      onLocationChange({ latitude: lat, longitude: lng });
    }
  };

  const containerStyle = {
    width: "100%",
    height: "70vh",
    filter: "invert(80%) hue-rotate(190deg) brightness(95%) contrast(90%)",
  };

  return (
    <div>
      <div id="leaflet-map" style={containerStyle} onClick={handleMapClick} />
      <label
        htmlFor="location"
        className="block text-base font-semibold mb-2 pl-1 text-[#adadad]"
      >
        Location: <span>{address}</span>
      </label>
    </div>
  );
};

export default dynamic(() => import("leaflet").then((L) => LeafletMap), {
  ssr: false,
});
