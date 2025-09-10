import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {
  const { id } = useParams();
  
  // 1. BRING BACK useContext to manage state
  const { selectedRestaurants, setSelectedRestaurants } = useContext(RestaurantsContext);

  // Local state for the form inputs
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('Rating');

  const handleSubmitReview = async (e) => {
    // 2. FIX the typo here
    e.preventDefault(); 
    
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      // The backend returns the newly created review
      const newReview = response.data.data.review;

      // 3. UPDATE THE STATE - This is the key to making the review appear
      setSelectedRestaurants({
        ...selectedRestaurants, // Keep existing restaurant details
        reviews: [...selectedRestaurants.reviews, newReview], // Add the new review to the array
      });

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
      {/* 4. USE onSubmit on the <form> tag */}
      <form onSubmit={handleSubmitReview}>
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
        {/* The button now only needs to be of type="submit" */}
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

