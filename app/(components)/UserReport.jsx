"use client";
import { useEffect, useState } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import Image from "next/image";

// Define the UserReportList component
const UserReportList = () => {
  // State to store user reports
  const [userReports, setUserReports] = useState([]);

  // Fetch user reports from the API on component mount
  useEffect(() => {
    const fetchUserReport = async () => {
      try {
        const res = await fetch("/api/userReports");
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.statusText}`);
        }
        const data = await res.json();
        setUserReports(data.userReports);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUserReport();
  }, []);

  // Style for the Leaflet Map container
  const mapContainerStyle = {
    height: "200px",
    width: "100%",
    filter: "invert(80%) hue-rotate(190deg) brightness(95%) contrast(90%)",
  };

  // Return the JSX for the component
  return (
    <>
      <h1>User Report List</h1>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {userReports.map((report) => (
          <figure className="card w-96 bg-base-100 shadow-xl" key={report._id}>
            {typeof window !== "undefined" && (
              <MapContainer
                center={[
                  report.location.coordinates[1],
                  report.location.coordinates[0],
                ]}
                zoom={17}
                style={mapContainerStyle}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <Marker
                  position={[
                    report.location.coordinates[1],
                    report.location.coordinates[0],
                  ]}
                  icon={
                    new L.Icon({
                      iconUrl: "/img/your-marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41],
                    })
                  }
                />
                <Circle
                  center={[
                    report.location.coordinates[1],
                    report.location.coordinates[0],
                  ]}
                  radius={15}
                  pathOptions={{
                    color: "#FF0000",
                    opacity: 0,
                    weight: 0,
                    fillColor: "#FF0000",
                    fillOpacity: 0.5,
                  }}
                />
              </MapContainer>
            )}

            <figcaption className="card-body">
              <h2 className="card-title">{report.title}</h2>
              <p>{report.description}</p>
              <div className="card-actions justify-start flex flex-row items-center">
                <div className="flex flex-row justify-center items-center gap-2">
                  <span>By</span>
                  <Image
                    className="w-5 h-5"
                    src="https://www.svgrepo.com/show/295402/user-profile.svg"
                    alt="avatar"
                    width={24} // Replace with the desired width
                    height={24} // Replace with the desired height
                  />
                </div>
                <p>
                  {(report.username &&
                    report.username.charAt(0).toUpperCase() +
                      report.username.slice(1)) ||
                    "Person"}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};

// Export the component
export default UserReportList;
