import UserReportList from "./(components)/UserReport";
import UserList from "./(components)/UsersPage";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <UserReportList />
      <UserList />
    </main>
  );
}
