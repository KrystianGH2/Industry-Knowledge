"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LeafletMap from "./LeafletMap";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ReportForm = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
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
      resetForm();
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 3000);
      window.location.reload();
    }
  };

  const handleLocationChange = (location) => {
    setReportData((prevState) => ({
      ...prevState,
      location,
    }));
  };

  const resetForm = () => {
    setReportData({});
  };

  return (
    <>
      <div className="h-28 flex  flex-col justify-center md:mb-10 ">
        <h1>Member Reports</h1>
        <div className="flex gap-2 items-center">
            <h3 className="text-sm"> Logged in as </h3>
          <p className="text-sm">
            {session?.user?.name.charAt(0).toLocaleUpperCase() +
              session?.user?.name.slice(1)}
          </p> <span className="pb-[1.5px]">|</span>
        <p className="text-sm">{session?.user?.role}</p>
        </div>

      </div>
      <div className="w-full">
        <form
          onSubmit={handleOnSubmit}
          method="post"
          className="flex text-[#c5c5c5] flex-col-reverse gap-10 pb-6 md:flex-row"
        >
          <div className="md:w-9/12   md:h-screen flex flex-col gap-6 pt-2 ">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-base font-semibold text-[#999999] mb-2 pb-2"
              >
                Full Name
              </label>
              <input
                onChange={handleOnChange}
                required={true}
                type="text"
                name="username"
                value={reportData.username || ""}
                className="w-full px-4 py-2 border-b focus:outline-none focus:border-focus:border-[#c5c5c5]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-base font-semibold text-[#999999] mb-2">
                Title
              </label>
              <input
                onChange={handleOnChange}
                required={true}
                type="text"
                name="title"
                value={reportData.title || ""}
                className="w-full px-4 py-2 border-b-white  focus:outline-none focus:border-focus:border-[#c5c5c5]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-base font-semibold text-[#999999] mb-2 "
              >
                Report your concern
              </label>
              <input
                onChange={handleOnChange}
                required={true}
                type="text"
                id="concernReport"
                name="description"
                value={reportData.description || ""}
                className="w-full px-4 py-2 border-b  focus:outline-none focus:border-focus:border-[#c5c5c5] h-[80px]"
              />
            </div>

            <button
              type="submit"
              className="btn btn-active btn-ghost w-56 hover:bg-[#333]"
            >
              Submit
            </button>
            <p className="text-red-500">{errorMessage}</p>
          </div>

          <div className="mb-4 w-full md:h-screen">
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-[#999999] mb-2"
            ></label>
            <LeafletMap onLocationChange={handleLocationChange} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
