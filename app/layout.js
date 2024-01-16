import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-gray-100">
        <Nav  />
        <AuthProvider>
          <div className="m-2">{children}</div>{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
