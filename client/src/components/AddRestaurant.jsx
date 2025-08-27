import React from 'react'

const AddRestaurant = () => {
  return (
    <div className="mb-4">
      <form className="d-flex justify-content-center">
        {/* Name input */}
        <input 
          type="text" 
          className="form-control mx-2 w-25" 
          placeholder="name" 
        />

        {/* Location input */}
        <input 
          type="text" 
          className="form-control mx-2 w-25" 
          placeholder="location" 
        />

        {/* Price range dropdown */}
        <select className="form-control mx-2 w-25">
          <option disabled selected>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>

        {/* Add button */}
        <button className="btn btn-primary mx-2 px-4">
          Add
        </button>
      </form>
    </div>
  )
}

export default AddRestaurant