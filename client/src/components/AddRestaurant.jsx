import React, { useState,useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantsContext);
  const [name,setName]=useState("")
  const [location,setLocation]=useState("")
  const [priceRange,setPriceRange]=useState("Price Range")
  const handleSubmit = async (e)=>{
   e.preventDefault()
   try{
    const response = await RestaurantFinder. post("/",
      {
        name : name,
        location : location,
        price_range :priceRange
      }
    );
    console.log(response.data.data.restaurant);
    addRestaurants(response.data.data.restaurant);
   }catch(e){

   }
  }
  return (
    <div className="mb-4">
      <form className="d-flex justify-content-center">
        {/* Name input */}
        <input 
          type="text" 
          value = {name} onChange = {e=>setName(e.target.value)}
          className="form-control mx-2 w-25" 
          placeholder="name" 
        />

      
        <input 
          type="text" 
          value = {location} onChange = {e=>setLocation(e.target.value)}
          className="form-control mx-2 w-25" 
          placeholder="location" 
        />
        
        <select className="form-control mx-2 w-25"
          value = {priceRange} onChange = {e=>setPriceRange(e.target.value)}
          >
          <option disabled selected>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>

        <button className="btn btn-primary mx-2 px-4"
        type = "submit" onClick={handleSubmit}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddRestaurant