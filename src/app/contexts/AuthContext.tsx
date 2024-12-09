// src/app/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from '../firebase';

interface AuthContextProps {
  uid: string | null;
  role: string | null;
  setRole: (role: string | null) => void; // Add setRole to the interface
  user: {
    uid: string;
    name: {
      first_name: string;
      last_name: string;
    };
    dob: {
      day: number;
      month: number;
      year: number;
    };
    is_owner: boolean;
    is_admin: boolean;
    phone_number: string;
    email: string;
    saved_jobs: number[];
  } | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  uid: null,
  user: null,
  role: null,
  setRole: () => {}, // Provide a default noop function
  signOut: async () => {},
});

const fetchUserInfo = async (uid: string, setRole: React.Dispatch<React.SetStateAction<string | null>>, setUser: React.Dispatch<React.SetStateAction<AuthContextProps['user'] | null>>) => {
  try {
    const response = await fetch(`https://resumegraderapi.onrender.com/users/${uid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const data = await response.json();
    setUser(data);
    await fetchUserRole(uid, setRole); // Fetch user role after fetching user info
    console.log('User info:', data); // For testing purposes
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

const fetchUserRole = async (uid: string, setRole: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const response = await fetch(`https://resumegraderapi.onrender.com/users/privileges/${uid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user role');
    }
    const data = await response.text();
    setRole(data);
    console.log('User role:', data); // For testing purposes
  } catch (error) {
    console.error('Error fetching user role:', error);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUid(currentUser.uid);
        fetchUserInfo(currentUser.uid, setRole, setUser);
      } else {
        setUid(null);
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUid(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ uid, user, role, setRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
