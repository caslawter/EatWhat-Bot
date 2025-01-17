import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import RestaurantDetail from './RestaurantDetail';
import axios from 'axios';
import DialogueBox from '../components/DialogueBox';

interface RestaurantObject{
  name:String,
  location:String,
  rating:Number,
  priceLevel:Number,
  type:String
}


function RestaurantList() {
  const restaurant_1:RestaurantObject={
    name:'muthu curry',
    location:'82 Orchard',
    rating:3.7,
    priceLevel:1,
    type:'Indian'
  }
  // const [restaurantDetail,setRestaurantList]=useState<null | RestaurantObject >(null);
  useEffect(() => {
    async function getGoogleResults() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/places`,
          {
            params: {
              lat: 1.2976174485362484,
              lng: 103.85488811330647,
              radius: 5000,
              min: 1,
              max: 1,
            },
          }
        );
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    }
    getGoogleResults();
  }, []);

  return (
    <div className="">
      <Link to="/preference" className='font-bold flex gap-2 text-3xl text-customOrange-dark hover:text-customOrange-light hover:underline'>
            <p>&lt;</p>
            <p>Preferences</p>
      </Link>


      <DialogueBox/>
      {/* object->display its values */}
      <div>
        {/* below would be the list */}
        <div className='flex'>
          {/* left & right */}
          <div>
            {/* left-up & left-down */}

          </div>
        </div>
      </div>

    </div>

    
  )
}

export default RestaurantList