import React from "react";
import homebg from "../img/HomeBg.png";
import {Link} from 'react-router-dom'
function Hero() {
  return (
    <div className="h-full p-20 flex flex-col-reverse lg:h-screen lg:grid grid-cols-2 gap-6 justify-center items-center bg-slate-200">
      <div className="flex flex-col gap-6">
        <p className="text-5xl">
          Welcome to Egg{" "}
          <span className="text-yellow-400 border-b-2 border-yellow-400">
            Zone
          </span>
        </p>
        <p className=" text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          necessitatibus voluptas sequi facere eligendi eaque? Dolorem, facilis?
          Corrupti unde dolorem debitis repellendus ut porro sunt ipsa nihil
          optio numquam explicabo eligendi, dignissimos incidunt nesciunt
          adipisci atque alias dolorum iste voluptas!
        </p>

        <Link to='/menu' className="w-fit font-bold text-slate-600 bg-yellow-200 py-2 px-4 rounded-xl shadow-lg hover:bg-slate-500 hover:text-yellow-200 active:scale-90 transition-all ease-in-out duration-500 " 
        >
          Order Now
        </Link>
      </div>
      <div className="flex justify-center lg:justify-end">
        <img
          src={homebg}
          alt=""
          className="w-80 sm:w-96 lg:w-4/5 lg:max-w-lg col-start-2"
        />
      </div>
    </div>
  );
}

export default Hero;
