import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";
import Footer from "./(components)/Footer";

export const metadata = {
  title: "BlockGuardian",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Nav />
        <AuthProvider>
          <div className="m-2">{children}</div>{" "}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
