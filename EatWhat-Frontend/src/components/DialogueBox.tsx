import React from 'react'
import { LuDot } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function DialogueBox() {
  return (
    <div>
      
          <h2>Restaurant 1</h2>
          <div className='flex'>
            <p>Japanese</p>
            <LuDot />
            <div className='flex'>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
            </div>
            <LuDot />
            <div className='flex'>
              <FaStar />
              <p>4.6</p>
            </div>
          </div>
          <p>68 Orchard Rd, Singapore 238839</p>
          <Link>
            
          </Link>
          <Link>
          </Link>
    </div>
  )
}

export default DialogueBox