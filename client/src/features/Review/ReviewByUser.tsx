import React, { useState } from 'react';

interface ReviewByUserProps {
  onSubmit: (comment: string, rating: number) => void;
}

const ReviewByUser: React.FC<ReviewByUserProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = () => {
    onSubmit(comment, rating);
    setComment('');
    setRating(0);
  };

  return (
    <div>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={3}
        placeholder="Write your review..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <div className="flex items-center mt-2">
        <span className="mr-2 text-gray-600">Rating:</span>
        <input
          type="number"
          min={0}
          max={5}
          step={0.5}
          value={rating}
          onChange={handleRatingChange}
          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewByUser;
