"use client";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

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

  // Style for the Google Map container
  const mapContainerStyle = {
    height: "300px",
    width: "100%",
  };

  // Options to make the map non-interactive
  const mapOptions = {
    disableDefaultUI: true, // Disable default UI controls
    draggable: false, // Disable dragging the map
    zoomControl: false, // Disable zooming
    scrollwheel: false, // Disable scrolling with the mouse wheel
    disableDoubleClickZoom: true, // Disable double click zoom
  };

  // Return the JSX for the component
  return (
    <>
      {" "}
        <h2>User Report List</h2>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* Map each user report to a figure with a Google Map */}
        {userReports.map((report) => (
          <figure className="card w-96 bg-base-100 shadow-xl" key={report._id}>
            {/* LoadScript is used to load the Google Maps API */}
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            >
              {/* GoogleMap component renders the Google Map */}
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: report.location.coordinates[1],
                  lng: report.location.coordinates[0],
                }}
                zoom={17}
                options={mapOptions}
              >
                {/* Marker component places a marker on the map */}
                <Marker
                  position={{
                    lat: report.location.coordinates[1],
                    lng: report.location.coordinates[0],
                  }}
                  title={report.title}
                />

                {/* Circle component draws a circle around the marker */}
                <Circle
                  center={{
                    lat: report.location.coordinates[1],
                    lng: report.location.coordinates[0],
                  }}
                  radius={15} // Set the radius of the circle in meters
                  options={{
                    strokeColor: "#FF0000", // Set the stroke color of the circle
                    strokeOpacity: 0, // Set the stroke opacity of the circle
                    strokeWeight: 0, // Set the stroke weight of the circle
                    fillColor: "#FF0000", // Set the fill color of the circle
                    fillOpacity: 0.15, // Set the fill opacity of the circle
                  }}
                />
              </GoogleMap>
            </LoadScript>

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
                  {report.username &&
                    report.username.charAt(0).toUpperCase() +
                      report.username.slice(1)|| "Person"}
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
