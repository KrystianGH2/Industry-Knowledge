import UserReportList from "./(components)/UserReport";
import UserList from "./(components)/UsersPage";
import Image from "next/image";
import bgMap from "../public/bg-map.png";
import Link from "next/link";

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
          className="absolute inset-0 z-0"
        />
        <div className="max-w-7xl p-7 sm:p-9 relative z-10 w-full textAnimation">
          <div className="flex flex-col gap-6 my-10 md:gap-10 justify-center">
            <h1 className=" transition-all max-w-xl sm:text-4xl md:text-5xl">
              Your Personal Safety Network{" "}
            </h1>
            <p className="text-gray-100 max-w-xl text-lg tracking-wide sm:text-xl sm:leading-normal">
              We believe in a world where people protect each other. Our mission
              is to create a community of vigilant individuals connected by a
              shared commitment to safety. Welcome to a platform where you can
              connect and live more safely – Block Guardian.
            </p>
          </div>
          <Link href={"/ClientMember"}>
            <button className="btn btn-active btn-ghost hover:bg-[#333]">Explore</button>
          </Link>
        </div>
      </header>
     
      {/* <UserReportList />
      <UserList /> */}
    </main>
  );
}
