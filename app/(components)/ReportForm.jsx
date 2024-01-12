import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GoogleMapComponent from "./GoogleMaps";
const ReportForm = () => {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect("/api/auth/signin?callbackUrl=/Member");
    // },
  });
// const sessionUserName = session
//   if (session) {
//     console.log("Session exists", session?.user?.email && session.user?.name);
//     console.log("Session USER name", sessionUserName)
//   }
  const router = useRouter();
  const [reportData, setReportData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setReportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Concerns", {
      method: "POST",
      body: JSON.stringify(reportData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      alert("Report successfully created");
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 3000);
    }
  };

  const handleLocationChange = (location) => {
    setReportData((prevState) => ({
      ...prevState,
      location,
    }));
  };

  return (
    <div className="max-w-2xl">
      Report a safety concern
      <form onSubmit={handleOnSubmit} method="post">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-600 mb-2"
          >
            Full Name
          </label>
          <input
            onChange={handleOnChange}
            required={true}
            type="text"
            name="username"
            value={reportData.username}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-600 mb-2"
          >
            Title
          </label>
          <input
            onChange={handleOnChange}
            required={true}
            type="text"
            name="title"
            value={reportData.title}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-600 mb-2"
          >
            Report your concern
          </label>
          <input
            onChange={handleOnChange}
            required={true}
            type="text"
            id="concernReport"
            name="description"
            value={reportData.description}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-600 mb-2"
          >
            Location
          </label>
          <GoogleMapComponent onLocationChange={handleLocationChange} />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Submit
        </button>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ReportForm;
