import React from 'react'
import { BackButton, MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';


function Map() {
  const navigate = useNavigate();
  return (
    <div>
      <BackButton onClick={() => navigate(-1)}/>
      <div>map</div>
    </div>
  )
}

export default Map