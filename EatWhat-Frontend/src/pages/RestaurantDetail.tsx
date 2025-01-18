import React from 'react'
import { BackButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Link, useNavigate } from 'react-router-dom'

function RestaurantDetail() {
  const navigate = useNavigate();
  return (
    <>
     <BackButton onClick={() => navigate(-1)}/>
     <div>RestaurantDetail</div>
    </>
    
  )
}

export default RestaurantDetail