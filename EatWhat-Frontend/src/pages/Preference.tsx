import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RestaurantDetail from './RestaurantDetail';
import axios from 'axios';
import { BackButton, useWebApp } from '@vkruglikov/react-telegram-web-app';



const Preference = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <BackButton onClick={() => navigate(-1)} />
      <div>Preference</div>
    </div>
  )
}

export default Preference