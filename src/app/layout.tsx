"use client";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from './components/NavBar';
import Footer from './components/Footer';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Profile', path: '/profile' },
    { name: 'Sign In', path: '/signin' },
    { name: 'Sign Up', path: '/signup' },
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
