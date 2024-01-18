import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Image from "next/image";

import NavLinks from "./NavLinks";
const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <>
      <div className="">
        <div
          data-theme="dark"
          className="bg-[#1A1A1A] flex justify-center items-center"
        >
          <header className="bg-[#1A1A1A] text-[#8E8E9A] flex  items-center w-full justify-center">
            <nav className="flex w-full justify-between items-center px-10 py-4 h-20 max-w-7xl">
              <div className="text-2xl font-bold text-[#c5c5c5] hover:text-[#f1f1f1] transition shadow-">
                <Link href="/">BlockGuardian</Link>
              </div>
              <div className="flex gap-10 justify-center items-center">
              <NavLinks/>
                <div className="flex flex-row gap-5 items-center justify-center">
                  {session ? (
                    <>
                      <Link href="/api/auth/signout?callbackUrl=/">
                        <Image
                          className="w-5 h-5 text-center"
                          src="https://www.svgrepo.com/show/21304/logout.svg"
                          alt="avatar"
                          width={24} // Replace with the desired width
                          height={24} // Replace with the desired height
                        />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className=" hover:text-white transition px-3 hover:bg- border rounded p-1 text-center"
                        href="/api/auth/signin"
                      >
                        Login
                      </Link>
                      <Link
                        className=" hover:text-white transition"
                        href="/CreateUser"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>
    </>
  );
};

export default Nav;
