import UserReportList from "./(components)/UserReport";
import UserList from "./(components)/UsersPage";
export default function Home() {
  return (
    <main
      data-theme="dark"
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <header className="bg-[#1A1A1A]">
        Introducing Guardian Hub – Your Personal Safety Network At Guardian Hub,
        we believe in a world where people protect each other. Our mission is to
        create a community of vigilant individuals connected by a shared
        commitment to safety. Welcome to a platform where you can connect and
        live more safely – Guardian Hub.
      </header>
      <h1>Home</h1>
      <UserReportList />
      <UserList />
    </main>
  );
}
