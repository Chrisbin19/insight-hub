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
  useEffect(
    ()=>{
      const fetchData = async ()=>{
        try{
          const response = await RestaurantFinder.get(`/${id}`);
          console.log(response.data.data);
        setSelectedRestaurants(response.data.data);
        }
        catch(e){
          console.log("error occured   "+ e)
        }
      };
      fetchData();
    },[]
  );
  //console.log(selectedRestaurants.reviews);
  return (
    <div>{selectedRestaurants && (
      <>
      <h1 className='text-center display-1'>{selectedRestaurants.restaurant.name}</h1>
      <div className="text-center">
        <StarRating rating = {selectedRestaurants.restaurant.average_rating}/>
        <span className="text-warning ml-1">
          {selectedRestaurants.restaurant.count}
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