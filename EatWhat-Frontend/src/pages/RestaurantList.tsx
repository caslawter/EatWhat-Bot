import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"; // this page opens up when clicked on the car
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {
  BackButton,
  MainButton,
  useWebApp,
} from "@vkruglikov/react-telegram-web-app";
import type { ModalOptions, ModalInterface } from "flowbite";
import { Button, Checkbox } from "@mui/material";


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

const RestaurantCard = ({
  restaurant,
  handleCheckboxChange,
  checkedState,
}): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  // const restaurant_1: RestaurantObject = {
  //   name: "muthu curry",
  //   location: "82 Orchard Rd, Singapore 238839",
  //   rating: 3.7,
  //   priceLevel: 1,
  //   type: "Indian",
  // };

  return (
    <>

      {/* <div className="border-b pb-2 border-white flex items-center w-full justify-between align-middle mb-5"> */}
      {/* left and right */}
      <>
        <div className="flex flex-col gap-2 w-full">
          {/* Top Section */}
          <div className="relative flex items-center justify-between">
            {/* Link and Restaurant Name */}
            <Link to={`/restaurantList/${restaurant.id}`} className="flex-grow">
              <h3 className="font-bold max-w-full text-lg inline-block text-ellipsis overflow-hidden w-full text-left">
                {restaurant.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center h-full ml-4">
              <FaStar className="text-customOrange-dark" />
              <p className="ml-1">{restaurant.rating}</p>
            </div>

            {/* Checkbox */}
            <Checkbox
              name={restaurant.name}
              id={`checkbox-${restaurant.id}`}
              checked={checkedState[restaurant.id] || false}
              onChange={handleCheckboxChange(restaurant.id)}
              sx={{
                color: "gray", // Default color
                "&.Mui-checked": {
                  color: "#FFA500", // Orange color when checked
                },
              }}
              className="ml-auto" // Pushes the checkbox to the far right
            />
          </div>

          {/* Additional Info */}
          <div>
            {restaurant.type ? <p>{restaurant.type}</p> : <p>Nil</p>}
            <p>{restaurant.location}</p>
            <div className="flex items-center">
              {/* Depending on price level, color the dollar sign */}
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
          </div>
        </div>
      </>
    </>
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
  const [restaurantList, setRestaurantList] = useState<RestaurantObject[]>(
    []
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lat, lng, preferences, priceRange, radius } = state;

  const [checkedState, setCheckedState] = useState(
    restaurantList.reduce((acc: any, restaurant) => {
      acc[restaurant.id] = false; // Initialize all checkboxes as unchecked
      return acc;
    }, {})
  );

  // Handle checkbox change
  const handleCheckboxChange = (id: any) => (event: any) => {
    setCheckedState((prev: any) => ({
      ...prev,
      [id]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    const formData = restaurantList
      .filter((restaurant) => checkedState[restaurant.id]) // Filter for checked restaurants
      .map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        priceLevel: restaurant.priceLevel,
        type: restaurant.type || "Null",
        location: restaurant.location,
        isChecked: true, // Since we're already filtering, isChecked is true
      }));

    // Check if more than 2 restaurants are selected
    if (formData.length >= 2) {
      navigate("/rng", { state: { formData } });
    } else {
      alert("Please select more than 2 restaurants."); // Validation alert
    }
  };

  useEffect(() => {
    async function getGoogleResults() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/searchArea`,
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

        // const resultss = await fetch(
        //   `${import.meta.env.VITE_BACKEND_PORT}/api/searchArea`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "accept": "application/json",
        //       "content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       lat: lat,
        //       lng: lng,
        //       radius: radius,
        //       min: priceRange[0],
        //       max: priceRange[1],
        //     })
        //   }
        // );

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
                `${import.meta.env.VITE_BACKEND_PORT
                }/placeDetails`,
                {
                  params: {
                    placeID: restaurant.place_id,
                  },
                }
              );

              console.log(
                "placeDetailsResponse ==> ",
                placeDetailsResponse
              );

              let cuisineType = "";
              for (const type of placeDetailsResponse.data
                .types) {
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
          return (
            <RestaurantCard
              restaurant={restaurant}
              handleCheckboxChange={handleCheckboxChange}
              checkedState={checkedState}
              key={restaurant.id}
            />
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="contained" // Use "contained" for a filled button
        onClick={handleSubmit}
        fullWidth // Makes the button take the full width of its container
        sx={{
          bgcolor: "#FFA500", // Orange background
          color: "white", // White text
          fontWeight: "bold", // Bold text
          "&:hover": {
            bgcolor: "#FFB84D", // Lighter orange on hover
          },
        }}
      >
        Add to wheel
      </Button>
      {/* <MainButton
        text="Add to wheel"
        onClick={() => {
          navigate("/restaurantDetail");
        }}
        color='#fb923c'
      /> */}
    </div>

  );
};

export default RestaurantList;
