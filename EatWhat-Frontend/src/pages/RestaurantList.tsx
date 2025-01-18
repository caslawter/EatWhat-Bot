import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"; // this page opens up when clicked on the car
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import type { ModalOptions, ModalInterface } from "flowbite";
import { input } from "flowbite";

interface RestaurantObject {
  name: string;
  location: string;
  rating: number;
  priceLevel: number;
  type: string | null;
}

// const RestaurantCard = ({restaurant}): JSX.Element => {
//   const [checked, setChecked] = useState<boolean>(false);
//   // const restaurant_1: RestaurantObject = {
//   //   name: "muthu curry",
//   //   location: "82 Orchard Rd, Singapore 238839",
//   //   rating: 3.7,
//   //   priceLevel: 1,
//   //   type: "Indian",
//   // };
//   return (
//     <div className="border-b pb-2 border-white flex items-center w-full justify-between align-middle">
//       {/* left and right */}
//       <div className="flex flex-col gap-2 w-10/12">
//         {/* top and down */}
//         <div className="relative flex item-center text-center ">
//           {/* top */}
//           <h3 className="font-bold text-lg ">{restaurant.name}</h3>

//           <div className="flex items-center absolute right-0 h-full">
//             <FaStar className="text-customOrange-dark" />
//             <p>{restaurant.rating}</p>
//           </div>
//         </div>
//         <p>{restaurant.type}</p>
//         <div className="flex items-center">
//           <FaDollarSign className="text-customOrange-dark" />
//           <FaDollarSign className="text-gray-300" />
//           <FaDollarSign className="text-gray-300" />
//           <FaDollarSign className="text-gray-300" />
//         </div>
//         {/* Down */}
//         <p>{restaurant.location}</p>
//       </div>

//       <input type="checkbox" id="custom-checkbox" className="" />
//     </div>
//   );
// };

const cuisineTypes: string[] = ["chinese", "malay", "indian", "mexican"];

const RestaurantList = (): JSX.Element => {
  const [restaurantList, setRestaurantList] = useState<RestaurantObject[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getGoogleResults() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/searchArea`,
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
        results.data.map((restaurant) => {
          // FOR EACH Restaurant,
          // query second api, put it in a list for types
          let placeDetailsResponse: object;
          axios
            .get(`${import.meta.env.VITE_BACKEND_PORT}/api/placeDetails`, {
              params: {
                placeID: restaurant.place_id,
              },
            })
            .then((response) => {
              placeDetailsResponse = response.data;
              console.log("placeDetailsResponse ==> ", placeDetailsResponse);
            });
          // run a function that filters for cuisine type based on regex
          // store the variable inside
          // create the object and put inside the results
          const restaurantObj: RestaurantObject = {
            name: restaurant.name,
            location: restaurant.vicinity,
            rating: restaurant.rating,
            priceLevel: restaurant.price_level,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    getGoogleResults();
  }, []);

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} />

      {/* <div className="flex flex-col gap-5 mt-2">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div> */}

      <Link
        to="/Map"
        className=" absolute bottom-1 mt-5 text-orange-400 hover:bg-customOrange-dark hover:text-white  border border-orange-400 p-2 rounded-3xl text-xl w-11/12 flex  justify-center"
      >
        <button>Next</button>
      </Link>
    </div>
  );
};

export default RestaurantList;
