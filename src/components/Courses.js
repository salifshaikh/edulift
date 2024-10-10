import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Courses() {
  const [courses, setCourses] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);
    };

    fetchCourses();
  }, [db]);

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      {courses.map(course => (
        <div key={course.id} className="course-item">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;