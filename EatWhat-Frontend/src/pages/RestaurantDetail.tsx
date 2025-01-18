import React, { useEffect, useState } from "react";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageSlideShow from "../components/Carousel";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";

function RestaurantDetail() {
  const [detail, setDetail] = useState<any | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id ==> ", id);

  const fetchData = async () => {
    let placeResponse;
    let imageResponse;
    try {
      // First API call
      placeResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_PORT}/api/placeDetails`,
        {
          params: {
            placeID: id,
          },
        }
      );
      const placeData = placeResponse.data;
      // query for second response
      imageResponse = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/${placeData[0].name}/media`)
      console.log("imageResponse ==> ", imageResponse);
  
      // Update the state with the response data
      setDetail(placeData);
    } catch (err) {
      // Handle any errors
      console.error("Error in fetching restaurant or image details: ", err);
    }

  };
  
  useEffect(() => {
    fetchData();
  }, []);
  console.log("detail ==> ", detail);

  // const editedDetail = JSON.stringify(detail);
  // const photosArray = editedDetail.photos;
  // if(detail){
  //   console.log("detail: ", detail.photos);
  //   return (
  //     < >
  //       <BackButton onClick={() => navigate(-1)} />
  //       <div>RestaurantDetail</div>
  //       {detail && <ImageSlideShow urlList={detail.photos}/>}
  //     </>
  //   );
  // }else{
  //   <p>Loading...</p>
  // }
  return (
    <>
      {detail ? (
        <div className="flex flex-col items-center">
          <BackButton onClick={() => navigate(-1)} />
          {detail && <ImageSlideShow urlList={[...detail.photos]} />}
          <h2 className="text-lg font-bold">{detail.displayName.text}</h2>
          {/* price range  */}
          <div className="flex items-center text-center">
            <FaDollarSign className="text-customOrange-dark mr-1"/>
            {detail.priceRange.startPrice.units}
            <BsDash />
            {detail.priceRange.endPrice.units}
          </div>
          {/* rating  */}
          <div className="flex items-center">
            <FaStar className="text-customOrange-dark mr-1"/>
            <p>{detail.rating}</p>
            </div>
          {/* website  */}
          <a 
            href={detail.websiteUri}
            target='_blank'
						rel='noopener noreferrer'
            className="text-customOrange-dark hover:text-customOrange-light underline font-semibold"
          >
            Find out more
          </a>
          {/* review  */}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default RestaurantDetail;
