"use client";
import React, { useState } from "react";
import Link from "next/link";

const NavLinks = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={
          menuOpen
            ? "flex flex-col  gap-6 p-2 fixed uppercase text-lg left-0 top-0 transition-all divide-y divide-[#8E8E9A] bg-black w-full h-screen z-20"
            : "  "
        }
      >
        <div className="flex w-full  justify-end  font-bold text-2xl md:hidden z-10">
          <button onClick={toggleMenu} className="rotate-hover transition">
            X
          </button>
        </div>
        <div
          className={
            menuOpen
              ? "flex flex-col pt-10  gap-6 p-2 fixed uppercase text-lg right-0 top-0 transition-all divide-y divide-[#8E8E9A] bg-black w-full h-screen "
              : " hidden justify-center items-center md:flex  md:flex-row md:gap-6 md:bg-transparent md:relative md:transition-all md:h-0 md:p-0 md:text-base md:justify-center md:items-center md:divide-y-0"
          }
        >
          <Link className="hover:text-white transition p-1 md:p-0 md:" href="/">
            Home
          </Link>
          <Link
            className="hover:text-white transition p-1 md:p-0"
            href="/ClientMember"
          >
            Client Member
          </Link>
          <Link
            className="hover:text-white transition p-1 md:p-0"
            href="/Member"
          >
            Member
          </Link>
          <Link
            className="hover:text-white transition p-1 md:p-0"
            href="/Public"
          >
            Public
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
