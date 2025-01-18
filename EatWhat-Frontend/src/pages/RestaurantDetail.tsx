import React, { useEffect, useState } from "react";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RestaurantDetail() {
  const [detail, setDetail] = useState<object | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id ==> ", id);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/api/placeDetails`, {
        params: {
          placeID: id,
        },
      })
      .then((response) => {
        setDetail(response);
      })
      .catch((err) => {
        console.error("error in fetching restaurant details: ", err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("detail: ", detail);
  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <div>RestaurantDetail</div>
    </>
  );
}

export default RestaurantDetail;
