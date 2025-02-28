import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ReviewsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reviewsRef = useRef(null);
  const [reviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      content: 'Excellent projector! Crystal clear image quality.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      content: 'The compact design is perfect for my small apartment.',
    },
    {
      id: 3,
      name: 'Jessica Williams',
      content: 'Customer support helped me set everything up quickly.',
    },
    {
      id: 4,
      name: 'David Rodriguez',
      content: 'Great value for money compared to other brands.',
    },
    {
      id: 5,
      name: 'Emma Thompson',
      content:
        'The wireless connectivity works flawlessly with all my devices.',
    },
  ]);

  const toggleReviews = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reviewsRef.current && !reviewsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleReviews}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}

      <div
        ref={reviewsRef}
        className={`fixed top-1/4 right-0 z-50 transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-64 md:translate-x-80'}`}
      >
        <button
          onClick={toggleReviews}
          className="absolute top-36 left-[-20px] -translate-x-full bg-blue-600 text-white py-3 px-4 rounded-l-lg shadow-md transform -rotate-90 origin-right font-medium"
        >
          Reviews
        </button>

        <div className="w-64 md:w-80 bg-white shadow-lg h-96 overflow-y-auto rounded-l-lg">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Link
                to="/reviews"
                className="text-xl font-bold text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Customer Reviews
              </Link>
              <button
                onClick={toggleReviews}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-700">{review.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{review.content}</p>
                </div>
              ))}
            </div>

            <Link
              to="/reviews"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsComponent;
