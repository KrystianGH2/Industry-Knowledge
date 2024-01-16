"use client";
import { useEffect, useState } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

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
    height: "260px",
    width: "100%",
  };

  // Return the JSX for the component
  return (
    <>
      <h2>User Report List</h2>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* Map each user report to a figure with a Leaflet Map */}
        {userReports.map((report) => (
          <figure className="card w-96 bg-base-100 shadow-xl" key={report._id}>
            {/* MapContainer renders the Leaflet Map */}
            <MapContainer
              center={[
                report.location.coordinates[1],
                report.location.coordinates[0],
              ]}
              zoom={17}
              style={mapContainerStyle}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />

              {/* Marker component places a marker on the map */}
              <Marker
                position={[
                  report.location.coordinates[1],
                  report.location.coordinates[0],
                ]}
                icon={
                  new L.Icon({
                    iconUrl: "/img/your-marker-icon.png", // Update the path accordingly
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  })
                }
              />

              {/* Circle component draws a circle around the marker */}
              <Circle
                center={[
                  report.location.coordinates[1],
                  report.location.coordinates[0],
                ]}
                radius={15} // Set the radius of the circle in meters
                pathOptions={{
                  color: "#FF0000", // Set the stroke color of the circle
                  opacity: 0, // Set the stroke opacity of the circle
                  weight: 0, // Set the stroke weight of the circle
                  fillColor: "#FF0000", // Set the fill color of the circle
                  fillOpacity: 0.15, // Set the fill opacity of the circle
                }}
              />
            </MapContainer>

            {/* Figcaption with report details */}
            <figcaption className="card-body">
              <h2 className="card-title">{report.title}</h2>
              <p>{report.description}</p>
              <div className="card-actions justify-start flex flex-row items-center">
                <div className="flex flex-row justify-center items-center gap-2">
                  <span>By</span>
                  <img
                    className="w-5 h-5"
                    src="https://www.svgrepo.com/show/295402/user-profile.svg"
                    alt="avatar"
                  />{" "}
                </div>
                <p>
                  {" "}
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
