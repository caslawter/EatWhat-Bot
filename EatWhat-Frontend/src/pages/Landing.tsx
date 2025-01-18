import React from "react";
import { Link } from "react-router-dom";
import LandingIcon from "../../public/cutlery.png";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

// TODO: font type
const Landing = (): JSX.Element => {
  return (
    <div className="relative text-4xl h-full">
      <Link
        to="/about"
        className="uppercase text-base underline font-semibold absolute top-0 right-0 text-blue-800 hover:text-blue-400"
      >
        About
      </Link>
      <div className="absolute gap-3 top-16 left-1/2 -translate-x-1/2 flex flex-col items-center ">
        <img
          src={LandingIcon}
          alt=""
          className=" bg-gray-400 rounded-full size-60"
        />
        <h1 className=" text-orange-400 font-extrabold w-96 text-center">
          Eat What Sia?
        </h1>
        <BackButton onClick={() => console.log("Hello, I am back button!")} />
      </div>
      <div className="absolute bottom-12 flex flex-col w-full ">
        <button className=" font-bold p-2 text-xl rounded-3xl w-11/12 bg-customOrange-dark text-white hover:bg-customOrange-light mx-auto">
          Get Location
        </button>
        <button className="mt-5 text-orange-400 hover:bg-customOrange-dark hover:text-white  border border-orange-400 p-2 rounded-3xl text-xl w-11/12 mx-auto">
          Enter Location Manually
        </button>
      </div>
    </div>
  );
};

export default Landing;
