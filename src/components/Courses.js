import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoursePlayer from './CoursePlayer';

const youtubeEducationVideos = [
  { title: 'Introduction to Python', url: 'https://www.youtube.com/embed/kqtD5dpn9C8' },
  { title: 'Learn JavaScript - Full Course for Beginners', url: 'https://www.youtube.com/embed/PkZNo7MFNFg' },
  { title: 'React Tutorial for Beginners', url: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
  { title: 'HTML Full Course - Build a Website Tutorial', url: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
  { title: 'CSS Tutorial - Zero to Hero (Complete Course)', url: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
  { title: 'SQL Tutorial - Full Database Course for Beginners', url: 'https://www.youtube.com/embed/HXV3zeQKqGY' },
  { title: 'Machine Learning for Everybody – Full Course', url: 'https://www.youtube.com/embed/i_LwzRVP7bg' },
  { title: 'Data Structures and Algorithms in Python - Full Course for Beginners', url: 'https://www.youtube.com/embed/pkYVOmU3MgA' },
  { title: 'Git and GitHub for Beginners - Crash Course', url: 'https://www.youtube.com/embed/RGOj5yH7evk' },
];

const getYouTubeVideoId = (url) => {
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : '';
};

const getYouTubeThumbnail = (videoUrl) => {
  const videoId = getYouTubeVideoId(videoUrl);
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        const formattedCourses = data.slice(0, 6).map((post, index) => {
          const mainVideo = youtubeEducationVideos[index % youtubeEducationVideos.length];
          const randomVideos = [...youtubeEducationVideos].sort(() => 0.5 - Math.random()).slice(0, 3);
          return {
            id: post.id,
            title: mainVideo.title,
            description: post.body.slice(0, 100) + '...',
            instructor: 'Instructor Name',
            thumbnail: getYouTubeThumbnail(mainVideo.url),
            lessons: randomVideos.map((video, idx) => ({
              id: idx + 1,
              title: `Lesson ${idx + 1}: ${video.title}`,
              videoUrl: video.url,
            })),
          };
        });
        setCourses(formattedCourses);
        setLoading(false);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">Available Courses</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full rounded-md border border-gray-300 p-2 text-gray-800 dark:bg-[#2C303B] dark:text-white"
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-[#2C303B]"
              onClick={() => handleCourseClick(course)}
            >
              <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{course.title}</h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{course.description}</p>
                <p className="text-sm font-medium text-primary">Instructor: {course.instructor}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-800 dark:text-white">No courses found.</p>
        )}
      </div>

      {/* Course Player Modal */}
      {selectedCourse && (
        <CoursePlayer course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default Courses;
