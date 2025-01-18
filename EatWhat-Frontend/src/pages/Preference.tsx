import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import RestaurantDetail from './RestaurantDetail';
import axios from 'axios';
import { BackButton, useWebApp } from '@vkruglikov/react-telegram-web-app';



const Preference = (): JSX.Element => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const { lat, lng } = state;
  console.log(lat)
  console.log(lng);
  
  return (
    <div>
      <BackButton onClick={() => navigate(-1)} />
      <div>Preference</div>
    </div>
  )
}

export default Preference