import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIcon from '../../public/cutlery.png'
import { BackButton, MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';


// TODO: font type
function Landing() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);;
  const navigate = useNavigate();
  const WebApp = useWebApp();

  console.log(WebApp.LocationManager.getLocation);
  console.log(WebApp.LocationManager.isInited);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // what to do once we have the position
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
        },
        (error) => {
          // display an error if we cant get the users position
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      // display an error if not supported
      console.error('Geolocation is not supported by this browser.');
    }

  }

  // console.log(window.Telegram.WebApp);
  useEffect(() => {
    // const isRequested = WebApp.LocationManager.isAccessRequested()
    // console.log("isRequested ==> ", isRequested);
  }, [])

  function onGetCurrentLocation() {
    getUserLocation();
    console.log(userLocation); // Use this for user lat and long
    navigate('/Preference', { state: { lat: 1.2976174485362484, lng: 103.85488811330647 } })
  }


  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <div className='relative text-4xl h-full'>
        <Link to='/about' className='uppercase text-base underline font-semibold absolute top-0 right-0 text-blue-800 hover:text-blue-400'>About</Link>
        <div className='absolute gap-3 top-20 left-1/2 -translate-x-1/2 flex flex-col items-center '>
          <img src={LandingIcon} alt="" className=' bg-gray-400 rounded-full size-60' />
          <h1 className=' text-orange-400 font-extrabold w-96 text-center'>Eat What Sia?</h1>

        </div>
        <div className='absolute bottom-12 flex flex-col w-full items-center'>
          <button onClick={() => {onGetCurrentLocation()}} className=' font-bold p-2 text-xl rounded-3xl w-11/12 bg-customOrange-dark text-white hover:bg-customOrange-light '>Get Location</button>
          <Link to='/Map' className='mt-5 text-orange-400 hover:bg-customOrange-dark hover:text-white  border border-orange-400 p-2 rounded-3xl text-xl w-11/12 flex  justify-center' >
            <button >Enter Location Manually</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Landing;
