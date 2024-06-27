// src/app/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from '../firebase';

interface AuthContextProps {
  uid: string | null;
  role: string | null;
  setRole: (role: string) => void;
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  uid: null,
  role: null,
  setRole: () => {},
  user: null,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserRole = async (uid: string) => {
      try {
        const response = await fetch(`https://your-api-url.com/users/${uid}/role`);
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUid(currentUser.uid);
        setUser(currentUser);
        fetchUserRole(currentUser.uid);
      } else {
        setUid(null);
        setRole(null);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUid(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ uid, role, setRole, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);