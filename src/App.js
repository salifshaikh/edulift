import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Courses from './components/Courses';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const firebaseConfig = {
  apiKey: "AIzaSyAI6ZLf6DBoVadK6frfBDA9-WbmY_I08qY",
  authDomain: "edulift-a7cb8.firebaseapp.com",
  projectId: "edulift-a7cb8",
  storageBucket: "edulift-a7cb8.appspot.com",
  messagingSenderId: "151510430569",
  appId: "1:151510430569:web:0c43c99e341f45a07ec3f8",
  measurementId: "G-EFLZ08R5YV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/courses"
            element={
              <ProtectedRoute user={user}>
                <Courses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;