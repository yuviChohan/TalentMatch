"use client";
import { useState } from "react";
import { auth } from "./firebase"; // Adjust the path if needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setMessage("Signed in with email!");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setMessage("Signed up with email!");
        // Save user to relational database
        await saveUserToDatabase(user);
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const saveUserToDatabase = async (user) => {
    try {
      const response = await fetch('/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
      });
      if (response.ok) {
        console.log("User saved to database");
      } else {
        console.error("Failed to save user to database");
      }
    } catch (error) {
      console.error("Error saving user to database", error);
    }
  };

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setMessage("Signed in with Google!");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const signInWithGitHub = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setMessage("Signed in with GitHub!");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="flex flex-col items-center justify-center max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-extrabold mb-8">
          <span className="text-blue-600">Talent</span><span className="text-green-500">Match</span>
        </h1>

        {!showEmailForm && (
          <>
            <button 
              onClick={() => setShowEmailForm(true)} 
              className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Sign in with Email
            </button>
            <button 
              onClick={signInWithGoogle} 
              className="w-full p-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Sign in with Google
            </button>
            <button 
              onClick={signInWithGitHub} 
              className="w-full p-3 mb-4 text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              Sign in with GitHub
            </button>
          </>
        )}

        {showEmailForm && (
          <div className="w-full">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={handleEmailChange} 
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={handlePasswordChange} 
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
            />
            <button 
              onClick={isSignUp ? signUpWithEmail : signInWithEmail} 
              className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              {isSignUp ? "Sign up with Email" : "Sign in with Email"}
            </button>
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="w-full p-3 mb-4 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
            <button 
              onClick={() => setShowEmailForm(false)} 
              className="w-full p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        )}

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </main>
  );
}