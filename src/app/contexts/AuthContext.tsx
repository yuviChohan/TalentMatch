// src/app/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { ReactNode } from 'react';

interface AuthContextProps {
  uid: string | null;
  role: string | null;
  setRole: (role: string) => void; // Add setRole
}

const AuthContext = createContext<AuthContextProps>({ uid: null, role: null, setRole: () => {} });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async (uid: string) => {
      try {
        const response = await fetch(`https://your-api-url.com/users/${uid}/role`);
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        setRole(data.role); // Assuming the API returns { role: 'admin' | 'user' }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUid(user.uid);
        fetchUserRole(user.uid);
      } else {
        setUid(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ uid, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
