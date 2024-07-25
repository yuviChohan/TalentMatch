"use client";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { name: 'Home', path: '/RoleBasedHome' },
    { name: 'Jobs', path: '/Jobs' },
    { name: 'Profile', path: '/Profile' },
  ];
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <body>
            <NavBar links={links} />
            {children}
            <Footer />
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
