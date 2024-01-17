import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Image from "next/image";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <>
      <div className="">
        <div
          data-theme="dark"
          className="bg-[#1A1A1A] flex justify-center items-center"
        >
          <header className="bg-[#1A1A1A] text-[#8E8E9A] flex  items-center w-full">
            <nav className="flex w-full justify-between px-10 py-4">
              <div className="text-xl font-bold">BlockGuardian</div>
              <div className="flex gap-10">
                <div className="flex gap-10">
                  <Link className=" hover:text-white transition" href="/">
                    Home
                  </Link>
                  <Link
                    className=" hover:text-white transition"
                    href="/ClientMember"
                  >
                    Client Member
                  </Link>
                  <Link className=" hover:text-white transition" href="/Member">
                    Member
                  </Link>
                  <Link className=" hover:text-white transition" href="/Public">
                    Public
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  {session ? (
                    <>
                      <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                      <Image
                        className="w-5 h-5"
                        src="https://www.svgrepo.com/show/31480/notification-bell.svg"
                        alt="avatar"
                        width={24} // Replace with the desired width
                        height={24} // Replace with the desired height
                      />
                    </>
                  ) : (
                    <>
                     
                      <Link
                        className=" hover:text-white transition"
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
