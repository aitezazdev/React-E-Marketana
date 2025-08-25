import React, { useState, useEffect } from 'react';
import {
  StarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

const Reviews = () => {
  // Returns a random picture from a set of five
  const randomPic = () => {
    const pics = [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
    ];
    return pics[Math.floor(Math.random() * pics.length)];
  };

  const initialReviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      content:
        'Excellent projector! Crystal clear image quality and vibrant colors even in a slightly lit room. Perfect for my home theater setup.',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=1',
      date: '2025-01-15',
    },
    {
      id: 2,
      name: 'Michael Chen',
      content:
        'The compact design is perfect for my small apartment. Easy to set up and the picture quality exceeded my expectations for this price range.',
      rating: 4,
      picture: 'https://i.pravatar.cc/150?img=2',
      date: '2025-01-20',
    },
    {
      id: 3,
      name: 'Jessica Williams',
      content:
        'Customer support helped me set everything up quickly. The video quality is outstanding and the built-in speakers are decent for casual viewing.',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=3',
      date: '2025-01-25',
    },
    {
      id: 4,
      name: 'David Rodriguez',
      content:
        "Great value for money compared to other brands. Battery life could be better though, but I'm still happy with my purchase.",
      rating: 4,
      picture: 'https://i.pravatar.cc/150?img=4',
      date: '2025-02-03',
    },
    {
      id: 5,
      name: 'Emma Thompson',
      content:
        "The wireless connectivity works flawlessly with all my devices. I've been using it for business presentations and it hasn't let me down yet.",
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=5',
      date: '2025-02-10',
    },
    {
      id: 6,
      name: 'James Wilson',
      content:
        'The projector is incredibly lightweight and portable. I take it camping and project movies on our tent wall. Kids love it!',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=1',
      date: '2025-02-12',
    },
    {
      id: 7,
      name: 'Olivia Garcia',
      content:
        "I'm impressed with the contrast ratio. Dark scenes look amazing even when not in a completely dark room.",
      rating: 4,
      picture: 'https://i.pravatar.cc/150?img=2',
      date: '2025-02-14',
    },
    {
      id: 8,
      name: 'William Brown',
      content:
        "The keystone correction feature is a lifesaver when you don't have the perfect placement angle.",
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=3',
      date: '2025-02-16',
    },
    {
      id: 9,
      name: 'Sophia Martinez',
      content:
        "I've had issues connecting to some streaming services. Customer support was helpful, but it's still not fixed.",
      rating: 3,
      picture: 'https://i.pravatar.cc/150?img=4',
      date: '2025-02-18',
    },
    {
      id: 10,
      name: 'Daniel Johnson',
      content:
        'The lens quality is exceptional. No blurring on the edges like my previous projector had.',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=5',
      date: '2025-02-20',
    },
    {
      id: 11,
      name: 'Charlotte Taylor',
      content:
        'Perfect for my small business presentations. Clients are always impressed with the image quality.',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=1',
      date: '2025-02-22',
    },
    {
      id: 12,
      name: 'Logan Thomas',
      content:
        'The cooling system is efficient and keeps the projector from overheating during long movie marathons.',
      rating: 4,
      picture: 'https://i.pravatar.cc/150?img=2',
      date: '2025-02-24',
    },
    {
      id: 13,
      name: 'Amelia Clark',
      content:
        "Brightness could be better for daytime use, but it's perfect once the sun sets.",
      rating: 3,
      picture: 'https://i.pravatar.cc/150?img=3',
      date: '2025-02-26',
    },
    {
      id: 14,
      name: 'Benjamin Walker',
      content:
        'The remote control is intuitive and has all the functions I need for quick adjustments.',
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=4',
      date: '2025-02-28',
    },
    {
      id: 15,
      name: 'Mia Lewis',
      content:
        "I'm a film enthusiast, and this projector reproduces colors accurately. No color correction needed!",
      rating: 5,
      picture: 'https://i.pravatar.cc/150?img=5',
      date: '2025-03-01',
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState(initialReviews);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    content: '',
    rating: 0,
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {});

  useEffect(() => {
    sortReviews(sortOrder);
  }, [reviews, sortOrder]);

  useEffect(() => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    setDisplayedReviews(
      filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
    );
  }, [currentPage, filteredReviews]);

  const sortReviews = (order) => {
    let sorted = [...reviews];

    switch (order) {
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    setFilteredReviews(sorted);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const filterByRating = (rating) => {
    const filtered = reviews.filter((r) => r.rating === rating);
    setFilteredReviews(filtered);
    setSortOrder('filtered');
    setCurrentPage(1);
  };

  const clearFilters = () => {
    sortReviews('newest');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newReview.name.trim() ||
      !newReview.content.trim() ||
      newReview.rating <= 0
    ) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    setIsSubmitting(true);

    setTimeout(() => {
      const reviewToAdd = {
        id: reviews.length + 1,
        name: newReview.name,
        content: newReview.content,
        rating: newReview.rating,
        picture: randomPic(),
        date: new Date().toISOString().split('T')[0],
      };

      setReviews([...reviews, reviewToAdd]);
      setNewReview({ name: '', content: '', rating: 0 });
      setIsSubmitting(false);
    }, 600);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalReviews ? totalRating / totalReviews : 0;

  const renderStars = (rating, size = 'md') => {
    const sizeClass = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`${sizeClass[size]} ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating) => {
    const count = ratingCounts[rating] || 0;
    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

    return (
      <div className="flex items-center gap-2 text-sm mb-1">
        <div className="w-16 flex items-center">
          <span>
            {rating} star{rating !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex-grow bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-yellow-400 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="w-8 text-right">{count}</div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Customer Reviews
          </h1>

          <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </h2>
                <div className="flex justify-center my-2">
                  {renderStars(averageRating, 'lg')}
                </div>
                <p className="text-gray-600">{totalReviews} Reviews</p>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium mb-2 text-gray-700">
                  Rating Distribution
                </h3>
                {[5, 4, 3, 2, 1].map((rating) => renderRatingBar(rating))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm transition"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => sortReviews(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="newest">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-5 gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className="flex items-center justify-center gap-1 border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition"
                  onClick={() => filterByRating(rating)}
                >
                  <span>{rating}</span>
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
              <button
                className="col-span-5 mt-2 text-blue-600 hover:text-blue-800 transition"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img
                      src={review.picture}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {review.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex mb-3">
                        {renderStars(review.rating, 'sm')}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-12 bg-white p-4 rounded-lg shadow-sm">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Previous
            </button>

            <div className="text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-4">
              Write Your Review
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Rating
                </label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`w-8 h-8 ${newReview.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newReview.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition h-32"
                  placeholder="Share your experience with this product..."
                />
              </div>

              {!isFormValid && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg border border-red-100">
                  Please fill in all fields and select a rating before
                  submitting
                </div>
              )}

              <button
                type="submit"
                className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-medium transition-colors text-lg shadow-sm`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
