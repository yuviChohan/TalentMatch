// src/app/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from '../firebase';

interface AuthContextProps {
  uid: string | null;
  role: string | null;
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
  } | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  uid: null,
  user: null,
  role: null,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  useEffect(() => {
    const fetchUserInfo = async (uid: string) => {
      try {
        const response = await fetch(`https://resumegraderapi.onrender.com/users/${uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUser(data);
        await fetchUserRole(uid); // Fetch user role after fetching user info
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchUserRole = async (uid: string) => {
      try {
        const response = await fetch(`https://resumegraderapi.onrender.com/privileges/${uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        if (data.is_admin) {
          setRole('admin');
        } else if (data.is_owner) {
          setRole('owner');
        } else {
          setRole('user');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUid(currentUser.uid);
        fetchUserInfo(currentUser.uid);
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
    <AuthContext.Provider value={{ uid, user, role, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);