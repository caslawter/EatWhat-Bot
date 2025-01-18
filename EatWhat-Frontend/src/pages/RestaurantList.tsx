import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"; // this page opens up when clicked on the car
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";

interface RestaurantObject {
  name: string;
  location: string;
  rating: number;
  priceLevel: number;
  type: string;
}

const RestaurantCard = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const restaurant_1: RestaurantObject = {
    name: "muthu curry",
    location: "82 Orchard Rd, Singapore 238839",
    rating: 3.7,
    priceLevel: 1,
    type: "Indian",
  };
  return (
    <div className="bordrer-b-2 flex items-center w-full justify-between">
      {/* left and right */}
      <div className="flex flex-col gap-2 w-10/12">
        {/* top and down */}
        <div className="relative flex item-center">
          {/* top */}
          <h3 className="font-bold text-lg">{restaurant_1.name}</h3>

          <div className="flex items-center absolute right-0">
            <FaStar className="text-customOrange-dark" />
            <p>{restaurant_1.rating}</p>
          </div>
        </div>
        <p>{restaurant_1.type}</p>
        <div className="flex items-center">
          <FaDollarSign className="text-customOrange-dark" />
          <FaDollarSign className="text-gray-300" />
          <FaDollarSign className="text-gray-300" />
          <FaDollarSign className="text-gray-300" />
        </div>
        {/* Down */}
        <p>{restaurant_1.location}</p>
      </div>
      </div>
      )
}

const RestaurantList = (): JSX.Element => {
  // const [restaurantDetail,setRestaurantList]=useState<null | RestaurantObject >(null);
  const navigate = useNavigate();
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
    <>
      <BackButton onClick={() => navigate(-1)}/>
      <div className="">
        {/* elements at the top */}
        <div className="flex mb-10">
          <Link
            to="/preference"
            className="font-bold flex gap-2 text-3xl text-customOrange-dark hover:text-customOrange-light hover:underline"
          >
            <p>&lt;</p>
            <h2>Preferences</h2>
            {/* TODO: add thee right icons */}
          </Link>
        </div>

      <div>
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <div>
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div>
      </div>
    </div>
    </>
  );
};



export default RestaurantList;
