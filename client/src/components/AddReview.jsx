import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {
  const { id } = useParams();
  
  const { selectedRestaurants, setSelectedRestaurants } = useContext(RestaurantsContext);

  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('Rating');

  const handleSubmitReview = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      const newReview = response.data.data.review;

      // --- NEW LOGIC STARTS HERE ---

      // Create the newly updated reviews array
      const updatedReviews = [...selectedRestaurants.reviews, newReview];

      // Calculate the new average rating
      const totalRating = updatedReviews.reduce((sum, review) => {
        // Ensure rating is treated as a number
        return sum + Number(review.rating);
      }, 0);
      const newAverage = totalRating / updatedReviews.length;

      // UPDATE THE STATE with the new review, new average, and new count
      setSelectedRestaurants({
        // Keep the main restaurant details (like name, location)
        restaurant: {
          ...selectedRestaurants.restaurant,
          average_rating: newAverage.toFixed(1), // Update average rating
          count: updatedReviews.length, // Update the review count
        },
        // Update the reviews array
        reviews: updatedReviews,
      });

      // --- NEW LOGIC ENDS HERE ---

      // Clear the form fields after successful submission
      setName('');
      setReviewText('');
      setRating('Rating');

    } catch (err) {
      console.error('Failed to add review:', err);
    }
  };

  return (
    <div className="mb-2 mt-4">
      <form onSubmit={handleSubmitReview}>
        {/* ... existing form JSX ... */}
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="form-select"
              required
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

