import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"; // this page opens up when clicked on the car
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import type { ModalOptions, ModalInterface } from "flowbite";
import { input } from "flowbite";

// @ts-ignore

interface RestaurantObject {
  // id:string;
  id: string;
  name: string;
  location: string;
  rating: number;
  priceLevel: number;
  type: string | null;
}

const RestaurantCard = ({ restaurant }): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  // const restaurant_1: RestaurantObject = {
  //   name: "muthu curry",
  //   location: "82 Orchard Rd, Singapore 238839",
  //   rating: 3.7,
  //   priceLevel: 1,
  //   type: "Indian",
  // };
  return (
    <div className="border-b pb-2 border-white flex items-center w-full justify-between align-middle mb-5">
      {/* left and right */}
      <div className="flex flex-col gap-2 w-10/12">
        {/* top and down */}
        <div className="relative flex item-center text-center ">
          {/* top */}
          <h3 className="font-bold max-w-full text-lg inline-block text-ellipsis w-11/12 overflow-hidden  text-left">
            {restaurant.name}
          </h3>

          <div className="flex items-center h-full">
            <FaStar className="text-customOrange-dark" />
            <p>{restaurant.rating}</p>
          </div>
        </div>
        {restaurant.type ? <p>{restaurant.type}</p> : <p>Nil</p>}
        <p>{restaurant.location}</p>
        <div className="flex items-center">
          {/* depending on price level, color the dollar sign */}
          {[1, 2, 3, 4].map((level) => (
            <FaDollarSign
              key={level}
              className={
                level <= restaurant.priceLevel
                  ? "text-customOrange-dark"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        {/* Down */}
      </div>

      <input type="checkbox" id="custom-checkbox" className="" />
    </div>
  );
};

const cuisineTypes: string[] = [
  "chinese",
  "malay",
  "indian",
  "mexican",
  "indian",
  "japanese",
  "korean",
];

const RestaurantList = (): JSX.Element => {
  const [restaurantList, setRestaurantList] = useState<RestaurantObject[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lat, lng, preferences, priceRange, radius } = state;
  
  useEffect(() => {
    async function getGoogleResults() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/searchArea`,
          {
            params: {
              lat: lat,
              lng: lng,
              radius: radius,
              min: priceRange[0],
              max: priceRange[1],
            },
          }
        );

        console.log("results ==> ", results);

        const restaurants = await Promise.all(
          results.data.map(
            async (restaurant: {
              place_id: string;
              name: string;
              vicinity: string;
              rating: number;
              price_level: number;
            }) => {
              const placeDetailsResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_PORT}/api/placeDetails`,
                {
                  params: {
                    placeID: restaurant.place_id,
                  },
                }
              );

              console.log("placeDetailsResponse ==> ", placeDetailsResponse);

              let cuisineType = "";
              for (const type of placeDetailsResponse.data.types) {
                for (const cuisine of cuisineTypes) {
                  if (type.toLowerCase().includes(cuisine)) {
                    cuisineType = cuisine;
                    break;
                  }
                }
                if (cuisineType) break;
              }

              return {
                id: restaurant.place_id,
                name: restaurant.name,
                location: restaurant.vicinity,
                rating: restaurant.rating,
                priceLevel: restaurant.price_level,
                type: cuisineType,
              } as RestaurantObject;
            }
          )
        );

        console.log("restaurantList ==> ", restaurants);
        setRestaurantList(restaurants); // Replace the state with the new data
      } catch (error) {
        console.log(error);
      }
    }

    getGoogleResults();
  }, []);

  console.log("restaurantList ==> ", restaurantList);
  return (
    <div className="flex flex-col min-h-screen">
      <BackButton onClick={() => navigate(-1)} />

      {/* Restaurant List Container */}
      <div className="flex-grow overflow-y-auto">
        {restaurantList.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
        })}
      </div>

      {/* Next Button */}
      <div className="flex justify-end p-4">
        <Link
          to="/Map"
          className="font-bold p-2 text-xl rounded-3xl w-full bg-customOrange-dark text-white hover:bg-customOrange-light text-center"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default RestaurantList;
