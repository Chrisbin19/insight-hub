import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantdetailPage = () => {
  const {id} = useParams();
  console.log(id);
  const {selectedRestaurants,setSelectedRestaurants} = useContext(RestaurantsContext);
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const data = response.data.data;

        if (data.reviews && data.reviews.length > 0) {
          const validReviews = data.reviews.filter(review => typeof review.rating === 'number' || !isNaN(review.rating));
          
          const totalRating = validReviews.reduce((sum, review) => {
            return sum + Number(review.rating);
          }, 0);
          
          const average = validReviews.length > 0 ? totalRating / validReviews.length : 0;

          data.restaurant.average_rating = average;
          data.restaurant.count = validReviews.length;
        } else {
          data.restaurant.average_rating = 0;
          data.restaurant.count = 0;
        }

        setSelectedRestaurants(data);
      } catch (err) {
        console.error('Failed to fetch restaurant details:', err);
      }
    };

    fetchData();
  }, [id]);


  //console.log(selectedRestaurants.reviews);
  return (
    <div>{selectedRestaurants && (
      <>
      <h1 className='text-center display-1'>{selectedRestaurants.restaurant.name}</h1>
      <div className="text-center">
        <StarRating rating = {Number(selectedRestaurants.restaurant.average_rating)}/>
        <span className="text-warning ml-1">
          {selectedRestaurants.restaurant.count ? `(${selectedRestaurants.restaurant.count})` : '(0)'}
        </span>
      </div>
      <div className="mt-3">
      <Reviews reviews = {selectedRestaurants.reviews || []} />
      

      </div>
      <AddReview/>
      </>
    )}</div>
  )
}

export default RestaurantdetailPage 