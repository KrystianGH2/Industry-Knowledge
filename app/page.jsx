import UserList from "./(components)/UsersPage";
import UserReports from "./(components)/userReports";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <UserReports/>
      <UserList />
    </main>
  );
}
