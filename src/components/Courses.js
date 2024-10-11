import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoursePlayer from './CoursePlayer';

const youtubeEducationVideos = [
  { title: 'Introduction to Python', url: 'https://www.youtube.com/embed/kqtD5dpn9C8' },
  { title: 'Learn JavaScript - Full Course for Beginners', url: 'https://www.youtube.com/embed/PkZNo7MFNFg' },
  { title: 'React Tutorial for Beginners', url: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
  { title: 'HTML Full Course - Build a Website Tutorial', url: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
  { title: 'CSS Tutorial - Zero to Hero (Complete Course)', url: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
  { title: 'SQL Tutorial - Full Database Course for Beginners', url: 'https://www.youtube.com/embed/HXV3zeQKqGY' },
];

const getYouTubeVideoId = (url) => {
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : '';
};

const getYouTubeThumbnail = (videoUrl) => {
  const videoId = getYouTubeVideoId(videoUrl);
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
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
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        const formattedCourses = data.map((post, index) => {
          const video = youtubeEducationVideos[index % youtubeEducationVideos.length];
          return {
            id: post.id,
            title: video.title,
            description: post.body.slice(0, 100) + '...',
            instructor: 'Instructor Name',
            thumbnail: getYouTubeThumbnail(video.url),
            videoUrl: video.url,
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
    return <div className="text-center py-10 text-xl">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Explore Our Courses</h2>
      
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto block px-4 py-2 mb-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              onClick={() => handleCourseClick(course)}
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Instructor: {course.instructor}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">No courses found.</p>
      )}

      <AnimatePresence>
        {selectedCourse && (
          <CoursePlayer key="modal" course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;