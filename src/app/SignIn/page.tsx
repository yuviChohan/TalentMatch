import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setMessage("Signed up with email!");
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
        body: JSON.stringify({ uid: user.uid, email: user.email, firstName, lastName, phone, dob }),
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
        if (isSignUp) {
          setShowAdditionalInfo(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const signUpWithGoogle = () => {
    setIsSignUp(true);
    signInWithGoogle();
  };

  const signInAnonymouslyHandler = () => {
    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setMessage("Signed in anonymously!");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setMessage("Signed out successfully!");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  const handleAdditionalInfoSubmit = async () => {
    if (!firstName || !lastName || !dob) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      await saveUserToDatabase(user);
      setShowAdditionalInfo(false);
      setMessage("Signed up with Google!");
    } catch (error) {
      console.error(error);
      setMessage("Error saving user to database.");
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const minDate = "1909-01-01";

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-light-blue-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="Logo" className="h-16" />
        </div>
        {user ? (
          <>
            <p className="mb-4 text-center text-gray-800">Signed in as {user.email}</p>
            <button
              onClick={handleSignOut}
              className="w-full p-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            {!showEmailForm && !isSignUp && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="User name / Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <button
                  onClick={signInWithEmail}
                  className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Sign In
                </button>
                <div className="flex justify-between items-center mb-4">
                  <span></span>
                  <span
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Create an account
                  </span>
                </div>
                <button
                  onClick={signInWithGoogle}
                  className="w-full p-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Sign In with Google
                </button>
                <button
                  onClick={signInAnonymouslyHandler}
                  className="w-full p-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Continue as Guest
                </button>
              </>
            )}

            {isSignUp && (
              <>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Sign up with Email
                </button>
                <button
                  onClick={signUpWithGoogle}
                  className="w-full p-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Sign up with Google
                </button>
                <div className="flex justify-between items-center">
                  
                </div>
              </>
            )}

            {showEmailForm && (
              <div className="w-full">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Phone Number (Optional)"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={handleDobChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                    max={currentDate}
                    min={minDate}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <button
                  onClick={signUpWithEmail}
                  className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Sign up with Email
                </button>
                <button
                  onClick={() => {
                    setShowEmailForm(false);
                    setIsSignUp(false);
                  }}
                  className="w-full p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}

        {showAdditionalInfo && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={handleDobChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  max={currentDate}
                  min={minDate}
                />
              </div>
              <button
                onClick={handleAdditionalInfoSubmit}
                className="w-full p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </div>
    </main>
  );
};

export default SignIn;
