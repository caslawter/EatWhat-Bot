import React, { useEffect, useState } from "react";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageSlideShow from "../components/Carousel";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function RestaurantDetail() {
  const [detail, setDetail] = useState<any | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id ==> ", id);

  const fetchData = async () => {
    let placeResponse;
    let imageResponse;
    try {
      // First API call
      placeResponse = await axios.get(`
      ${import.meta.env.VITE_BACKEND_PORT}/api/placeDetails`,
        {
          params: {
            placeID: id,
          },
        }
      );
      const placeData = placeResponse.data;

      setDetail(placeData);
      setReviews(placeResponse.data.reviews)
      console.log(placeResponse.data.reviews);

      // query for second response
      imageResponse = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/api/getPhoto`, {
        "name": placeData.photos[0].name
      })
      console.log(imageResponse.data.photoUri);

      setImg(imageResponse.data.photoUri)
      // Update the state with the response data

    } catch (err) {
      // Handle any errors
      console.log(err);

      console.error("Error in fetching restaurant or image details: ", err);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("detail ==> ", detail);


  return (
    <>
      {detail && img && reviews ? (
        <div className="flex flex-col items-center">
          <BackButton onClick={() => navigate(-1)} />
          {
            img && <img src={img} alt="" />
          }
          <h2 className="text-lg font-bold">{detail.displayName.text}</h2>
          {/* price range  */}
          {/* <div className="flex items-center text-center">
            {
              detail.priceRange ? (<>

              {
                detail.priceRange.startPrice ?<div> <FaDollarSign className="text-customOrange-dark mr-1" />
                {detail.priceRange.endPrice.units} 
                </div>: <></>
              }

              {
                detail.priceRange.endPrice ?<> <BsDash />
                {detail.priceRange.endPrice.units} </>: <></>
              }

              </>

              ): <></>
            }

          </div> */}
          {/* rating  */}
          <div className="flex items-center">
            <FaStar className="text-customOrange-dark mr-1" />
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
          <Box>
            {reviews.map((review, index: number) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  p: 1,
                  bgcolor: "#333", // Dark background
                  color: "#FFA500", // Orange text
                  border: "1px solid #FFA500", // Optional: border to match the orange theme
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      color: "#FFA500", // Orange text for review
                    }}
                  >
                    {review.authorAttribution.displayName}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      color: "#FFA500", // Orange text for review
                    }}
                  >
                    {review.originalText.text}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FaStar style={{ color: "#FFA500" }} /> {/* Orange star */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#FFA500", // Orange text for rating
                      }}
                    >
                      {review.rating}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default RestaurantDetail;