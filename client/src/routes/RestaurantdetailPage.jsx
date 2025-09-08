import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

import Reviews from '../components/Reviews'

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
    <div>{selectedRestaurants && (
      <>
      <div className="mt-3">
      <Reviews />
      </div>
      </>
    )}</div>
  )
}

export default RestaurantdetailPage