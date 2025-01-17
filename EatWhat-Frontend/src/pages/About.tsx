import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='relative '>
      <Link to="/" className='font-bold flex gap-2 text-3xl text-customOrange-dark hover:text-customOrange-light hover:underline'>
        <p>&lt;</p>   
        <p>About</p>
      </Link>
      <div className='absolute top-20'>
        <h2 className='text-lg font-bold'>About Eat What Bot</h2>
        <p className='text-left mt-5'>Eat What Bot is your friendly Telegram chatbot designed to help you conquer decision paralysis when it comes to choosing what to eat. Whether you're craving something new or just can't decide, let Eat What Bot suggest the perfect food idea for you.Just tell us what you're in the mood for, and we'll do the rest—quick, simple, and delicious! </p>
      </div>
    </div>
  )
}

export default About