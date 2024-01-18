import UserReportList from "./(components)/UserReport";
import UserList from "./(components)/UsersPage";
import Image from "next/image";
import bgMap from "../public/bg-map.png"
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between ">
      <header className="bg-[#1A1A1A] flex w-full min-h-screen justify-center relative">
      <Image
          src={bgMap}
          alt="map background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 z-0  backdrop-opacity-95 blur-[2px]"
        />
        <div className="max-w-7xl p-7 sm:p-9 relative z-10">
          <h1>BlockGuardian</h1>
          <p className="text-gray-100">
            Introducing Guardian Hub – Your Personal Safety Network At Guardian
            Hub, we believe in a world where people protect each other. Our
            mission is to create a community of vigilant individuals connected
            by a shared commitment to safety. Welcome to a platform where you
            can connect and live more safely – Guardian Hub.
          </p>
        </div>
      </header>
      <main className=" h-screen pt-10 bg-white w-full flex justify-center ">

      <h1 className="text-black ">Home</h1>
      </main>
      {/* <UserReportList />
      <UserList /> */}
    </main>
  );
}
