import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to EduLift</h1>
      <p>Elevate your learning experience with our cutting-edge courses.</p>
      <Link to="/courses">Explore Courses</Link>
    </div>
  );
}

export default Home;