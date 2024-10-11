import React from 'react';

const CoursePlayer = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <iframe
          title={course.title}
          src={course.lessons[0].videoUrl}
          className="w-full h-60"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <h3 className="mt-4 text-xl font-semibold">Lessons:</h3>
        <ul className="mt-2">
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2">
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePlayer;
