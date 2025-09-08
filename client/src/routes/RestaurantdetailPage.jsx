import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurants,setSelectedRestaurants} = useContext(RestaurantsContext);
  useEffect(
    ()=>{
      const fetchData = async ()=>{
        try{
          const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurants(response.data.data.restaurant);
        }
        catch(e){

        }
      };
      fetchData();
    },[]
  );
  return (
    <div>{selectedRestaurants && <StarRating rating= {3.5}/>}</div>
  )
}

export default RestaurantdetailPage