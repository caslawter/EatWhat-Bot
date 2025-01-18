import React from 'react'
import { LuDot } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function DialogueBox() {
  return (
    <div className='flex flex-col items-center border rounded-3xl p-9 gap-3'>
          <h2 className='text-3xl font-bold'>Restaurant 1</h2>
          <div className='flex items-center gap-2'>
            <p className='font-semibold'>Japanese</p>
            <LuDot />
            <div className='flex'>
              <FaDollarSign className='text-customOrange-dark'/>
              <FaDollarSign className='text-gray-400'/>
              <FaDollarSign/>
              <FaDollarSign/>
            </div>
            <LuDot />
            <div className='flex items-center font-bold'>
              <FaStar className='text-customOrange-dark' />
              <p>4.6</p>
            </div>
          </div>
          <p className='mb-6'>68 Orchard Rd, Singapore 238839</p>
          <div className='flex flex-col gap-2'>
            <Link>
              <button className='bg-customOrange-dark text-white font-bold hover:bg-customOrange-light p-2 rounded-3xl w-44'>
                Let's Go!
              </button>
            </Link>
            <Link>
              <button>
                Nah
              </button>
            </Link>
          </div>
    </div>
  )
}

export default DialogueBox