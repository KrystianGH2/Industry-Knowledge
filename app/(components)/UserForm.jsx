"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      contentType: "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      alert("Registered successfully");
      setTimeout(() => {
        router.refresh();
        router.push("/api/auth/signin");
      }, 3000);
    }
  };
  return (
    <div className="flex  flex-col justify-center items-center mt-10 gap-3">
      <h1 className="mb-6">Sign up</h1>
      <div className="flex justify-center w-full">
        <form
          onSubmit={handleOnSubmit}
          method="post"
          className="flex flex-col gap-3 border rounded-md p-10 w-full max-w-2xl text-lg"
        >
          <label htmlFor="Full Name">Full Name</label>
          <input
            id="name"
            name="name"
            type="name"
            onChange={handleOnChange}
            required={true}
            value={formData.name}
            className=" rounded h-11"
          />

          <label htmlFor="Email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleOnChange}
            required={true}
            value={formData.email}
            className=" rounded h-11"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleOnChange}
            required={true}
            value={formData.password}
            className=" rounded h-11"
          />

          <button
            type="submit"
            className="btn btn-active btn-ghost w-56 hover:bg-[#333]"
          >
            Register
          </button>
        </form>
      </div>

      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default UserForm;
