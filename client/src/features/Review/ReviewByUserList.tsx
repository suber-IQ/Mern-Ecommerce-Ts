import React from "react";

export interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

interface ReviewProps {
  review: Review;
}

const ReviewByUser: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
      <p className="text-gray-600 mb-2">{review.comment}</p>
      <div className="flex items-center">
        <span className="text-yellow-500 flex">
          {Array.from({ length: review.rating }).map((_, index) => (
            <svg
              key={index}
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 16.582L4.551 19.41l1.64-5.388L1.76 7.76l5.39-.032L10 2l2.85 5.727 5.39.032-4.431 3.262 1.64 5.388L10 16.582z"
              ></path>
            </svg>
          ))}
        </span>
        <span className="ml-2 text-gray-600">
          {review.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};


export default ReviewByUser;
