import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Courses from './components/Courses';
import Resources from './components/Resources';
import Scholarships from './components/Scholarships';
import Layout from './components/Layout';

const firebaseConfig = {
  apiKey: "AIzaSyAI6ZLf6DBoVadK6frfBDA9-WbmY_I08qY",
  authDomain: "edulift-a7cb8.firebaseapp.com",
  projectId: "edulift-a7cb8",
  storageBucket: "edulift-a7cb8.appspot.com",
  messagingSenderId: "151510430569",
  appId: "1:151510430569:web:0c43c99e341f45a07ec3f8",
  measurementId: "G-EFLZ08R5YV"};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/courses" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/courses" /> : <SignUp />} />
          <Route path="/courses" element={user ? <Courses /> : <Navigate to="/login" />} />
          <Route path="/resources" element={user ? <Resources /> : <Navigate to="/login" />} />
          <Route path="/scholarships" element={user ? <Scholarships /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;