// CourseCatalog.js
import React from 'react';
import './Course.css'; // Import the CSS file
import ChorizaTacImg from '../../assets/ChorizaTaco.jpeg'

const CourseCatalog = () => {
  const courses = [
    {
      id: 1,
      title: 'Course 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: ChorizaTacImg,
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: ChorizaTacImg,
    },
    {
      id: 3,
      title: 'Course 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      image: ChorizaTacImg,
    },
    {
      id: 4,
      title: 'Course 4',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      image: ChorizaTacImg,
    },
    {
      id: 5,
      title: 'Course 5',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      image: ChorizaTacImg,
    },
  ];

  return (
    <div className="course-catalog">
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <img src={course.image} alt={course.title} />
          <div className="course-info">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button>Enroll Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCatalog;
