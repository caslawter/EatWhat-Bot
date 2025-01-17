import React from 'react'
import { Link } from 'react-router-dom'
// TODO: font type
function Landing() {
  return (
    <div className='relative text-4xl h-full'>
      <Link className='uppercase text-base underline font-semibold absolute top-0 right-0 text-blue-800 hover:text-blue-400'>About</Link>
      <div className='absolute gap-3 top-20 left-1/2 -translate-x-1/2 flex flex-col items-center '>
        <img src="" alt="" className=' bg-gray-400 rounded-full size-60'/>
        <h1 className=' text-orange-400 font-extrabold w-96'>Eat What Sia?</h1>
      </div>
      <div className='absolute bottom-5'>
        <button className=' font-bold p-2 text-xl rounded-3xl w-11/12 bg-customOrange-dark text-white hover:bg-customOrange-light '>Get Location</button>
        <button className='mt-3 text-orange-400 hover:bg-customOrange-dark hover:text-white  border border-orange-400 p-2 rounded-3xl text-xl w-11/12'>Enter Location Manually</button>
      </div>
    </div>
  )
}

export default Landing