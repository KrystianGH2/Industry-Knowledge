"use client";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
        console.log(data.userReports);
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
    <div>
      <h2>User Report List</h2>
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
            </GoogleMap>
          </LoadScript>

          {/* Figcaption with report details */}
          <figcaption className="card-body">
            <h2 className="card-title">{report.title}</h2>
            <p>{report.description}</p>
            <div className="card-actions justify-start">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

// Export the component
export default UserReportList;
