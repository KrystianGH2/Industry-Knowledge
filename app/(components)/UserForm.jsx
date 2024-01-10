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
    <div data-theme="cupcake" className="flex  flex-col justify-center items-center mt-10 gap-3">
      <h1>Create New User</h1>
      <div className="flex justify-center bg-slate-300 w-full">
        <form
          onSubmit={handleOnSubmit}
          method="post"
          className="flex flex-col gap-3 border p-10 max-w-screen-2xl"
        >
          <label htmlFor="Full Name">Full Name</label>
          <input
            id="name"
            name="name"
            type="name"
            onChange={handleOnChange}
            required={true}
            value={formData.name}
            className=" bg-slate-400 rounded "
          />

          <label htmlFor="Email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleOnChange}
            required={true}
            value={formData.email}
            className=" bg-slate-400 rounded"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleOnChange}
            required={true}
            value={formData.password}
            className=" bg-slate-400 rounded"
          />

          <input
            type="submit"
            value="Create User"
            className="bg-blue-300 hover:bg-blue-100"
          />
        </form>
      </div>

      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default UserForm;
